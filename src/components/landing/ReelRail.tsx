"use client";
// The reel rail (Phase 3.6 §9–11). Cards are 9:16 hairline frames on carbon
// in a scroll-snap rail. Only the centred card plays (muted unless the rail's
// one mute control is on); the others show their posters. A card advances
// the rail when its clip ends or after 8 s, with a signal progress rule along
// its top edge. Hover (fine pointer) and tap hold the card; tap again resumes.
// Drag to scroll on touch, square secondary arrows on desktop, keyboard
// left/right, paused off-screen and in a hidden tab. Reduced motion: no
// auto-advance, poster with a play control. The whole card opens Instagram
// in a new tab; placeholders are plus-grid frames with a coming-soon pill.
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent as RPointerEvent } from "react";
import { Icon, StatusPill } from "@/components/ds";
import { isConfirm } from "@/content/confirm";
import { reelsCopy, type Reel } from "@/content/reels";

type Card = { kind: "reel"; reel: Reel } | { kind: "placeholder"; area: string };

export function ReelRail({ reels, placeholders }: { reels: Reel[]; placeholders: string[] }) {
  const cards = useMemo<Card[]>(
    () => [...reels.map((reel) => ({ kind: "reel", reel }) as Card), ...placeholders.map((area) => ({ kind: "placeholder", area }) as Card)],
    [reels, placeholders],
  );
  const rail = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [held, setHeld] = useState(false); // tap / hover hold
  const [onScreen, setOnScreen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [userPlay, setUserPlay] = useState(false); // reduced motion: explicit play
  const pointer = useRef<string>("mouse");
  const advanceTimer = useRef<number>(0);

  const playing = onScreen && visible && !held && (!reduce || userPlay);

  // Reduced motion flag (client only).
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Centre tracking: the card whose centre is nearest the rail's centre.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      items.current.forEach((it, i) => {
        if (!it) return;
        const c = it.offsetLeft + it.offsetWidth / 2;
        const d = Math.abs(c - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive((a) => (a === best ? a : best));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [cards.length]);

  // Off-screen and hidden-tab pause.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setOnScreen(entries.some((e) => e.isIntersecting)), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = rail.current;
      const it = items.current[i];
      if (!el || !it) return;
      const left = it.offsetLeft + it.offsetWidth / 2 - el.clientWidth / 2;
      el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      const n = cards.length;
      scrollToIndex((active + dir + n) % n);
    },
    [active, cards.length, scrollToIndex],
  );

  // Playback: only the active card plays; the others reset to their poster.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i !== active) {
        if (!v.paused) v.pause();
        v.muted = true;
        if (v.currentTime > 0) {
          v.currentTime = 0;
          v.load();
        }
        const bar = bars.current[i];
        if (bar) bar.style.transform = "scaleX(0)";
        return;
      }
      v.muted = muted;
      if (playing) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, muted, playing]);

  // Progress rule and the 8 s / ended advance on the active card.
  useEffect(() => {
    const v = videos.current[active];
    const bar = bars.current[active];
    window.clearTimeout(advanceTimer.current);
    if (!v || !bar) return;
    let raf = 0;
    const limit = reelsCopy.advanceAfterS;
    const tick = () => {
      const span = Math.min(v.duration || limit, limit);
      const p = Math.min(v.currentTime / span, 1);
      bar.style.transform = `scaleX(${p.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };
    const onEnded = () => {
      if (!reduce) advance(1);
    };
    const onPlay = () => {
      if (!reduce && !advanceTimer.current) {
        const left = Math.max(0, limit - v.currentTime) * 1000;
        advanceTimer.current = window.setTimeout(() => {
          advanceTimer.current = 0;
          advance(1);
        }, left);
      }
    };
    const onPause = () => {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = 0;
    };
    v.addEventListener("ended", onEnded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    raf = requestAnimationFrame(tick);
    if (!v.paused) onPlay();
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = 0;
    };
  }, [active, advance, reduce]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    }
  };

  // Tap toggles the hold (touch); a mouse click falls through to the card link.
  const onPointerDown = (e: RPointerEvent) => {
    pointer.current = e.pointerType;
  };
  const onCardClick = (e: MouseEvent, i: number) => {
    if (i !== active) {
      e.preventDefault();
      scrollToIndex(i);
      return;
    }
    if (reduce) {
      e.preventDefault();
      setUserPlay((p) => !p);
      return;
    }
    if (pointer.current === "touch" || pointer.current === "pen") {
      e.preventDefault();
      setHeld((h) => !h);
    }
  };

  const activeReel = cards[active]?.kind === "reel";

  return (
    <div className="rail-wrap">
      <div className="wrap rail-bar">
        <button type="button" className="rail-ctl iv-label" onClick={() => setMuted((m) => !m)} aria-pressed={!muted} disabled={!activeReel}>
          <Icon name={muted ? "volume-x" : "volume-2"} size={16} />
          {muted ? reelsCopy.unmute : reelsCopy.mute}
        </button>
        <div className="rail-arrows">
          <button type="button" className="iv-btn iv-btn--secondary rail-arrow" onClick={() => advance(-1)} aria-label={reelsCopy.prev}>
            <Icon name="arrow-left" size={16} />
          </button>
          <button type="button" className="iv-btn iv-btn--secondary rail-arrow" onClick={() => advance(1)} aria-label={reelsCopy.next}>
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
      <div
        className="rail"
        ref={rail}
        role="list"
        aria-label={reelsCopy.railLabel}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHeld(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setHeld(false);
        }}
      >
        {cards.map((card, i) => {
          if (card.kind === "placeholder") {
            return (
              <article
                key={`next-${card.area}`}
                className="reel reel--next iv-plus-grid"
                role="listitem"
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-active={i === active ? "true" : "false"}
              >
                <div className="reel__plate">
                  <span className="iv-label signal">
                    {reelsCopy.nextReel} · {card.area.toUpperCase()}
                  </span>
                  <StatusPill kind="coming-soon" label={reelsCopy.comingSoon} />
                </div>
              </article>
            );
          }
          const r = card.reel;
          const href = isConfirm(r.instagramUrl) ? undefined : r.instagramUrl;
          const isActive = i === active;
          return (
            <article
              key={r.id}
              className="reel"
              role="listitem"
              ref={(el) => {
                items.current[i] = el;
              }}
              data-active={isActive ? "true" : "false"}
              onPointerDown={onPointerDown}
            >
              <span className="reel__progress" aria-hidden="true">
                <span
                  className="reel__bar"
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                />
              </span>
              <a
                className="reel__link"
                href={href ?? "#"}
                target={href ? "_blank" : undefined}
                rel={href ? "noreferrer noopener" : undefined}
                aria-label={`${r.kicker} · ${reelsCopy.watch}`}
                onClick={(e) => {
                  if (!href) e.preventDefault();
                  onCardClick(e, i);
                }}
              >
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  className="reel__video"
                  src={r.videoUrl}
                  poster={r.posterUrl || undefined}
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  aria-hidden="true"
                />
                {reduce && isActive && (
                  <span className="reel__play iv-label" aria-hidden="true">
                    {userPlay ? reelsCopy.pause : reelsCopy.play}
                  </span>
                )}
                <span className="reel__plate">
                  <span className="iv-label signal">{r.kicker}</span>
                  <span className="iv-data">{r.stat}</span>
                  <span className="iv-btn iv-btn--ghost iv-btn--sm reel__watch">{reelsCopy.watch} ↗</span>
                </span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
