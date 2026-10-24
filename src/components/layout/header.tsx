"use client";

import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import type { Category } from "@/features/products/types";
import { isActive } from "@/lib/nav";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { Logo } from "./logo";

export type NavCategory = Pick<Category, "slug" | "name" | "description">;

interface HeaderProps {
  categories: NavCategory[];
}

const navItem =
  "relative inline-flex h-10 items-center rounded-md px-3 text-[0.9375rem] font-medium text-[color:var(--hdr-fg-soft)] transition-colors hover:bg-[var(--hdr-hover)] hover:text-[color:var(--hdr-fg)] focus-visible:outline-2 focus-visible:outline-[var(--hdr-ring)] aria-[current=page]:text-[color:var(--hdr-fg)] aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-[15px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-teal xl:px-3.5";

export function Header(props: HeaderProps) {
  return <HeaderBar {...props} pathname={usePathname()} />;
}

/**
 * Fixed header, transparent over the navy page hero and solid white once the
 * page scrolls (or from the start on pages that open on a light background,
 * marked with `data-solid-header`; see `.site-header` in globals.css). Logo, main navigation (Products opens the range
 * dropdown from its chevron, the label itself is a link), the Request a Quote
 * button and a slide-in menu below `lg`. Without the pathname hook, so it can
 * be the Suspense fallback for routes known only at request time.
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
    <header data-scrolled={scrolled || undefined} className="site-header fixed inset-x-0 top-0 z-50 border-b">
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo className="site-logo" />

        <NavigationMenu viewport={false} aria-label="Main" className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              const link = (
                <NavigationMenuLink asChild active={active} className={navItem}>
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              );
              if (!("menu" in item)) return <NavigationMenuItem key={item.href}>{link}</NavigationMenuItem>;
              return (
                <NavigationMenuItem key={item.href} className="flex items-center">
                  {link}
                  <NavigationMenuPrimitive.Trigger
                    aria-label={layoutCopy.showRanges}
                    className="group -ml-1.5 inline-flex size-8 items-center justify-center rounded-md text-[color:var(--hdr-fg-soft)] hover:bg-[var(--hdr-hover)] hover:text-[color:var(--hdr-fg)] focus-visible:outline-2 focus-visible:outline-[var(--hdr-ring)] data-[state=open]:text-[color:var(--hdr-fg)]"
                  >
                    <ChevronDown aria-hidden className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuContent className="left-0 top-[calc(100%+14px)] rounded-lg border bg-white p-0 shadow-[var(--shadow-lift)] md:w-[min(720px,calc(100vw-2rem))]">
                    <ProductsMenu categories={categories} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" size="sm" className="h-11 px-4 sm:px-5">
            <Link href={siteConfig.quoteHref}>
              <span className="sm:hidden">{layoutCopy.quoteShort}</span>
              <span className="hidden sm:inline">{layoutCopy.quoteButton}</span>
            </Link>
          </Button>
          <MobileMenu categories={categories} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function ProductsMenu({ categories }: HeaderProps) {
  return (
    <div className="grid grid-cols-[1fr_14rem]">
      <ul className="grid grid-cols-2 gap-1 p-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <NavigationMenuLink asChild className="block rounded-md px-3 py-2.5 hover:bg-grey-50 focus:bg-grey-50">
              <Link href={`/products/${c.slug}`}>
                <span className="block text-sm font-semibold text-navy">{c.name}</span>
                <span className="mt-0.5 line-clamp-2 block text-[0.8125rem] leading-snug text-muted-foreground">{c.description}</span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between gap-6 rounded-r-lg border-l bg-grey-50 p-5">
        <div>
          <p className="text-sm font-semibold text-navy">{layoutCopy.megaTitle}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{layoutCopy.megaIntro}</p>
        </div>
        <div className="grid gap-2">
          <NavigationMenuLink asChild className="inline-flex items-center gap-1.5 p-0 text-sm font-semibold text-link hover:underline">
            <Link href="/products">
              {layoutCopy.allProducts}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className="inline-flex items-center gap-1.5 p-0 text-sm font-semibold text-link hover:underline">
            <Link href="/manufacturing#oem">{layoutCopy.oemLink}</Link>
          </NavigationMenuLink>
        </div>
      </div>
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
        className="text-[color:var(--hdr-fg)] hover:bg-[var(--hdr-hover)] hover:text-[color:var(--hdr-fg)] lg:hidden"
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
        <Menu aria-hidden className="size-6" strokeWidth={1.75} />
      </Button>
      {loaded && (
        <MobileMenuSheet
          open={open}
          onOpenChange={setOpen}
          categories={categories}
          pathname={pathname}
          returnFocus={() => buttonRef.current?.focus()}
        />
      )}
    </>
  );
}
