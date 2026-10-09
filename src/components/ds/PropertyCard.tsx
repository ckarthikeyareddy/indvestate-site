// Ported from design-system/components/property-card/PropertyCard.jsx. Not restyled.
// Additions (design/new-components.md §1): `secondaryCta` splits the footer into
// a price row and a CTA row (Button secondary + Button ghost "… ↗");
// `dataLayout="list"` renders DataRows label | value on hairlines.
import type { CSSProperties, ReactNode } from "react";
import { StatusPill, type StatusPillKind, type StatusPillProps } from "./StatusPill";
import { DataRow, type DataRowTone } from "./DataRow";
import { Button } from "./Button";
import { Disclaimer } from "./Disclaimer";

export type PropertyStatus = StatusPillKind | StatusPillProps;

export interface PropertyDatum {
  label: string;
  value: ReactNode;
  tone?: DataRowTone;
}

/**
 * A property release: status strip → kicker + headline → media → mono data → price + WhatsApp CTA → disclaimer.
 */
export interface PropertyCardProps {
  /** StatusPill kinds or props — only documents on file. */
  statuses?: PropertyStatus[];
  /** e.g. "LIVE 01 · MEERPET" */
  kicker?: string;
  title: string;
  /** Locality line in mono. */
  location?: string;
  /** Image URL or node. Placeholder frame if omitted. */
  media?: string | ReactNode;
  mediaLabel?: string;
  /** Up to 3 per row in stack layout; any number in list layout. */
  data?: PropertyDatum[];
  price: string;
  priceNote?: ReactNode;
  cta?: string;
  ctaHref?: string;
  onCta?: () => void;
  variant?: "owner" | "builder" | "completed";
  reraNumber?: string;
  project?: string;
  compactDisclaimer?: boolean;
  /** Two-CTA variant: Button secondary (e.g. "Book a site visit") before the ghost WhatsApp CTA. */
  secondaryCta?: { label: string; href: string };
  /** stack = 3-column label-over-value (default); list = label | value rows. */
  dataLayout?: "stack" | "list";
  style?: CSSProperties;
}

export function PropertyCard({
  statuses = [],
  kicker,
  title,
  location,
  media,
  mediaLabel = "Media · owner-supplied photo", // DS default used " — "; the brand bans dash separators
  data = [],
  price,
  priceNote,
  cta = "WhatsApp the desk",
  ctaHref = "#",
  onCta,
  variant = "owner",
  reraNumber,
  project,
  compactDisclaimer = true,
  secondaryCta,
  dataLayout = "stack",
  style,
}: PropertyCardProps) {
  const arrow = <span aria-hidden="true">↗</span>;
  return (
    <article
      className="iv-card"
      style={{
        background: "var(--carbon)",
        border: "1px solid var(--hairline)",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        ...style,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "16px 20px", borderBottom: "1px solid var(--hairline)" }}>
        {statuses.map((s, i) => (
          <StatusPill key={i} {...(typeof s === "string" ? { kind: s } : s)} />
        ))}
      </div>
      <div style={{ padding: "20px 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {kicker && (
          <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
            {kicker}
          </span>
        )}
        <h3 className="iv-h3" style={{ margin: 0, color: "var(--ink)" }}>
          {title}
        </h3>
        {location && (
          <span className="iv-data" style={{ color: "var(--ink-muted)", overflowWrap: "anywhere" }}>
            {location}
          </span>
        )}
      </div>
      <div
        className="iv-plus-grid iv-card__media"
        data-frame=""
        style={{
          aspectRatio: "16 / 10",
          background: "var(--graphite)",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {media ? (
          typeof media === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element -- owner-supplied stills; sized by the frame
            <img src={media} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            media
          )
        ) : (
          <span className="iv-label iv-card__cap" style={{ position: "absolute", left: 16, bottom: 14, color: "var(--ink-muted)" }}>
            {mediaLabel}
          </span>
        )}
      </div>
      {data.length > 0 &&
        (dataLayout === "list" ? (
          <div style={{ padding: "4px 20px 0" }}>
            {data.map((d, i) => (
              <DataRow key={i} label={d.label} value={d.value} tone={d.tone} last={i === data.length - 1} data-checkin="" />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(" + Math.min(data.length, 3) + ", minmax(0,1fr))",
              columnGap: 16,
              padding: "4px 20px 0",
            }}
          >
            {data.map((d, i) => (
              <DataRow key={i} stack label={d.label} value={d.value} tone={d.tone} />
            ))}
          </div>
        ))}
      {secondaryCta ? (
        <>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", padding: "16px 20px 20px" }}>
            <span className="iv-price" style={{ color: "var(--ink)" }}>
              {price}
            </span>
            {priceNote && (
              <span className="iv-data" style={{ color: "var(--ink-muted)" }}>
                {priceNote}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "0 20px 20px" }}>
            <Button variant="secondary" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
            <Button variant="ghost" href={ctaHref} onClick={onCta} iconRight={arrow}>
              {cta}
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="iv-price" style={{ color: "var(--ink)" }}>
              {price}
            </span>
            {priceNote && (
              <span className="iv-data" style={{ color: "var(--ink-muted)" }}>
                {priceNote}
              </span>
            )}
          </div>
          <Button variant="secondary" href={ctaHref} onClick={onCta} iconRight={arrow}>
            {cta}
          </Button>
        </div>
      )}
      <div style={{ padding: "0 20px 20px" }}>
        <Disclaimer variant={variant} reraNumber={reraNumber} project={project} compact={compactDisclaimer} />
      </div>
    </article>
  );
}
