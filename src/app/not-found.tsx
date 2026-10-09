// 404 in the system voice: "This page did not pass." + links (BRIEF routes).
import type { Metadata } from "next";
import { Button } from "@/components/ds";
import { PageShell } from "@/components/PageShell";
import { notFoundPage } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = { title: site.notFound.title, robots: { index: false } };

export default function NotFound() {
  return (
    <PageShell>
      <section className="sec page__head">
        <div className="wrap">
          <div className="end">
            <span className="iv-label signal">{notFoundPage.eyebrow}</span>
            <h1 className="iv-h1">{site.notFound.title}</h1>
            <p className="iv-body-lg muted">{notFoundPage.body}</p>
            <div className="end__actions">
              {site.notFound.links.map((l, i) => (
                <Button key={l.href} variant={i === 0 ? "secondary" : "ghost"} href={l.href}>
                  {l.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
