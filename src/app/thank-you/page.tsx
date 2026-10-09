// /thank-you?topic=… · end card after every form (CONTENT §10). The topic is
// read on the client inside Suspense so the shell stays static.
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { thankYouPage } from "@/content/pages";
import { site } from "@/content/site";
import { ThankYouCard } from "./ThankYouCard";

export const metadata: Metadata = { title: thankYouPage.title, description: site.endCard.headline, robots: { index: false, follow: false } };

export default function ThankYouPage() {
  return (
    <PageShell>
      <section className="sec page__head">
        <div className="wrap">
          <Suspense
            fallback={
              <div className="end">
                <span className="iv-label signal">{thankYouPage.eyebrow}</span>
                <h1 className="iv-h1">{site.endCard.headline}</h1>
                <p className="iv-body-lg muted">{site.endCard.body}</p>
              </div>
            }
          >
            <ThankYouCard />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
