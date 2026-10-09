"use client";
// Reels manager (Phase 3.6 §13): list with drag-to-reorder (HTML5 drag and
// drop plus up/down buttons for the keyboard), publish toggle, inline edit
// (kicker, caption, stat, Instagram URL), delete (two-step). Add reel: drop an
// MP4; validate 9:16 ±5% and under 60 s from the video's metadata; when the
// file is over 12 MB compress in the browser with ffmpeg.wasm to 1080×1920
// H.264 at ~5 Mbps (progress bar, "Skip compression"); grab a poster from the
// first frame on a canvas; client-upload both to Vercel Blob through
// /api/admin/blob; write the record through /api/admin/reels.
// ffmpeg.wasm's class spawns a Worker with import.meta.url, which the bundler
// cannot resolve, so its UMD build is loaded from the CDN at runtime (it then
// fetches its own worker chunk from the same directory). Nothing is bundled.
import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { Button, Checkbox, TextField } from "@/components/ds";
import type { Reel } from "@/content/reels";

const MAX_SECONDS = 60;
const RATIO = 9 / 16;
const RATIO_TOLERANCE = 0.05;
const COMPRESS_OVER_BYTES = 12 * 1024 * 1024;
const FFMPEG_CORE = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
const FFMPEG_UMD = "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.js";

interface FFmpegLike {
  on(event: "progress", cb: (e: { progress: number }) => void): void;
  load(opts: { coreURL: string; wasmURL: string }): Promise<boolean>;
  writeFile(name: string, data: Uint8Array): Promise<boolean>;
  exec(args: string[]): Promise<number>;
  readFile(name: string): Promise<Uint8Array | string>;
  terminate(): void;
}
declare global {
  interface Window {
    FFmpegWASM?: { FFmpeg: new () => FFmpegLike };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load the compressor."));
    document.head.appendChild(s);
  });
}

const ERR: Record<string, string> = {
  "not-configured": "The store is not configured on this deployment (KV or Blob).",
  "store-failed": "Could not write to the store.",
  "bad-reel": "The record is incomplete.",
  unauthorized: "Signed out. Sign in again.",
};

type Draft = Pick<Reel, "kicker" | "caption" | "stat" | "instagramUrl">;

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

async function readMeta(file: File): Promise<{ width: number; height: number; duration: number }> {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.muted = true;
    v.src = URL.createObjectURL(file);
    v.onloadedmetadata = () => {
      const out = { width: v.videoWidth, height: v.videoHeight, duration: v.duration };
      URL.revokeObjectURL(v.src);
      resolve(out);
    };
    v.onerror = () => reject(new Error("Could not read the video."));
  });
}

async function posterFrom(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    v.playsInline = true;
    v.src = URL.createObjectURL(file);
    const grab = () => {
      const c = document.createElement("canvas");
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext("2d")?.drawImage(v, 0, 0);
      URL.revokeObjectURL(v.src);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not draw the poster."))), "image/jpeg", 0.86);
    };
    v.onloadeddata = () => {
      v.currentTime = Math.min(0.1, v.duration || 0.1);
    };
    v.onseeked = grab;
    v.onerror = () => reject(new Error("Could not read the video."));
  });
}

async function compress(file: File, onProgress: (p: number) => void, signal: { skip: boolean }): Promise<File> {
  const { fetchFile, toBlobURL } = await import("@ffmpeg/util");
  await loadScript(FFMPEG_UMD);
  const FFmpeg = window.FFmpegWASM?.FFmpeg;
  if (!FFmpeg) throw new Error("Could not load the compressor.");
  const ff = new FFmpeg();
  ff.on("progress", ({ progress }) => onProgress(Math.max(0, Math.min(1, progress))));
  await ff.load({
    coreURL: await toBlobURL(`${FFMPEG_CORE}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${FFMPEG_CORE}/ffmpeg-core.wasm`, "application/wasm"),
  });
  if (signal.skip) return file;
  await ff.writeFile("in.mp4", await fetchFile(file));
  await ff.exec([
    "-i", "in.mp4",
    "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
    "-c:v", "libx264", "-preset", "veryfast", "-b:v", "5M", "-maxrate", "5.5M", "-bufsize", "10M",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "128k",
    "out.mp4",
  ]);
  const data = (await ff.readFile("out.mp4")) as Uint8Array;
  ff.terminate();
  if (signal.skip) return file;
  return new File([new Uint8Array(data)], file.name.replace(/\.[^.]+$/, "") + "-1080x1920.mp4", { type: "video/mp4" });
}

export function ReelsManager() {
  const [reels, setReels] = useState<Reel[] | null>(null);
  const [stored, setStored] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  // Add reel
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<{ width: number; height: number; duration: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft & { published: boolean }>({ kicker: "", caption: "", stat: "", instagramUrl: "", published: false });
  const [stage, setStage] = useState<"idle" | "compress" | "poster" | "upload" | "save">("idle");
  const [progress, setProgress] = useState(0);
  const [dropOver, setDropOver] = useState(false);
  const skip = useRef({ skip: false });

  const fail = (code: string | undefined, fallback: string) => setError(ERR[code ?? ""] ?? fallback);

  useEffect(() => {
    let on = true;
    fetch("/api/admin/reels")
      .then(async (r) => {
        const d = (await r.json()) as { ok: boolean; reels?: Reel[]; stored?: boolean; error?: string };
        if (!r.ok || !d.reels) throw new Error(d.error);
        return d;
      })
      .then((d) => {
        if (!on || !d.reels) return;
        setReels(d.reels);
        setStored(Boolean(d.stored));
        setDrafts(Object.fromEntries(d.reels.map((x) => [x.id, { kicker: x.kicker, caption: x.caption, stat: x.stat, instagramUrl: x.instagramUrl }])));
      })
      .catch((e: Error) => {
        if (on) setError(ERR[e.message] ?? "Could not load reels.");
      });
    return () => {
      on = false;
    };
  }, []);

  const save = async (list: Reel[], done = "Saved.") => {
    setError(null);
    setNotice(null);
    const r = await fetch("/api/admin/reels", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ reels: list }) });
    const d = (await r.json().catch(() => ({}))) as { ok?: boolean; reels?: Reel[]; error?: string };
    if (!r.ok || !d.reels) {
      fail(d.error, "Could not save.");
      return;
    }
    setReels(d.reels);
    setStored(true);
    setNotice(done);
  };

  const move = (id: string, to: number) => {
    if (!reels) return;
    const from = reels.findIndex((x) => x.id === id);
    if (from < 0 || to < 0 || to >= reels.length || from === to) return;
    const next = [...reels];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    save(next, "Order saved.");
  };

  const onDrop = (e: DragEvent, targetId: string) => {
    e.preventDefault();
    if (!reels || !dragging) return;
    move(dragging, reels.findIndex((x) => x.id === targetId));
    setDragging(null);
    setOver(null);
  };

  const togglePublish = (id: string) => reels && save(reels.map((x) => (x.id === id ? { ...x, published: !x.published } : x)), "Saved.");

  const saveEdit = (id: string) => {
    if (!reels) return;
    const d = drafts[id];
    save(reels.map((x) => (x.id === id ? { ...x, ...d } : x)), "Saved.");
  };

  const remove = async (id: string) => {
    setError(null);
    const r = await fetch(`/api/admin/reels?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const d = (await r.json().catch(() => ({}))) as { ok?: boolean; reels?: Reel[]; error?: string };
    if (!r.ok || !d.reels) {
      fail(d.error, "Could not delete.");
      return;
    }
    setReels(d.reels);
    setConfirmDelete(null);
    setNotice("Deleted.");
  };

  // ---- add reel ----------------------------------------------------------------
  const pick = async (f: File | undefined) => {
    setFileError(null);
    setFile(null);
    setMeta(null);
    if (!f) return;
    if (f.type !== "video/mp4" && !f.name.toLowerCase().endsWith(".mp4")) {
      setFileError("Drop an MP4.");
      return;
    }
    try {
      const m = await readMeta(f);
      const ratio = m.width / m.height;
      if (Math.abs(ratio - RATIO) / RATIO > RATIO_TOLERANCE) {
        setFileError(`Not 9:16 (this is ${m.width}×${m.height}).`);
        return;
      }
      if (m.duration > MAX_SECONDS) {
        setFileError(`Over ${MAX_SECONDS} s (this is ${Math.round(m.duration)} s).`);
        return;
      }
      setFile(f);
      setMeta(m);
      if (!draft.kicker) setDraft((d) => ({ ...d, kicker: f.name.replace(/\.[^.]+$/, "").toUpperCase().slice(0, 40) }));
    } catch (e) {
      setFileError((e as Error).message);
    }
  };

  const add = async () => {
    if (!file || !meta) return;
    setError(null);
    setNotice(null);
    skip.current = { skip: false };
    try {
      let video = file;
      if (file.size > COMPRESS_OVER_BYTES) {
        setStage("compress");
        setProgress(0);
        video = await compress(file, setProgress, skip.current);
      }
      setStage("poster");
      const poster = await posterFrom(video);
      setStage("upload");
      setProgress(0);
      const id = slug(draft.kicker || file.name) || `reel-${Date.now()}`;
      const [vBlob, pBlob] = await Promise.all([
        upload(`reels/${id}.mp4`, video, { access: "public", handleUploadUrl: "/api/admin/blob", contentType: "video/mp4", onUploadProgress: (p) => setProgress(p.percentage / 100) }),
        upload(`reels/${id}.jpg`, poster, { access: "public", handleUploadUrl: "/api/admin/blob", contentType: "image/jpeg" }),
      ]);
      setStage("save");
      const reel: Reel = { id, ...draft, videoUrl: vBlob.url, posterUrl: pBlob.url, order: (reels?.length ?? 0) + 1 };
      const r = await fetch("/api/admin/reels", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ reel }) });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; reels?: Reel[]; error?: string };
      if (!r.ok || !d.reels) throw new Error(d.error ?? "store-failed");
      setReels(d.reels);
      setDrafts((x) => ({ ...x, [id]: { kicker: reel.kicker, caption: reel.caption, stat: reel.stat, instagramUrl: reel.instagramUrl } }));
      setFile(null);
      setMeta(null);
      setDraft({ kicker: "", caption: "", stat: "", instagramUrl: "", published: false });
      setNotice("Reel added.");
    } catch (e) {
      const msg = (e as Error).message;
      fail(msg, msg.includes("token") || msg.includes("BLOB") ? ERR["not-configured"] : `Could not add the reel. ${msg}`);
    } finally {
      setStage("idle");
    }
  };

  const busy = stage !== "idle";
  const stageLabel = { idle: "", compress: "Compressing", poster: "Poster", upload: "Uploading", save: "Saving" }[stage];

  return (
    <div className="stack g-48">
      {error && (
        <div className="adm__err iv-body" role="alert">
          {error}
        </div>
      )}
      {notice && !error && (
        <div className="adm__ok iv-body" role="status">
          {notice}
        </div>
      )}

      <section className="adm__panel" aria-label="Add reel">
        <span className="iv-label signal">Add reel</span>
        <div
          className="adm__drop"
          data-over={dropOver ? "true" : "false"}
          onDragOver={(e) => {
            e.preventDefault();
            setDropOver(true);
          }}
          onDragLeave={() => setDropOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDropOver(false);
            pick(e.dataTransfer.files[0]);
          }}
        >
          <span className="iv-body muted">Drop an MP4 here, 9:16, under 60 s. Files over 12 MB are compressed in the browser first.</span>
          <input type="file" accept="video/mp4" onChange={(e) => pick(e.target.files?.[0])} className="iv-body" />
          {fileError && (
            <span className="iv-field__error" role="alert">
              {fileError}
            </span>
          )}
          {file && meta && (
            <span className="iv-data muted">
              {file.name} · {meta.width}×{meta.height} · {Math.round(meta.duration)} s · {(file.size / 1024 / 1024).toFixed(1)} MB
            </span>
          )}
        </div>
        <div className="adm__fields">
          <TextField label="Kicker" placeholder="LIVE 03 · TELLAPUR" value={draft.kicker} onChange={(e) => setDraft({ ...draft, kicker: e.target.value })} />
          <TextField label="Stat" placeholder="₹ 5,300 / sq ft · 1,600 sq ft" value={draft.stat} onChange={(e) => setDraft({ ...draft, stat: e.target.value })} />
          <TextField label="Caption" value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} />
          <TextField label="Instagram URL" type="url" placeholder="https://www.instagram.com/reel/…" value={draft.instagramUrl} onChange={(e) => setDraft({ ...draft, instagramUrl: e.target.value })} />
        </div>
        <Checkbox checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })}>
          Publish on the home page
        </Checkbox>
        {busy && (
          <div className="stack g-12">
            <div className="adm__status">
              <span className="iv-label muted">{stageLabel}</span>
              <span className="iv-data muted">{Math.round(progress * 100)}%</span>
              {stage === "compress" && (
                <Button variant="ghost" size="sm" onClick={() => (skip.current.skip = true)}>
                  Skip compression
                </Button>
              )}
            </div>
            <div className="adm__progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
        )}
        <div className="row">
          <Button variant="secondary" onClick={add} disabled={!file || !meta || busy}>
            {busy ? stageLabel : "Add reel"}
          </Button>
        </div>
      </section>

      <section aria-label="Reels">
        <div className="adm__status" style={{ paddingBottom: 16 }}>
          <span className="iv-label muted">Order</span>
          <span className="iv-data muted">{stored ? "From the store" : "Seed from content, not yet saved"}</span>
        </div>
        {!reels ? (
          <span className="iv-label muted">Loading</span>
        ) : (
          <ol className="adm__list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {reels.map((r, i) => {
              const d = drafts[r.id] ?? { kicker: r.kicker, caption: r.caption, stat: r.stat, instagramUrl: r.instagramUrl };
              const dirty = d.kicker !== r.kicker || d.caption !== r.caption || d.stat !== r.stat || d.instagramUrl !== r.instagramUrl;
              return (
                <li
                  key={r.id}
                  className="adm__row"
                  draggable
                  data-dragging={dragging === r.id ? "true" : "false"}
                  data-over={over === r.id ? "true" : "false"}
                  onDragStart={() => setDragging(r.id)}
                  onDragEnd={() => {
                    setDragging(null);
                    setOver(null);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setOver(r.id);
                  }}
                  onDrop={(e) => onDrop(e, r.id)}
                >
                  <span className="adm__grip" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- blob poster
                    <img className="adm__poster" src={r.posterUrl} alt="" />
                  ) : (
                    <span className="adm__poster iv-plus-grid" />
                  )}
                  <div className="stack g-12">
                    <div className="adm__fields">
                      <TextField label="Kicker" value={d.kicker} onChange={(e) => setDrafts({ ...drafts, [r.id]: { ...d, kicker: e.target.value } })} />
                      <TextField label="Stat" value={d.stat} onChange={(e) => setDrafts({ ...drafts, [r.id]: { ...d, stat: e.target.value } })} />
                      <TextField label="Caption" value={d.caption} onChange={(e) => setDrafts({ ...drafts, [r.id]: { ...d, caption: e.target.value } })} />
                      <TextField label="Instagram URL" type="url" value={d.instagramUrl} onChange={(e) => setDrafts({ ...drafts, [r.id]: { ...d, instagramUrl: e.target.value } })} />
                    </div>
                    <div className="adm__status">
                      <Checkbox checked={r.published} onChange={() => togglePublish(r.id)}>
                        Published
                      </Checkbox>
                      <span className="iv-data muted">{r.videoUrl ? "Video on file" : "No video yet"}</span>
                      <span className="iv-data muted">{r.id}</span>
                    </div>
                  </div>
                  <div className="adm__acts">
                    <Button variant="secondary" size="sm" onClick={() => saveEdit(r.id)} disabled={!dirty}>
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => move(r.id, i - 1)} disabled={i === 0} aria-label="Move up">
                      Up
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => move(r.id, i + 1)} disabled={i === reels.length - 1} aria-label="Move down">
                      Down
                    </Button>
                    {confirmDelete === r.id ? (
                      <Button variant="ghost" size="sm" onClick={() => remove(r.id)} style={{ color: "var(--risk)" }}>
                        Confirm delete
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(r.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
