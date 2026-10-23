import { Factory, Hammer, ShieldCheck, Sparkles } from "lucide-react";

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
