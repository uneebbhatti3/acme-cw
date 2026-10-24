"use client";

import { ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState, type Ref } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { quoteCopy } from "@/features/quote/data/copy";
import { cn } from "@/lib/utils";

const f = quoteCopy.fields;
const loadCountryList = () => import("./country-list");
const CountryList = dynamic(loadCountryList, {
  ssr: false,
  loading: () => <p className="p-4 text-sm text-muted-foreground">{f.countrySearch}…</p>,
});

/**
 * Searchable country list (Popover + Command). The trigger is a combobox
 * button tied to the field label; type to filter, arrows to move, Enter to pick.
 */
export function CountryPicker({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  buttonRef,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid?: boolean;
  describedBy?: string;
  /** Lets the form focus this field when it is invalid. */
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);

  // Fetch the list once the page is idle, so it is ready before anyone opens the picker.
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => void loadCountryList());
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => void loadCountryList(), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) onBlur();
      }}
    >
      <PopoverTrigger asChild>
        <button
          ref={buttonRef}
          onPointerEnter={loadCountryList}
          onFocus={loadCountryList}
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-input bg-white px-3.5 text-left text-base outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive",
            !value && "text-muted-foreground",
          )}
        >
          <span className="truncate">{value || f.countryPlaceholder}</span>
          <ChevronsUpDown aria-hidden className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] rounded-lg p-0">
        <CountryList
          listId={`${id}-list`}
          value={value}
          onPick={(c) => {
            onChange(c);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
