"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImagePlus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CategoriaProductoRespuesta } from "@/interfaces/CategoriaProductoInterfaz"
import { listarCategorias } from "@/api/CategoriaProducto"
import { ProductoCreacion, ProductoRespuesta } from "@/interfaces/ProductoInterfaz"
import { CrearProducto } from "@/api/Producto"
import Usuario from "@/app/prueba/usuario/page"
import { obtenerUsuarioPorId } from "@/api/Usuario"
import { CargaImagenes } from "./carga-imagenes"
import { CargaImagenesRef } from "./carga-imagenes"
import { SubirArchivos } from "@/api/ArchivoMultimedia"


// Producto vacío
const emptyProduct: ProductoRespuesta = {
  idProducto: 0,
  idUsuario: 0,
  nombreProducto: "",
  descripcionProducto: "",
  regionProducto: "",
  stockProducto: 0,
  precioProducto: 0,
  listaCategorias: [],
  listaArchivos: []
}

export function ProductForm({ product = emptyProduct, idUsuario }: { product?: ProductoRespuesta, idUsuario: number }) {
  const [categoriasDisponibles, setCategoriasDisponibles] = useState<CategoriaProductoRespuesta[]>([])

  useEffect(() => {
    const axiosData = async () => {
      try {
        const categorias = await listarCategorias()
        setCategoriasDisponibles(categorias)
      } catch (error) {
        console.error("Error al cargar datos:", error)
      }
    }

    axiosData()
  }, [])


  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<ProductoCreacion>({
    idUsuario: idUsuario,
    nombreProducto: product.nombreProducto,
    descripcionProducto: product.descripcionProducto,
    regionProducto: product.regionProducto,
    stockProducto: product.stockProducto,
    precioProducto: product.precioProducto,
    listaCategorias: [],
    idProducto: product.idProducto
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Imagenes
  const cargaImagenesRef = useRef<CargaImagenesRef>(null)

  const handleChange = (field: keyof ProductoCreacion, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Crear producto y esperar respuesta
      const productoCreado = await CrearProducto(formData)

      // 2. Obtener archivos cargados desde el componente
      const archivos = cargaImagenesRef.current?.getArchivos() || []

      // 3. Subir archivos con el nuevo ID
      if (!productoCreado) {
        throw new Error("No se pudo crear el producto")
      }
      await SubirArchivos(archivos, "Producto", productoCreado.idProducto)

      // 4. Redireccionar
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
        <CargaImagenes
          ref={cargaImagenesRef}
          imagenesIniciales={product.listaArchivos} />

        {/* Product Details Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto</Label>
            <Input
              id="name"
              value={formData.nombreProducto}
              onChange={(e) => handleChange("nombreProducto", e.target.value)}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.descripcionProducto}
              onChange={(e) => handleChange("descripcionProducto", e.target.value)}
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
                value={formData.precioProducto}
                onChange={(e) => handleChange("precioProducto", Number.parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
              <p className="text-sm text-muted-foreground">Precio en pesos colombianos ($)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stockProducto}
                onChange={(e) => handleChange("stockProducto", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
              <p className="text-sm text-muted-foreground">Cantidad disponible</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categorías del producto</Label>
            <div className="flex flex-wrap gap-2">
              {categoriasDisponibles.map((categoria) => {
                const id = categoria.idCategoria
                const isSelected = formData.listaCategorias?.includes(id)

                return (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      "px-3 py-1 rounded-md border text-sm transition",
                      isSelected
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-slate-700 dark:text-gray-100 dark:border-slate-600 dark:hover:bg-slate-600"
                    )}
                    onClick={() => {
                      const yaSeleccionada = formData.listaCategorias?.includes(id)

                      const nuevasCategorias = yaSeleccionada
                        ? formData.listaCategorias.filter(catId => catId !== id)
                        : [...formData.listaCategorias, id]

                      handleChange("listaCategorias", nuevasCategorias)
                    }}
                  >
                    {categoria.nombreCategoria}
                  </button>
                )
              })}

            </div>
            <p className="text-sm text-muted-foreground">
              Puede seleccionar varias categorías haciendo clic en cada una
            </p>
          </div>


          <div className="space-y-2">
            <Label htmlFor="region">Región a la que pertenece el producto</Label>
            {formData.regionProducto !== undefined && (
              <Select value={formData.regionProducto} onValueChange={(value) => handleChange("regionProducto", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AMAZONICA">Amazónica</SelectItem>
                  <SelectItem value="ANDINA">Andina</SelectItem>
                  <SelectItem value="CARIBE">Caribe</SelectItem>
                  <SelectItem value="INSULAR">Insular</SelectItem>
                  <SelectItem value="ORINOQUIA">Orinoquía</SelectItem>
                  <SelectItem value="PACIFICA">Pacífica</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/productos")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  )
}
