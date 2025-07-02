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

import { crearPublicacion } from "../../api/publicacion/crearPublicacion"
import { actulizarPublicacion } from "../../api/publicacion/actulizarPublicacion"
import { subirArchivo } from "../../api/GestionArchivos/subirArchivo"
import { traerimagen } from "../../api/GestionArchivos/traerimagen"
import { traerArchivo } from "../../api/GestionArchivos/taerArchivos"
import { eliminarArchivo } from "../../api/detalleCategoria/eliminarArchivo"
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
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
type Publicaion = {
  id?: number
  titulo: string
  contenido: string
  imagen?: string
}

const emptyPublicacion: Publicaion = {
  titulo: "",
  contenido: ""
}

export function PublicacionForm({ publicacion = emptyPublicacion }: { publicacion?: Publicaion }) {
  const router = useRouter()
  const [alertaExioto, setalertaExioto] = useState(false);
  const [alertaMal, setalertaMal] = useState(false)
  const [formData, setFormData] = useState<Publicaion>(publicacion)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [vistaPrevia, setVistaPrevia] = useState<string>(publicacion?.imagen || "/imagen-defecto.png")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isNueva = !publicacion?.id

  const handleChange = (campo: keyof Publicaion, valor: string | boolean) => {
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
      let id: number;

      if (isNueva) {
        const respuesta = await crearPublicacion(formData.titulo, formData.contenido);
        id = respuesta.data.id;
        console.log(respuesta.status)
        if (respuesta && (respuesta.status === 200 || respuesta.status === 201)) {
          setalertaExioto(true);
          if (true) {
            setTimeout(() => {
              setalertaExioto(false);
            router.push("/dashboard/publicacion");
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
      } else if (publicacion.id) {
        const respuesta = await actulizarPublicacion(
          publicacion.id,
          formData.titulo,
          formData.contenido
        );
        if (respuesta && (respuesta.status === 200 || respuesta.status === 201)) {
          setalertaExioto(true);
          if (true) {
            setTimeout(() => {
              setalertaExioto(false);
            router.push("/dashboard/publicacion");
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
        id = publicacion.id;
      } else {
        throw new Error("No se proporcionó ID para actualizar.");
      }
      // Si está editando y hay archivo nuevo, eliminar el anterior
      if (!isNueva && archivo) {
        const entidad = "Publicacion";
        try {
          const respuesta = await traerArchivo(entidad, id);
          if (Array.isArray(respuesta) && respuesta.length > 0 && respuesta[0].id) {
            await eliminarArchivo(respuesta[0].id);
          }
        } catch (error) {
          console.error("Error al eliminar archivo:", error);
        }
      }

      // Subir imagen nueva
      if (archivo) {
        const entidad = "Publicacion";
        const formDataArchivo = new FormData();
        formDataArchivo.append("archivos", archivo);
        await subirArchivo(entidad, id, formDataArchivo);
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
    async function cargarImagen() {
      if (!publicacion.id) return
      const entidad = "Publicacion";
      const data = await traerimagen(entidad,publicacion.id)

      if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
        const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
        const urlCompleta = `http://localhost:8080/${rutaNormalizada}`
        setVistaPrevia(urlCompleta)
      }
    }

    cargarImagen()
  }, [publicacion.id])


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
            <Label htmlFor="nombrePublicacion">Nombre de la Publicacion</Label>
            <Input
              id="nombrePublicacion"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ej: Evento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contendo</Label>
            <Textarea
              id="contenido"
              value={formData.contenido}
              onChange={(e) => handleChange("contenido", e.target.value)}
              placeholder="Contenido publicacion"
              rows={4}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/publicacion")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isNueva ? "Crear Publicacion" : "Guardar Cambios"}
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
