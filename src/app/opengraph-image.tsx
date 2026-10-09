// OG image: wordmark + tagline on void, 1200×630 (BRIEF routes). Colours are
// the dark tokens read from colors.css; the wordmark is Inversionz Unboxed.
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { displayFont, headlineFont, tokens } from "./og";

export const alt = `${site.name} · ${site.positioning}, ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [t, display, headline] = await Promise.all([tokens(), displayFont(), headlineFont()]);
  const fonts = [{ name: "Inversionz", data: display, weight: 400 as const, style: "normal" as const }];
  if (headline) fonts.push({ name: "Space Grotesk", data: Buffer.from(headline), weight: 400, style: "normal" });
  const tagline = headline ? site.tagline : site.tagline.toUpperCase().replace(/[^A-Z0-9 ]/g, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: t.void,
          color: t.ink,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage: `linear-gradient(${t["grid-line"]} 1px, transparent 1px), linear-gradient(90deg, ${t["grid-line"]} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: headline ? "Space Grotesk" : "Inversionz", fontSize: 22, color: t["ink-muted"], letterSpacing: 2 }}>
          <span>{site.positioning.toUpperCase()}</span>
          <span style={{ color: t["signal-ink"] }}>{site.city.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontFamily: "Inversionz", fontSize: 128, letterSpacing: 5, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontFamily: headline ? "Space Grotesk" : "Inversionz", fontSize: headline ? 44 : 36, color: t["ink-muted"], letterSpacing: headline ? 0 : 2 }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: headline ? "Space Grotesk" : "Inversionz", fontSize: 22, color: t["ink-muted"], letterSpacing: 2 }}>
          <span>{site.url.replace("https://", "").toUpperCase()}</span>
          <span style={{ color: t["signal-ink"] }}>{site.trustLine.toUpperCase().replace(/[^A-Z0-9 ]/g, headline ? "$&" : "")}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
