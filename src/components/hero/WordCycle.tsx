"use client";
// H1 word slot · motion-spec row 02. Cycles the words with the system's
// iv-word-cycle keyframes (2.6s per word: in over the first 12%, out over the
// last 12%). The next word starts as the current one begins to leave, so the
// two cross in the slot instead of leaving it blank. All words share one grid
// cell so the slot keeps the widest word's width and the line never reflows.
// Under reduced motion the first word stays. Screen readers get it once.
// Phase 3.5: the cycle writes to the DOM directly (no React state) and finds
// the slot by attribute on every tick, so the hero's SplitText line masks can
// restructure and revert the H1 without detaching the nodes it updates.
import { useEffect, useId } from "react";

const DURATION = 2600;
const HANDOFF = Math.round(DURATION * 0.84);

export function WordCycle({ words }: { words: readonly string[] }) {
  const id = useId();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || words.length < 2) return;
    let idx = 0;
    const find = () => document.querySelector<HTMLElement>(`[data-word-slot="${id}"]`);
    const advance = (fresh: boolean) => {
      const slot = find();
      if (!slot) return;
      const active = Array.from(slot.querySelectorAll<HTMLElement>(".is-active"));
      if (fresh) active.forEach((a) => a.remove());
      else active.slice(0, -1).forEach((a) => a.remove());
      idx = (idx + 1) % words.length;
      const span = document.createElement("span");
      span.className = "word-slot__word is-active";
      span.setAttribute("aria-hidden", "true");
      span.textContent = words[idx];
      slot.appendChild(span);
    };
    const timer = window.setInterval(() => advance(false), HANDOFF);
    // Timers throttle in a hidden tab and the finished word sits at opacity 0;
    // start a fresh word the moment the tab is visible again.
    const onVisible = () => {
      if (!document.hidden) advance(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [words, id]);

  return (
    <span className="word-slot" data-word-slot={id}>
      <span className="sr-only">{words[0]}</span>
      {words.map((w, i) => (
        <span key={"w" + i} className="word-slot__word" aria-hidden="true">
          {w}
        </span>
      ))}
      <span className="word-slot__word is-active" aria-hidden="true">
        {words[0]}
      </span>
    </span>
  );
}
