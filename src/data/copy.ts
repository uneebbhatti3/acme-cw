/**
 * Copy shared by the layout and by several pages (header, footer, call to
 * action). Page-specific copy lives in src/features/<page>/data/copy.ts.
 */

export const ctaCopy = {
  title: "Looking for a reliable instruments manufacturer?",
  text: "Send product names or SKUs, quantities and your delivery market. We reply with a quote, OEM options and lead times.",
  primary: "Contact us",
  whatsapp: "Chat on WhatsApp",
};

export const layoutCopy = {
  skip: "Skip to content",
  contactButton: "Contact us",
  menu: "Menu",
  closeMenu: "Close menu",
  allProducts: "All products",
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
