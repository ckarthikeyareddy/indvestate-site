import type { Metadata } from "next";
import { SmoothScroll } from "@/lib/lenis";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { fontClassNames } from "./fonts";
import "./globals.css";
import "./landing.css";
import "./pages.css";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.meaning,
  url: site.url,
  logo: `${site.url}/icon`,
  telephone: site.phone.e164,
  email: site.email.primary,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" },
  sameAs: [site.handles.instagram.url],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.positioning}, ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.heroLine,
  openGraph: { siteName: site.name, type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <JsonLd data={organization} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
