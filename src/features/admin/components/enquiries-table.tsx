"use client";

import { IconPaperclip, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KindBadge, StatusBadge } from "@/features/admin/components/enquiry-badges";
import { adminCopy } from "@/features/admin/data/copy";
import type { StoredEnquiry } from "@/features/admin/types";
import { cn } from "@/lib/utils";

const c = adminCopy.enquiries;
type Tab = keyof typeof c.tabs;
const TABS = Object.keys(c.tabs) as Tab[];

const inTab: Record<Tab, (e: StoredEnquiry) => boolean> = {
  all: (e) => e.status !== "archived",
  new: (e) => e.status === "new",
  quote: (e) => e.kind === "quote" && e.status !== "archived",
  general: (e) => e.kind === "general" && e.status !== "archived",
  archived: (e) => e.status === "archived",
};

/** `received` is preformatted on the server so dates match between server and browser. */
export function EnquiriesTable({ enquiries }: { enquiries: (StoredEnquiry & { received: string })[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter(
      (e) => inTab[tab](e) && (!q || [e.name, e.company, e.email, e.reference].some((v) => v.toLowerCase().includes(q))),
    );
  }, [enquiries, tab, query]);

  const href = (e: StoredEnquiry) => `/dashboard/enquiries/${e.reference}`;

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-3 @3xl/main:flex-row @3xl/main:items-center @3xl/main:justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList className="max-w-full overflow-x-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t} value={t}>
                {c.tabs[t]}
                <span className="ml-1 text-xs text-muted-foreground tabular-nums">{enquiries.filter(inTab[t]).length}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative @3xl/main:w-80">
          <IconSearch aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.search}
            aria-label={c.search}
            className="h-10 pl-9"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {c.count(shown.length)}
      </p>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>{c.columns.from}</TableHead>
              <TableHead className="hidden md:table-cell">{c.columns.type}</TableHead>
              <TableHead className="hidden lg:table-cell">{c.columns.country}</TableHead>
              <TableHead className="hidden sm:table-cell">{c.columns.received}</TableHead>
              <TableHead>{c.columns.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  {c.empty}
                </TableCell>
              </TableRow>
            )}
            {shown.map((e) => (
              // The whole row opens the enquiry; the name link is the keyboard and screen reader target.
              <TableRow key={e.reference} onClick={() => router.push(href(e))} className="cursor-pointer">
                <TableCell className="max-w-0 w-full">
                  <a
                    href={href(e)}
                    onClick={(ev) => ev.stopPropagation()}
                    className={cn("block truncate hover:underline", e.status === "new" ? "font-semibold" : "font-medium")}
                  >
                    {e.company ? `${e.name}, ${e.company}` : e.name}
                  </a>
                  <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    {e.attachments.length > 0 && <IconPaperclip aria-hidden className="size-3 shrink-0" />}
                    <span className="truncate">{e.message || e.items.map((i) => i.product).join(", ") || e.email}</span>
                  </span>
                  <span className="text-xs text-muted-foreground sm:hidden">{e.received}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <KindBadge kind={e.kind} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">{e.country}</TableCell>
                <TableCell className="hidden text-sm whitespace-nowrap text-muted-foreground sm:table-cell">{e.received}</TableCell>
                <TableCell>
                  <StatusBadge status={e.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
