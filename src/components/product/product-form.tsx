"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Define product type
type Product = {
  id?: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  image: string
  createdAt?: string
}

// Default empty product
const emptyProduct: Product = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  image: "/placeholder.svg?height=400&width=400&text=Imagen+del+Producto",
}

export function ProductForm({ product = emptyProduct }: { product?: Product }) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<Product>(product)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isNewProduct = !product.id

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: isNewProduct ? "Producto creado" : "Producto actualizado",
        description: isNewProduct
          ? "El producto ha sido creado exitosamente"
          : "Los cambios han sido guardados exitosamente",
      })

      // Redirect to products list
      router.push("/dashboard/productos")
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el producto",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Image Upload Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Imagen del producto"
                  fill
                  className="object-cover"
                />
              </div>
              <Button type="button" variant="outline" className="w-full">
                <ImagePlus className="mr-2 h-4 w-4" />
                Cambiar imagen
              </Button>
              <p className="text-xs text-muted-foreground">Formatos soportados: JPG, PNG. Tamaño máximo: 5MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describa el producto"
              rows={4}
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
              <p className="text-sm text-muted-foreground">Precio en dólares ($)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
              <p className="text-sm text-muted-foreground">Cantidad disponible</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electrónica">Electrónica</SelectItem>
                <SelectItem value="Hogar">Hogar</SelectItem>
                <SelectItem value="Ropa">Ropa</SelectItem>
                <SelectItem value="Alimentos">Alimentos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/productos")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isNewProduct ? "Crear Producto" : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  )
}
