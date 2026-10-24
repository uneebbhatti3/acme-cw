"use client";

import { Mail, Phone, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { primaryEmail, siteConfig, telHref } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import type { NavCategory } from "./header";
import { isActive } from "@/lib/nav";
import { Logo } from "./logo";

export interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: NavCategory[];
  pathname: string;
  /** Focuses the menu button on close (the sheet opens without a SheetTrigger). */
  returnFocus: () => void;
}

/**
 * Full-height slide-in menu below `lg`: 56px tap targets, the product ranges,
 * a quote button and one-tap call and email. Loaded on first open
 * (next/dynamic), so its dialog code stays out of the initial bundle.
 */
export default function MobileMenu({ open, onOpenChange, categories, pathname, returnFocus }: MobileMenuProps) {
  const phone = siteConfig.contact.phones[0].number;
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
        className="w-full gap-0 bg-white p-0 sm:max-w-md lg:hidden"
      >
        <SheetTitle className="sr-only">{layoutCopy.menuTitle}</SheetTitle>
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b px-4 sm:px-6">
          <Logo />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-navy" aria-label={layoutCopy.closeMenu}>
              <X aria-hidden className="size-6" strokeWidth={1.75} />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
          <ul>
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center text-lg font-semibold text-navy aria-[current=page]:text-teal-deep"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
                {"menu" in item && (
                  <ul className="-mt-1 grid gap-x-4 pb-3 min-[400px]:grid-cols-2">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <SheetClose asChild>
                          <Link href={`/products/${c.slug}`} className="flex min-h-11 items-center text-[0.9375rem] text-muted-foreground hover:text-navy">
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
          <div className="mt-6 grid gap-1 text-[0.9375rem]">
            <a href={telHref(phone)} className="flex min-h-11 items-center gap-3 text-navy">
              <Phone aria-hidden className="size-4 text-teal-deep" />
              {phone}
            </a>
            <a href={`mailto:${primaryEmail}`} className="flex min-h-11 items-center gap-3 break-all text-navy">
              <Mail aria-hidden className="size-4 shrink-0 text-teal-deep" />
              {primaryEmail}
            </a>
          </div>
        </nav>
        <div className="shrink-0 border-t p-4 sm:p-6">
          <SheetClose asChild>
            <Button asChild variant="accent" size="lg" className="w-full">
              <Link href={siteConfig.quoteHref}>{layoutCopy.quoteButton}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
