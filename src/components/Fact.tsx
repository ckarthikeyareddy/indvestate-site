// A fact from src/content. Unconfirmed values render as a visible chip in dev;
// scripts/check-confirm.mjs stops them reaching a production build.
import type { ReactNode } from "react";
import { CONFIRM, isConfirm } from "@/content/confirm";

export function ConfirmChip({ note }: { note?: string }) {
  return (
    <span className="iv-pill iv-pill--risk" title={note} data-confirm="">
      {CONFIRM}
    </span>
  );
}

export function Fact({ value, children }: { value: unknown; children?: ReactNode }) {
  if (isConfirm(value)) return <ConfirmChip />;
  return <>{children ?? String(value)}</>;
}
