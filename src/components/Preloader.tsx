"use client";
// Preloader (Phase 3.5): void screen, the plus-grid, the wordmark revealed
// left to right by a clip-path wipe over 0.9s while a mono counter runs
// 00 → 100 (CSS @property, no JS), then the screen lifts (translateY −100%)
// over 0.6s --ease-in-out. Shown once per session: an inline script in the
// <head> reads sessionStorage before paint and sets html[data-pre="done"],
// which hides this element (also under reduced motion). The lift is started
// from here so the hero sequence can begin as the curtain rises, and never
// before hydration (no flash of an unstaged hero).
import { useEffect, useRef } from "react";
import { PRE_DONE, PRE_LIFT } from "@/lib/motion";
import { PRELOADER_KEY as KEY } from "@/lib/preloader-script";

const WIPE_MS = 900;
const SAFETY_MS = 1400;

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    if (!el || html.dataset.pre === "done") return;

    let lifted = false;
    let timer = 0;
    const done = () => {
      html.dataset.pre = "done";
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(PRE_DONE));
    };
    const lift = () => {
      if (lifted) return;
      lifted = true;
      window.clearTimeout(timer);
      html.dataset.pre = "lift";
      el.classList.add("pre--lift");
      window.dispatchEvent(new Event(PRE_LIFT));
      el.addEventListener("animationend", done, { once: true });
    };
    // Wait for the wipe + counter (CSS, started at first paint), then lift.
    const anims = el.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => {}));
    if (anims.length) Promise.all(anims).then(lift);
    else timer = window.setTimeout(lift, WIPE_MS);
    timer = window.setTimeout(lift, SAFETY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pre iv-plus-grid" ref={ref} aria-hidden="true">
      <span className="pre__mark iv-wordmark">INDVESTATE</span>
      <span className="pre__count iv-data" />
    </div>
  );
}
