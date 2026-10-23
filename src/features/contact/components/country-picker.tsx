"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState, type Ref } from "react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { contactCopy } from "@/features/contact/data/copy";
import { countries } from "@/features/contact/data/countries";
import { cn } from "@/lib/utils";

const f = contactCopy.form;

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
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            "flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-steel-dim bg-card px-4 text-left text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive",
            !value && "text-muted-foreground",
          )}
        >
          <span className="truncate">{value || f.countryPlaceholder}</span>
          <ChevronsUpDown aria-hidden className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] rounded-2xl p-0">
        <Command label={f.country}>
          <CommandInput placeholder={f.countrySearch} wrapperClassName="h-12 px-4" className="h-11 text-base" />
          <CommandList id={`${id}-list`} className="max-h-64 p-1">
            <CommandEmpty>{f.countryEmpty}</CommandEmpty>
            {countries.map((c) => (
              <CommandItem
                key={c}
                value={c}
                onSelect={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className="rounded-lg py-2"
              >
                <Check aria-hidden className={cn("size-4", value === c ? "opacity-100" : "opacity-0")} />
                {c}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
