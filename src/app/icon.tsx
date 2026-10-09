// Favicon from the Monogram: "IV" in Inversionz on void inside a hairline
// square (design-system Monogram, filled on void for legibility at 16px).
import { ImageResponse } from "next/og";
import { displayFont, tokens } from "./og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const [t, display] = await Promise.all([tokens(), displayFont()]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: t.void,
          color: t.ink,
          border: `2px solid ${t["hairline-strong"]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inversionz",
          fontSize: 30,
          letterSpacing: 1,
          paddingLeft: 1,
        }}
      >
        IV
      </div>
    ),
    { ...size, fonts: [{ name: "Inversionz", data: display, weight: 400, style: "normal" }] },
  );
}
