"use client";

import { Check } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { contactCopy } from "@/features/contact/data/copy";
import { countries } from "@/features/contact/data/countries";
import { cn } from "@/lib/utils";

const f = contactCopy.form;

/** Searchable country list shown inside the picker's popover. Loaded when the popover first opens. */
export default function CountryList({ listId, value, onPick }: { listId: string; value: string; onPick: (country: string) => void }) {
  return (
    <Command label={f.country}>
      {/* Takes focus when it mounts (the list may load just after the popover opens). */}
      <CommandInput autoFocus placeholder={f.countrySearch} wrapperClassName="h-12 px-4" className="h-11 text-base" />
      <CommandList id={listId} className="max-h-64 p-1">
        <CommandEmpty>{f.countryEmpty}</CommandEmpty>
        {countries.map((c) => (
          <CommandItem key={c} value={c} onSelect={() => onPick(c)} className="rounded-lg py-2">
            <Check aria-hidden className={cn("size-4", value === c ? "opacity-100" : "opacity-0")} />
            {c}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
