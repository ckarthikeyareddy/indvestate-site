// One pill per service, shared by the nav dropdown, the Services grid and the
// detail panel. Drops carries the live count (the section's one saffron
// element); the highlighted cell reads "Live · from <price>".
import { StatusPill } from "@/components/ds";
import { CONFIRM, isConfirm } from "@/content/confirm";
import { highlightPillLabel, statusPillLabel, type ServiceCellContent } from "@/content/services";
import { ledger } from "@/content/ledger";

export function ServicePill({ s, highlight = false }: { s: ServiceCellContent; highlight?: boolean }) {
  if (s.key === "drops") return <StatusPill kind="live-drop" label={`${ledger.released} live`} />;
  if (highlight && s.highlight && s.fromPrice !== undefined)
    return <StatusPill label={highlightPillLabel} value={isConfirm(s.fromPrice) ? CONFIRM : s.fromPrice} />;
  return (
    <StatusPill kind={s.status === "coming-soon" ? "coming-soon" : "owner-listed"} label={statusPillLabel[s.status]} />
  );
}
