// Ported from design-system/components/disclaimer/Disclaimer.jsx. Not restyled.
// Verbatim text. The builder and completed wordings are drafts and need legal
// review. "completed" (Phase 3.6, CONTENT §2 B): a completed villa with OC sold
// by the developer.
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export const OWNER_DISCLAIMER =
  "Owner-listed resale property with occupancy certificate. INDVESTATE is engaged by the owner to market this property and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the registered owner after independent verification. Price and availability subject to owner confirmation.";

export function builderDisclaimer(rera = "TG RERA No. —", project = "this project"): string {
  return (
    "Builder-direct release. " +
    project +
    " is registered with Telangana RERA under " +
    rera +
    " (rera.telangana.gov.in). INDVESTATE is engaged by the developer to market this project and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the developer’s designated project account after independent verification. Price and availability subject to developer confirmation."
  );
}

export const COMPLETED_DISCLAIMER =
  "Completed villa with occupancy certificate, sold by the developer. INDVESTATE is engaged to market this property and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the seller after independent verification. Price and availability subject to seller confirmation.";

/** Mandatory closing block on every property surface. 15px, verbatim text. */
export interface DisclaimerProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** owner = resale with OC (verbatim). builder = cites the project's TG RERA number. completed = villa with OC sold by the developer. */
  variant?: "owner" | "builder" | "completed";
  /** e.g. "TG RERA No. P02400004521" — required for builder. */
  reraNumber?: string;
  project?: string;
  compact?: boolean;
  /** Override text (legal-approved only). */
  children?: ReactNode;
  style?: CSSProperties;
}

export function Disclaimer({
  variant = "owner",
  reraNumber,
  project,
  children,
  compact = false,
  style,
  ...rest
}: DisclaimerProps) {
  const text = children || (variant === "builder" ? builderDisclaimer(reraNumber, project) : variant === "completed" ? COMPLETED_DISCLAIMER : OWNER_DISCLAIMER);
  return (
    <aside
      style={{
        borderTop: "1px solid var(--hairline)",
        paddingTop: compact ? 14 : 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          fontWeight: 500,
        }}
      >
        Disclaimer
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          textWrap: "pretty",
        }}
      >
        {text}
      </p>
    </aside>
  );
}
