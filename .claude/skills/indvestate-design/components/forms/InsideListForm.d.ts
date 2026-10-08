/**
 * Lead form for the inside list: name, base (India/US/Gulf), WhatsApp, budget, unticked consent.
 * @startingPoint section="Forms" subtitle="Inside-list signup with NRI base" viewport="700x760"
 */
export interface InsideListFormProps {
  onSubmit?: (data: { base: string }) => void;
  title?: string;
  intro?: string;
  style?: React.CSSProperties;
}
export function InsideListForm(props: InsideListFormProps): JSX.Element;
