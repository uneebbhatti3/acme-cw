import { IconDashboard, IconInbox, IconPackage } from "@tabler/icons-react";
import { adminCopy } from "./copy";

/** Admin sidebar links. `exact` marks links that are active only on their own path. */
export const adminNav = [
  { title: adminCopy.nav.dashboard, url: "/dashboard", icon: IconDashboard, exact: true },
  { title: adminCopy.nav.products, url: "/dashboard/products", icon: IconPackage },
  { title: adminCopy.nav.enquiries, url: "/dashboard/enquiries", icon: IconInbox },
];

/** Locale and time zone for dates in the admin panel (the company's own). */
export const adminSettings = {
  locale: "en-GB",
  timeZone: "Asia/Karachi",
};
