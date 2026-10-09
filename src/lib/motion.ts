"use client";
// Shared motion helpers (Phase 3.5). Every value comes from the design-system
// tokens in design-system/tokens/motion.css; nothing here invents an easing
// or a duration. Import gsap only through @/lib/gsap.
import { gsap, CustomEase } from "@/lib/gsap";

const EASE_OUT = "0.22,0.61,0.36,1"; // --ease-out
const EASE_IN_OUT = "0.65,0,0.35,1"; // --ease-in-out

/** Mono glyphs for the DecryptedText-style scramble. */
export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";
export const SCRAMBLE_DUR = 0.6;

export function easeOut() {
  return CustomEase.get("ivOut") ?? CustomEase.create("ivOut", EASE_OUT);
}
export function easeInOut() {
  return CustomEase.get("ivInOut") ?? CustomEase.create("ivInOut", EASE_IN_OUT);
}

export function tokenMs(name: string, fallback: number): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v / 1000 : fallback;
}
export function tokenPx(name: string, fallback: number): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
}

/** Scramble a plain-text mono label into place (ScrambleTextPlugin, 0.6s). */
export function scrambleVars(el: HTMLElement | SVGElement) {
  return {
    duration: SCRAMBLE_DUR,
    scrambleText: { text: el.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.6, tweenLength: false },
    ease: "none",
  };
}

/** Plain-text mono labels inside a root (no child elements, so innerHTML is safe to rewrite). */
export function monoLabels(root: Element): HTMLElement[] {
  return gsap.utils
    .toArray<HTMLElement>(".iv-label", root)
    .filter((el) => el.children.length === 0 && (el.textContent ?? "").trim().length > 0 && !el.closest("[data-no-scramble]"));
}

export const PRE_LIFT = "iv:pre-lift";
export const PRE_DONE = "iv:pre-done";

/** Run `cb` once the preloader starts lifting (or at once if it never showed). */
export function afterPreloader(cb: () => void): () => void {
  const html = document.documentElement;
  if (html.dataset.pre === "done" || html.dataset.pre === "lift") {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener(PRE_LIFT, h, { once: true });
  return () => window.removeEventListener(PRE_LIFT, h);
}

/** Set by RouteWatch on every client navigation (not on first load). */
export const nav = { last: 0 };
export function justNavigated(): boolean {
  return nav.last > 0 && performance.now() - nav.last < 800;
}
