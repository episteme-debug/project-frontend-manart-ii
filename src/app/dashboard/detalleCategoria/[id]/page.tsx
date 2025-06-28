"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { CategoriasForm } from "@/components/detalleCategoria/categoria-from"
import { Toaster } from "@/components/ui/toaster"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

type Categoria = {
  idCategoria?: number
  nombreCategoria: string
  descripcionCategoria: string
  estadoCategoria?: boolean
  imagen?: string
}

export default function EditCategoriaPage() {
  const { id } = useParams()
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const obtenerCategoria = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/categoriaproducto/public/obtenercategoriaporid/${id}`
        )
        setCategoria(response.data)
      } catch (error) {
        console.error("Error al obtener la categoría:", error)
        setCategoria(null)
      } finally {
        setLoading(false)
      }
    }

    obtenerCategoria()
  }, [id])

  return (
    <SidebarInset>
      <header className="flex h-16 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/categorias">Categorías</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar Categoría</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold">Editar Categoría</h1>

          {loading ? (
            <p className="text-sm text-muted-foreground">Cargando datos...</p>
          ) : categoria ? (
            <CategoriasForm categoria={categoria} />
          ) : (
            <p className="text-sm text-destructive">No se encontró la categoría.</p>
          )}
        </div>
      </div>

      <Toaster />
    </SidebarInset>
  )
}
