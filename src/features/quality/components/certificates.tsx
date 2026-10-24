import { FileText, ShieldCheck } from "lucide-react";
import { Pending } from "@/components/ui/pending";
import { certifications, verifiedCertifications } from "@/data/certifications";
import { qualityCopy } from "@/features/quality/data/content";
import type { Certification } from "@/types";
import { cn } from "@/lib/utils";

const c = qualityCopy.certificates;

function CertificateCard({ cert, pending = false }: { cert: Certification; pending?: boolean }) {
  const rows = [
    { label: c.fields.issuer, value: cert.issuer },
    { label: c.fields.number, value: cert.number },
    { label: c.fields.scope, value: cert.scope },
    { label: c.fields.validUntil, value: cert.validUntil },
  ];
  return (
    <article className={cn("flex h-full flex-col rounded-lg border bg-white p-5", pending && "border-dashed border-grey-300 bg-grey-50")}>
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-teal-deep">
        <ShieldCheck aria-hidden className="size-5" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-base font-semibold">
        <Pending value={cert.name} />
      </h3>
      <dl className="mt-3 grid gap-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-2">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd>
              <Pending value={r.value} />
            </dd>
          </div>
        ))}
      </dl>
      {cert.file && (
        <a href={cert.file} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-link hover:underline">
          <FileText aria-hidden className="size-4" />
          {c.view}
        </a>
      )}
    </article>
  );
}

/**
 * Certificate panel. Shows verified certificates only. Until one is verified,
 * the slots render as clearly marked placeholders with a note, so no
 * certification claim is published by accident.
 */
export function Certificates({ className }: { className?: string }) {
  const verified = verifiedCertifications();
  const pending = verified.length === 0;
  const list = pending ? certifications : verified;
  return (
    <div className={className}>
      {pending && (
        <div className="mb-5 rounded-lg border border-dashed border-grey-300 bg-white p-5">
          <p className="font-semibold text-navy">{c.pendingTitle}</p>
          <p className="mt-1 text-[0.9375rem] text-muted-foreground">{c.pendingText}</p>
        </div>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((cert) => (
          <li key={cert.name}>
            <CertificateCard cert={cert} pending={pending} />
          </li>
        ))}
      </ul>
    </div>
  );
}
