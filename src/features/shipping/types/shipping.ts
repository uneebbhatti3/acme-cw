import type { LucideIcon } from "lucide-react";

export type ShippingInfo = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type DeliveryTimeline = {
  label: string;
  value: string;
  note: string;
};
