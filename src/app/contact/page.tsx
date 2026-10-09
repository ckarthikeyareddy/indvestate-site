import type { Metadata } from "next";
import { DataRow } from "@/components/ds";
import { ConfirmChip, Fact } from "@/components/Fact";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { confirmed } from "@/content/confirm";
import { policyPages } from "@/content/pages";
import { site, whatsappHref } from "@/content/site";

const c = policyPages.contact;
export const metadata: Metadata = { title: c.title, description: c.description };

function Mail({ address }: { address: string }) {
  return (
    <a className="iv-data" href={`mailto:${address}`}>
      {address}
    </a>
  );
}

export default function ContactPage() {
  const r = c.rows;
  const linkedin = confirmed(site.handles.linkedin.url);
  const hyd = confirmed(site.handles.instagramHyd.url);
  return (
    <PolicyShell title={c.title} line={c.description}>
      <section aria-label={c.title}>
        <div>
          <DataRow
            label={r.phone}
            value={
              <a className="iv-data" href={whatsappHref("Hi, I found indvestate.com.")} target="_blank" rel="noreferrer">
                {site.phone.display}
              </a>
            }
          />
          <DataRow label={r.email} value={<Mail address={site.email.primary} />} />
          <DataRow label={r.reels} value={<Mail address={site.email.reels} />} />
          <DataRow label={r.inspect} value={<Mail address={site.email.inspect} />} />
          <DataRow label={r.nri} value={<Mail address={site.email.nri} />} />
          <DataRow
            label={r.hours}
            value={
              <>
                {site.deskHours.ist.start}–{site.deskHours.ist.end} {c.hoursSuffix} <Fact value={site.deskHours.confirmed}>{""}</Fact>
              </>
            }
          />
          <DataRow
            label={r.instagram}
            value={
              <>
                <a className="iv-data" href={site.handles.instagram.url} target="_blank" rel="noreferrer">
                  {site.handles.instagram.handle}
                </a>
                {" · "}
                {hyd ? (
                  <a className="iv-data" href={hyd} target="_blank" rel="noreferrer">
                    {site.handles.instagramHyd.handle}
                  </a>
                ) : (
                  <>
                    {site.handles.instagramHyd.handle} <ConfirmChip note="Hyderabad page: confirm the handle exists" />
                  </>
                )}
              </>
            }
          />
          <DataRow
            label={r.linkedin}
            value={
              linkedin ? (
                <a className="iv-data" href={linkedin} target="_blank" rel="noreferrer">
                  {site.handles.linkedin.label}
                </a>
              ) : (
                <ConfirmChip note="LinkedIn company page URL" />
              )
            }
          />
          <DataRow label={r.address} value={<Fact value={site.legalEntity.address} />} last />
        </div>
        <p className="iv-caption">{c.aliasesNote}</p>
      </section>
    </PolicyShell>
  );
}
