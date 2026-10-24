/**
 * Copy shared by the layout and by several pages (header, footer, call to
 * action). Page-specific copy lives in src/features/<page>/data/copy.ts.
 */

export const ctaCopy = {
  eyebrow: "Quotations",
  title: "Request a quotation",
  text: "Send the product names or SKUs, quantities and your destination market. Drawings and samples for custom work are welcome.",
  primary: "Request a quote",
  secondary: "Contact our team",
};

export const layoutCopy = {
  skip: "Skip to content",
  quoteButton: "Request a Quote",
  quoteShort: "Get a quote",
  menu: "Menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Site menu",
  showRanges: "Show product ranges",
  allProducts: "View all products",
  oemLink: "OEM and private label",
  megaTitle: "Product ranges",
  megaIntro: "Standard patterns and made-to-drawing instruments, supplied under our name or yours.",
  footer: {
    products: "Products",
    company: "Company",
    resources: "Resources",
    contact: "Contact",
    phone: "Telephone",
    email: "Email",
    address: "Address",
    hours: "Office hours",
    follow: "Follow us",
    legal: "Legal",
  },
  whatsapp: "Chat with us on WhatsApp",
  whatsappText: "Hello, I have a question about your instruments.",
  whatsappProduct: (name: string) => `Hello, I would like information about: ${name}`,
  breadcrumbHome: "Home",
};

/** Placeholder labels for photo slots awaiting client photography. */
export const mediaCopy = {
  photoPending: "Photo to be supplied",
  imagePending: "Placeholder image",
};
