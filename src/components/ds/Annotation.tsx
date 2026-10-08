// design/new-components.md §9 · Annotation (mockup only). .iv-label prefixed
// "//": signal for SAMPLE / MOTION SPEC notes, ink-muted for saffron counts and
// NEW COMPONENT labels. Sits outside frames. Never ships on a public page.
import type { ReactNode } from "react";

export interface AnnotationProps {
  tone?: "signal" | "muted";
  children: ReactNode;
}

export function Annotation({ tone = "muted", children }: AnnotationProps) {
  return (
    <span className={["iv-label", "iv-annotation", tone === "signal" ? "iv-annotation--signal" : ""].filter(Boolean).join(" ")}>
      {"// "}
      {children}
    </span>
  );
}
