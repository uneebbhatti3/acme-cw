import type { Metadata } from "next";

export const notFoundMetadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found. Search the catalog or contact Acme Commercial Ways.",
  robots: { index: false, follow: true },
};
