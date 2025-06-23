import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider";
import { ProveedorUsuario } from "@/contexts/UsuarioContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ProveedorUsuario>
        {children}
      </ProveedorUsuario>
    </SidebarProvider>
  );
}
