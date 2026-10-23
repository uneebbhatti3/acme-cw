/**
 * Colour values for places CSS variables cannot reach: the generated
 * placeholder SVGs (served as images), the Open Graph image and the browser
 * theme colour. Keep these in step with the tokens in `src/app/globals.css`,
 * which remain the source for everything rendered in the page.
 */
export const themeColors = {
  brand: "#097E9E",
  brandDeep: "#07657F",
  glow: "#8EEBFF",
  night: "#050B0E",
  deep: "#0B161B",
  silver: "#EAF1F5",
  steel: "#9DB0BA",
  paper: "#EEF3F5",
  ink: "#08171C",
} as const;
