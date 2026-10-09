// /contact · CONTENT §11. Phone, WhatsApp, the four aliases, desk hours in
// three zones (computed), Instagram, LinkedIn, and the office area on a
// MapFrame with the address pending.
import type { Metadata } from "next";
import { DataRow, MapFrame } from "@/components/ds";
import { DeskHours } from "@/components/DeskHours";
import { ConfirmChip, Fact } from "@/components/Fact";
import { PolicyBlock, PolicyShell, sectionId } from "@/components/policy/PolicyShell";
import { confirmed } from "@/content/confirm";
import { policyPages, whatsappFloat } from "@/content/pages";
import { site, whatsappHref } from "@/content/site";

const c = policyPages.contact;
export const metadata: Metadata = { title: c.title, description: c.description };

const HEADINGS = [c.sections.reach, c.sections.hours, c.sections.handles, c.sections.office];
const TOC = HEADINGS.map((h, i) => ({ id: sectionId(i, h), label: h }));

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
    <PolicyShell title={c.title} lead={c.lead} toc={TOC}>
      <PolicyBlock n={1} heading={c.sections.reach} id={TOC[0].id}>
        <div>
          <DataRow
            label={r.phone}
            value={
              <a className="iv-data" href={whatsappHref(whatsappFloat.fallback)} target="_blank" rel="noreferrer">
                {site.phone.display}
              </a>
            }
            data-checkin=""
          />
          <DataRow label={r.email} value={<Mail address={site.email.primary} />} data-checkin="" />
          <DataRow label={r.reels} value={<Mail address={site.email.reels} />} data-checkin="" />
          <DataRow label={r.inspect} value={<Mail address={site.email.inspect} />} data-checkin="" />
          <DataRow label={r.nri} value={<Mail address={site.email.nri} />} last data-checkin="" />
        </div>
        <p className="iv-caption">{c.aliasesNote}</p>
      </PolicyBlock>

      <PolicyBlock n={2} heading={c.sections.hours} id={TOC[1].id}>
        <p className="iv-body muted">
          {c.hoursLine} <Fact value={site.deskHours.confirmed}>{""}</Fact>
        </p>
        <DeskHours />
      </PolicyBlock>

      <PolicyBlock n={3} heading={c.sections.handles} id={TOC[2].id}>
        <div>
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
            last
          />
        </div>
      </PolicyBlock>

      <PolicyBlock n={4} heading={c.sections.office} id={TOC[3].id}>
        <div>
          <DataRow label={r.address} value={<Fact value={site.legalEntity.address} />} last />
        </div>
        <div data-frame="">
          <MapFrame caption={c.map.caption} coordinate={site.hero.coordinate} />
        </div>
        <p className="iv-caption">
          {c.map.note} <ConfirmChip note="Office address" />
        </p>
      </PolicyBlock>
    </PolicyShell>
  );
}
