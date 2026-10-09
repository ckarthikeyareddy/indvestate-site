"use client";
// The hero field · BRIEF.md "Hero field" §A. Canvas 2D, no shader, no library.
// Ground layer of the map plane, below the SVG, inside the same perspective
// wrapper so canvas and SVG bend together. A grid of points; one gaussian
// well that follows an eased pointer (or drifts on a Lissajous path until the
// pointer arrives, forever on touch). Dots in ink, lines in signal, nothing
// saffron. Pauses off-screen; draws one static frame under reduced motion with
// the well parked at the live marker nearest the centre.
import { useEffect, useRef } from "react";

export const SPACING = 26; // px between grid points
export const SPACING_NARROW = 32; // under 768px viewport width
export const LERP = 0.1; // tracked pointer → real pointer, per frame
export const SIG_K = 0.42; // SIG = SIG_K * min(w, h)
export const PULL_K = 0.3; // PULL = PULL_K * min(w, h)

const DPR_CAP = 2;
const LINE_SKIP = 0.004;
const MARKER_RADIUS = 120; // px: cap line alpha at 0.5 near markers
const MARKER_CAP = 0.5;

export interface GravityFieldProps {
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

function parseColor(value: string): [number, number, number] {
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = v.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return [243, 239, 230];
}

/**
 * Pointer → canvas-local mapping through the real transform chain. Every
 * ancestor between the canvas and the hero root contributes
 * T(offset) · T(origin) · M · T(-origin); restricted to the z = 0 plane the
 * composite is a 3×3 homography, which is inverted per event. This holds
 * through the perspective tilt, the drift loop and the Phase 2 zoom-out.
 */
function makeProjector(canvas: HTMLElement, hero: HTMLElement) {
  const chain: HTMLElement[] = [];
  for (let el: HTMLElement | null = canvas; el && el !== hero; el = el.parentElement) chain.push(el);
  const origin = (el: HTMLElement) => getComputedStyle(el).transformOrigin.split(" ").map(parseFloat);
  function compose(): DOMMatrix {
    let m = new DOMMatrix();
    for (let i = chain.length - 1; i >= 0; i--) {
      const el = chain[i];
      const cs = getComputedStyle(el);
      let local = new DOMMatrix().translate(el.offsetLeft, el.offsetTop);
      if (cs.transform && cs.transform !== "none") {
        const [ox, oy] = origin(el);
        local = local.translate(ox, oy).multiply(new DOMMatrix(cs.transform)).translate(-ox, -oy);
      }
      m = m.multiply(local);
    }
    return m;
  }
  return function toLocal(clientX: number, clientY: number): { x: number; y: number } {
    const r = hero.getBoundingClientRect();
    const sx = clientX - r.left;
    const sy = clientY - r.top;
    const m = compose();
    // Rows of the homography H: [X, Y, W] = H · [x, y, 1].
    const a = m.m11, b = m.m21, c = m.m41;
    const d = m.m12, e = m.m22, f = m.m42;
    const g = m.m14, h = m.m24, k = m.m44;
    const det = a * (e * k - f * h) - b * (d * k - f * g) + c * (d * h - e * g);
    if (!det) return { x: sx, y: sy };
    // Inverse (adjugate / det), applied to [sx, sy, 1].
    const ix = ((e * k - f * h) * sx + (c * h - b * k) * sy + (b * f - c * e)) / det;
    const iy = ((f * g - d * k) * sx + (a * k - c * g) * sy + (c * d - a * f)) / det;
    const iw = ((d * h - e * g) * sx + (b * g - a * h) * sy + (a * e - b * d)) / det;
    return { x: ix / iw, y: iy / iw };
  };
}

export function GravityField({ className = "" }: GravityFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const hostEl = canvasEl.parentElement; // .iv-heromap__ground
    const heroEl = canvasEl.closest<HTMLElement>(".iv-heromap");
    if (!hostEl || !heroEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;
    const host: HTMLElement = hostEl;
    const hero: HTMLElement = heroEl;

    const styles = getComputedStyle(hero);
    const ink = parseColor(styles.getPropertyValue("--ink"));
    const signal = parseColor(styles.getPropertyValue("--signal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none)");

    let w = 0;
    let h = 0;
    let spacing = SPACING;
    let cols = 0;
    let rows = 0;
    let rest: Point[] = [];
    let markerPx: Point[] = [];
    let markerEls: HTMLElement[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let t0 = performance.now();

    // Pointer in canvas-local space (fractions), through the inverse projection.
    const project = makeProjector(canvas, hero);
    const target: Point = { x: 0.5, y: 0.5 };
    const eased: Point = { x: 0.5, y: 0.5 };
    let hasPointer = false;

    function layout() {
      const dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1);
      const rect = host.getBoundingClientRect();
      // Un-projected size: offsetWidth/Height ignore the ancestor transform.
      w = host.offsetWidth || rect.width;
      h = host.offsetHeight || rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = window.innerWidth < 768 ? SPACING_NARROW : SPACING;
      cols = Math.ceil(w / spacing) + 1;
      rows = Math.ceil(h / spacing) + 1;
      rest = new Array(cols * rows);
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) rest[r * cols + c] = { x: c * spacing, y: r * spacing };
      markerEls = Array.from(hero.querySelectorAll<HTMLElement>(".iv-heromap__marker"));
      mapMarkers();
    }

    // Live markers sit upright in hero space; their dot centres are projected
    // onto the canvas so the line-alpha cap and the reduced-motion park follow
    // them through the zoom-out.
    function mapMarkers() {
      markerPx = markerEls.map((el) => {
        const r = el.getBoundingClientRect();
        const p = project(r.left + 5, r.top + 5);
        return { x: p.x, y: p.y };
      });
    }

    function toLocal(clientX: number, clientY: number) {
      const p = project(clientX, clientY);
      return { x: p.x / w, y: p.y / h };
    }

    function draw(px: number, py: number) {
      const min = Math.min(w, h);
      const SIG = SIG_K * min;
      const PULL = PULL_K * min;
      const twoSig2 = 2 * SIG * SIG;
      const n = rest.length;
      const gs = new Float32Array(n);
      const xs = new Float32Array(n);
      const ys = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const p = rest[i];
        const dx = px - p.x;
        const dy = py - p.y;
        const d2 = dx * dx + dy * dy;
        const g = Math.exp(-d2 / twoSig2);
        const d = Math.sqrt(d2) || 1;
        const pull = g * PULL;
        gs[i] = g;
        xs[i] = p.x + (dx / d) * pull;
        ys[i] = p.y + (dy / d) * pull;
      }
      ctx.clearRect(0, 0, w, h);
      // Lines in signal.
      ctx.lineWidth = 1;
      const [sr, sg, sb] = signal;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c + 1 < cols) line(i, i + 1);
          if (r + 1 < rows) line(i, i + cols);
        }
      }
      function line(a: number, b: number) {
        const mg = (gs[a] + gs[b]) * 0.5;
        if (mg < LINE_SKIP) return;
        let alpha = 0.04 + mg * 0.62;
        if (alpha > MARKER_CAP && markerPx.length) {
          const mx = (xs[a] + xs[b]) * 0.5;
          const my = (ys[a] + ys[b]) * 0.5;
          for (const m of markerPx) {
            const ddx = mx - m.x;
            const ddy = my - m.y;
            if (ddx * ddx + ddy * ddy < MARKER_RADIUS * MARKER_RADIUS) {
              alpha = MARKER_CAP;
              break;
            }
          }
        }
        ctx.strokeStyle = `rgba(${sr},${sg},${sb},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(xs[a], ys[a]);
        ctx.lineTo(xs[b], ys[b]);
        ctx.stroke();
      }
      // Dots in ink.
      const [ir, ig, ib] = ink;
      for (let i = 0; i < n; i++) {
        const g = gs[i];
        ctx.fillStyle = `rgba(${ir},${ig},${ib},${(0.16 + g * 0.62).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], 0.9 + g * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now: number) {
      if (!running) return;
      const t = (now - t0) / 1000;
      if (!hasPointer) {
        target.x = 0.5 + 0.34 * Math.sin(t * 0.7) * Math.cos(t * 0.23);
        target.y = 0.5 + 0.3 * Math.sin(t * 0.52 + 1.1);
      }
      eased.x += (target.x - eased.x) * LERP;
      eased.y += (target.y - eased.y) * LERP;
      if (markerEls.length) mapMarkers();
      draw(eased.x * w, eased.y * h);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || !visible || reduce.matches) return;
      running = true;
      canvas.dataset.running = "true";
      t0 = performance.now() - 1000 * Number(canvas.dataset.t || 0);
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (!running) return;
      running = false;
      canvas.dataset.running = "false";
      cancelAnimationFrame(raf);
    }

    function staticFrame() {
      // Reduced motion: one frame, well parked at the marker nearest the centre.
      let park: Point = { x: w / 2, y: h / 2 };
      let best = Infinity;
      for (const m of markerPx) {
        const d = (m.x - w / 2) ** 2 + (m.y - h / 2) ** 2;
        if (d < best) {
          best = d;
          park = m;
        }
      }
      draw(park.x, park.y);
      canvas.dataset.running = "false";
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || coarse.matches) return; // keep drifting on touch
      const p = toLocal(e.clientX, e.clientY);
      target.x = p.x;
      target.y = p.y;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch" || coarse.matches) return;
      hasPointer = true;
      onMove(e);
    };

    const ro = new ResizeObserver(() => {
      layout();
      if (reduce.matches) staticFrame();
    });
    ro.observe(host);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(hero);

    const onReduce = () => {
      if (reduce.matches) {
        stop();
        staticFrame();
      } else start();
    };
    reduce.addEventListener("change", onReduce);
    hero.addEventListener("pointerenter", onEnter);
    hero.addEventListener("pointermove", onMove);

    layout();
    if (reduce.matches) staticFrame();
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
      hero.removeEventListener("pointerenter", onEnter);
      hero.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={["hero__field", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
