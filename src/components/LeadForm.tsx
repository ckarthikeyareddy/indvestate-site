"use client";
// Every form on the site. Wraps the extended InsideListForm, POSTs
// { topic, fields, ref } to /api/lead, then either routes to
// /thank-you?topic=… (default) or shows the end card inline (the landing's
// inside list). A failed POST keeps the form on screen with the network line
// and a WhatsApp fallback. Honeypot: the form's own hidden field stops bots
// client-side; the API checks "website" for direct posts.
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button, InsideListForm, type InsideListData, type InsideListFieldSpec } from "@/components/ds";
import { formCopy, leadTopics, type LeadTopic } from "@/content/pages";
import { site, whatsappHref } from "@/content/site";

export interface LeadFormProps {
  topic: LeadTopic;
  /** e.g. a property kicker; travels to the desk and to the thank-you prefill. */
  reference?: string;
  fields: InsideListFieldSpec[];
  submitLabel: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** "navigate" (default) → /thank-you; "inline" → stamp-in success in place. */
  after?: "navigate" | "inline";
  successLabel?: string;
  successTitle?: string;
  successBody?: string;
  successActions?: ReactNode;
  /** A computed line above the submit (e.g. the fee for the typed area). */
  summary?: (values: InsideListData) => ReactNode;
}

export async function postLead(topic: LeadTopic, fields: InsideListData, reference?: string): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ topic, fields, ref: reference, website: "" }),
  });
  if (!res.ok) throw new Error(`lead ${res.status}`);
}

export function thankYouHref(topic: LeadTopic, reference?: string): string {
  const q = new URLSearchParams({ topic });
  if (reference) q.set("ref", reference);
  return `/thank-you?${q.toString()}`;
}

export function LeadForm({
  topic,
  reference,
  fields,
  submitLabel,
  eyebrow = "",
  title = "",
  intro = "",
  after = "navigate",
  successLabel,
  successTitle,
  successBody,
  successActions,
  summary,
}: LeadFormProps) {
  const router = useRouter();
  const phrase = reference ? `${leadTopics[topic].phrase} for ${reference}` : leadTopics[topic].phrase;

  return (
    <InsideListForm
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      fields={fields}
      submitLabel={submitLabel}
      submittingLabel={formCopy.sending}
      errors={formCopy.errors}
      honeypot="website"
      successLabel={successLabel}
      successTitle={successTitle ?? site.endCard.headline}
      successBody={successBody ?? site.endCard.body}
      successActions={successActions}
      summary={summary}
      networkActions={
        <Button variant="ghost" href={whatsappHref(site.endCard.whatsapp.prefill(phrase))} target="_blank" rel="noreferrer">
          {site.endCard.whatsapp.label} ↗
        </Button>
      }
      onSubmit={async (data) => {
        await postLead(topic, data, reference);
        if (after === "navigate") router.push(thankYouHref(topic, reference));
      }}
    />
  );
}
