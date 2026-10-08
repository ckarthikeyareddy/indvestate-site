import type { Metadata } from "next";
import { SmoothScroll } from "@/lib/lenis";
import { site } from "@/content/site";
import { fontClassNames } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.positioning}, ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.heroLine,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
