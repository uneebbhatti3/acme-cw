import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/** Old URLs from the previous range structure, kept so links and search results still work. */
const legacyRedirects = [
  { source: "/products/scissors-forceps", destination: "/products/surgical-instruments" },
  { source: "/products/scissors-forceps/:slug", destination: "/products/surgical-instruments/:slug" },
  { source: "/products/single-use-instruments/single-use-instrument", destination: "/products/single-use-instruments/single-use-forceps" },
  { source: "/products/hollow-ware-instruments/hollow-ware-tray", destination: "/products/hollow-ware-instruments/instrument-tray" },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // Tailwind output is small; inlining it removes the render-blocking stylesheet request.
  experimental: { inlineCss: true },
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
