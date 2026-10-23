import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { siteConfig } from "@/config/site";
import { productsCopy } from "@/features/products/data/copy";

/** The clinical fields the range serves, as a plain list of terms. */
export function SpecialtiesList() {
  return (
    <Band tone="paper" labelledBy="specialties-title">
      <Container>
        <SectionIntro id="specialties-title" title={productsCopy.specialties.title} text={productsCopy.specialties.intro} />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {siteConfig.company.specialties.map((s) => (
            <li key={s} className="rounded-full border bg-card px-4 py-2 text-[0.95rem]">
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
