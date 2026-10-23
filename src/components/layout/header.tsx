"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { productsCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";
import type { Category } from "@/features/products/types";
import { Logo } from "./logo";

interface HeaderProps {
  /** `count` is the size of the full range. */
  categories: (Pick<Category, "slug" | "name" | "placeholderKind"> & { count: number })[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const navItem =
  "inline-flex h-10 flex-row items-center rounded-full bg-transparent px-4 py-0 text-[0.92rem] font-medium text-steel transition-colors hover:bg-white/8 hover:text-white focus:bg-white/8 focus:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function Header(props: HeaderProps) {
  return <HeaderBar {...props} pathname={usePathname()} />;
}

/**
 * Floating glass pill: logo, main navigation with a Products mega-menu,
 * contact button, and a slide-in menu below `lg`. Without the pathname hook,
 * so it can be the Suspense fallback for routes known only at request time.
 */
export function HeaderBar({ categories, pathname }: HeaderProps & { pathname: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-4">
      <div
        className={cn(
          "surface-dark glass pointer-events-auto mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-shadow duration-300 md:pl-6",
          scrolled && "shadow-[0_14px_44px_-14px_rgb(0_0_0/0.65)]",
        )}
      >
        <Logo onDark />

        <NavigationMenu viewport={false} aria-label="Main" className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.href === "/products") {
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        navItem,
                        "data-[state=open]:bg-white/10 data-[state=open]:text-white",
                        active && "text-white",
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="surface-dark left-1/2 -translate-x-1/2 p-0 md:w-[min(760px,calc(100vw-2rem))]">
                      <MegaMenu categories={categories} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    active={active}
                    className={cn(navItem, "data-[active=true]:bg-white/10 data-[active=true]:text-white")}
                  >
                    <Link href={item.href} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <Button asChild variant="glow" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">{layoutCopy.contactButton}</Link>
          </Button>
          <MobileMenu categories={categories} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MegaMenu({ categories }: HeaderProps) {
  return (
    <div className="grid grid-cols-[13rem_1fr] gap-2 p-3">
      <div className="flex flex-col justify-between rounded-2xl bg-white/[0.04] p-5">
        <div>
          <p className="font-display text-xl text-white">{layoutCopy.megaTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layoutCopy.megaIntro}</p>
        </div>
        <NavigationMenuLink
          asChild
          className="mt-6 inline-flex flex-row items-center gap-2 p-0 text-sm font-semibold text-link hover:bg-transparent hover:text-white focus:bg-transparent"
        >
          <Link href="/products">
            {layoutCopy.allProducts}
            <ArrowRight aria-hidden className="size-4 text-current" />
          </Link>
        </NavigationMenuLink>
      </div>
      <ul className="grid grid-cols-2 gap-1">
        {categories.map((c) => (
          <li key={c.slug}>
            <NavigationMenuLink
              asChild
              className="group/cat flex-row items-center gap-3 rounded-2xl p-2 hover:bg-white/[0.06] focus:bg-white/[0.06]"
            >
              <Link href={`/products/${c.slug}`}>
                <span className="block w-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
                  <PlaceholderImage as="span" kind={c.placeholderKind} ratio="3/2" tone="ink" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-snug text-silver group-hover/cat:text-white">
                    {c.name}
                  </span>
                  <span className="block text-xs text-steel-dim">{productsCopy.rangeLabel(c.count)}</span>
                </span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({ categories, pathname }: HeaderProps & { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={layoutCopy.openMenu}
        >
          <Menu aria-hidden className="size-6" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        className="surface-dark w-full gap-0 border-white/10 bg-night p-0 sm:max-w-md lg:hidden"
      >
        <SheetTitle className="sr-only">{layoutCopy.menuTitle}</SheetTitle>
        <div className="flex h-20 shrink-0 items-center justify-between px-6">
          <Logo onDark />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white"
              aria-label={layoutCopy.closeMenu}
            >
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
                          <Link
                            href={`/products/${c.slug}`}
                            className="flex min-h-11 items-center text-[0.95rem] text-steel hover:text-white"
                          >
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
