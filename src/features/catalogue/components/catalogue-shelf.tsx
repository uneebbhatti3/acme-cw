"use client";

import { BookOpen, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { coverUrl, type Catalogue } from "@/features/catalogue/data/catalogues";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { CatalogueRequestDialog } from "./catalogue-request-dialog";

/** The viewer brings three.js, so it loads only when a catalogue is opened. */
const Flipbook = dynamic(() => import("./flipbook"), { ssr: false });

export function CatalogueShelf({ catalogues }: { catalogues: Catalogue[] }) {
  const [open, setOpen] = useState<Catalogue | null>(null);
  const [requesting, setRequesting] = useState<Catalogue | null>(null);

  return (
    // Marks the page as protected, which blanks it when printed. See globals.css.
    <div data-protected-content>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        {catalogues.map((catalogue) => (
          <li key={catalogue.slug}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={catalogueCopy.open(catalogue.title)}
              onClick={() => setOpen(catalogue)}
              className="group block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span className="relative block aspect-[17/22] overflow-hidden rounded-lg border bg-white transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
                <Image src={coverUrl(catalogue.slug)} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-contain" />
                <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-navy/20 to-transparent" />
                <span aria-hidden className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-lg bg-navy/85 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <BookOpen className="size-4" strokeWidth={1.75} />
                </span>
              </span>
              <span className="mt-4 block font-medium">{catalogue.title}</span>
            </button>
            <p className="mt-0.5 text-sm text-muted-foreground">{catalogueCopy.pages(catalogue.pages)}</p>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={catalogueCopy.requestNamed(catalogue.title)}
              onClick={() => setRequesting(catalogue)}
              className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link hover:underline"
            >
              <Mail aria-hidden className="size-4" strokeWidth={1.75} />
              {catalogueCopy.requestPdf}
            </button>
          </li>
        ))}
      </ul>
      {open && <Flipbook key={open.slug} catalogue={open} onClose={() => setOpen(null)} onRequest={() => setRequesting(open)} />}
      {requesting && <CatalogueRequestDialog key={requesting.slug} catalogue={requesting} onClose={() => setRequesting(null)} />}
    </div>
  );
}
