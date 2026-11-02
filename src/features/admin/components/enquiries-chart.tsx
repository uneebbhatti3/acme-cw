"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { adminCopy } from "@/features/admin/data/copy";
import type { DailyEnquiries } from "@/features/admin/types";

const c = adminCopy.dashboard.chart;
type Range = keyof typeof c.ranges;
const RANGES = Object.keys(c.ranges) as Range[];
const DAYS: Record<Range, number> = { "90d": 90, "30d": 30, "7d": 7 };

const chartConfig = {
  quote: { label: c.quote, color: "var(--chart-1)" },
  general: { label: c.general, color: "var(--chart-2)" },
} satisfies ChartConfig;

/** Dates are UTC days (yyyy-mm-dd), so they are formatted in UTC to keep the day unchanged. */
const dayLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const formatDay = (value: string) => dayLabel.format(new Date(value));

/** Daily enquiries, split into quote requests and general enquiries. Adapted from the shadcn dashboard chart. */
export function EnquiriesChart({ data }: { data: DailyEnquiries[] }) {
  const [range, setRange] = React.useState<Range>("90d");
  const shown = data.slice(-DAYS[range]);
  const total = shown.reduce((n, d) => n + d.quote + d.general, 0);
  const changeRange = (value: string) => value && setRange(value as Range);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{c.title}</CardTitle>
        <CardDescription>
          {c.ranges[range]}: <span className="font-medium text-foreground tabular-nums">{total}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={changeRange}
            variant="outline"
            aria-label={c.rangeLabel}
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            {RANGES.map((r) => (
              <ToggleGroupItem key={r} value={r}>
                {c.ranges[r]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Select value={range} onValueChange={changeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label={c.rangeLabel}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {RANGES.map((r) => (
                <SelectItem key={r} value={r} className="rounded-lg">
                  {c.ranges[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="relative px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={shown} margin={{ left: 0, right: 8 }}>
            <defs>
              <linearGradient id="fillQuote" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-quote)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-quote)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillGeneral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-general)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--color-general)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={formatDay} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value) => formatDay(String(value))} indicator="dot" />}
            />
            <Area dataKey="general" type="monotone" fill="url(#fillGeneral)" stroke="var(--color-general)" stackId="a" />
            <Area dataKey="quote" type="monotone" fill="url(#fillQuote)" stroke="var(--color-quote)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
        {total === 0 && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8 text-sm text-muted-foreground">
            {c.empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
