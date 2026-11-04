"use client";

import dynamic from "next/dynamic";
import { EnquiryFormSkeleton } from "./enquiry-form-skeleton";

/**
 * The enquiry form (react-hook-form, zod, country picker) in its own chunk,
 * loaded when the form renders. Link prefetching of /request-quote and
 * /contact otherwise downloaded and ran it on every page with a quote button.
 * The form reads ?sku= from the URL, so it never rendered on the server anyway.
 */
export const LazyEnquiryForm = dynamic(() => import("./enquiry-form").then((m) => m.EnquiryForm), {
  ssr: false,
  loading: () => <EnquiryFormSkeleton />,
});
