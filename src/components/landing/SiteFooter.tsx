// 12 Footer · BRIEF §12. Links incl. the six policy pages, legal line, owner
// Disclaimer 15px, handles, LinkedIn, phone, email, Monogram.
import Link from "next/link";
import { Disclaimer, Monogram, Wordmark } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { site, whatsappHref } from "@/content/site";
import { confirmed } from "@/content/confirm";
import { RevealScope } from "./Reveal";

function Handle({ label, url, note }: { label: string; url: string | undefined; note: string }) {
  if (url)
    return (
      <a className="iv-data" href={url} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  return (
    <span className="iv-data muted" style={{ display: "inline-flex", alignItems: "center", gap: 8, lineHeight: "44px" }}>
      {label} <ConfirmChip note={note} />
    </span>
  );
}

export function SiteFooter() {
  const f = site.footer;
  return (
    <footer className="footer">
      <RevealScope>
      <div className="wrap stack g-48">
        <div className="foot" data-reveal="">
          <div className="stack g-16">
            <Wordmark size={28} lockup="tagline" tagline={site.tagline} />
            <span className="iv-label signal">{site.trustLine}</span>
          </div>
          {f.columns.map((col) => (
            <div className="stack g-12" key={col.label}>
              <span className="iv-label muted">{col.label}</span>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="legal" data-reveal="">
          <span className="iv-data muted">
            {site.legalEntity.name} · CIN {site.legalEntity.registrationNumber} · {site.legalEntity.address}
          </span>
          <span className="iv-data muted">
            {site.agentRera.label}: {site.agentRera.value} · {site.projectReraLine}
          </span>
          <Disclaimer style={{ paddingTop: 20 }} />
        </div>
        <div className="handles" data-reveal="">
          <div className="row g-24">
            <Handle label={site.handles.instagram.handle} url={site.handles.instagram.url} note="" />
            <Handle label={`LinkedIn · ${site.handles.linkedin.label}`} url={confirmed(site.handles.linkedin.url)} note="LinkedIn company page URL" />
            <a className="iv-data" href={whatsappHref("Hi, I found indvestate.com.")} target="_blank" rel="noreferrer">
              {site.phone.display}
            </a>
            <a className="iv-data" href={`mailto:${site.email.primary}`}>
              {site.email.primary}
            </a>
            <span className="iv-data muted">{f.copyright}</span>
          </div>
          <span className="foot__mono" data-draw="">
            <Monogram size={48} />
            <svg className="foot__mono-rect" viewBox="0 0 48 48" aria-hidden="true">
              <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="var(--hairline-strong)" strokeWidth="1" />
            </svg>
          </span>
        </div>
        <span className="iv-wordmark footer__giant" aria-hidden="true" data-wipe="">
          {site.name}
        </span>
      </div>
      </RevealScope>
    </footer>
  );
}
