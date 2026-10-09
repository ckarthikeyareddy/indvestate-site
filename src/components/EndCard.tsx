// The end-card CTAs (CONTENT §10): WhatsApp the desk ↗ and Write to desk@,
// then the "never collects a booking amount" line. Used by /thank-you, the
// inline form success and the bottom of every policy page.
import { Button } from "@/components/ds";
import { site, whatsappHref } from "@/content/site";

export function EndCardActions({ text, subject }: { text: string; subject?: string }) {
  const end = site.endCard;
  const mail = subject ? `mailto:${site.email.primary}?subject=${encodeURIComponent(subject)}` : `mailto:${site.email.primary}`;
  return (
    <>
      <div className="end__actions">
        <Button variant="secondary" href={whatsappHref(text)} target="_blank" rel="noreferrer">
          {end.whatsapp.label} ↗
        </Button>
        <Button variant="ghost" href={mail}>
          {end.email.label}
        </Button>
      </div>
      <span className="iv-caption">{end.footer}</span>
    </>
  );
}
