<<<<<<< HEAD
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Our type-scale utilities are font sizes, not colours. */
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["h1", "h2", "h3"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Small deterministic hash used to vary placeholder art per item. */
export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function whatsappHref(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
=======
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
}
