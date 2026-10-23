import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { siteConfig } from "@/config/site";
import { productsCopy } from "@/features/products/data/copy";

/** The clinical fields the range serves, as a plain list of terms. */
export function SpecialtiesList() {
  return (
    <Section>
      <SectionHeading title={productsCopy.specialties.title} intro={productsCopy.specialties.intro} />
      <ul className="flex flex-wrap gap-2.5">
        {siteConfig.company.specialties.map((s) => (
          <li key={s} className="rounded-full border border-steel-300 bg-white px-4 py-2 text-[0.95rem] text-ink">
            {s}
          </li>
        ))}
      </ul>
    </Section>
  );
}
