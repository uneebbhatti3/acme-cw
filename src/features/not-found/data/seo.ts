import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const notFoundMetadata: Metadata = {
  title: "Page not found",
  description: `The page you are looking for could not be found. Search the product catalog or contact ${siteConfig.brandName}.`,
  robots: { index: false, follow: true },
};
