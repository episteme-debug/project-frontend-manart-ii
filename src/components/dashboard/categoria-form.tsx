"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ImagePlus } from "lucide-react"
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { crearCategoria } from "@/api/CategoriaProducto"
import { actulizarCategoria } from "@/api/CategoriaProducto"
import { SubirArchivos } from "@/api/ArchivoMultimedia"
import { TraerArchivos } from "@/api/ArchivoMultimedia"
import { EliminarArchivo } from "@/api/ArchivoMultimedia"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  const [alertaExioto, setalertaExioto] = useState(false);
  const [alertaMal, setalertaMal] = useState(false)
  const [formData, setFormData] = useState<Categoria>(categoria)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [vistaPrevia, setVistaPrevia] = useState<string>(categoria?.imagen || "/imagen-defecto.png")
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        idCategoria = respuesta.data.idCategoria;
        console.log(respuesta.status)
        if (respuesta && (respuesta.status === 200 || respuesta.status === 201)) {
          setalertaExioto(true);
          if (true) {
            setTimeout(() => {
              setalertaExioto(false);
              router.push("/dashboard/detalleCategoria");
            }, 4000);
          }
        } else {
          setalertaMal(true);
          if (true) {
            setTimeout(() => {
              setalertaMal(false);
            }, 4000);
          }
        }
      } else if (categoria.idCategoria) {
        const respuesta = await actulizarCategoria(
          categoria.idCategoria,
          formData.nombreCategoria,
          formData.descripcionCategoria
        );
        if (respuesta && (respuesta.status === 200 || respuesta.status === 201)) {
          setalertaExioto(true);
          if (true) {
            setTimeout(() => {
              setalertaExioto(false);
              router.push("/dashboard/detalleCategoria");
            }, 4000);
          }
        } else {
          setalertaMal(true);
          if (true) {
            setTimeout(() => {
              setalertaMal(false);
            }, 4000);
          }
        }
        idCategoria = categoria.idCategoria;
      } else {
        throw new Error("No se proporcionó ID para actualizar.");
      }

      // Si está editando y hay archivo nuevo, eliminar el anterior
      if (!isNueva && archivo) {
        const entidad = "CategoriaProducto";
        try {
          const respuesta = await TraerArchivos(entidad, idCategoria);
          if (Array.isArray(respuesta) && respuesta.length > 0 && respuesta[0].id) {
            await EliminarArchivo(respuesta[0].id);
          }
        } catch (error) {
          console.error("Error al eliminar archivo:", error);
        }
      }

      // Subir imagen nueva
      if (archivo) {
        const entidad = "CategoriaProducto";
        await SubirArchivos([archivo], entidad, idCategoria);
      }

    } catch (error) {
      console.error(error);
      setalertaMal(true);
      if (true) {
        setTimeout(() => {
          setalertaMal(false);
        }, 4000);
      }
    } finally {
      setIsSubmitting(false);
    }

  };
  useEffect(() => {
    setFormData(categoria)
  }, [categoria])

  useEffect(() => {
    async function cargarImagen() {
      if (!categoria.idCategoria) return
      const entidad = "CategoriaProducto";
      const data = await TraerArchivos(entidad, categoria.idCategoria)

      if (Array.isArray(data) && data.length > 0 && typeof data[0].ruta === "string") {
        const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
        const urlCompleta = `http://localhost:8080/${rutaNormalizada}`
        setVistaPrevia(urlCompleta)
      } else {
        // Imagen por defecto si no hay archivos
        setVistaPrevia("/images/ImagenProductoPorDefecto.jpg")
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
              placeholder="Ej: Collares"
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
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/detalleCategoria")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isNueva ? "Crear Categoría" : "Guardar Cambios"}
        </Button>
      </div>

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
                Operacion exitosa.
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
    </form>

  )
}