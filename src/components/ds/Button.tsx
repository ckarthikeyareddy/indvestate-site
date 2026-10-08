// Ported from design-system/components/button/Button.jsx. Not restyled.
// Internal hrefs render through next/link; external ones stay plain anchors.
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Square button. primary = saffron (one per screen), secondary = hairline outline, ghost = text.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** JetBrains Mono uppercase label (11px / 0.18em). */
  mono?: boolean;
  block?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  /** Renders an <a>. */
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
  /** Anchor-only: used when href is set. */
  target?: string;
  rel?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  mono = false,
  block = false,
  icon = null,
  iconRight = null,
  href,
  disabled = false,
  children,
  className = "",
  target,
  rel,
  ...rest
}: ButtonProps) {
  const cls = [
    "iv-btn",
    "iv-btn--" + variant,
    size !== "md" ? "iv-btn--" + size : "",
    mono ? "iv-btn--mono" : "",
    block ? "iv-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {icon && <span className="iv-btn__icon">{icon}</span>}
      {children}
      {iconRight && <span className="iv-btn__icon">{iconRight}</span>}
    </>
  );
  if (href) {
    const anchorRest = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>;
    if (href.startsWith("/") && !disabled) {
      return (
        <Link href={href} className={cls} target={target} rel={rel} {...anchorRest}>
          {inner}
        </Link>
      );
    }
    return (
      <a
        className={cls}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        target={target}
        rel={rel}
        {...anchorRest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}
