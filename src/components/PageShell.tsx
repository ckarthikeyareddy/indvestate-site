// Shared chrome for every route off the landing: the sticky nav, a page header
// (eyebrow · pill · h1 · one line) and the footer. Layout classes come from
// landing.css and pages.css; copy from src/content.
import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "@/components/landing";
import { RevealScope } from "@/components/landing/Reveal";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main" className="page">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export interface PageHeaderProps {
  eyebrow?: string;
  pill?: ReactNode;
  title: string;
  line?: ReactNode;
  /** Extra nodes under the line (links, CTAs). */
  children?: ReactNode;
  narrow?: boolean;
}

export function PageHeader({ eyebrow, pill, title, line, children, narrow = false }: PageHeaderProps) {
  return (
    <header className={["sec page__head", narrow ? "page__head--narrow" : ""].filter(Boolean).join(" ")}>
      <RevealScope>
        <div className="wrap stack g-16">
          {(eyebrow || pill) && (
            <div className="row g-12" data-reveal="">
              {eyebrow && <span className="iv-label signal">{eyebrow}</span>}
              {pill}
            </div>
          )}
          <h1 className="iv-h1" data-split="">
            {title}
          </h1>
          {line && (
            <p className="iv-body-lg muted page__line" data-reveal="">
              {line}
            </p>
          )}
          {children && <div className="stack g-16" data-reveal="">{children}</div>}
        </div>
      </RevealScope>
    </header>
  );
}

/** A titled block inside a page: .iv-label heading on a hairline, then content. */
export function Block({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section className="block" id={id} aria-label={title}>
      <h2 className="iv-label muted block__title">{title}</h2>
      {children}
    </section>
  );
}
