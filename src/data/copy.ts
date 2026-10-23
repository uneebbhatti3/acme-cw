/**
 * Copy shared by the layout and by several pages (header, footer, call to
 * action). Page-specific copy lives in src/features/<page>/data/copy.ts.
 */

export const ctaCopy = {
  title: "Tell us what you need.",
  text: "Send product names or SKUs, quantities and your delivery market. We reply with a quote, OEM and private-label options and lead times.",
  primary: "Request a quote",
  catalogue: "Download the catalogue",
  email: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  whatsappLink: "Message us",
};

/** Certificate badges (home and about). */
export const certificationsCopy = {
  status: "Certificate available on request",
  view: "View certificate",
  open: "Open the document",
  close: "Close",
};

export const layoutCopy = {
  skip: "Skip to content",
  contactButton: "Contact us",
  menu: "Menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Site menu",
  allProducts: "All products",
  megaTitle: "Product ranges",
  megaIntro: "Browse the catalog by product range.",
  rangesMenu: "product ranges",
  footer: {
    quickLinks: "Explore",
    categories: "Products",
    contact: "Contact",
    follow: "Follow us",
  },
  whatsapp: "Chat with us on WhatsApp",
  whatsappText: "Hello, I have a question about your instruments.",
  whatsappProduct: (name: string) =>
    `Hello, I would like information about: ${name}`,
  breadcrumbHome: "Home",
};
