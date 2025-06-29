"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"
import { ImagePlus } from "lucide-react"
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

import { crearCategoria } from "../../api/detalleCategoria/crearCategoria"
import { actulizarCategoria } from "../../api/detalleCategoria/actulizarCategoria"
import { subirArchivo } from "../../api/detalleCategoria/subirArchivo"
import { traerimagenCategoria } from "../../api/detalleCategoria/traerimagenCategoria"
import { traerArchivo } from "../../api/detalleCategoria/taerArchivos"
import { eliminarArchivo } from "../../api/detalleCategoria/eliminarArchivo"
type Categoria = {
  idCategoria?: number
  nombreCategoria: string
  descripcionCategoria: string
  estadoCategoria?: boolean
  imagen?: string
}

const emptyCategoria: Categoria = {
  nombreCategoria: "",
  descripcionCategoria: "",
  estadoCategoria: true,
}

export function CategoriasForm({ categoria = emptyCategoria }: { categoria?: Categoria }) {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Categoria>(categoria)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [vistaPrevia, setVistaPrevia] = useState<string>(categoria?.imagen || "/placeholder.svg")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mensajeExito, setMensajeExito] = useState<"creada" | "actualizada" | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isNueva = !categoria?.idCategoria

  const handleChange = (campo: keyof Categoria, valor: string | boolean) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setArchivo(file)
      setVistaPrevia(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let idCategoria: number;

      if (isNueva) {
        const respuesta = await crearCategoria(formData.nombreCategoria, formData.descripcionCategoria);
        idCategoria = respuesta.idCategoria;
      } else if (categoria.idCategoria) {
        const respuesta = await actulizarCategoria(
          categoria.idCategoria,
          formData.nombreCategoria,
          formData.descripcionCategoria
        );
        idCategoria = categoria.idCategoria;
      } else {
        throw new Error("No se proporcionó ID para actualizar.");
      }

      // Si está editando y hay archivo nuevo, eliminar el anterior
      if (!isNueva && archivo) {
        const entidad = "CategoriaProducto";
        try {
          const respuesta = await traerArchivo(entidad,idCategoria);
          if (Array.isArray(respuesta) && respuesta.length > 0 && respuesta[0].id) {
            await eliminarArchivo(respuesta[0].id);
          }
        } catch (error) {
          console.error("Error al eliminar archivo:", error);
        }
      }

      // Subir imagen nueva
      if (archivo) {
        const entidad = "CategoriaProducto";
        const formDataArchivo = new FormData();
        formDataArchivo.append("archivos", archivo);
        await subirArchivo(entidad,idCategoria, formDataArchivo);
      }

       toast({
          title: "¡Operación exitosa!",
          description: "La operación se realizó correctamente.",
          variant: "default", 
        })
      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        router.push("/dashboard/detalleCategoria");
      }, 2000);

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }

  };
  useEffect(() => {
    async function cargarImagen() {
      if (!categoria.idCategoria) return

      const data = await traerimagenCategoria(categoria.idCategoria)

      if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
        const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
        const urlCompleta = `http://localhost:8080/${rutaNormalizada}`
        setVistaPrevia(urlCompleta)
      }
    }

    cargarImagen()
  }, [categoria.idCategoria])


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-64 h-64 overflow-hidden rounded-lg border ">
                <Image src={vistaPrevia} alt="Vista previa" fill className="object-cover rounded" />
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={() => inputRef.current?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Cambiar imagen
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">Formatos permitidos: JPG, PNG. Máx: 5MB</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombreCategoria">Nombre de la Categoría</Label>
            <Input
              id="nombreCategoria"
              value={formData.nombreCategoria}
              onChange={(e) => handleChange("nombreCategoria", e.target.value)}
              placeholder="Ej: Cerámica Indígena"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcionCategoria">Descripción</Label>
            <Textarea
              id="descripcionCategoria"
              value={formData.descripcionCategoria}
              onChange={(e) => handleChange("descripcionCategoria", e.target.value)}
              placeholder="Describe la categoría"
              rows={4}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/categorias")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isNueva ? "Crear Categoría" : "Guardar Cambios"}
        </Button>
      </div>


    </form>

  )
}
