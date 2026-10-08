// 10 Founder note · CONTENT §9.
import { FounderNote } from "@/components/ds";
import { site } from "@/content/site";

export function FounderSection() {
  const f = site.founder;
  return (
    <section id="founder" className="sec">
      <div className="wrap founder">
        <FounderNote label={f.label} quote={f.quote} name={f.signature} role={f.role} date={f.date}>
          {f.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </FounderNote>
      </div>
    </section>
  );
}
