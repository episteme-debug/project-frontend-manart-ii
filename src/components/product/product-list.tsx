"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { ListarProductosPorUsuario, EliminarProducto } from "@/api/Producto"
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export function ProductList() {
  const [productos, setProductos] = useState<ProductoRespuesta[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState<ProductoRespuesta | null>(null)

  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  const itemsPerPage = 8

  // 🧠 Cargar productos una vez al montar
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosDesdeApi = await ListarProductosPorUsuario()
        if (productosDesdeApi != null) {
          setProductos(productosDesdeApi)
        }
      } catch (error) {
        console.error("Error al cargar productos:", error)
      }
    }

    cargarProductos()
  }, [])

  const filteredProducts = useMemo(() => {
    return productos.filter(product =>
      product.nombreProducto.toLowerCase().includes(query)
    )
  }, [productos, query])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  const handleDeleteProduct = async (id: number) => {
    try {
      await EliminarProducto(id)
      const actualizados = await ListarProductosPorUsuario()
      if (actualizados != null) {
        setProductos(actualizados)
      }
      setProductToDelete(null)
    } catch (error) {
      console.error("Error al eliminar producto:", error)
      alert("Error al eliminar el producto. Inténtalo de nuevo.")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {paginatedProducts.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
          <p className="text-muted-foreground">No se encontraron productos</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <Card key={product.idProducto} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      product.listaArchivos.length > 0
                        ? `/static/${product.listaArchivos[0].ruta.replace(/^\/+/, "")}`
                        : "/images/ImagenProductoPorDefecto.jpg"
                    }
                    alt={product.nombreProducto}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.nombreProducto}</h3>
                      <p className="text-sm text-muted-foreground">${product.precioProducto.toFixed(2)}</p>
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
                          <a href={`/dashboard/productos/${product.idProducto}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault()
                            setProductToDelete(product)
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 pt-2">
                  <span className="text-xs text-muted-foreground">Stock: {product.stockProducto}</span>
                  <span className="text-xs text-muted-foreground">
                    {product.listaCategorias.length > 0 ? product.listaCategorias[0] : "Sin categoría"}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {productToDelete && (
            <Dialog open onOpenChange={() => setProductToDelete(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar eliminación</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas eliminar el producto "{productToDelete.nombreProducto}"?
                    Esta acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={() => handleDeleteProduct(productToDelete.idProducto)}>
                    Eliminar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

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
