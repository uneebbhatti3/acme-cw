import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ProductCategory } from "@/features/categories/types/category";

export function CategoryProductsEmptyState({ category }: { category: ProductCategory }) {
  const Icon = category.icon;

  return (
    <Card className="mt-10 rounded-[2rem] border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
        <Icon className="h-7 w-7 text-teal-700" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{category.count}+ profiles available</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
        The complete catalog for this category is available on request. Send your requirements and our team will provide specifications, pricing, and availability.
      </p>
      <Link href="/contact">
        <Button className="mt-6 rounded-full">Request catalog <ArrowRight className="h-4 w-4" /></Button>
      </Link>
    </Card>
  );
}
