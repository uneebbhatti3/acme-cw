import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { themeColors } from "@/config/theme";

export const alt = siteConfig.brandName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image: brand name and tagline on navy. */
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
          background: themeColors.navy,
          backgroundImage:
            "linear-gradient(to right, rgba(184,194,202,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,194,202,0.08) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          color: "#F2F5F9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 6, border: "3px solid #F2F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: themeColors.teal }} />
          </div>
          <div style={{ fontSize: 34 }}>{siteConfig.brandName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.08, maxWidth: 900 }}>{siteConfig.tagline}</div>
          <div style={{ marginTop: 28, width: 160, height: 3, background: themeColors.teal }} />
        </div>
      </div>
    ),
    size,
  );
}
