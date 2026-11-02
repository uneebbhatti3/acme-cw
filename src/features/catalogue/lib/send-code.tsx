import "server-only";
import { primaryEmail } from "@/config/site";
import type { Catalogue } from "@/features/catalogue/data/catalogues";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { CatalogueCodeEmail } from "@/features/catalogue/emails/catalogue-code-email";
import { CatalogueNoticeEmail } from "@/features/catalogue/emails/catalogue-notice-email";
import { sendMail } from "@/lib/mail";

const c = catalogueCopy.email;

/** Emails the code to the visitor, then tells the company. Throws only if the visitor's email fails. */
export async function sendCatalogueCode(catalogue: Catalogue, visitor: { name: string; email: string; company: string }, code: string) {
  const { name, email, company } = visitor;
  const { title } = catalogue;
  const owner = process.env.CATALOGUE_NOTIFY_EMAIL || primaryEmail;

  await sendMail({ to: email, replyTo: owner, subject: c.subject(title), email: <CatalogueCodeEmail name={name} title={title} code={code} /> });

  // The visitor has their code, so a failed notice is only logged.
  await sendMail({
    to: owner,
    replyTo: email,
    subject: c.noticeSubject(title, name),
    email: <CatalogueNoticeEmail title={title} name={name} email={email} company={company} />,
  }).catch((error) => console.error("[catalogue] Could not notify the company", error));
}
