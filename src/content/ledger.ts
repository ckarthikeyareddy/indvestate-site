// Generated from docs/CONTENT.md §6. No invented ledger. Counters render only
// from here; an unconfirmed figure means the column shows the step line only
// and the count-up is skipped. Never show 44 / 41 / 3 from the mockup.
import { isConfirm, type Confirm } from "./confirm";

export type StepKey = "watch" | "reject" | "thesis" | "release";

export interface Step {
  key: StepKey;
  label: string;
  line: string;
  count: number | Confirm;
}

export const ledger = {
  watched: 55 as number | Confirm,
  rejected: 32 as number | Confirm,
  inChecks: 21 as number | Confirm,
  released: 2 as number | Confirm,
};

export const steps: Step[] = [
  {
    key: "watch",
    label: "Watch",
    line: "Parcels studied on the ground, walked at least once.",
    count: ledger.watched,
  },
  {
    key: "reject",
    label: "Reject",
    line: "Did not pass.",
    count: ledger.rejected,
  },
  {
    key: "thesis",
    label: "Thesis",
    line: "Passed title, approvals, location logic and exit.",
    count: ledger.inChecks,
  },
  {
    key: "release",
    label: "Release",
    line: "Released to the inside list with the risk memo attached.",
    count: ledger.released,
  },
];

/** A real figure or undefined. The UI must branch on this, never on the raw value. */
export function figure(step: Step): number | undefined {
  return isConfirm(step.count) ? undefined : step.count;
}
