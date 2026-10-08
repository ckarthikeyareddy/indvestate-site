// Lucide, 20px, stroke 1.5, round caps (design-system/README.md · Iconography).
// Explicit map of the core set so only these icons ship in the bundle.
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  Compass,
  FileCheck2,
  Globe,
  House,
  Landmark,
  Layers,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Route,
  Ruler,
  Scale,
  ScanSearch,
  ShieldCheck,
  TriangleAlert,
  type LucideProps,
} from "lucide-react";

export const ICONS = {
  "map-pin": MapPin,
  "file-check-2": FileCheck2,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  "scan-search": ScanSearch,
  landmark: Landmark,
  ruler: Ruler,
  layers: Layers,
  compass: Compass,
  "calendar-check": CalendarCheck,
  "message-circle": MessageCircle,
  "arrow-up-right": ArrowUpRight,
  "arrow-right": ArrowRight,
  globe: Globe,
  house: House,
  scale: Scale,
  route: Route,
  "triangle-alert": TriangleAlert,
  check: Check,
  map: MapIcon,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName | string;
}

export function Icon({ name, size = 20, strokeWidth = 1.5, ...rest }: IconProps) {
  const Cmp = ICONS[name as IconName];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" {...rest} />;
}
