import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Our type-scale utilities are font sizes, not colours. */
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["h1", "h2", "h3"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappHref(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
