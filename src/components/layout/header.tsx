"use client";

import { ArrowRight, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

const loadMobileMenu = () => import("./mobile-menu");
const MobileMenuSheet = dynamic(loadMobileMenu, { ssr: false });

/** Menu button below `lg`. The sheet code loads on first open (prefetched on hover or focus). */
function MobileMenu({ categories, pathname }: HeaderProps & { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 hover:text-white lg:hidden"
        aria-label={layoutCopy.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={loadMobileMenu}
        onFocus={loadMobileMenu}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        <Menu aria-hidden className="size-6" strokeWidth={1.5} />
      </Button>
      {loaded && (
        <MobileMenuSheet open={open} onOpenChange={setOpen} categories={categories} pathname={pathname} returnFocus={() => buttonRef.current?.focus()} />
      )}
    </>
  );
}
