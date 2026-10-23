"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { productsCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";
import type { Category } from "@/features/products/types";
import { Container } from "./container";
import { Logo } from "./logo";

interface HeaderProps {
  /** `count` is the size of the full range. */
  categories: (Pick<Category, "slug" | "name" | "placeholderKind"> & { count: number })[];
}

/** Routes whose top section is light, so the header is solid from the start. */
function startsLight(pathname: string) {
  return pathname === "/" || /^\/products\/[^/]+\/[^/]+/.test(pathname);
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header(props: HeaderProps) {
  return <HeaderBar {...props} pathname={usePathname()} />;
}

/**
 * Header without the pathname hook. Used as the Suspense fallback for routes
 * whose path is only known at request time.
 */
export function HeaderBar({ categories, pathname }: HeaderProps & { pathname: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Category thumbnails render after the menu first opens, keeping every page light.
  const [megaUsed, setMegaUsed] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const solid = scrolled || megaOpen || startsLight(pathname);
  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaUsed(true);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-white/92 text-ink shadow-[0_1px_0_var(--steel-100),0_8px_24px_rgb(11_22_32/0.05)] backdrop-blur-md"
          : "bg-transparent text-white",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo onDark={!solid} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              const linkClass = cn(
                "relative inline-flex h-11 items-center px-3 text-[0.95rem] font-medium transition-colors",
                solid ? "text-steel-900 hover:text-ink" : "text-steel-100 hover:text-white",
              );
              const indicator = (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-px origin-left bg-accent transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              );
              if (item.href !== "/products") {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                      {item.label}
                      {indicator}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href} onMouseEnter={openMega} onMouseLeave={closeMegaSoon} className="flex items-center">
                  <Link href={item.href} className={cn(linkClass, "pr-1")} aria-current={active ? "page" : undefined}>
                    {item.label}
                    {indicator}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    aria-label={`${item.label}: ${layoutCopy.rangesMenu}`}
                    onClick={() => (megaOpen ? setMegaOpen(false) : openMega())}
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-full transition-colors",
                      solid ? "hover:bg-steel-100" : "hover:bg-white/10",
                    )}
                  >
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.5}
                      className={cn("size-4 transition-transform", megaOpen && "rotate-180")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={buttonClasses({ size: "sm", className: "hidden sm:inline-flex" })}>
            {layoutCopy.contactButton}
          </Link>
          <button
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] lg:hidden",
              solid ? "hover:bg-steel-100" : "hover:bg-white/10",
            )}
            aria-label={layoutCopy.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu aria-hidden className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </Container>

      {/* Desktop mega-menu */}
      <div
        id="mega-menu"
        ref={megaRef}
        hidden={!megaOpen}
        onMouseEnter={openMega}
        onMouseLeave={closeMegaSoon}
        className="absolute inset-x-0 top-full hidden border-t border-steel-100 bg-white text-ink shadow-[var(--shadow-lift)] lg:block"
      >
        <Container className="grid grid-cols-12 gap-8 py-8">
          <div className="col-span-3 flex flex-col justify-between border-r border-steel-100 pr-8">
            <div>
              <p className="font-display text-2xl">{productsCopy.categoriesTitle}</p>
              <p className="mt-2 text-sm text-steel-600">{layoutCopy.megaIntro}</p>
            </div>
            <Link href="/products" className="link-draw mt-6 self-start text-sm font-medium text-accent-strong">
              {layoutCopy.allProducts}
            </Link>
          </div>
          <ul className="col-span-9 grid grid-cols-3 gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group flex items-center gap-4 rounded-[10px] p-2 transition-colors hover:bg-paper"
                >
                  <span className="block aspect-[3/2] w-24 shrink-0 overflow-hidden rounded-md border border-steel-100 bg-steel-100">
                    {megaUsed && <PlaceholderImage as="span" kind={c.placeholderKind} ratio="3/2" seed={c.slug} />}
                  </span>
                  <span>
                    <span className="block font-medium group-hover:text-accent-strong">{c.name}</span>
                    <span className="block text-sm text-steel-600">{productsCopy.rangeLabel(c.count)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} categories={categories} pathname={pathname} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  categories,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  categories: HeaderProps["categories"];
  pathname: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handle = () => onCloseRef.current();
    d.addEventListener("close", handle);
    return () => d.removeEventListener("close", handle);
  }, []);

  return (
    <dialog
      ref={ref}
      id="mobile-menu"
      aria-label={layoutCopy.menu}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-ink p-0 text-white open:flex open:flex-col lg:hidden"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-6">
        <Logo onDark />
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={layoutCopy.closeMenu}
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] hover:bg-white/10"
        >
          <X aria-hidden className="size-6" strokeWidth={1.5} />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-6">
        <ul className="border-t border-white/10">
          {siteConfig.nav.map((item) => (
            <li key={item.href} className="border-b border-white/10">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="flex min-h-16 items-center font-display text-[1.75rem] leading-none aria-[current=page]:text-accent"
              >
                {item.label}
              </Link>
              {item.href === "/products" && (
                <ul className="-mt-1 grid grid-cols-2 gap-x-4 pb-4">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/products/${c.slug}`}
                        className="flex min-h-11 items-center text-[0.95rem] text-steel-300 hover:text-white"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="shrink-0 border-t border-white/10 p-6">
        <Link href="/contact" className={buttonClasses({ className: "w-full" })}>
          {layoutCopy.contactButton}
        </Link>
      </div>
    </dialog>
  );
}
