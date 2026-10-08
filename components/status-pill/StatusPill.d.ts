/**
 * Document/status pill — the brand's single round shape. Show only documents actually on file.
 * @startingPoint section="Core" subtitle="LIVE DROP, OC, RERA, NRI READY…" viewport="700x260"
 */
export interface StatusPillProps {
  kind?: 'live-drop' | 'coming-soon' | 'oc' | 'rera' | 'approved' | 'dtcp' | 'bank-loan' | 'owner-listed' | 'nri-ready' | 'risk';
  /** Override the preset label. */
  label?: string;
  /** Unstyled-case value after the label, e.g. a RERA number. */
  value?: string;
  tone?: 'live' | 'verified' | 'signal' | 'risk' | 'neutral';
  dot?: boolean;
  tick?: boolean;
  style?: React.CSSProperties;
}
export function StatusPill(props: StatusPillProps): JSX.Element;
