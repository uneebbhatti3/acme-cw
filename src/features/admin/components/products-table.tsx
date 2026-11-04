"use client";

import { IconDotsVertical, IconExternalLink, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteProductDialog } from "@/features/admin/components/delete-product-dialog";
import { ProductsTableNoResults } from "@/features/admin/components/states/products-table-no-results";
import { adminCopy } from "@/features/admin/data/copy";
import type { ProductRow } from "@/features/admin/types";

const c = adminCopy.products;
const ALL = "all";
const PAGE_SIZE = 20;

/**
 * Page numbers to show: always the first and last, the current page and one
 * either side, with "ellipsis" for the gaps (1 … 4 5 6 … 10).
 */
function pageList(current: number, pages: number): (number | "ellipsis")[] {
  const wanted = new Set([1, pages, current - 1, current, current + 1].filter((n) => n >= 1 && n <= pages));
  const sorted = [...wanted].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  sorted.forEach((n, i) => {
    const gap = n - (sorted[i - 1] ?? 0);
    // A gap of one page is shown as that page, not an ellipsis.
    if (i > 0 && gap === 2) out.push(n - 1);
    else if (i > 0 && gap > 2) out.push("ellipsis");
    out.push(n);
  });
  return out;
}

export function ProductsTable({ rows, catalogs }: { rows: ProductRow[]; catalogs: { slug: string; name: string }[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState(() => {
    const fromUrl = params.get("catalog");
    return catalogs.some((cat) => cat.slug === fromUrl) ? fromUrl! : ALL;
  });
  // The page is kept in the URL (?page=3), so returning from an edit lands on the same page.
  const [page, setPage] = useState(() => Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1));
  const [deleting, setDeleting] = useState<ProductRow | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const matching = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (catalog === ALL || r.categorySlug === catalog) &&
        (!q || [r.name, r.model, r.title].some((v) => v.toLowerCase().includes(q))),
    );
  }, [rows, query, catalog]);

  const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  // Clamped, so a delete that empties the last page shows the new last page.
  const current = Math.min(page, pages);
  const first = (current - 1) * PAGE_SIZE;
  const shown = matching.slice(first, first + PAGE_SIZE);

  /** The URL for page n, keeping the other query parameters (such as ?catalog=). */
  const pageHref = (n: number) => {
    const next = new URLSearchParams(params.toString());
    if (n === 1) next.delete("page");
    else next.set("page", String(n));
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  /** Moves to page n and writes it to the URL without a navigation (Next syncs useSearchParams with the history API). */
  const goTo = (n: number) => {
    const target = Math.min(Math.max(n, 1), pages);
    setPage(target);
    window.history.replaceState(null, "", pageHref(target));
    top.current?.scrollIntoView({ block: "start" });
  };

  const onPage = (e: MouseEvent<HTMLAnchorElement>, n: number) => {
    // Plain clicks stay in the app; ctrl/cmd/middle-click still open the page in a new tab via href.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    goTo(n);
  };

  /** A new search or catalog starts again from page 1. */
  const resetPage = () => {
    if (current !== 1) goTo(1);
  };

  return (
    <div ref={top} className="flex scroll-mt-20 flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <IconSearch aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder={c.search}
            aria-label={c.search}
            className="h-10 pl-9"
          />
        </div>
        <Select
          value={catalog}
          onValueChange={(v) => {
            setCatalog(v);
            resetPage();
          }}
        >
          <SelectTrigger className="h-10 w-full sm:w-60" aria-label={c.catalogFilter}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>{c.allCatalogs}</SelectItem>
            {catalogs.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {pages > 1 ? c.range(first + 1, first + shown.length, matching.length, rows.length) : c.count(matching.length, rows.length)}
      </p>

      {matching.length === 0 ? (
        <ProductsTableNoResults
          onClear={() => {
            setQuery("");
            setCatalog(ALL);
            resetPage();
          }}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>{c.columns.product}</TableHead>
                <TableHead className="hidden md:table-cell">{c.columns.model}</TableHead>
                <TableHead className="hidden lg:table-cell">{c.columns.catalog}</TableHead>
                <TableHead className="hidden xl:table-cell">{c.columns.sizes}</TableHead>
                  <TableHead className="w-12">
                  <span className="sr-only">{c.columns.actions}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="max-w-0 w-full">
                    <div className="flex items-center gap-3">
                      <Image
                        src={r.imageUrl}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                        className="size-12 shrink-0 rounded-md border bg-grey-50 object-contain"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{r.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{r.title !== r.name ? r.title : r.categoryName}</p>
                        <p className="truncate font-mono text-xs text-muted-foreground md:hidden">{r.model}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs md:table-cell">{r.model}</TableCell>
                  <TableCell className="hidden lg:table-cell">{r.categoryName}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <span className="line-clamp-2 max-w-56 text-xs whitespace-normal text-muted-foreground">
                      {r.sizes.length ? r.sizes.join(", ") : c.noSizes}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={c.actionsFor(r.name)}>
                          <IconDotsVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                          <a href={r.href} target="_blank" rel="noopener">
                            <IconExternalLink />
                            {c.view}
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${r.id}/edit`}>
                            <IconPencil />
                            {c.edit}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onSelect={() => setDeleting(r)}>
                          <IconTrash />
                          {c.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pages > 1 && (
        <Pagination aria-label={c.pagination} className="pb-2">
          <PaginationContent className="flex-wrap justify-center">
            <PaginationItem>
              <PaginationPrevious
                href={pageHref(current - 1)}
                onClick={(e) => onPage(e, current - 1)}
                aria-disabled={current === 1}
                tabIndex={current === 1 ? -1 : undefined}
                className={current === 1 ? "pointer-events-none opacity-40" : undefined}
              />
            </PaginationItem>
            {pageList(current, pages).map((n, i) =>
              n === "ellipsis" ? (
                <PaginationItem key={`gap-${i}`} className="hidden sm:block">
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={n} className={n === current ? undefined : "hidden sm:block"}>
                  <PaginationLink href={pageHref(n)} onClick={(e) => onPage(e, n)} isActive={n === current} aria-label={c.page(n)}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href={pageHref(current + 1)}
                onClick={(e) => onPage(e, current + 1)}
                aria-disabled={current === pages}
                tabIndex={current === pages ? -1 : undefined}
                className={current === pages ? "pointer-events-none opacity-40" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <DeleteProductDialog product={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
}
