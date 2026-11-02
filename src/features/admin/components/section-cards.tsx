import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { adminCopy } from "@/features/admin/data/copy";
import type { DashboardStats } from "@/features/admin/types";

const c = adminCopy.dashboard.cards;

function StatCard({
  label,
  value,
  footer,
  note,
  trend,
}: {
  label: string;
  value: number;
  footer: string;
  note: string;
  trend?: number | null;
}) {
  const TrendIcon = trend != null && trend < 0 ? IconTrendingDown : IconTrendingUp;
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value.toLocaleString("en-GB")}</CardTitle>
        {trend != null && (
          <CardAction>
            <Badge variant="outline">
              <TrendIcon />
              {c.trend(trend)}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 font-medium">{footer}</div>
        <div className="text-muted-foreground">{note}</div>
      </CardFooter>
    </Card>
  );
}

export function SectionCards({ stats }: { stats: DashboardStats }) {
  const { products, catalogs, enquiries } = stats;
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard
        label={c.products}
        value={products.total}
        footer={c.productsNote}
        note={c.productsFooter}
      />
      <StatCard
        label={c.catalogs}
        value={catalogs.total}
        footer={c.catalogsFooter}
        note={catalogs.largest ? c.catalogsNote(catalogs.largest) : ""}
      />
      <StatCard
        label={c.enquiries}
        value={enquiries.total}
        footer={c.enquiriesFooter(enquiries.unread)}
        note={c.last30(enquiries.last30)}
        trend={enquiries.trend}
      />
      <StatCard
        label={c.quotes}
        value={enquiries.quotes}
        footer={c.quotesFooter(enquiries.general)}
        note={c.quotesShare(enquiries.total ? Math.round((enquiries.quotes / enquiries.total) * 100) : 0)}
      />
    </div>
  );
}
