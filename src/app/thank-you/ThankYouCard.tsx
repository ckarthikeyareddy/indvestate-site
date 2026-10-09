"use client";
// The end card (CONTENT §10) with the WhatsApp and email buttons prefilled
// from ?topic= and ?ref=. For topic=inspection and topic=reel the Razorpay
// Payment Link opens in a new tab (CONTENT §3, §4) once it is set; until then
// the card says the link comes on WhatsApp.
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ds";
import { inspectionPage, leadTopics, thankYouPage, type LeadTopic } from "@/content/pages";
import { inspection, sellWithUs } from "@/content/services";
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
  const payment =
    topic === "inspection"
      ? { link: inspection.booking.razorpayLink, pending: inspection.booking.pending, label: inspectionPage.pay.label }
      : topic === "reel"
        ? { link: sellWithUs.payment.link, pending: sellWithUs.payment.pending, label: inspectionPage.pay.label }
        : null;

  return (
    <div className="end" role="status">
      <span className="iv-label signal">{thankYouPage.eyebrow}</span>
      <h1 className="iv-h1">{end.headline}</h1>
      <p className="iv-body-lg muted">{end.body}</p>
      {payment &&
        (payment.link ? (
          <div className="end__actions">
            <Button href={payment.link} target="_blank" rel="noreferrer noopener">
              {payment.label} ↗
            </Button>
            <span className="iv-caption">{inspectionPage.pay.note}</span>
          </div>
        ) : (
          <p className="iv-body">{payment.pending}</p>
        ))}
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
