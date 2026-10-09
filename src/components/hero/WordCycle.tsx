"use client";
// H1 word slot · motion-spec row 02, rewritten in Phase 3.7. Exactly one word
// sits in the slot at all times: the outgoing word leaves (opacity 0,
// translateY −8px, --dur-base) and is removed before the incoming word is
// inserted and rises into place. The hidden copies of every word share the
// grid cell so the slot keeps the widest word's width and the line never
// reflows. The cycle writes to the DOM directly (no React state) and finds
// the slot by attribute on every tick, so the hero's SplitText line masks can
// restructure and revert the H1 without detaching anything it updates. A
// hidden tab skips ticks; on return the current word is reset in place.
// Under reduced motion the first word stays. Screen readers get it once.
import { useEffect, useId } from "react";

const PERIOD = 2600;
const OUT_MS = 260; // --dur-base + a frame

export function WordCycle({ words }: { words: readonly string[] }) {
  const id = useId();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || words.length < 2) return;
    let idx = 0;
    let leaving = 0;
    const find = () => document.querySelector<HTMLElement>(`[data-word-slot="${id}"]`);
    const live = (slot: HTMLElement) => Array.from(slot.querySelectorAll<HTMLElement>(".is-active, .is-in, .is-out"));
    const place = (slot: HTMLElement, word: string, animate: boolean) => {
      live(slot).forEach((n) => n.remove());
      const span = document.createElement("span");
      span.className = animate ? "word-slot__word is-in" : "word-slot__word is-active";
      span.setAttribute("aria-hidden", "true");
      span.textContent = word;
      slot.appendChild(span);
      if (animate) {
        void span.getBoundingClientRect(); // commit the start state, then transition in
        span.classList.replace("is-in", "is-active");
      }
    };
    const tick = () => {
      if (document.hidden) return;
      const slot = find();
      if (!slot) return;
      const current = live(slot);
      current.forEach((n) => {
        n.classList.remove("is-active", "is-in");
        n.classList.add("is-out");
      });
      window.clearTimeout(leaving);
      leaving = window.setTimeout(() => {
        const s = find();
        if (!s) return;
        idx = (idx + 1) % words.length;
        place(s, words[idx], true);
      }, OUT_MS);
    };
    const timer = window.setInterval(tick, PERIOD);
    // A hidden tab freezes transitions; reset the current word in place on return.
    const onVisible = () => {
      if (document.hidden) return;
      window.clearTimeout(leaving);
      const slot = find();
      if (slot) place(slot, words[idx], false);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(leaving);
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
