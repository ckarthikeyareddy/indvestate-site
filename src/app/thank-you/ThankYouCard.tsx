"use client";
// The end card (CONTENT §10) with the WhatsApp and email buttons prefilled
// from ?topic= and ?ref=. For topic=inspection the Razorpay Payment Link
// opens in a new tab (CONTENT §4) once it is confirmed.
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { confirmed } from "@/content/confirm";
import { inspectionPage, leadTopics, thankYouPage, type LeadTopic } from "@/content/pages";
import { inspection } from "@/content/services";
import { site, whatsappHref } from "@/content/site";

function isTopic(t: string | null): t is LeadTopic {
  return t !== null && t in leadTopics;
}

export function ThankYouCard() {
  const params = useSearchParams();
  const topic = params.get("topic");
  const ref = params.get("ref")?.slice(0, 120);
  const phrase = isTopic(topic) ? `${leadTopics[topic].phrase}${ref ? ` for ${ref}` : ""}` : "my request";
  const end = site.endCard;
  const pay = topic === "inspection" ? confirmed(inspection.booking.razorpayLink) : undefined;

  return (
    <div className="end" role="status">
      <span className="iv-label signal">{thankYouPage.eyebrow}</span>
      <h1 className="iv-h1">{end.headline}</h1>
      <p className="iv-body-lg muted">{end.body}</p>
      {topic === "inspection" && (
        <div className="end__actions">
          {pay ? (
            <Button href={pay} target="_blank" rel="noreferrer noopener">
              {inspectionPage.pay.label} ↗
            </Button>
          ) : (
            <span className="iv-caption" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              {inspectionPage.pay.label} <ConfirmChip note="Razorpay Payment Link" />
            </span>
          )}
          <span className="iv-caption">{inspectionPage.pay.note}</span>
        </div>
      )}
      <div className="end__actions">
        <Button variant="secondary" href={whatsappHref(end.whatsapp.prefill(phrase))} target="_blank" rel="noreferrer">
          {end.whatsapp.label} ↗
        </Button>
        <Button variant="ghost" href={`mailto:${site.email.primary}?subject=${encodeURIComponent(phrase)}`}>
          {end.email.label}
        </Button>
      </div>
      <span className="iv-caption">{end.footer}</span>
    </div>
  );
}
