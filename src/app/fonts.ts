// Four families, four jobs (design-system/tokens/typography.css). All self-hosted:
// next/font/google downloads at build time and serves from /_next/static; the
// Inversionz Unboxed cut ships from design-system/fonts (licensed per project).
// The token file's Google @import is NOT used; globals.css bridges these
// variables into --font-display / --font-headline / --font-body / --font-mono.
import localFont from "next/font/local";
import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Telugu,
  Space_Grotesk,
} from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ["telugu", "latin"],
  display: "swap",
  variable: "--font-noto-telugu",
  preload: false,
});

// Wordmark + UPPERCASE display only. ~52 glyphs; the unicode-range keeps it to
// A–Z and 0–9 so every other character falls through to Space Grotesk.
export const inversionzUnboxed = localFont({
  src: "../../design-system/fonts/Inversionz-Unboxed.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-inversionz-unboxed",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0041-005A, U+0030-0039" }],
});

export const fontClassNames = [
  spaceGrotesk.variable,
  inter.variable,
  jetbrainsMono.variable,
  notoSansTelugu.variable,
  inversionzUnboxed.variable,
].join(" ");
