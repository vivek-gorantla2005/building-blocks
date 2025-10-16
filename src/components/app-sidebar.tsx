"use client";
import { authClient } from "@/lib/auth-client";
import {
  FolderOpen,
  LogOutIcon,
  CreditCardIcon,
  KeyIcon,
  HistoryIcon,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItem = [
  {
    title: "Home",
    items: [
      { title: "Workflows", icon: FolderOpen, url: "/workflows" },
      { title: "Credentials", icon: KeyIcon, url: "/credentials" },
      { title: "Executions", icon: HistoryIcon, url: "/executions" },
    ],
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      {/* --- Sidebar Header --- */}
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-4 px-2"
        >
          <Image
            src="/logos/logo.svg"
            alt="Building Blocks Logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-lg font-bold tracking-tight">
            Building Blocks
          </span>
        </Link>
      </SidebarHeader>

      {/* --- Sidebar Content --- */}
      <SidebarContent>
        {menuItem.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* --- Sidebar Footer --- */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Upgrade to Pro */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Upgrade to Pro"
              className="text-primary font-medium hover:bg-primary/10 transition"
            >
              <Link
                href="/upgrade"
                className="flex items-center gap-2 text-primary"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Upgrade to Pro</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Billing */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Billing">
              <Link href="/billing" className="flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                <span>Billing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>{
                        router.push("/login")
                    }
                }
              })}
              tooltip="Logout"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
