"use client"

import * as React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState({
    name: "Usuario",
    email: "usuario@example.com",
    avatar: "/images/default-avatar.png",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && mounted) {
      setUserData({
        name: user.nombre,
        email: user.email,
        avatar: "/images/default-avatar.png",
      });
    }
  }, [user, mounted]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  const data = {
    user: userData,
    teams: [
      {
        name: "ManArt",
        logo: () => (
          <div className="bg-white rounded-lg p-1">
            <Image src="/logo.png" alt="ManArt" width={32} height={32} />
          </div>
        ),
        plan: "Dashboard",
      },
    ],
    navMain: [
      {
        title: "Home",
        url: "/dashboard",
        icon: Home,
        isActive: true,
        items: [],
      },
      {
        title: "Gestion de Perfil",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Editar Perfil",
            url: "/dashboard/perfil/",
          },
        ],
      },
      {
        title: "Gestión de Productos",
        url: "dashboard/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Listado de Productos",
            url: "/dashboard/productos",
          },
          {
            title: "Agregar Producto",
            url: "/dashboard/productos/nuevo",
          },
        ],
      },
      {
        title: "Gestión de Categorías",
        url: "/dashboard/categorias",
        icon: BookOpen,
        items: [
          {
            title: "Listado de Categorías",
            url: "/dashboard/categorias",
          },
          {
            title: "Agregar Categoría",
            url: "/dashboard/categorias/nuevo",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <TeamSwitcher teams={data.teams} />
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
