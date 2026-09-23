import { Package, RefreshCw, Ship, ShieldCheck } from "lucide-react";

import type { DeliveryTimeline, ShippingInfo } from "@/features/shipping/types/shipping";

export const shippingInfo: ShippingInfo[] = [
  { icon: Ship, title: "Export shipping", body: "We export worldwide from Sialkot, Pakistan. Shipments are dispatched via sea freight (FCL/LCL) or air freight depending on order size and urgency. We work with established freight forwarders and logistics partners experienced in medical device export." },
  { icon: Package, title: "Export packaging", body: "Instruments are packed in individual pouches or boxes, then consolidated into master cartons suitable for international shipping. OEM packaging, private-label boxes, and custom branding are available on request. Packaging complies with standard export requirements." },
  { icon: ShieldCheck, title: "Documentation", body: "Standard export documentation includes commercial invoice, packing list, certificate of origin, and health certificate where required. Additional documents such as FDA registration letters, ISO certificates, and CE declarations can be provided on request." },
  { icon: RefreshCw, title: "Returns & defects", body: "Instruments with manufacturing defects or quality non-conformances should be reported within 30 days of receipt. Please contact our sales team with order details, affected SKUs, quantities, and a description of the issue. We will assess the claim and arrange replacement or credit as appropriate." },
];

export const deliveryTimelines: DeliveryTimeline[] = [
  { label: "Standard stock items", value: "2–4 weeks", note: "For items available in standard specification" },
  { label: "OEM / custom orders", value: "4–8 weeks", note: "Depending on specification complexity and quantity" },
  { label: "Large volume orders", value: "6–12 weeks", note: "Timeline confirmed at order acceptance" },
  { label: "Sample orders", value: "1–2 weeks", note: "Via air freight, subject to availability" },
];
