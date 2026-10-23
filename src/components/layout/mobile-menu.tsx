"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import type { Category } from "@/features/products/types";
import { Logo } from "./logo";

export interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: (Pick<Category, "slug" | "name"> & { count: number })[];
  pathname: string;
  /** Focuses the menu button on close (the sheet opens without a SheetTrigger). */
  returnFocus: () => void;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Full-height slide-in menu below `lg`: large tap targets, the ranges, and the
 * contact button pinned at the bottom. Loaded on first open (next/dynamic), so
 * its dialog code stays out of the initial bundle.
 */
export default function MobileMenu({ open, onOpenChange, categories, pathname, returnFocus }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocus();
        }}
        className="surface-dark w-full gap-0 border-white/10 bg-night p-0 sm:max-w-md lg:hidden"
      >
        <SheetTitle className="sr-only">{layoutCopy.menuTitle}</SheetTitle>
        <div className="flex h-20 shrink-0 items-center justify-between px-6">
          <Logo onDark />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white" aria-label={layoutCopy.closeMenu}>
              <X aria-hidden className="size-6" strokeWidth={1.5} />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-6">
          <ul className="border-t border-border">
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-border">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-16 items-center font-display text-[1.75rem] leading-none text-silver aria-[current=page]:text-glow"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
                {item.href === "/products" && (
                  <ul className="-mt-1 grid grid-cols-2 gap-x-4 pb-4">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <SheetClose asChild>
                          <Link href={`/products/${c.slug}`} className="flex min-h-11 items-center text-[0.95rem] text-steel hover:text-white">
                            {c.name}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="shrink-0 border-t border-border p-6">
          <SheetClose asChild>
            <Button asChild variant="glow" size="lg" className="w-full">
              <Link href="/contact">{layoutCopy.contactButton}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
