// 08 Data desk · BRIEF §8. COMING SOON, 2D static SVG map, layer pills disabled.
import { MapFrame, StatusPill } from "@/components/ds";
import { site } from "@/content/site";

export function DataDeskSection() {
  const d = site.dataDesk;
  return (
    <section id="data" className="sec">
      <div className="wrap stack g-40">
        <div className="between">
          <h2 className="iv-h2">{d.title}</h2>
          <StatusPill kind="coming-soon" label={d.pill} />
        </div>
        <MapFrame
          caption={d.caption}
          coordinate={d.coordinate}
          layers={
            <span className="data__pills row" aria-disabled="true">
              {d.layers.map((l) => (
                <StatusPill key={l} label={l} />
              ))}
            </span>
          }
        />
        <p className="iv-body-lg muted">{d.line}</p>
      </div>
    </section>
  );
}
