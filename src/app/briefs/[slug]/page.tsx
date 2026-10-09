// /briefs/[slug] · one real case: paragraphs, the check we run, the source
// line with URL and date (mandatory), previous / next.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ds";
import { PageHeader, PageShell } from "@/components/PageShell";
import { briefBySlug, briefs } from "@/content/briefs";
import { briefsPage as copy } from "@/content/pages";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return briefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = briefBySlug(slug);
  if (!b) return {};
  return { title: `${b.headline} · ${b.kicker}`, description: b.paragraphs[0] };
}

export default async function BriefPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = briefBySlug(slug);
  if (!b) notFound();
  const i = briefs.indexOf(b);
  const prev = briefs[i - 1];
  const next = briefs[i + 1];

  return (
    <PageShell>
      <PageHeader narrow eyebrow={`${b.kicker} · ${b.id}`} title={b.headline} line={`${copy.published} ${b.date}`}>
        <div className="row">
          <Button variant="ghost" href="/briefs">
            ← {copy.all}
          </Button>
        </div>
      </PageHeader>
      <section className="sec">
        <div className="wrap">
          <article className="brief">
            {b.paragraphs.map((para) => (
              <p key={para} className="iv-body-lg">
                {para}
              </p>
            ))}
            <div className="brief__check">
              <span className="iv-label signal">{copy.check}</span>
              <span className="iv-body">{b.check}</span>
            </div>
            <div className="brief__sources">
              <span className="iv-label muted">{copy.source}</span>
              {b.sources.map((s) => (
                <a key={s.url} className="iv-data" href={s.url} target="_blank" rel="noreferrer noopener" data-source="">
                  {s.publication}, {s.date} ↗
                </a>
              ))}
            </div>
            <nav className="brief__nav" aria-label={`${copy.prev} / ${copy.next}`}>
              {prev ? (
                <Link href={`/briefs/${prev.slug}`} className="iv-data">
                  ← {prev.id} · {prev.kicker}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/briefs/${next.slug}`} className="iv-data">
                  {next.id} · {next.kicker} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
