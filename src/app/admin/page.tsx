import type { Metadata } from "next";
import { ReelsManager } from "./ReelsManager";

export const metadata: Metadata = { title: "Reels · Admin", robots: { index: false, follow: false } };

export default function AdminReelsPage() {
  return (
    <>
      <div className="adm__head">
        <span className="iv-label signal">Reels</span>
        <h1 className="iv-h2" style={{ margin: 0 }}>
          The Watch rail.
        </h1>
        <p className="iv-body muted" style={{ margin: 0, maxWidth: 640 }}>
          Published reels appear on the home page in this order. Fewer than three published pad with placeholder cards; none published hides the section.
        </p>
      </div>
      <ReelsManager />
    </>
  );
}
