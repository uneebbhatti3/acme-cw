# Project Brief

## 1. Summary

A simple, elegant **business website** for a surgical instruments manufacturer. It is not an e-commerce store. Its job is to present the company credibly to international buyers (hospitals, distributors, procurement teams) and make it easy to browse the product range and send an inquiry.

This repository contains the **demo**: a front-end only build with placeholder content, produced before the final scope is agreed, to show the client the look, feel and behaviour.

## 2. Client requirements (as stated by the client)

- A good, modern **interface**
- **Short video clips** can be added
- The company **history is explained in a nice way**
- **Product categories** can be uploaded
- **Images and descriptions** shown properly for products
- **Enlarge-image option** and **side views** of each product

## 3. Goals

1. Look trustworthy and precise: the site should feel as dependable as the instruments.
2. Make the product range easy to explore: category → product → inquiry.
3. Tell the company story visually (history timeline, numbers, certifications).
4. Be fast and flawless on mobile, because many buyers browse on phones.
5. Be easy to maintain: content swaps should not require touching components.

## 4. Audience

- International procurement managers and distributors, mostly reading English as a second language, so copy must be short, clear and scannable
- Hospital and clinic buyers evaluating quality and compliance
- Local and regional partners
- Secondary: prospective employees and journalists (About page)

## 5. Primary user journeys

1. **Evaluate the company:** Home → About (history, quality) → Certifications → Contact
2. **Find a product:** Home → Products → Category → Product detail (gallery, specs) → Request a quote
3. **Watch and learn:** Videos page or Home video highlight → relevant category
4. **Get the catalogue:** Catalogue page → download PDF

## 6. Demo scope (build this)

Pages: Home, About, Products (index), Category, Product detail, Catalogue, Videos, Contact, 404.

Key behaviours: sticky header with mobile menu, category browsing with search and filter, product gallery with hover zoom + lightbox + labelled views, video modal, animated history timeline, count-up statistics, contact / quote form with validation (front-end only), floating WhatsApp button, scroll-reveal animations.

## 7. Out of scope for the demo

- Backend, database, CMS or admin panel (a production decision after the scope call)
- Real content, real photography, real certificates
- User accounts, shopping cart, online payment
- Multi-language support
- Blog or news section

## 8. Assumptions (to confirm with the client)

- English only
- Content managed by the developer initially; a CMS may be added later if the client wants to upload products himself
- Inquiry form sends email in production; in the demo it only validates and shows a success state
- Client has or will provide: logo, brand colours, product photos with multiple angles, descriptions, history text, video clips, certificates

## 9. Open questions (answers change the final build, not the demo)

- Final brand name, logo, colours, fonts
- Number of products and categories
- Product fields required (code, material, size, specification table, standards)
- Must the client add products himself? (decides CMS vs static data)
- Languages, domain, hosting, business email
- Which certifications may legally be displayed and which files exist
- Budget, deadline, approvers

## 10. Success criteria for the demo

The client can click through the site on his phone, see his product world represented convincingly, understand that his photos and videos will slot in, and say yes to the full project.
