"use client";
// 06 Services · BRIEF §6 + Phase 1.5. 5-column ruled grid; hovering a cell
// (tap on touch, focus on keyboard) opens a detail panel directly under the
// grid: one-line summary, scope list, status pill, one Button secondary.
// Coming-soon services show line and pill only. Revealed with transform
// (8px → 0) and opacity over 0.24 s --ease-out, never height; the panel keeps
// its space so the page does not jump. Pointer leaving grid + panel closes it
// after 200 ms; Escape closes it. "Sell with us" is highlighted and open on
// load until the user hovers another cell.
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Button, Icon, ServiceCell, ServiceGrid } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { site } from "@/content/site";
import { services, sellWithUs, type ServiceCellContent } from "@/content/services";
import { ServicePill } from "./ServicePill";
import { RevealScope } from "./Reveal";


const CLOSE_DELAY = 200;

function PanelBody({ s }: { s: ServiceCellContent }) {
  const comingSoon = s.status === "coming-soon";
  return (
    <>
      <div className="sp__head">
        <span className="iv-h3">{s.name}</span>
        <span className="iv-body-lg" style={{ color: "var(--ink-muted)" }}>
          {s.line}
        </span>
        <div className="sp__foot">
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
          {sellWithUs.tiers.map((t) => (
            <li key={t.name}>
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
          {s.panel.scope.map((item) => (
            <li key={item}>
              <span className="iv-body">{item}</span>
              <span className="iv-data" style={{ color: "var(--signal-ink)" }} aria-hidden="true">
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
  const [shown, setShown] = useState<string | null>(defaultKey);
  const timer = useRef<number | null>(null);
  const panelId = useId();

  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const open = (key: string) => {
    clear();
    setActive(key);
    setShown(key);
  };
  const close = () => {
    clear();
    setActive(null);
  };
  const scheduleClose = () => {
    clear();
    timer.current = window.setTimeout(() => setActive(null), CLOSE_DELAY);
  };
  useEffect(() => clear, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") close();
  };

  const current = services.find((s) => s.key === shown) ?? null;

  return (
    <section id="services" className="sec">
      <RevealScope>
      <div className="wrap stack g-40">
        <h2 className="iv-h2" data-split="">{site.services.title}</h2>
        <div
          className="services"
          data-reveal=""
          onPointerEnter={clear}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") scheduleClose();
          }}
          onKeyDown={onKeyDown}
        >
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
                onActivate={() => open(s.key)}
              />
            ))}
          </ServiceGrid>
          <div
            className="sp"
            id={panelId}
            role="region"
            aria-live="polite"
            aria-labelledby={current ? `svc-${current.key}` : undefined}
            data-open={active ? "true" : "false"}
          >
            <div className="sp__inner" aria-hidden={!active}>
              {current && <PanelBody s={current} />}
            </div>
          </div>
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
