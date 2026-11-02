import type { DailyEnquiries, DashboardStats, StoredEnquiry } from "@/features/admin/types";

/** Sample data for the admin screens. Replace these exports with real data; the components only use their props. */

const sampleEnquiry = (fields: Partial<StoredEnquiry> & Pick<StoredEnquiry, "reference" | "receivedAt" | "kind" | "name">): StoredEnquiry => ({
  status: "read",
  delivered: true,
  company: "",
  email: "buyer@example.com",
  phone: "",
  country: "",
  buyerType: "",
  items: [],
  message: "",
  attachments: [],
  ...fields,
});

export const sampleEnquiries: StoredEnquiry[] = [
  sampleEnquiry({
    reference: "ACW-20261030-A1B2C3",
    receivedAt: "2026-10-30T10:15:00.000Z",
    status: "new",
    kind: "quote",
    name: "Sample Buyer",
    company: "Sample Medical Supplies",
    phone: "+00 000 000 0000",
    country: "Germany",
    buyerType: "Distributor or importer",
    items: [
      { product: "Sample Dissecting Scissors", quantity: "200" },
      { product: "Sample Tissue Forceps", quantity: "150" },
    ],
    message: "Please quote for the items above, including packing details.",
    attachments: [{ filename: "sample-drawing.pdf", type: "application/pdf", size: 482000, file: "1-sample-drawing.pdf" }],
  }),
  sampleEnquiry({
    reference: "ACW-20261029-D4E5F6",
    receivedAt: "2026-10-29T14:40:00.000Z",
    status: "new",
    kind: "general",
    name: "Sample Contact",
    country: "United Kingdom",
    message: "Do you make instruments to a customer's own drawing?",
    delivered: false,
  }),
  sampleEnquiry({
    reference: "ACW-20261027-A7B8C9",
    receivedAt: "2026-10-27T08:05:00.000Z",
    kind: "quote",
    name: "Sample Purchaser",
    company: "Sample Hospital Group",
    country: "United Arab Emirates",
    buyerType: "Hospital, clinic or practice",
    items: [{ product: "Sample Tissue Forceps", quantity: "50" }],
  }),
  sampleEnquiry({
    reference: "ACW-20261022-D1E2F3",
    receivedAt: "2026-10-22T16:20:00.000Z",
    kind: "general",
    name: "Sample Reader",
    company: "Sample Dental Care",
    country: "Canada",
    message: "Could you send your latest catalogue?",
  }),
  sampleEnquiry({
    reference: "ACW-20261015-C4D5E6",
    receivedAt: "2026-10-15T12:00:00.000Z",
    status: "archived",
    kind: "quote",
    name: "Sample Trader",
    company: "Sample Trading Co",
    country: "Australia",
    buyerType: "Wholesaler or dealer",
    items: [{ product: "Sample Dissecting Scissors", quantity: "500" }],
  }),
];

const DAY = 24 * 60 * 60 * 1000;
const LAST_DAY = Date.UTC(2026, 9, 31);
const QUOTES = [1, 0, 2, 0, 1, 3, 0];
const GENERAL = [0, 1, 0, 2, 1];

/** 90 days of made-up counts, oldest first. */
const daily: DailyEnquiries[] = Array.from({ length: 90 }, (_, i) => ({
  date: new Date(LAST_DAY - (89 - i) * DAY).toISOString().slice(0, 10),
  quote: QUOTES[i % QUOTES.length],
  general: GENERAL[i % GENERAL.length],
}));

const sum = (days: DailyEnquiries[]) => days.reduce((n, d) => n + d.quote + d.general, 0);

const quotes = daily.reduce((n, d) => n + d.quote, 0);
const enquiryTotal = sum(daily);

export const sampleEnquiryStats: Pick<DashboardStats, "enquiries" | "daily" | "recent"> = {
  enquiries: {
    total: enquiryTotal,
    unread: sampleEnquiries.filter((e) => e.status === "new").length,
    quotes,
    general: enquiryTotal - quotes,
    last30: sum(daily.slice(-30)),
    trend: 12,
  },
  daily,
  recent: sampleEnquiries.slice(0, 5),
};
