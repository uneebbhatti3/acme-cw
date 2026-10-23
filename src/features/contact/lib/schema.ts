import { z } from "zod";
import { contactCopy } from "@/features/contact/data/copy";

const f = contactCopy.form;

/** Inquiry form rules. Messages come from the contact copy. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, f.errors.name),
  company: z.string().trim().optional(),
  email: z.string().trim().email(f.errors.email),
  phone: z.string().trim().optional(),
  country: z.string().trim().min(2, f.errors.country),
  product: z.string().trim().optional(),
  message: z.string().trim().min(10, f.errors.message),
  consent: z.boolean().refine((v) => v, f.errors.consent),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
