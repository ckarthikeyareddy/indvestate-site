"use client";
// 06 Services · BRIEF §6 + Phase 1.5, panel fixed in Phase 3.5. 5-column ruled
// grid; hovering a cell (tap on touch, focus on keyboard) opens a detail panel
// directly under the grid: one-line summary, scope list, status pill, one
// Button secondary. Coming-soon services show line and pill only.
// The panel exists only while a service is open: "Sell with us" is open on
// load, moving the pointer to another cell swaps the content, leaving the grid
// keeps the last panel (so the page never jumps and an empty panel is never
// rendered), Escape collapses it. Content staggers in with the system reveal
// (transform + opacity) keyed on the service, never height.
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Button, Icon, ServiceCell, ServiceGrid } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { site } from "@/content/site";
import { services, sellWithUs, type ServiceCellContent } from "@/content/services";
import { ServicePill } from "./ServicePill";
import { RevealScope } from "./Reveal";

const i = (n: number) => ({ "--i": n } as CSSProperties);
/** Hover intent: a sweep across the grid does not restart the panel reveal on every cell. */
const HOVER_INTENT_MS = 80;

function PanelBody({ s }: { s: ServiceCellContent }) {
  const comingSoon = s.status === "coming-soon";
  return (
    <>
      <div className="sp__head">
        <span className="iv-h3 sp__in" style={i(0)}>
          {s.name}
        </span>
        <span className="iv-body-lg muted sp__in" style={i(1)}>
          {s.line}
        </span>
        <div className="sp__foot sp__in" style={i(2)}>
          <ServicePill s={s} highlight />
          {!comingSoon && s.panel?.cta && (
            <Button variant="secondary" href={s.panel.cta.href}>
              {s.panel.cta.label}
            </Button>
          )}
        </div>
      </div>
      {!comingSoon && s.panel?.scope === "tiers" && (
        <ul className="sp__scope">
          {sellWithUs.tiers.map((t, k) => (
            <li key={t.name} className="sp__in" style={i(1 + k)}>
              <span className="iv-body">
                {t.name}
                {t.onSale ? ` · ${t.onSale}` : ""}
              </span>
              <span className="iv-data">
                <Fact value={t.price} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {!comingSoon && Array.isArray(s.panel?.scope) && (
        <ul className="sp__scope">
          {s.panel.scope.map((item, k) => (
            <li key={item} className="sp__in" style={i(1 + k)}>
              <span className="iv-body">{item}</span>
              <span className="iv-data signal" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ServicesSection() {
  const defaultKey = services.find((s) => s.highlight)?.key ?? null;
  const [active, setActive] = useState<string | null>(defaultKey);
  const panelId = useId();
  const intent = useRef<number | null>(null);
  const clearIntent = () => {
    if (intent.current) window.clearTimeout(intent.current);
    intent.current = null;
  };
  useEffect(() => clearIntent, []);

  const activate = (key: string, source: "hover" | "tap" | "focus") => {
    clearIntent();
    if (source === "hover") intent.current = window.setTimeout(() => setActive(key), HOVER_INTENT_MS);
    else setActive(key);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      clearIntent();
      setActive(null);
    }
  };

  const current = services.find((s) => s.key === active) ?? null;

  return (
    <section id="services" className="sec">
      <RevealScope>
        <div className="wrap stack g-40">
          <h2 className="iv-h2" data-split="">
            {site.services.title}
          </h2>
          <div className="services" data-reveal="" onKeyDown={onKeyDown}>
            <ServiceGrid role="tablist" aria-label={site.services.title}>
              {services.map((s) => (
                <ServiceCell
                  key={s.key}
                  id={`svc-${s.key}`}
                  panelId={panelId}
                  icon={<Icon name={s.icon} />}
                  title={s.name}
                  href={s.href}
                  body={s.body}
                  cta={s.cta}
                  pill={<ServicePill s={s} highlight />}
                  active={active === s.key}
                  onActivate={(source) => activate(s.key, source)}
                />
              ))}
            </ServiceGrid>
            {current && (
              <div className="sp" id={panelId} role="region" aria-live="polite" aria-labelledby={`svc-${current.key}`}>
                <div className="sp__inner" key={current.key}>
                  <PanelBody s={current} />
                </div>
              </div>
            )}
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
