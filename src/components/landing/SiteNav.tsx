"use client";
// 01 Nav · BRIEF §1. Sticky solid void, hairline bottom. Wordmark + neutral
// StatusPill, links, one CTA. Services dropdown: carbon panel, hairline border,
// rows icon · name · one line · StatusPill. Opens from the trigger, closes on
// Escape, arrows move focus, no focus trap (a menu, not a modal). Motion is
// Phase 2; this is the static open/close. On mobile the list sits in the
// compact nav's expandable strip.
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon, Navbar, StatusPill } from "@/components/ds";
import { ServicePill } from "./ServicePill";
import { site } from "@/content/site";
import { services } from "@/content/services";

function ServiceRows({ onPick, role }: { onPick?: () => void; role?: "menuitem" }) {
  return (
    <>
      {services.map((s) => (
        <Link key={s.key} href={s.href} className="nav-dd__row" role={role} onClick={onPick}>
          <span className="nav-dd__icon">
            <Icon name={s.icon} />
          </span>
          <span className="nav-dd__text">
            <span className="nav-dd__name">{s.name}</span>
            <span className="iv-caption">{s.line}</span>
          </span>
          <ServicePill s={s} />
        </Link>
      ))}
    </>
  );
}

function ServicesDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const items = () => Array.from(root.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        requestAnimationFrame(() => items()[0]?.focus());
        return;
      }
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[next]?.focus();
    }
  };

  return (
    <div className="nav-dd" ref={root} onKeyDown={onKey}>
      <button
        ref={trigger}
        type="button"
        className="iv-nav__link nav-dd__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <Icon name="arrow-right" size={14} style={{ transform: open ? "rotate(-90deg)" : "rotate(90deg)" }} />
      </button>
      <div className="nav-dd__panel" role="menu" id={id} aria-label={label} data-open={open ? "true" : "false"} aria-hidden={!open}>
        <ServiceRows role="menuitem" onPick={() => setOpen(false)} />
      </div>
    </div>
  );
}

export function SiteNav() {
  const [stripOpen, setStripOpen] = useState(false);
  const stripId = useId();
  const status = <StatusPill label={site.nav.pill} />;
  const servicesLink = site.nav.links.find((l) => "dropdown" in l && l.dropdown);

  return (
    <div className="nav-sticky">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar
        status={status}
        cta={site.nav.cta.label}
        ctaHref={site.nav.cta.href}
        linksSlot={site.nav.links.map((l) =>
          "dropdown" in l && l.dropdown ? (
            <ServicesDropdown key={l.label} label={l.label} />
          ) : (
            <Link key={l.label} href={l.href} className="iv-nav__link">
              {l.label}
            </Link>
          ),
        )}
      />
      <Navbar
        compact
        status={status}
        cta={site.nav.cta.label}
        ctaHref={site.nav.cta.href}
        strip={
          servicesLink && (
            <button
              type="button"
              className="nav-m__toggle"
              aria-expanded={stripOpen}
              aria-controls={stripId}
              onClick={() => setStripOpen((o) => !o)}
            >
              {servicesLink.label}
              <Icon name="arrow-right" size={14} style={{ transform: stripOpen ? "rotate(-90deg)" : "rotate(90deg)" }} />
            </button>
          )
        }
      />
      <div className="nav-m__list" id={stripId} hidden={!stripOpen}>
        <ServiceRows onPick={() => setStripOpen(false)} />
        {site.nav.links
          .filter((l) => !("dropdown" in l && l.dropdown))
          .map((l) => (
            <Link key={l.label} href={l.href} className="nav-m__link" onClick={() => setStripOpen(false)}>
              {l.label}
            </Link>
          ))}
      </div>
    </div>
  );
}
