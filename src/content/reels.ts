// Generated from docs/CONTENT.md §14 (the Watch section). The admin writes
// the live list to the store under reels:list; this seed is the fallback and
// the copy. "[CONFIRM]" stays until replaced.
import { CONFIRM, type Confirm } from "./confirm";

export interface Reel {
  id: string;
  /** e.g. "LIVE 01 · MEERPET" */
  kicker: string;
  caption: string | Confirm;
  /** e.g. "₹ 5,300 / sq ft · 1,600 sq ft" */
  stat: string;
  /** MP4, 9:16, under 60 s. Empty until media exists. */
  videoUrl: string;
  posterUrl: string;
  instagramUrl: string | Confirm;
  order: number;
  published: boolean;
}

export const reelsSeed: Reel[] = [
  {
    id: "meerpet-3bhk",
    kicker: "LIVE 01 · MEERPET",
    caption: CONFIRM,
    stat: "₹ 5,300 / sq ft · 1,600 sq ft",
    videoUrl: "",
    posterUrl: "",
    instagramUrl: CONFIRM,
    order: 1,
    published: false,
  },
  {
    id: "kompally-villas",
    kicker: "LIVE 02 · KOMPALLY",
    caption: CONFIRM,
    stat: "₹ 12,000 / sq ft · 300 sq yd",
    videoUrl: "",
    posterUrl: "",
    instagramUrl: CONFIRM,
    order: 2,
    published: false,
  },
];

/** Areas for the placeholder cards while fewer than three reels are published. */
export const upcoming = ["Tellapur", "Shadnagar"];

export const reelsCopy = {
  eyebrow: "Watch",
  title: "Walk it before you call.",
  watch: "Watch on Instagram",
  nextReel: "NEXT REEL",
  comingSoon: "Coming soon",
  mute: "Mute",
  unmute: "Unmute",
  play: "Play",
  pause: "Pause",
  prev: "Previous reel",
  next: "Next reel",
  railLabel: "Reels",
  /** Max seconds a card plays before the rail advances. */
  advanceAfterS: 8,
  /** Fewer published reels than this are padded with placeholder cards. */
  minCards: 3,
};
