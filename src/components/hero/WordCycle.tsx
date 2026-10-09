"use client";
// H1 word slot · motion-spec row 02. Cycles the words with the system's
// iv-word-cycle keyframes (2.6s per word: in over the first 12%, out over the
// last 12%). The next word starts as the current one begins to leave, so the
// two cross in the slot instead of leaving it blank. All words share one grid
// cell so the slot keeps the widest word's width and the line never reflows.
// Under reduced motion the first word stays. Screen readers get it once.
import { useEffect, useState } from "react";

const DURATION = 2600;
const HANDOFF = Math.round(DURATION * 0.84);

interface Slot {
  idx: number;
  cycle: number;
}

export function WordCycle({ words }: { words: readonly string[] }) {
  const [slots, setSlots] = useState<Slot[]>([{ idx: 0, cycle: 0 }]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || words.length < 2) return;
    const advance = (fresh: boolean) =>
      setSlots((prev) => {
        const last = prev[prev.length - 1];
        const next = { idx: (last.idx + 1) % words.length, cycle: last.cycle + 1 };
        return fresh ? [next] : [last, next];
      });
    const id = window.setInterval(() => advance(false), HANDOFF);
    // Timers throttle in a hidden tab and the finished word sits at opacity 0;
    // start a fresh word the moment the tab is visible again.
    const onVisible = () => {
      if (!document.hidden) advance(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [words.length]);

  return (
    <span className="word-slot">
      <span className="sr-only">{words[0]}</span>
      {words.map((w, idx) => (
        <span key={"w" + idx} className="word-slot__word" aria-hidden="true">
          {w}
        </span>
      ))}
      {slots.map((s) => (
        <span key={s.cycle} className="word-slot__word is-active" aria-hidden="true">
          {words[s.idx]}
        </span>
      ))}
    </span>
  );
}
