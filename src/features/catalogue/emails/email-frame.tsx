import { Body, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import { fullAddress, siteConfig } from "@/config/site";

export const INK = "#16202e";
export const MUTED = "#566274";
export const RULE = "#d9dee5";
const FONT = "Arial, Helvetica, sans-serif";

export const paragraph: CSSProperties = { margin: "0 0 16px", color: INK, fontFamily: FONT, fontSize: "15px", lineHeight: "24px" };

const LOGO_WIDTH = 150;
const { width, height, src } = siteConfig.logo;

/** The company's letterhead: logo, content, then its name and address. */
export function EmailFrame({ preview, children, footnote }: { preview: string; children: ReactNode; footnote?: string }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: "32px 0", backgroundColor: "#ffffff" }}>
        <Container style={{ maxWidth: "560px", padding: "0 24px" }}>
          <Img src={`${siteConfig.url}${src}`} alt={siteConfig.legalName} width={LOGO_WIDTH} height={Math.round((LOGO_WIDTH * height) / width)} style={{ display: "block" }} />
          <Section style={{ paddingTop: "32px" }}>{children}</Section>
          <Hr style={{ margin: "32px 0 16px", borderColor: RULE }} />
          <Text style={{ ...paragraph, margin: "0 0 8px", color: MUTED, fontSize: "12px", lineHeight: "18px" }}>
            {siteConfig.legalName}
            <br />
            {fullAddress()}
          </Text>
          {footnote && <Text style={{ ...paragraph, margin: 0, color: MUTED, fontSize: "12px", lineHeight: "18px" }}>{footnote}</Text>}
        </Container>
      </Body>
    </Html>
  );
}
