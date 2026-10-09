// Route loading state: the system plus-grid on void with the wordmark.
import { Wordmark } from "@/components/ds/Wordmark";

export default function Loading() {
  return (
    <div
      className="iv-plus-grid"
      role="status"
      aria-label="Loading"
      style={{ minHeight: "100svh", display: "grid", placeItems: "center", background: "var(--void)" }}
    >
      <Wordmark size={34} />
    </div>
  );
}
