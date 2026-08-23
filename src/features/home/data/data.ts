import {
  Activity,
  BadgeCheck,
  Bone,
  Brain,
  CircleDot,
  Eye,
  Factory,
  Hammer,
  HeartPulse,
  Hospital,
  PackageCheck,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";

export const company = {
  name: "Acme Commercial Ways (Pvt) Ltd.",
  shortName: "Acme Commercial Ways",
  location: "Sialkot, Pakistan",
  established: "1960",
  website: "www.acme-cw.com",
  emails: ["info@acme-cw.com", "acme-cw@live.com"],
  phones: ["+92 052 3558738", "+92 052 3563693"],
  fax: ["+92 052 3254126", "+92 052 3254127"],
  address: ["Nowl More, Roras Road", "P.O Box 1092", "Sialkot 51310, Pakistan"],
  headline:
    "Precision Instruments Manufactured for Healthcare Professionals Worldwide.",
  subheadline:
    "Acme Commercial Ways (Pvt) Ltd. is a Sialkot-based manufacturer, importer, and exporter of surgical, dental, veterinary, manicure instruments, and scissors, serving customers across Europe, the USA, Canada, and global markets since 1960.",
  intro:
    "Our precision products are specially designed for General Surgery, Cardiovascular, ENT, Gynecology, Orthopedic, Neurosurgery, Plastic and Orthodontic Surgery, Veterinary, Ophthalmology, and healthcare professionals worldwide.",
  badge:
    "FDA registered firm for surgical, dental, veterinary, manicure instruments and scissors",
};

export const companyStats = [
  {
    value: "1960",
    label: "Established",
  },
  {
    value: "50+",
    label: "Export Markets",
  },
  {
    value: "1000+",
    label: "Instrument Profiles",
  },
  {
    value: "FDA",
    label: "Registered Firm",
  },
];

export const trustStats = [
  {
    value: "1960",
    label: "Serving international buyers since",
  },
  {
    value: "50+",
    label: "Export markets represented",
  },
  {
    value: "1000+",
    label: "Instrument profiles",
  },
  {
    value: "QA",
    label: "Checked and re-checked quality process",
  },
];

export const certifications = [
  "ISO 9001:2015",
  "ISO 13485:2016",
  "CE",
  "FDA (GMP)",
];

export const exportMarkets = [
  "Europe",
  "USA",
  "Canada",
  "Morocco",
  "Brazil",
  "Mexico",
  "Turkey",
  "Australia",
  "South Africa",
  "Thailand",
];

export const productCategories = [
  {
    id: "surgical-instruments",
    name: "Surgical Instruments",
    slug: "surgical-instruments",
    count: 180,
    description:
      "Precision surgical instruments for general surgery, operating room workflows, and healthcare procurement.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=90",
    icon: Hospital,
  },
  {
    id: "dental-instruments",
    name: "Dental Instruments",
    slug: "dental-instruments",
    count: 220,
    description:
      "Dental instruments manufactured for clinical practices, distributors, and professional healthcare buyers.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=90",
    icon: Stethoscope,
  },
  {
    id: "veterinary-instruments",
    name: "Veterinary Instruments",
    slug: "veterinary-instruments",
    count: 60,
    description:
      "Veterinary instruments for healthcare professionals, clinics, and specialist distributors.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=90",
    icon: ShieldCheck,
  },
  {
    id: "manicure-instruments",
    name: "Manicure Instruments",
    slug: "manicure-instruments",
    count: 75,
    description:
      "Professional manicure instruments and grooming tools manufactured with finishing and handling quality.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=90",
    icon: Sparkles,
  },
  {
    id: "scissors-forceps",
    name: "Scissors & Forceps",
    slug: "scissors-forceps",
    count: 140,
    description:
      "Scissors, forceps, and precision-held instruments for surgical, dental, and healthcare applications.",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=90",
    icon: Scissors,
  },
  {
    id: "electro-surgical-instruments",
    name: "Electro-Surgical Instruments",
    slug: "electro-surgical-instruments",
    count: 45,
    description:
      "Electro-surgical instrument profiles manufactured for specialist procedural requirements.",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=90",
    icon: Activity,
  },
  {
    id: "single-use-instruments",
    name: "Single Use Instruments",
    slug: "single-use-instruments",
    count: 90,
    description:
      "Single use instrument ranges designed for healthcare procurement and procedural use.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=90",
    icon: Syringe,
  },
  {
    id: "hollow-ware-instruments",
    name: "Hollow Ware Instruments",
    slug: "hollow-ware-instruments",
    count: 55,
    description:
      "Hollow ware instrument products for healthcare, surgical, and clinical environments.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=90",
    icon: PackageCheck,
  },
];

export const specializedProductLines = [
  {
    name: "General Surgery",
    icon: Hospital,
  },
  {
    name: "Cardiovascular",
    icon: HeartPulse,
  },
  {
    name: "ENT",
    icon: Activity,
  },
  {
    name: "Gynecology",
    icon: Syringe,
  },
  {
    name: "Orthopedic",
    icon: Bone,
  },
  {
    name: "Neurosurgery",
    icon: Brain,
  },
  {
    name: "Plastic & Orthodontic Surgery",
    icon: Scissors,
  },
  {
    name: "Rectoscopy",
    icon: CircleDot,
  },
  {
    name: "Urology",
    icon: Activity,
  },
  {
    name: "Ophthalmology",
    icon: Eye,
  },
  {
    name: "Microscopy",
    icon: BadgeCheck,
  },
  {
    name: "Dental Instruments",
    icon: Stethoscope,
  },
];

export const featuredProducts = [
  {
    id: "surgical-scissors",
    name: "Surgical Scissors",
    slug: "surgical-scissors",
    sku: "ACME-SC-101",
    category: "Scissors & Forceps",
    description:
      "Precision surgical scissors manufactured for handling, cutting performance, and professional healthcare use.",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1000&q=90",
    badge: "Featured",
  },
  {
    id: "dental-forceps",
    name: "Dental Forceps",
    slug: "dental-forceps",
    sku: "ACME-DF-150",
    category: "Dental Instruments",
    description:
      "Dental forceps profiles designed for dental professionals, distributors, and clinical procurement buyers.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=90",
    badge: "Dental",
  },
  {
    id: "needle-holder",
    name: "Needle Holder",
    slug: "needle-holder",
    sku: "ACME-NH-204",
    category: "Surgical Instruments",
    description:
      "Surgical needle holder developed around grip, alignment, control, and repeatable handling.",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1000&q=90",
    badge: "Surgical",
  },
  {
    id: "manicure-scissors",
    name: "Manicure Scissors",
    slug: "manicure-scissors",
    sku: "ACME-MS-310",
    category: "Manicure Instruments",
    description:
      "Professional manicure scissors manufactured with surface finishing, edge quality, and handling control.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=90",
    badge: "Manicure",
  },
];

export const manufacturingSteps = [
  {
    step: "01",
    title: "Formed by hand",
    description:
      "Instrument manufacture is an exacting skill demanding dexterity, concentration, and patience.",
    icon: Hammer,
  },
  {
    step: "02",
    title: "Precision-ground",
    description:
      "Each instrument is shaped and refined through careful grinding for controlled geometry and function.",
    icon: Factory,
  },
  {
    step: "03",
    title: "Sharpened & polished",
    description:
      "Surfaces, edges, and handling details are sharpened, polished, and finished by hand.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Checked & re-checked",
    description:
      "Every instrument is thoroughly checked and re-checked before it reaches the customer.",
    icon: ShieldCheck,
  },
];

export const qualityValues = [
  {
    title: "Precision",
    description:
      "Every instrument represents the statement of what the company does, how it does it, and why it does it.",
  },
  {
    title: "Performance",
    description:
      "Product quality is positioned around functional performance and professional healthcare requirements.",
  },
  {
    title: "Longevity",
    description:
      "Instrument quality, steel selection, and finishing are treated as long-term product attributes.",
  },
  {
    title: "Reliability",
    description:
      "The company emphasizes customer success through reliable products and consistent service.",
  },
  {
    title: "Uncompromising quality",
    description:
      "Quality control is communicated through repeated checking, finishing discipline, and manufacturing care.",
  },
];

export const companyMission = {
  title: "Our Company Mission",
  description:
    "To provide high-quality products at reasonable prices and delivered promptly. Keep an open and creative mind to new ideas, to establish and develop friendly business relations with customers worldwide.",
};

export const whyChooseUs = [
  {
    title: "Best price",
    description:
      "The company emphasizes reasonable pricing while maintaining professional product quality.",
  },
  {
    title: "Best quality",
    description:
      "Products are checked before dispatching to customers and manufactured with a quality-focused process.",
  },
  {
    title: "Prompt delivery",
    description:
      "The company positions timely delivery and responsiveness as part of its customer service commitment.",
  },
  {
    title: "Prompt response",
    description:
      "Customer communication and response time are treated as important parts of the buyer relationship.",
  },
  {
    title: "Worldwide customers",
    description:
      "The company exports to Europe, USA, Canada, Morocco, Brazil, Mexico, Turkey, Australia, South Africa, Thailand, and other markets.",
  },
  {
    title: "Customer-required production",
    description:
      "Products can be manufactured according to customer requirements, including preferred steel where applicable.",
  },
];

export const testimonials = [
  {
    quote:
      "The company profile communicates manufacturing experience, international export orientation, and a clear product range for serious buyers.",
    name: "Placeholder Buyer",
    role: "International Healthcare Procurement",
  },
  {
    quote:
      "The focus on precision, performance, longevity, reliability, and quality gives the brand a strong manufacturing message.",
    name: "Placeholder Distributor",
    role: "Surgical & Dental Instruments Buyer",
  },
  {
    quote:
      "The catalog structure makes it easier to understand the company's broad product range across surgical, dental, veterinary, and manicure instruments.",
    name: "Placeholder Partner",
    role: "Professional Instruments Importer",
  },
];

export const insights = [
  {
    tag: "Instrument Care",
    title:
      "How professional instruments should be cleaned, handled, and stored.",
  },
  {
    tag: "Manufacturing",
    title:
      "Why formed, ground, sharpened, polished, and checked processes matter.",
  },
  {
    tag: "Procurement",
    title:
      "How importers can evaluate a surgical and dental instruments manufacturer.",
  },
];
