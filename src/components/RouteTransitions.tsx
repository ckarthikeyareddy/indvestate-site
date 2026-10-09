"use client";
// Route transitions (Phase 3.5): the View Transitions API with a void curtain
// wipe of 400ms --ease-in-out (motion.css styles the root pseudo-elements).
// Internal link clicks are caught in the capture phase, the navigation is
// wrapped in document.startViewTransition and the promise resolves when the
// pathname changes. Hash links, modified clicks, external and _blank links
// fall through to Next. Reduced motion or no API: plain navigation.
// Also records each navigation for the section reveals (lib/motion nav).
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useLayoutEffect, useRef } from "react";
import { nav } from "@/lib/motion";

const SAFETY_MS = 1500;

export function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolve = useRef<(() => void) | null>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    nav.last = performance.now();
    resolve.current?.();
    resolve.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.origin !== location.origin) return;
      const url = new URL(a.href);
      if (url.pathname === location.pathname) return;
      const doc = document as Document & {
        startViewTransition?: (cb: () => Promise<void>) => { ready: Promise<void>; finished: Promise<void> };
      };
      // A hidden document aborts the transition; let Next navigate plainly.
      if (!doc.startViewTransition || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      e.stopPropagation();
      const href = url.pathname + url.search + url.hash;
      const vt = doc.startViewTransition(
        () =>
          new Promise<void>((done) => {
            resolve.current = done;
            window.setTimeout(done, SAFETY_MS);
            startTransition(() => router.push(href));
          }),
      );
      // An aborted transition (tab hidden, another navigation) must not surface as an error.
      vt.ready.catch(() => {});
      vt.finished.catch(() => {});
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
