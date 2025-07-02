'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { obtenerPublicaciones } from '../../api/publicacion/listarPublicacion'
import { eliminarPublicacion } from "../../api/publicacion/eliminarPublicacion"
import { eliminarArchivo } from "../../api/detalleCategoria/eliminarArchivo"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { traerArchivo } from "../../api/GestionArchivos/taerArchivos"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

export default function PublicacionList() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""
  const [publicaciones, setPublicaciones] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [imagen, setImagen] = useState<Record<number, string>>({})
  const itemsPerPage = 8

  useEffect(() => {
    async function fetchPublicaciones() {
      try {
        const data = await obtenerPublicaciones()
        setPublicaciones(data)
      } catch (error) {
        console.error("Error cargando publicaciones:", error)
      }
    }

    fetchPublicaciones()
  }, [])

  useEffect(() => {
    async function cargarImagenes() {
      const nuevasImagenes: Record<number, string> = {}

      for (const pub of publicaciones) {
        const entidad = "Publicacion";
        try {
          const data = await traerArchivo(entidad,pub.id)

          if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
            const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
            nuevasImagenes[pub.id] = `http://localhost:8080/${rutaNormalizada}`
          } else {
            console.warn(`No se encontró imagen para publicación ${pub.id}`)
          }

        } catch (error) {
          console.error(`Error cargando imagen para publicación ${pub.id}:`, error)
        }
      }

      setImagen(nuevasImagenes)
    }

    if (publicaciones.length > 0) {
      cargarImagenes()
    }
  }, [publicaciones])

  const filteredPublicaciones = publicaciones.filter(p =>
    p.titulo?.toLowerCase().includes(query)
  )

  const totalPages = Math.ceil(filteredPublicaciones.length / itemsPerPage)
  const paginated = filteredPublicaciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const [alertaExito, setAlertaExito] = useState(false)
  const [alertaMal, setAlertaMal] = useState(false)

  const handleDeleteProduct = async (id: number) => {
    try {
       const entidad = "Publicacion";
          const respuesta = await traerArchivo(entidad, id);
                    if (Array.isArray(respuesta) && respuesta.length > 0 && respuesta[0].id) {
                      await eliminarArchivo(respuesta[0].id);
                    }
      const response = await eliminarPublicacion(id)
      if (response?.status === 200 || response?.status === 201) {
        setProductToDelete(null)
        setAlertaExito(true)
        setTimeout(() => setAlertaExito(false), 4000)

        const actualizadas = await obtenerPublicaciones()
        setPublicaciones(actualizadas)
      } else {
        setAlertaMal(true)
        setTimeout(() => setAlertaMal(false), 4000)
      }
    } catch (error) {
      setAlertaMal(true)
      setTimeout(() => setAlertaMal(false), 4000)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {paginated.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
          <p className="text-muted-foreground">No se encontraron publicaciones</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginated.map((pub) => (
              <Card key={pub.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={imagen[pub.id] || "/imagen-defecto.png"}
                    alt={pub.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{pub.titulo}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Opciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/publicacion/${pub.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </a>
                        </DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setProductToDelete(pub.id)
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmar eliminación</DialogTitle>
                              <DialogDescription>
                                ¿Estás seguro de eliminar "{pub.titulo}"? Esta acción no se puede deshacer.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="destructive" onClick={() => handleDeleteProduct(pub.id)}>
                                  Eliminar
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mx-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Alertas */}
      <div className="hidden">
        <AlertDialog open={alertaExito}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-center">
                <DotLottieReact src="https://lottie.host/9228f5fe-70c8-4c17-99fc-4f8bac3a9f51/TF4TVTn8fU.lottie" autoplay />
              </AlertDialogTitle>
              <AlertDialogDescription className="flex justify-center">
                Se eliminó exitosamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="hidden">
        <AlertDialog open={alertaMal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-center">
                <DotLottieReact src="https://lottie.host/9547debb-f307-484a-9239-5d4bde96ea0c/jR3hqsBEyh.lottie" autoplay />
              </AlertDialogTitle>
              <AlertDialogDescription className="flex justify-center">
                Algo salió mal, inténtalo más tarde.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
