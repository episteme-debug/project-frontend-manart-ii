"use client";

import "@/globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-screen bg-gray-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex h-full">
              <aside className="w-64 bg-white border-r">
                <AppSidebar />
              </aside>

              {/* Aquí el truco: 
                  - justify-center = centra horizontal 
                  - items-center = centra vertical
                  - p-6 = padding interno */}
              <main className="flex-1 flex justify-center items-center p-6">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
