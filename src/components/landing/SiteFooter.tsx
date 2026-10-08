// 12 Footer · BRIEF §12. Links incl. the six policy pages, legal line, owner
// Disclaimer 15px, handles, LinkedIn, phone, email, Monogram.
import Link from "next/link";
import { Disclaimer, Monogram, Wordmark } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { site, whatsappHref } from "@/content/site";
import { confirmed } from "@/content/confirm";

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
      <div className="wrap stack g-48">
        <div className="foot">
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
        <div className="legal">
          <span className="iv-data muted">
            {site.agentRera.label}: {site.agentRera.value} · {site.projectReraLine}
          </span>
          <Disclaimer style={{ paddingTop: 20 }} />
        </div>
        <div className="handles">
          <div className="row g-24">
            <Handle label={site.handles.instagram.handle} url={site.handles.instagram.url} note="" />
            <Handle label={site.handles.instagramHyd.handle} url={confirmed(site.handles.instagramHyd.url)} note="Hyderabad page: confirm the handle exists" />
            <Handle label="LinkedIn" url={confirmed(site.handles.linkedin.url)} note="LinkedIn company page URL" />
            <a className="iv-data" href={whatsappHref("Hi, I found indvestate.com.")} target="_blank" rel="noreferrer">
              {site.phone.display}
            </a>
            <a className="iv-data" href={`mailto:${site.email.primary}`}>
              {site.email.primary}
            </a>
            <span className="iv-data muted">{f.copyright}</span>
          </div>
          <Monogram size={48} />
        </div>
      </div>
    </footer>
  );
}
