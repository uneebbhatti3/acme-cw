/** Options and limits for the enquiry forms, shared by the form and the API route. */

export const buyerTypes = [
  "Distributor or importer",
  "Wholesaler or dealer",
  "Hospital, clinic or practice",
  "OEM or private-label brand",
  "Government or tender buyer",
  "Other",
] as const;

/**
 * Attachments. The total stays under Vercel's 4.5 MB request limit, with room
 * for the form fields. File types: drawings and photos only.
 */
export const attachmentRules = {
  maxFiles: 3,
  maxTotalMb: 4,
  extensions: ["pdf", "jpg", "jpeg", "png", "webp", "dxf", "dwg", "step", "stp"],
  /** Shown to the visitor. */
  label: "PDF, JPG, PNG, WEBP, DXF, DWG or STEP",
  accept: ".pdf,.jpg,.jpeg,.png,.webp,.dxf,.dwg,.step,.stp",
} as const;

export const maxLines = 20;

/** Seconds a person needs at least to fill the form; faster submissions are treated as bots. */
export const minFillSeconds = 3;
