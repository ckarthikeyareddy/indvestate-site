// Ported from design-system/components/navbar/Navbar.jsx. Not restyled.
// Additions (design/new-components.md §2): `compact` layout; links may carry an
// href so the site can use real anchors instead of onNavigate buttons.
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Wordmark } from "./Wordmark";
import { Button } from "./Button";

export type NavLink = string | { label: string; href: string };

/**
 * Top bar: wordmark (+ optional StatusPill lockup), text links, one primary CTA. Solid void, hairline bottom. No blur.
 */
export interface NavbarProps {
  links?: NavLink[];
  current?: string;
  onNavigate?: (link: string) => void;
  /** StatusPill node beside the wordmark, e.g. LIVE DROP. */
  status?: ReactNode;
  /** Primary CTA label; pass null to hide. */
  cta?: string | null;
  ctaHref?: string;
  onCta?: () => void;
  wordmarkSize?: number;
  /** Home link target when onNavigate is not supplied. */
  homeHref?: string;
  /** ≤ 1000px layout: 64px bar (wordmark 20px, primary md) over a 36px strip with the StatusPill. Links fold into the footer. */
  compact?: boolean;
  /** Extra content inside the compact strip (e.g. the services list). */
  strip?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Navbar({
  links = ["Drops", "Inspection", "NRI desk", "Insights"],
  current,
  onNavigate,
  status = null,
  cta = "Join the inside list",
  ctaHref,
  onCta,
  wordmarkSize = 20,
  homeHref = "/",
  compact = false,
  strip,
  className = "",
  style,
}: NavbarProps) {
  const home = onNavigate ? (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate("home");
      }}
      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 16 }}
    >
      <Wordmark size={wordmarkSize} />
      {!compact && status}
    </a>
  ) : (
    <Link href={homeHref} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 16 }}>
      <Wordmark size={wordmarkSize} />
      {!compact && status}
    </Link>
  );

  const ctaNode = cta ? (
    <Button size={compact ? "md" : "sm"} href={ctaHref} onClick={onCta}>
      {cta}
    </Button>
  ) : null;

  if (compact) {
    return (
      <nav className={["iv-nav", "iv-nav--compact", className].filter(Boolean).join(" ")} style={style}>
        <div className="iv-nav__bar">
          {home}
          {ctaNode}
        </div>
        <div className="iv-nav__strip">
          {status}
          {strip}
        </div>
      </nav>
    );
  }

  return (
    <nav className={["iv-nav", className].filter(Boolean).join(" ")} style={style}>
      {home}
      <div className="iv-nav__links">
        {links.map((l) =>
          typeof l === "string" ? (
            <button
              key={l}
              className="iv-nav__link"
              aria-current={current === l ? "page" : undefined}
              onClick={() => onNavigate && onNavigate(l)}
            >
              {l}
            </button>
          ) : (
            <Link
              key={l.label}
              href={l.href}
              className="iv-nav__link"
              aria-current={current === l.label ? "page" : undefined}
            >
              {l.label}
            </Link>
          ),
        )}
      </div>
      {ctaNode}
    </nav>
  );
}
