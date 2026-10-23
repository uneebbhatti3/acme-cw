import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.brandName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image: brand name and tagline on the ink ground. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B1620",
          backgroundImage:
            "linear-gradient(to right, rgba(184,194,202,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,194,202,0.08) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          color: "#F7F9FA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 40, border: "3px solid #F7F9FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#2EA3C4" }} />
          </div>
          <div style={{ fontSize: 34 }}>{siteConfig.brandName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.08, maxWidth: 900 }}>{siteConfig.tagline}</div>
          <div style={{ marginTop: 28, width: 160, height: 3, background: "#2EA3C4" }} />
        </div>
      </div>
    ),
    size,
  );
}
