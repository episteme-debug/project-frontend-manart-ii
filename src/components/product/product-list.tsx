"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

// Sample product data
const sampleProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  image: `/placeholder.svg?height=200&width=200&text=Producto+${i + 1}`,
  price: Math.floor((i * 123) % 10000) / 100, // determinístico
  stock: (i * 7) % 100, // determinístico
  category: ["Electrónica", "Hogar", "Ropa", "Alimentos"][i % 4],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(), // determinístico
}));

export function ProductList() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const dateFilter = searchParams.get("date") || ""

  const [currentPage, setCurrentPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  const itemsPerPage = 8

  // Filter products based on search query and date
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
    const matchesDate = dateFilter ? product.createdAt.startsWith(dateFilter) : true

    return matchesQuery && matchesDate
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDeleteProduct = (id: number) => {
    // In a real app, this would call an API to delete the product
    console.log(`Deleting product ${id}`)
    setProductToDelete(null)
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
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
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
                          <a href={`/dashboard/productos/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </a>
                        </DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setProductToDelete(product.id)
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
                                ¿Estás seguro de que deseas eliminar el producto "{product.name}"? Esta acción no se
                                puede deshacer.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogClose>
                              <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                                Eliminar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4 pt-2">
                  <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </CardFooter>
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
    </div>
  )
}
