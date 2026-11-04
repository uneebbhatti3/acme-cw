"use client";

import dynamic from "next/dynamic";

/*
 * ProductSearch in its own chunk, loaded when a search box renders. Without
 * this, the command palette (cmdk) shipped with every page: the root
 * not-found page uses it (Next bundles that boundary everywhere), and link
 * prefetching of /products loaded and ran it on pages with no search at all.
 * The field is still server-rendered, so nothing shifts while the code loads.
 */

const field = () => <div className="h-12 rounded-md border bg-white" aria-hidden />;

export const LazyProductSearch = dynamic(() => import("./product-search").then((m) => m.ProductSearch), { loading: field });

export const LazyProductSearchFromUrl = dynamic(() => import("./product-search").then((m) => m.ProductSearchFromUrl), { loading: field });
