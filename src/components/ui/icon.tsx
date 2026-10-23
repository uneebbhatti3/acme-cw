import {
  BadgeCheck,
  CircleCheck,
  Cog,
  Factory,
  Flame,
  Globe,
  Hammer,
  Layers,
  Package,
  PenTool,
  Ruler,
  ScanSearch,
  Sparkles,
  type LucideProps,
} from "lucide-react";

const icons = {
  ruler: Ruler,
  badge: BadgeCheck,
  globe: Globe,
  pen: PenTool,
  factory: Factory,
  check: CircleCheck,
  layers: Layers,
  hammer: Hammer,
  scan: ScanSearch,
  cog: Cog,
  flame: Flame,
  sparkles: Sparkles,
  package: Package,
};

export type IconName = keyof typeof icons;

/** Maps icon names used in data files to the Lucide set (1.5px stroke). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name as IconName] ?? CircleCheck;
  return <C aria-hidden strokeWidth={1.5} {...props} />;
}
