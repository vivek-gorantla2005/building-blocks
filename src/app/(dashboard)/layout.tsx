"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <SidebarInset className="flex-1 bg-accent/20 p-6">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
