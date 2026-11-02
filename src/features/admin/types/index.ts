import type { EnquiryValues } from "@/features/quote/lib/schema";

/** A product added through the admin panel. */
export interface AdminProduct {
  id: string;
  /** URL name, unique across products and sub-categories. */
  slug: string;
  name: string;
  /** Model / SKU, unique across the catalogue. */
  model: string;
  /** Full product title, e.g. "Mayo Dissecting Scissors, Curved, 170 mm". */
  title: string;
  categorySlug: string;
  sizes: string[];
  description: string;
  /** App URL of the image in the products bucket, /media/products/<file>. */
  image: string;
  createdAt: string;
  updatedAt: string;
}

/** One row of the admin products list. */
export interface ProductRow {
  id: string;
  name: string;
  model: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  sizes: string[];
  imageUrl: string;
  /** Public product page. */
  href: string;
  updatedAt?: string;
}

export type EnquiryStatus = "new" | "read" | "archived";

export interface StoredAttachment {
  filename: string;
  type: string;
  size: number;
  /** Unique name of the file within the enquiry. */
  file: string;
}

/** A contact or quote form submission, as kept for the admin panel. */
export interface StoredEnquiry
  extends Pick<EnquiryValues, "kind" | "name" | "company" | "email" | "phone" | "country" | "buyerType" | "items" | "message"> {
  reference: string;
  receivedAt: string;
  status: EnquiryStatus;
  /** Whether email or webhook delivery accepted it. */
  delivered: boolean;
  attachments: StoredAttachment[];
}

export interface DailyEnquiries {
  /** yyyy-mm-dd, UTC */
  date: string;
  quote: number;
  general: number;
}

/** Figures shown on the dashboard. */
export interface DashboardStats {
  products: { total: number };
  catalogs: { total: number; largest: string };
  enquiries: { total: number; unread: number; quotes: number; general: number; last30: number; trend: number | null };
  perCatalog: { slug: string; name: string; count: number }[];
  daily: DailyEnquiries[];
  recent: StoredEnquiry[];
}
