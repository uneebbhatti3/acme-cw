"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/features/wishlist/context/wishlist-context";
import { useCart } from "@/features/cart/context/cart-context";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Categories", "/categories"],
  ["Manufacturing", "/manufacturing"],
  ["Quality", "/quality"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count: wishlistCount, mounted } = useWishlist();
  const { totalQuantity: cartCount } = useCart();

  const handleNavClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl">
      <div className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={handleNavClick}
            aria-label="Acme Commercial Ways home"
          >
            <Image
              src="/logo.png"
              alt="Acme Commercial Ways (Pvt) Ltd."
              width={150}
              height={90}
              priority
              className="h-auto w-29.5 sm:w-37.5"
            />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              onClick={handleNavClick}
            >
              <Search className="h-4.5 w-4.5" />
            </Link>

            <button
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 sm:grid"
              type="button"
            >
              <UserRound className="h-4.5 w-4.5" />
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              onClick={handleNavClick}
            >
              <Heart className="h-4.5 w-4.5" />

              {mounted && wishlistCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-teal-700 px-1 text-[9px] font-bold leading-none text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              onClick={handleNavClick}
            >
              <ShoppingBag className="h-4.5 w-4.5" />

              {mounted && cartCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-teal-700 px-1 text-[9px] font-bold leading-none text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 xl:hidden"
              onClick={() => setOpen((current) => !current)}
              type="button"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <CertificationBanner />

      {open ? (
        <nav className="border-b border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/5 xl:hidden">
          <div className="mx-auto max-w-7xl">
            {links.map(([label, href]) => (
              <Link
                onClick={handleNavClick}
                key={href}
                href={href}
                className="block border-b border-slate-100 py-3 text-sm font-medium text-slate-800 transition last:border-0 hover:text-teal-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function CertificationBanner() {
  return (
    <div className="border-b border-slate-200 bg-slate-50/90">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 overflow-hidden px-4 py-2 text-center sm:px-6 lg:px-8">
        <span className="h-2 w-2 shrink-0 rounded-full bg-teal-700" />

        <p className="truncate text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 sm:hidden">
          FDA Registered Firm
        </p>

        <p className="hidden truncate text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:block">
          FDA Registered Firm for Surgical, Dental, Veterinary, Manicure
          Instruments and Scissors
        </p>
      </div>
    </div>
  );
}
