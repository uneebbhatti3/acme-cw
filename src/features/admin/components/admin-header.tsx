"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { adminCopy } from "@/features/admin/data/copy";
import { adminNav } from "@/features/admin/data/nav";

/** Top bar: sidebar toggle and the current section. Each page has its own h1 below. */
export function AdminHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Suspense fallback={<p className="text-base font-medium">{adminCopy.panelName}</p>}>
          <SectionName />
        </Suspense>
      </div>
    </header>
  );
}

function SectionName() {
  const pathname = usePathname();
  const section = [...adminNav].reverse().find((item) => pathname.startsWith(item.url))?.title ?? adminCopy.panelName;
  return <p className="text-base font-medium">{section}</p>;
}
