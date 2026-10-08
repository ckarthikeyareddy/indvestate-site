// / · the twelve landing sections in BRIEF.md order. Copy comes from
// src/content only; layout from design/export/index.html via landing.css.
import {
  BriefsSection,
  DataDeskSection,
  FounderSection,
  Hero,
  InsideListSection,
  LiveNow,
  MethodSection,
  NriSection,
  ReelSection,
  ServicesSection,
  SiteFooter,
  SiteNav,
} from "@/components/landing";
import "./landing.css";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <LiveNow />
        <ReelSection />
        <MethodSection />
        <ServicesSection />
        <NriSection />
        <DataDeskSection />
        <BriefsSection />
        <FounderSection />
        <InsideListSection />
      </main>
      <SiteFooter />
    </>
  );
}
