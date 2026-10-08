"use client";

// Smooth scrolling via Lenis, driven by the GSAP ticker so ScrollTrigger and
// Lenis share one frame loop and never drift apart.
// Drop into: lib/lenis.tsx   (then wrap the app body in <SmoothScroll>)
//
// Do NOT also call ScrollSmoother.create() — Lenis replaces it. Pick one.
//
// Fix (Phase 1.5): lenis/react 1.3.x stores the instance in React state and
// updates the imperative ref only after a re-render, so reading
// `lenisRef.current.lenis` inside a mount-only effect returned undefined. The
// ticker was never wired, and with autoRaf off Lenis swallowed every wheel
// event without scrolling. The sync now lives in a child that reads the
// instance through useLenis() and re-runs when it appears.

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProps = {
  children?: ReactNode;
  /** Override any Lenis option; `autoRaf` is always forced off. */
  options?: Omit<LenisOptions, "autoRaf">;
};

const defaults: Omit<LenisOptions, "autoRaf"> = {
  lerp: 0.1,
  smoothWheel: true,
  // Let modals / nested scroll areas scroll natively (or mark them with
  // data-lenis-prevent and drop this for a small perf win).
  allowNestedScroll: true,
  // Disables smoothing when the OS asks for reduced motion.
  respectReducedMotion: true,
  // Kill inertia when an internal <a href="#..."> or router link is clicked.
  stopInertiaOnNavigate: true,
};

function TickerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis from GSAP's ticker (seconds -> ms).
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);

    // 3. Stop GSAP from compensating for dropped frames; Lenis handles timing.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children, options }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ ...defaults, ...options, autoRaf: false }}>
      <TickerSync />
      {children}
    </ReactLenis>
  );
}

// Re-export so components only ever import scroll helpers from "@/lib/lenis".
export { useLenis };
