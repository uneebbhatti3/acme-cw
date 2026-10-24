import { fullAddress, primaryEmail, siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

/**
 * Privacy policy and terms of use. DRAFTS: they describe how this website
 * actually handles data (enquiry forms, email delivery, hosting, no tracking
 * cookies), but they must be reviewed by the client's legal adviser before
 * launch. Values in [square brackets] are for the client to fill in.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const company = siteConfig.legalName;

export const legalCopy = {
  draftNotice: "Draft for review. This text has not yet been approved by the company's legal adviser.",
  updated: "Last updated",
};

export const privacy: LegalDocument = {
  title: "Privacy policy",
  intro: `This policy explains what personal information ${company} collects through this website, why, and how it is handled.`,
  sections: [
    {
      heading: "Who we are",
      paragraphs: [`${company}, ${fullAddress()}. For any privacy question, email ${primaryEmail}.`],
    },
    {
      heading: "What we collect",
      paragraphs: ["We collect only what you send us through the quote and enquiry forms, or by email or phone:"],
      list: [
        "your name, company, business email address, phone number and country",
        "the type of buyer you are, the products, SKUs and quantities you ask about, and your message",
        "any drawings or photos you attach",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "To answer your enquiry, prepare a quotation and, if you place an order, to fulfil it. We do not sell your information or use it for unrelated marketing.",
      ],
    },
    {
      heading: "Who processes it for us",
      paragraphs: ["Your enquiry is passed to service providers that run this website for us:"],
      list: [
        "Vercel Inc. (website hosting)",
        "[Email delivery provider, e.g. Resend] (delivers form submissions to our inbox)",
        "[CRM provider, if used]",
        "Cloudflare, Inc. (security check on the forms, if enabled)",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: ["We keep enquiries for [retention period], or longer if they lead to an order and we must keep business records by law."],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website does not use advertising or analytics cookies. If the security check on our forms is enabled, Cloudflare may set a technical cookie needed to tell people from automated programs.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [`You can ask to see, correct or delete the information we hold about you by emailing ${primaryEmail}.`],
    },
    {
      heading: "Changes",
      paragraphs: ["We may update this policy. The date at the top shows when it last changed."],
    },
  ],
};

export const terms: LegalDocument = {
  title: "Terms of use",
  intro: `These terms apply to your use of this website, operated by ${company}.`,
  sections: [
    {
      heading: "Product information",
      paragraphs: [
        "Product descriptions, images, SKUs and specifications on this website are for general information. Final specifications, prices and lead times are those confirmed in our written quotation or order confirmation.",
      ],
    },
    {
      heading: "Quotations and orders",
      paragraphs: [
        "Sending an enquiry or quote request does not create a contract. A contract exists only once we accept an order in writing, on the terms stated in our quotation.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The content of this website, including text, images and logos, belongs to ${company} or is used with permission. Do not copy it for commercial use without our written consent.`,
        "Drawings and samples you send us remain your property and are used only to prepare your quotation and order.",
      ],
    },
    {
      heading: "Links",
      paragraphs: ["We are not responsible for the content of other websites linked from this site."],
    },
    {
      heading: "Liability",
      paragraphs: [
        "We take care to keep this website accurate, but do not guarantee that it is complete or free of errors. To the extent permitted by law, we are not liable for loss arising from use of the website.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: ["These terms are governed by the laws of [jurisdiction, e.g. Pakistan]."],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about these terms: ${primaryEmail}.`],
    },
  ],
};

export const privacySeo: PageSeo = {
  title: "Privacy Policy",
  description: `How ${siteConfig.brandName} collects and uses the personal information sent through this website's quote and enquiry forms, and your rights.`,
  path: "/privacy",
};

export const termsSeo: PageSeo = {
  title: "Terms of Use",
  description: `Terms for using the ${siteConfig.brandName} website, including product information, quotations, intellectual property and liability.`,
  path: "/terms",
};
