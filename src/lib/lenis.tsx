"use client";

// Smooth scrolling via Lenis, driven by the GSAP ticker so ScrollTrigger and
// Lenis share one frame loop and never drift apart.
// Drop into: lib/lenis.tsx   (then wrap the app body in <SmoothScroll>)
//
// Do NOT also call ScrollSmoother.create() — Lenis replaces it. Pick one.

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
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

export function SmoothScroll({ children, options }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
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
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ ...defaults, ...options, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}

// Re-export so components only ever import scroll helpers from "@/lib/lenis".
export { useLenis };
