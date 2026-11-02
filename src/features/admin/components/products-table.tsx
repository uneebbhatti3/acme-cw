"use client";

import { IconDotsVertical, IconExternalLink, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteProductDialog } from "@/features/admin/components/delete-product-dialog";
import { ProductsTableNoResults } from "@/features/admin/components/states/products-table-no-results";
import { adminCopy } from "@/features/admin/data/copy";
import type { ProductRow } from "@/features/admin/types";

const c = adminCopy.products;
const ALL = "all";

export function ProductsTable({ rows, catalogs }: { rows: ProductRow[]; catalogs: { slug: string; name: string }[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState(() => {
    const fromUrl = params.get("catalog");
    return catalogs.some((cat) => cat.slug === fromUrl) ? fromUrl! : ALL;
  });
  const [deleting, setDeleting] = useState<ProductRow | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (catalog === ALL || r.categorySlug === catalog) &&
        (!q || [r.name, r.model, r.title].some((v) => v.toLowerCase().includes(q))),
    );
  }, [rows, query, catalog]);

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
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
        <Select value={catalog} onValueChange={setCatalog}>
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
        {c.count(shown.length, rows.length)}
      </p>

      {shown.length === 0 ? (
        <ProductsTableNoResults
          onClear={() => {
            setQuery("");
            setCatalog(ALL);
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

      <DeleteProductDialog product={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
}
