import { IconArrowLeft, IconPaperclip } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { siteConfig } from "@/config/site";
import { EnquiryActions } from "@/features/admin/components/enquiry-actions";
import { KindBadge, StatusBadge } from "@/features/admin/components/enquiry-badges";
import { EnquiryDetailLoading } from "@/features/admin/components/states/enquiry-detail-loading";
import { adminCopy } from "@/features/admin/data/copy";
import { sampleEnquiries } from "@/features/admin/data/sample";
import { formatBytes, formatDateTime } from "@/features/admin/lib/format";

const c = adminCopy.enquiries;

async function EnquiryDetail({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const e = sampleEnquiries.find((item) => item.reference === reference);
  if (!e) notFound();

  const details: [string, React.ReactNode][] = [
    [c.fields.name, e.name],
    [c.fields.company, e.company],
    [c.fields.email, <a key="email" href={`mailto:${e.email}`} className="text-link underline-offset-4 hover:underline">{e.email}</a>],
    [c.fields.phone, e.phone && <a key="phone" href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="text-link underline-offset-4 hover:underline">{e.phone}</a>],
    [c.fields.country, e.country],
    [c.fields.buyerType, e.buyerType],
    [c.fields.reference, <span key="ref" className="font-mono text-sm">{e.reference}</span>],
    [c.fields.received, formatDateTime(e.receivedAt)],
  ];

  return (
    <>
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <KindBadge kind={e.kind} />
            <StatusBadge status={e.status} />
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-heading">{e.company ? `${e.name}, ${e.company}` : e.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDateTime(e.receivedAt)} · {e.delivered ? c.delivered : c.notDelivered}
          </p>
        </div>
        <EnquiryActions enquiry={e} replySubject={`Re: ${c.kind[e.kind]} ${e.reference}, ${siteConfig.brandName}`} />
      </div>

      <div className="grid gap-4 px-4 lg:px-6 @4xl/main:grid-cols-3">
        <div className="flex flex-col gap-4 @4xl/main:col-span-2">
          {e.items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{c.products}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{c.product}</TableHead>
                      <TableHead>{c.quantity}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {e.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-normal">{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
          {e.message && (
            <Card>
              <CardHeader>
                <CardTitle>{c.message(e.kind)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{e.message}</p>
              </CardContent>
            </Card>
          )}
          {e.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{c.attachments}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {e.attachments.map((a) => (
                    <li key={a.file} className="inline-flex items-center gap-2 text-sm">
                      <IconPaperclip aria-hidden className="size-4 text-muted-foreground" />
                      {a.filename}
                      <span className="text-muted-foreground">({formatBytes(a.size)})</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{c.details}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              {details
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 break-words">{value}</dd>
                  </div>
                ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function EnquiryDetailView({ params }: { params: Promise<{ reference: string }> }) {
  return (
    <>
      <Link
        href="/dashboard/enquiries"
        className="mx-4 inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:mx-6"
      >
        <IconArrowLeft className="size-4" />
        {c.back}
      </Link>
      <Suspense fallback={<EnquiryDetailLoading />}>
        <EnquiryDetail params={params} />
      </Suspense>
    </>
  );
}
