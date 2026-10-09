import type { Metadata } from "next";
import { SmoothScroll } from "@/lib/lenis";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import { RouteTransitions } from "@/components/RouteTransitions";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PRELOADER_SCRIPT } from "@/lib/preloader-script";
import { fontClassNames } from "./fonts";
import "./globals.css";
import "./landing.css";
import "./pages.css";
import "./motion.css";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalEntity.name,
  alternateName: site.meaning,
  url: site.url,
  logo: `${site.url}/icon`,
  telephone: site.phone.e164,
  email: site.email.primary,
  identifier: { "@type": "PropertyValue", propertyID: "CIN", value: site.legalEntity.registrationNumber },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.legalEntity.street,
    addressLocality: site.legalEntity.locality,
    addressRegion: site.legalEntity.region,
    postalCode: site.legalEntity.postalCode,
    addressCountry: "IN",
  },
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
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <body>
        {/* Runs before the body paints: skips the preloader on a repeat visit or under reduced motion. */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SCRIPT }} />
        <JsonLd data={organization} />
        <SmoothScroll>
          <Preloader />
          <RouteTransitions />
          {children}
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
