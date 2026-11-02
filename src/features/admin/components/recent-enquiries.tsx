import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KindBadge, StatusBadge } from "@/features/admin/components/enquiry-badges";
import { adminCopy } from "@/features/admin/data/copy";
import { formatDateTime } from "@/features/admin/lib/format";
import type { StoredEnquiry } from "@/features/admin/types";

const c = adminCopy.dashboard.recent;
const cols = adminCopy.enquiries.columns;

export function RecentEnquiries({ items }: { items: StoredEnquiry[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{c.title}</CardTitle>
        <CardAction>
          <Button asChild variant="outline" size="xs">
            <Link href="/dashboard/enquiries">{c.viewAll}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">{c.empty}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{cols.from}</TableHead>
                <TableHead className="hidden sm:table-cell">{cols.type}</TableHead>
                <TableHead>{cols.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((e) => (
                <TableRow key={e.reference}>
                  <TableCell className="max-w-0 w-full">
                    <Link href={`/dashboard/enquiries/${e.reference}`} className="block truncate font-medium hover:underline">
                      {e.company || e.name}
                    </Link>
                    <span className="block truncate text-xs text-muted-foreground">{formatDateTime(e.receivedAt)}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <KindBadge kind={e.kind} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={e.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
