"use client";

import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SizesInputEmpty } from "@/features/admin/components/states/sizes-input-empty";
import { adminCopy } from "@/features/admin/data/copy";

const c = adminCopy.form;

/** A list of sizes entered one at a time. Each size is posted as its own `sizes` field. */
export function SizesInput({
  id,
  defaultValue = [],
  invalid,
  describedBy,
}: {
  id: string;
  defaultValue?: string[];
  invalid?: boolean;
  describedBy?: string;
}) {
  const [sizes, setSizes] = useState(defaultValue);
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim().slice(0, 40);
    if (value && !sizes.includes(value)) setSizes([...sizes, value]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          placeholder={c.sizesInput}
          maxLength={40}
          className="h-10"
        />
        <Button type="button" variant="outline" size="sm" onClick={add} disabled={!draft.trim()}>
          <IconPlus />
          {c.sizesAdd}
        </Button>
      </div>
      {sizes.length === 0 ? (
        <SizesInputEmpty />
      ) : (
        <ul className="flex flex-wrap gap-2" aria-label={c.sizes.replace(" *", "")}>
          {sizes.map((size) => (
            <li key={size} className="flex items-center gap-1 rounded-md border bg-secondary py-1 pr-1 pl-2.5 text-sm">
              {size}
              <input type="hidden" name="sizes" value={size} />
              <button
                type="button"
                onClick={() => setSizes(sizes.filter((s) => s !== size))}
                aria-label={c.sizesRemove(size)}
                className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <IconX className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
