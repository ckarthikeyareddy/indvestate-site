#!/usr/bin/env python3
"""
Instagram saved-posts ingest pipeline.

For every row in learn_shortlist.csv:
  reels  -> download (yt-dlp, no login needed) -> audio transcript (faster-whisper)
            -> on-screen text (tesseract OCR, 1 frame/sec, de-duplicated)
            -> contact sheet (contact.jpg) so the visuals can be looked at
            -> meta.json (account, caption, likes, comments, duration, language)
  posts  -> images / carousel via gallery-dl (needs cookies.txt) -> OCR per slide
            -> contact sheet of all slides

Output: data/<id>/{meta.json, transcript.txt, ocr.txt, contact.jpg}
        index.csv   (one row per processed item, status + paths)
        missing.csv (items that could not be fetched, with reason)

Resumable: items with an existing data/<id>/meta.json are skipped.

Usage:
  python ingest.py                       # everything
  python ingest.py --limit 50            # first 50 unprocessed
  python ingest.py --category "AI tools & agents"
  python ingest.py --cookies cookies.txt # enables image posts/carousels + fewer 429s
  python ingest.py --model small         # better transcription (slower). default: base
"""
import random, argparse, csv, json, os, re, shutil, subprocess, sys, time, glob, wave
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
DATA.mkdir(exist_ok=True)

def sh(cmd, timeout=240):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)

def ensure_deps():
    missing = []
    for tool in ("ffmpeg", "ffprobe", "tesseract"):
        if shutil.which(tool) is None:
            missing.append(tool)
    if missing:
        print("Missing system tools:", missing, "-> apt-get install -y ffmpeg tesseract-ocr")
    pkgs = ("yt-dlp", "gallery-dl", "faster-whisper", "pillow", "pytesseract")
    for p in pkgs:
        mod = {"yt-dlp": "yt_dlp", "gallery-dl": "gallery_dl", "faster-whisper": "faster_whisper",
               "pillow": "PIL", "pytesseract": "pytesseract"}[p]
        try:
            __import__(mod)
        except ImportError:
            print("Installing", p)
            subprocess.run([sys.executable, "-m", "pip", "install", "-q", p, "--break-system-packages"])

def ytdlp_base(cookies):
    cmd = ["yt-dlp", "--no-check-certificates", "--no-warnings", "--no-playlist"]
    if cookies:
        cmd += ["--cookies", cookies]
    return cmd

def download_reel(url, outdir, cookies):
    meta = sh(ytdlp_base(cookies) + ["-j", url])
    if meta.returncode != 0:
        return None, meta.stderr.strip()[-300:]
    info = json.loads(meta.stdout.splitlines()[0])
    dl = sh(ytdlp_base(cookies) + ["-o", str(outdir / "source.%(ext)s"), "-f", "bv*+ba/b", url], timeout=600)
    files = list(outdir.glob("source.*"))
    if not files:
        return None, dl.stderr.strip()[-300:]
    return {"file": str(files[0]), "info": info}, None

def download_post(url, outdir, cookies):
    cmd = ["gallery-dl", "--no-check-certificate", "-D", str(outdir / "slides"), "-f", "{num:>02}.{extension}"]
    if cookies:
        cmd += ["--cookies", cookies]
    r = sh(cmd + [url], timeout=300)
    slides = sorted(glob.glob(str(outdir / "slides" / "*")))
    if not slides:
        return None, (r.stderr or r.stdout).strip()[-300:] or "no images (login required?)"
    return {"slides": slides}, None

_whisper = None
def transcribe(wav_path, model_name):
    global _whisper
    import numpy as np
    from faster_whisper import WhisperModel
    if _whisper is None:
        _whisper = WhisperModel(model_name, device="cpu", compute_type="int8")
    w = wave.open(str(wav_path))
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    segs, info = _whisper.transcribe(audio, beam_size=1, vad_filter=True)
    text = []
    for s in segs:
        text.append(f"[{s.start:6.1f}s] {s.text.strip()}")
    return info.language, round(info.language_probability, 2), "\n".join(text)

def ocr_frames(frame_paths):
    import pytesseract
    from PIL import Image
    seen, out = set(), []
    for f in frame_paths:
        try:
            t = pytesseract.image_to_string(Image.open(f))
        except Exception as e:
            continue
        t = " ".join(t.split())
        if len(t) > 8 and t not in seen:
            seen.add(t)
            out.append(f"[{Path(f).stem}] {t}")
    return "\n".join(out)

def process_reel(item, outdir, cookies, model):
    got, err = download_reel(item["url"], outdir, cookies)
    if err:
        return None, err
    src = got["file"]; info = got["info"]
    dur = float(info.get("duration") or 0)
    if not dur:
        pr = sh(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src])
        try: dur = float(pr.stdout.strip())
        except ValueError: dur = 0.0
    # audio
    wav = outdir / "audio.wav"
    sh(["ffmpeg", "-v", "error", "-y", "-i", src, "-vn", "-ac", "1", "-ar", "16000", str(wav)])
    lang, lang_p, transcript = ("", 0, "")
    if wav.exists() and wav.stat().st_size > 1000:
        lang, lang_p, transcript = transcribe(wav, model)
    # frames for OCR (1 fps) + contact sheet
    fdir = outdir / "frames"; fdir.mkdir(exist_ok=True)
    sh(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", "fps=1,scale=540:-1", str(fdir / "f_%03d.jpg")])
    frames = sorted(glob.glob(str(fdir / "*.jpg")))
    ocr = ocr_frames(frames)
    # contact sheet: ~20 tiles spread across the video
    n_tiles = 20
    step = max(dur / n_tiles, 1.0)
    sh(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf",
        f"fps=1/{step:.3f},scale=270:-1,tile=5x4", "-frames:v", "1", str(outdir / "contact.jpg")])
    meta = {
        "id": item["id"], "url": item["url"], "type": "reel", "category": item["category"],
        "account": info.get("channel") or item["account"], "account_name": info.get("uploader"),
        "caption": info.get("description", ""), "duration_s": dur,
        "likes": info.get("like_count"), "comments": info.get("comment_count"),
        "posted": info.get("upload_date"), "audio_language": lang, "audio_language_prob": lang_p,
        "has_speech": bool(transcript.strip()),
    }
    (outdir / "transcript.txt").write_text(transcript)
    (outdir / "ocr.txt").write_text(ocr)
    (outdir / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    # tidy: keep contact sheet + first/last frames, drop bulky media
    for f in frames[2:-2]:
        os.remove(f)
    for f in (src, wav):
        try: os.remove(f)
        except OSError: pass
    return meta, None

def process_post(item, outdir, cookies):
    got, err = download_post(item["url"], outdir, cookies)
    if err:
        return None, err
    slides = got["slides"]
    imgs = [s for s in slides if s.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    ocr = ocr_frames(imgs)
    # contact sheet of slides
    if imgs:
        n = len(imgs); cols = min(n, 5); rows = (n + cols - 1) // cols
        inputs = []
        for s in imgs:
            inputs += ["-i", s]
        filt = "".join(f"[{i}:v]scale=270:-1:force_original_aspect_ratio=decrease,pad=270:480:(ow-iw)/2:(oh-ih)/2[v{i}];" for i in range(n))
        filt += "".join(f"[v{i}]" for i in range(n)) + f"xstack=inputs={n}:layout=" + "|".join(f"{(i%cols)*270}_{(i//cols)*480}" for i in range(n)) if n > 1 else "[v0]null"
        sh(["ffmpeg", "-v", "error", "-y"] + inputs + ["-filter_complex", filt, "-frames:v", "1", str(outdir / "contact.jpg")])
    meta = {"id": item["id"], "url": item["url"], "type": "carousel" if len(imgs) > 1 else "post",
            "category": item["category"], "account": item["account"], "slides": len(imgs), "has_speech": False}
    (outdir / "ocr.txt").write_text(ocr)
    (outdir / "transcript.txt").write_text("")
    (outdir / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    return meta, None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=str(HERE / "learn_shortlist.csv"))
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--category", default=None)
    ap.add_argument("--cookies", default=None, help="Netscape cookies.txt from a logged-in browser")
    ap.add_argument("--model", default="base", help="faster-whisper size: tiny|base|small|medium")
    ap.add_argument("--sleep", type=float, default=2.0, help="seconds between items (be gentle with rate limits)")
    ap.add_argument("--types", default="reel,post")
    a = ap.parse_args()
    ensure_deps()
    items = list(csv.DictReader(open(a.csv, newline="", encoding="utf-8")))
    if a.category:
        items = [i for i in items if i["category"] == a.category]
    items = [i for i in items if i["type"] in a.types.split(",")]
    done = 0
    index_path, missing_path = HERE / "index.csv", HERE / "missing.csv"
    for p, hdr in ((index_path, ["id", "type", "category", "account", "url", "has_speech", "language", "duration_s", "folder"]),
                   (missing_path, ["id", "type", "category", "url", "reason"])):
        if not p.exists():
            with open(p, "w", newline="") as f: csv.writer(f).writerow(hdr)
    for item in items:
        outdir = DATA / item["id"]
        if (outdir / "meta.json").exists():
            continue
        if a.limit and done >= a.limit:
            break
        outdir.mkdir(exist_ok=True)
        t0 = time.time()
        try:
            if item["type"] == "reel":
                meta, err = process_reel(item, outdir, a.cookies, a.model)
            else:
                meta, err = process_post(item, outdir, a.cookies)
        except Exception as e:
            meta, err = None, f"exception: {e}"[:300]
        if err:
            print(f"MISS {item['id']} ({item['type']}): {err}")
            with open(missing_path, "a", newline="") as f:
                csv.writer(f).writerow([item["id"], item["type"], item["category"], item["url"], err])
            shutil.rmtree(outdir, ignore_errors=True)
            if "429" in err or "rate" in err.lower():
                print("Rate limited - sleeping 90s"); time.sleep(300)
        else:
            with open(index_path, "a", newline="") as f:
                csv.writer(f).writerow([meta["id"], meta["type"], meta["category"], meta.get("account"), meta["url"],
                                        meta.get("has_speech"), meta.get("audio_language", ""), meta.get("duration_s", ""), str(outdir)])
            print(f"OK   {item['id']} ({item['type']}, {item['category']}) speech={meta.get('has_speech')} {time.time()-t0:.0f}s")
        done += 1
        time.sleep(a.sleep * random.uniform(0.8, 2.0))
        if done % 15 == 0:
            time.sleep(random.uniform(60, 120))  # longer rest every 15 items
    print(f"Processed {done} items this run. Index: {index_path}  Missing: {missing_path}")

if __name__ == "__main__":
    main()
