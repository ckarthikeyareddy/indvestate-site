// 06 Services · BRIEF §6. 5-column ruled grid; Home inspection carries the
// "Book an inspection" button; pills from CONTENT §5. The live-drop pill is
// this section's one saffron element.
import { Icon, ServiceCell, ServiceGrid, StatusPill } from "@/components/ds";
import { site } from "@/content/site";
import { services, statusPillLabel } from "@/content/services";
import { ledger } from "@/content/ledger";

export function ServicesSection() {
  return (
    <section id="services" className="sec">
      <div className="wrap stack g-40">
        <h2 className="iv-h2">{site.services.title}</h2>
        <ServiceGrid>
          {services.map((s) => (
            <ServiceCell
              key={s.key}
              icon={<Icon name={s.icon} />}
              title={s.name}
              href={s.href}
              body={s.body}
              cta={s.cta}
              pill={
                s.key === "drops" ? (
                  <StatusPill kind="live-drop" label={`${ledger.released} live`} />
                ) : (
                  <StatusPill
                    kind={s.status === "coming-soon" ? "coming-soon" : "owner-listed"}
                    label={statusPillLabel[s.status]}
                  />
                )
              }
            />
          ))}
        </ServiceGrid>
      </div>
    </section>
  );
}
