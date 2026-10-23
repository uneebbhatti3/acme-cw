import { Factory, FileCheck, Globe2, Ruler, ShieldCheck, Tag, Wrench, type LucideIcon } from "lucide-react";
import type { HomeIcon as HomeIconName } from "@/features/home/types";

const ICONS: Record<HomeIconName, LucideIcon> = {
  factory: Factory,
  globe: Globe2,
  tag: Tag,
  file: FileCheck,
  wrench: Wrench,
  ruler: Ruler,
  shield: ShieldCheck,
};

/** Line icon named in the home copy (decorative). */
export function HomeIcon({ name, className }: { name: HomeIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden strokeWidth={1.5} className={className} />;
}
