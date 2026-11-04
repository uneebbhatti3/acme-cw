import type { ReactNode } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import type { EnquiryKind } from "./enquiry-form";
import { LazyEnquiryForm } from "./lazy-enquiry-form";

/** The enquiry form beside an aside (next steps or contact details). */
export function EnquirySection({ kind, aside, asideFirst = false }: { kind: EnquiryKind; aside: ReactNode; asideFirst?: boolean }) {
  return (
    <Band tone="grey" defer={false} className="pt-8 md:pt-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            {/* The form reads ?sku= from the URL, so it renders on the client (skeleton first). */}
            <LazyEnquiryForm kind={kind} />
          </div>
          <div className={asideFirst ? "order-first lg:order-none lg:col-span-4" : "lg:col-span-4"}>{aside}</div>
        </div>
      </Container>
    </Band>
  );
}
