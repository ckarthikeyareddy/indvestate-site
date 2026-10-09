// 08 Data desk · BRIEF §8. COMING SOON, 2D static SVG map, layer pills disabled.
import { MapFrame, StatusPill } from "@/components/ds";
import { RevealScope } from "./Reveal";

import { site } from "@/content/site";

export function DataDeskSection() {
  const d = site.dataDesk;
  return (
    <section id="data" className="sec">
      <RevealScope>
      <div className="wrap stack g-40">
        <div className="between">
          <h2 className="iv-h2" data-split="">{d.title}</h2>
          <span data-reveal=""><StatusPill kind="coming-soon" label={d.pill} /></span>
        </div>
        <div data-reveal="">
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
        </div>
        <p className="iv-body-lg muted" data-reveal="">{d.line}</p>
      </div>
      </RevealScope>
    </section>
  );
}
