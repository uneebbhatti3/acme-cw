import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/**
 * Old URLs from previous category structures, kept so links and search results
 * still work. Specific paths come first. Ranges and products with no match in
 * the current categories go to the products page.
 */
const legacyRedirects = [
  { source: "/products/scissors-forceps", destination: "/products/general-surgery-ent" },
  { source: "/products/scissors-forceps/:slug", destination: "/products/general-surgery-ent/:slug" },
  { source: "/products/surgical-instruments", destination: "/products/general-surgery-ent" },
  { source: "/products/surgical-instruments/:slug", destination: "/products/general-surgery-ent/:slug" },
  { source: "/products/hollow-ware-instruments", destination: "/products/sterilization-boxes-trays" },
  { source: "/products/hollow-ware-instruments/instrument-tray", destination: "/products/sterilization-boxes-trays/instrument-tray" },
  { source: "/products/hollow-ware-instruments/hollow-ware-tray", destination: "/products/sterilization-boxes-trays/instrument-tray" },
  { source: "/products/hollow-ware-instruments/:slug", destination: "/products" },
  { source: "/products/veterinary-instruments/:slug*", destination: "/products" },
  { source: "/products/manicure-instruments/:slug*", destination: "/products" },
  { source: "/products/electro-surgical-instruments/:slug*", destination: "/products" },
  { source: "/products/single-use-instruments/:slug*", destination: "/products" },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // CSS is NOT inlined (`experimental.inlineCss`): the stylesheet (~130 KB,
  // shared with the admin panel) was then repeated in every page's HTML and
  // again, several times, in the React payload, which made pages ~900 KB and
  // slow to parse. As a file it is downloaded once and cached across pages.
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Product photos are shown up to ~900px wide; these cover 1x to 2x screens.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
