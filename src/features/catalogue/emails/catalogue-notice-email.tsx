import { Column, Row, Section, Text } from "@react-email/components";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { EmailFrame, MUTED, paragraph, RULE } from "./email-frame";

const c = catalogueCopy.email;
const f = c.noticeFields;

/** Sent to the company, so each request can be followed up as a sales lead. */
export function CatalogueNoticeEmail({ title, name, email, company }: { title: string; name: string; email: string; company?: string }) {
  const rows = [
    [f.catalogue, title],
    [f.name, name],
    [f.email, email],
    [f.company, company || f.notGiven],
  ];
  return (
    <EmailFrame preview={c.noticePreview(name, title)}>
      <Text style={{ ...paragraph, fontSize: "18px", fontWeight: 700 }}>{c.noticeHeading}</Text>
      <Text style={paragraph}>{c.noticeIntro}</Text>
      <Section style={{ borderTop: `1px solid ${RULE}` }}>
        {rows.map(([label, value]) => (
          <Row key={label} style={{ borderBottom: `1px solid ${RULE}` }}>
            <Column style={{ width: "120px", padding: "8px 0", verticalAlign: "top" }}>
              <Text style={{ ...paragraph, margin: 0, color: MUTED, fontSize: "13px" }}>{label}</Text>
            </Column>
            <Column style={{ padding: "8px 0", verticalAlign: "top" }}>
              <Text style={{ ...paragraph, margin: 0, fontSize: "14px" }}>{value}</Text>
            </Column>
          </Row>
        ))}
      </Section>
    </EmailFrame>
  );
}
