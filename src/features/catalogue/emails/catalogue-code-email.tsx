import { Section, Text } from "@react-email/components";
import { siteConfig } from "@/config/site";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { EmailFrame, INK, paragraph, RULE } from "./email-frame";

const c = catalogueCopy.email;

/** Sent to the person who asked for a PDF. Written as a short business letter. */
export function CatalogueCodeEmail({ name, title, code }: { name: string; title: string; code: string }) {
  return (
    <EmailFrame preview={c.preview(code)} footnote={c.ignore}>
      <Text style={paragraph}>{c.greeting(name)}</Text>
      <Text style={paragraph}>{c.intro(title)}</Text>
      <Section style={{ margin: "24px 0", padding: "16px 0", borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <Text style={{ margin: 0, color: INK, fontFamily: "'Courier New', Courier, monospace", fontSize: "30px", fontWeight: 700, letterSpacing: "8px", lineHeight: "36px" }}>{code}</Text>
      </Section>
      <Text style={paragraph}>{c.validity}</Text>
      <Text style={paragraph}>{c.questions}</Text>
      <Text style={{ ...paragraph, margin: "24px 0 0" }}>
        {c.signOff}
        <br />
        {siteConfig.brandName}
      </Text>
    </EmailFrame>
  );
}
