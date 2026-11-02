"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { adminCopy } from "@/features/admin/data/copy";
import { deleteProduct } from "@/features/admin/lib/product-client";
import type { ProductRow } from "@/features/admin/types";

const c = adminCopy.products;

/** Confirms, then deletes through the API. It stays open while deleting, and shows any error. */
export function DeleteProductDialog({ product, onClose }: { product: ProductRow | null; onClose: () => void }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    if (pending) return;
    setError(null);
    onClose();
  };

  const confirm = async () => {
    if (!product) return;
    setPending(true);
    setError(null);
    const result = await deleteProduct(product.id);
    setPending(false);
    if (!result.ok && result.status === 401) return router.replace("/admin/login");
    // A 404 means it is already gone, so the list just needs refreshing.
    if (!result.ok && result.status !== 404) return setError(result.message);
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle>{c.delete}</DialogTitle>
              <DialogDescription>{c.deleteConfirm(product.name)}</DialogDescription>
            </DialogHeader>
            {error && (
              <p role="alert" className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" size="sm" onClick={close} disabled={pending}>
                {adminCopy.form.cancel}
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={confirm} disabled={pending}>
                {pending && <Spinner aria-hidden />}
                {pending ? c.deleting : c.delete}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
