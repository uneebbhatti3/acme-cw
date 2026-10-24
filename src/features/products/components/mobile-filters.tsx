"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { productsCopy } from "@/features/products/data/copy";
import type { FilterFacet } from "@/features/products/types";

const fc = productsCopy.filters;

export interface MobileFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facets: { facet: FilterFacet; options: { value: string; count: number }[] }[];
  selected: Record<string, string[]>;
  onToggle: (key: string, value: string) => void;
  onClear: () => void;
  activeCount: number;
  resultCount: number;
  /** Focuses the Filters button on close (the drawer opens without a trigger). */
  returnFocus: () => void;
}

/**
 * Bottom drawer with checkbox groups for phones. Loaded on first open
 * (next/dynamic), so the drawer code stays out of the initial bundle.
 */
export default function MobileFilters({ open, onOpenChange, facets, selected, onToggle, onClear, activeCount, resultCount, returnFocus }: MobileFiltersProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="rounded-t-[2rem]"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocus();
        }}
      >
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-h3">{fc.drawerTitle}</DrawerTitle>
          <DrawerDescription>{fc.drawerText}</DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[50vh] space-y-6 overflow-y-auto px-4">
          {facets.map(({ facet, options }) => (
            <fieldset key={facet.key}>
              <legend className="mb-2 text-sm font-semibold">{facet.label}</legend>
              {options.map((o) => {
                const id = `m-${facet.key}-${o.value}`;
                return (
                  <label key={o.value} htmlFor={id} className="flex min-h-12 cursor-pointer items-center gap-3 border-b last:border-b-0">
                    <Checkbox id={id} checked={(selected[facet.key] ?? []).includes(o.value)} onCheckedChange={() => onToggle(facet.key, o.value)} className="size-5" />
                    <span className="flex-1">{o.value}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">{o.count}</span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
        <DrawerFooter className="flex-row gap-3">
          <Button variant="outline" className="flex-1" onClick={onClear} disabled={!activeCount}>
            {fc.clear}
          </Button>
          <DrawerClose asChild>
            <Button className="flex-1">{fc.apply(resultCount)}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
