'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { obtenerCategorias } from '../../api/detalleCategoria/listarCategorias'
import { eliminarCategoria } from "../../api/detalleCategoria/eliminarCategoria"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { traerimagenCategoria } from '../../api/detalleCategoria/traerimagenCategoria'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

export default function CategoriaList() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""
  const [cart, setCart] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [imagen, setimagen] = useState<Record<number, string>>({})
  const itemsPerPage = 8

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await obtenerCategorias()
        setCart(data)
      } catch (error) {
        console.error("Error cargando categorías:", error)
      }
    }

    fetchCategorias()
  }, [])

  useEffect(() => {
    async function cargarImagenes() {
      const nuevasImagenes: Record<number, string> = {}

      for (const cat of cart) {
        try {
          const data = await traerimagenCategoria(cat.idCategoria)

          if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
            const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
            nuevasImagenes[cat.idCategoria] = `http://localhost:8080/${rutaNormalizada}`
          } else {
            console.warn(`No se encontró imagen para categoría ${cat.idCategoria}`)
          }

        } catch (error) {
          console.error(`Error cargando imagen para categoría ${cat.idCategoria}:`, error)
        }
      }

      setimagen(nuevasImagenes)
    }

    if (cart.length > 0) {
      cargarImagenes()
    }
  }, [cart])


  const filteredCart = cart.filter(c =>
    c.nombreCategoria.toLowerCase().includes(query)
  )

  const totalPages = Math.ceil(filteredCart.length / itemsPerPage)
  const paginated = filteredCart.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const [alertaExioto, setalertaExioto] = useState(false)
  const [alertaMal,setalertaMal] = useState(false)
 const handleDeleteProduct = async (id: number) => {
  try {
    const response = await eliminarCategoria(id);
console.log(response?.status)
    if (response?.status === 200 || response?.status === 201) {
      setProductToDelete(null);
      setalertaExioto(true);
      if (true) {
        setTimeout(() => {
          setalertaExioto(false);
        }, 4000);
      }
      const categoriasActualizadad = await obtenerCategorias();
      setCart(categoriasActualizadad)
    } else {
      setalertaMal(true);
      if (true) {
        setTimeout(() => {
          setalertaMal(false);
        }, 4000);
      }
    }

  } catch (error) {
   setalertaMal(true);
    if (true) {
      setTimeout(() => {
        setalertaMal(false);
      }, 4000);
    }
  }
};




  return (
    <div className="flex flex-col gap-6">
      {paginated.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
          <p className="text-muted-foreground">No se encontraron categorías</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginated.map((cat) => (
              <Card key={cat.idCategoria} className="overflow-hidden  ">
                <div className="relative h-48 w-full ">
                  <Image
                    src={imagen[cat.idCategoria] || "/imagen-defecto.png"}
                    alt={cat.nombreCategoria}
                    fill
                    className="object-cover"
                  />


                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{cat.nombreCategoria}</h3>
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
                          <a href={`/dashboard/detalleCategoria/${cat.idCategoria}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </a>
                        </DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setProductToDelete(cat.idCategoria)
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
                                ¿Estás seguro de eliminar "{cat.nombreCategoria}"? Esta acción no se puede deshacer.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="destructive" onClick={() => handleDeleteProduct(cat.idCategoria)}>
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
            <div className='hidden'>
              <AlertDialog open={alertaExioto} >
                <AlertDialogTrigger asChild>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='flex justify-center'>
                      <DotLottieReact
                        src="https://lottie.host/9228f5fe-70c8-4c17-99fc-4f8bac3a9f51/TF4TVTn8fU.lottie"
                        autoplay
                      /></AlertDialogTitle>
                    <AlertDialogDescription className='flex justify-center'>
                      Se elimino exitizamente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className='hidden'>
              <AlertDialog open={alertaMal} >
                <AlertDialogTrigger asChild>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='flex justify-center'>
                      <DotLottieReact
                        src="https://lottie.host/9547debb-f307-484a-9239-5d4bde96ea0c/jR3hqsBEyh.lottie"
                        autoplay
                      /></AlertDialogTitle>
                    <AlertDialogDescription className='flex justify-center'>
                      Algo salio mal intetalo despues.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
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
    </div>
  )
}
