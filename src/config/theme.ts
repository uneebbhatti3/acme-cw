/**
 * Colour values for places CSS variables cannot reach: the generated
 * placeholder SVGs (served as images), the Open Graph image and the browser
 * theme colour. Keep these in step with the tokens in `src/app/globals.css`,
 * which remain the source for everything rendered in the page.
 */
export const themeColors = {
  navy: "#0B1F3A",
  navyDeep: "#07152A",
  teal: "#097E9E",
  tealDeep: "#07657F",
  tealLight: "#7FD3E6",
  grey50: "#F5F7FA",
  grey100: "#EDF1F5",
  slate: "#4A5869",
  ink: "#0F1B2D",
} as const;
