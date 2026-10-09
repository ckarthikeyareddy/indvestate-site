// 03b Watch · Phase 3.6. "Walk it before you call." A horizontal rail of
// 9:16 reel cards from the store (admin) or src/content/reels.ts. Fewer than
// three published reels are padded with placeholder cards from `upcoming`;
// none published hides the section.
import { reelsCopy, upcoming } from "@/content/reels";
import { getPublishedReels } from "@/lib/reels";
import { ReelRail } from "./ReelRail";
import { RevealScope } from "./Reveal";

export async function ReelsSection() {
  const reels = await getPublishedReels();
  if (!reels.length) return null;
  const placeholders = upcoming.slice(0, Math.max(0, reelsCopy.minCards - reels.length));
  return (
    <section id="watch" className="sec">
      <RevealScope>
        <div className="wrap stack g-40">
          <div className="stack g-12">
            <span className="iv-label signal" data-reveal="">
              {reelsCopy.eyebrow}
            </span>
            <h2 className="iv-h2" data-split="">
              {reelsCopy.title}
            </h2>
          </div>
        </div>
        <div data-reveal="">
          <ReelRail reels={reels} placeholders={placeholders} />
        </div>
      </RevealScope>
    </section>
  );
}
