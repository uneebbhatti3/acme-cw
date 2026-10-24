import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { productsCopy } from "@/features/products/data/copy";

/** Prompt for patterns that are not listed online: quote form or the OEM page. */
export function CustomRequest() {
  const c = productsCopy.custom;
  return (
    <Band tone="grey" labelledBy="custom-title">
      <Container>
        <div className="flex flex-col gap-6 rounded-lg border bg-white p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <h2 id="custom-title" className="text-h2">
              {c.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{c.text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href={siteConfig.quoteHref}>{c.primary}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/manufacturing#oem">{c.secondary}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Band>
  );
}
