import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex h-full flex-col">
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
