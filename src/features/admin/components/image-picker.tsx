"use client";

import { IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ImagePickerEmpty } from "@/features/admin/components/states/image-picker-empty";
import { adminCopy } from "@/features/admin/data/copy";
import { imageRules } from "@/features/admin/lib/media";
import { cn } from "@/lib/utils";

const c = adminCopy.form;

/**
 * File input with a preview. Size and type are checked on selection for quick
 * feedback; the server checks again. `onError` reports a problem to the form.
 */
export function ImagePicker({
  id,
  currentUrl,
  invalid,
  describedBy,
  onError,
}: {
  id: string;
  currentUrl?: string;
  invalid?: boolean;
  describedBy?: string;
  onError: (message: string | null) => void;
}) {
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => () => (preview ? URL.revokeObjectURL(preview.url) : undefined), [preview]);

  const choose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return setPreview(null);
    if (!imageRules.accept.split(",").includes(file.type)) {
      e.target.value = "";
      setPreview(null);
      return onError(c.errors.imageType);
    }
    if (file.size > imageRules.maxMb * 1024 * 1024) {
      e.target.value = "";
      setPreview(null);
      return onError(c.errors.imageSize);
    }
    onError(null);
    setPreview({ url: URL.createObjectURL(file), name: file.name });
  };

  const shown = preview?.url ?? currentUrl;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div
        className={cn(
          "flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-grey-50",
          invalid && "border-destructive",
        )}
      >
        {shown ? (
          // A local preview (blob: URL), so next/image does not apply.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt={c.imagePreview} className="size-full object-contain" />
        ) : (
          <ImagePickerEmpty />
        )}
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2">
        <input
          id={id}
          name="image"
          type="file"
          accept={imageRules.accept}
          onChange={choose}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="peer sr-only"
        />
        <label
          htmlFor={id}
          className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-md border border-input px-4 text-sm font-medium hover:bg-secondary peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40 peer-focus-visible:border-ring"
        >
          <IconUpload className="size-4" />
          {shown ? c.imageChange : c.imageChoose}
        </label>
        {(preview || currentUrl) && (
          <p className="max-w-full truncate text-sm text-muted-foreground">{preview?.name ?? c.imageKeep}</p>
        )}
      </div>
    </div>
  );
}
