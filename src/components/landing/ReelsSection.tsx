// 03b Watch · Phase 3.6, always rendered since Phase 3.7. "Walk it before you
// call." A horizontal rail of 9:16 reel cards from the store (admin) or
// src/content/reels.ts. Published reels with video play; seeded reels without
// video show their kicker and stat as coming-soon teasers; `upcoming` areas
// pad the rail with NEXT REEL placeholders while fewer than three reels are
// published. The rail's controls render disabled while no card has video.
import { reelsCopy, upcoming } from "@/content/reels";
import { getReels } from "@/lib/reels";
import { ReelRail } from "./ReelRail";
import { RevealScope } from "./Reveal";

export async function ReelsSection() {
  const all = await getReels();
  const reels = all.filter((r) => r.published && r.videoUrl);
  const teasers = all.filter((r) => !(r.published && r.videoUrl)).map((r) => ({ kicker: r.kicker, stat: r.stat }));
  const placeholders = reels.length < reelsCopy.minCards ? upcoming : [];
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
          <ReelRail reels={reels} teasers={reels.length ? [] : teasers} placeholders={placeholders} />
        </div>
      </RevealScope>
    </section>
  );
}
