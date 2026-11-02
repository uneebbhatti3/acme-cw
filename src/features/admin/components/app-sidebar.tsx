"use client";

import { IconBuildingFactory2 } from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { NavMain } from "@/features/admin/components/nav-main";
import { NavSecondary } from "@/features/admin/components/nav-secondary";
import { NavUser } from "@/features/admin/components/nav-user";
import { adminCopy } from "@/features/admin/data/copy";
import { adminNav } from "@/features/admin/data/nav";

export function AppSidebar({ admin, ...props }: React.ComponentProps<typeof Sidebar> & { admin: { name: string; email: string } }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/dashboard">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <IconBuildingFactory2 className="size-5!" />
                </span>
                <span className="grid leading-tight">
                  <span className="truncate text-sm font-semibold">{siteConfig.shortName}</span>
                  <span className="truncate text-xs text-muted-foreground">{adminCopy.panelName}</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminNav} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser admin={admin} />
      </SidebarFooter>
    </Sidebar>
  );
}
