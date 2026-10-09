// Home-inspection fee by carpet area (CONTENT §4) as a hairline table. Shared
// by /services/inspection and /pricing.
import { inspection } from "@/content/services";

export function FeeTable() {
  const c = inspection.feeColumns;
  return (
    <div className="iv-table__wrap">
      <table className="iv-table">
        <thead>
          <tr className="iv-label muted">
            <th>{c.area}</th>
            <th className="num">{c.fee}</th>
          </tr>
        </thead>
        <tbody>
          {inspection.fees.map((b) => (
            <tr key={b.label}>
              <td className="iv-body">{b.label}</td>
              <td className="iv-data num">{b.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
