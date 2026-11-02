"use client";

import { IconCirclePlusFilled, IconInbox, type Icon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminCopy } from "@/features/admin/data/copy";

type NavItem = { title: string; url: string; icon: Icon; exact?: boolean };

/** The current path is runtime data, so the links render without an active item until it streams in. */
export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <Suspense fallback={<NavMainList items={items} pathname="" />}>
      <NavMainWithPath items={items} />
    </Suspense>
  );
}

function NavMainWithPath({ items }: { items: NavItem[] }) {
  return <NavMainList items={items} pathname={usePathname()} />;
}

function NavMainList({ items, pathname }: { items: NavItem[]; pathname: string }) {
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip={adminCopy.nav.addProduct}
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <Link href="/dashboard/products/new" onClick={close}>
                <IconCirclePlusFilled />
                <span>{adminCopy.nav.addProduct}</span>
              </Link>
            </SidebarMenuButton>
            <Button asChild size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <Link href="/dashboard/enquiries" onClick={close} aria-label={adminCopy.nav.inbox}>
                <IconInbox />
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const active = item.exact ? pathname === item.url : pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={active}>
                  <Link href={item.url} onClick={close} aria-current={active ? "page" : undefined}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
