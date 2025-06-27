"use client"

import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef
} from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Trash, X, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArchivoMultimediaRespuesta } from "@/interfaces/ArchivoMultimediaInterfaz"

export type CargaImagenesRef = {
  getArchivos: () => File[]
  getImagenesIniciales: () => ArchivoMultimediaRespuesta[]
  getEliminadas: () => ArchivoMultimediaRespuesta[] // <- nuevo
}

type CargaImagenesProps = {
  imagenesIniciales?: ArchivoMultimediaRespuesta[]
}

type Preview = { tipo: "inicial"; archivo: ArchivoMultimediaRespuesta } | { tipo: "nuevo"; dataUrl: string }

export const CargaImagenes = forwardRef<CargaImagenesRef, CargaImagenesProps>(
  ({ imagenesIniciales = [] }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [archivos, setArchivos] = useState<File[]>([])
    const [previews, setPreviews] = useState<Preview[]>(
      imagenesIniciales.map((img) => ({ tipo: "inicial", archivo: img }))
    )
    const [urlsIniciales, setUrlsIniciales] = useState<ArchivoMultimediaRespuesta[]>(imagenesIniciales)
    const [eliminadas, setEliminadas] = useState<ArchivoMultimediaRespuesta[]>([])
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      getArchivos: () => archivos,
      getImagenesIniciales: () => urlsIniciales,
      getEliminadas: () => eliminadas
    }))

    const cargar = async (inputFiles: FileList) => {
      const nuevos = Array.from(inputFiles).slice(0, 10 - previews.length)
      const nuevasPreviews = await Promise.all(
        nuevos.map(
          (file) =>
            new Promise<string>((res) => {
              const reader = new FileReader()
              reader.onloadend = () => res(reader.result as string)
              reader.readAsDataURL(file)
            })
        )
      )

      setArchivos((prev) => [...prev, ...nuevos])
      setPreviews((prev) => {
        const nuevas = nuevasPreviews.map((dataUrl) => ({ tipo: "nuevo", dataUrl } as Preview))
        const todas = [...prev, ...nuevas]
        setIndex(todas.length - 1)
        return todas
      })
    }

    const eliminar = (i: number) => {
      const preview = previews[i]
      if (preview.tipo === "inicial") {
        setUrlsIniciales((prev) => prev.filter((img) => img !== preview.archivo))
        setEliminadas((prev) => [...prev, preview.archivo])
      } else {
        const fileIndex = previews.filter((p) => p.tipo === "nuevo").indexOf(preview)
        setArchivos((prev) => prev.filter((_, j) => j !== fileIndex))
      }

      setPreviews((prev) => {
        const nueva = prev.filter((_, j) => j !== i)
        setIndex(Math.max(0, i - 1))
        return nueva
      })
    }

    const navegar = (dir: "prev" | "next") => {
      setIndex((prev) =>
        dir === "prev" ? (prev === 0 ? previews.length - 1 : prev - 1) : (prev === previews.length - 1 ? 0 : prev + 1)
      )
    }

    const BASE_URL = "http://localhost:8080"

const obtenerSrc = (p: Preview) =>
  p.tipo === "inicial" ? `${BASE_URL}${p.archivo.ruta}` : p.dataUrl


    return (
      <>
        <Card>
          <CardContent className="p-4 flex flex-col items-center gap-4">
            <div
              className="relative w-full max-w-sm aspect-square border rounded shadow overflow-hidden cursor-pointer"
              onClick={() => previews[index] && setOpen(true)}
            >
              <Image
                key={obtenerSrc(previews[index])}
                src={obtenerSrc(previews[index])}
                alt="Vista previa"
                fill
                priority
                className="object-contain bg-white transition duration-200"
              />
              {previews.length > 1 && (
                <>
                  <Chevron dir="left" onClick={() => navegar("prev")} responsive />
                  <Chevron dir="right" onClick={() => navegar("next")} responsive />
                </>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={inputRef}
              onChange={(e) => e.target.files && cargar(e.target.files)}
            />

            <Button type="button" onClick={() => inputRef.current?.click()} disabled={previews.length >= 10}>
              <ImagePlus className="mr-2 h-4 w-4" />
              {previews.length >= 10 ? "Máximo 10 imágenes" : "Cargar imágenes"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Formatos: JPG, PNG. Máx 5MB por imagen. Puedes subir hasta 10.
            </p>
          </CardContent>
        </Card>

        {/* Modal ampliado */}
        {open && previews.length > 0 && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center px-4">
            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image
                key={obtenerSrc(previews[index])}
                src={obtenerSrc(previews[index])}
                alt="Ampliada"
                fill
                priority
                className="object-contain transition duration-200"
              />
              <IconButton icon={<X />} onClick={() => setOpen(false)} className="top-4 right-4" />
              <IconButton icon={<Trash />} onClick={() => eliminar(index)} className="top-4 left-4 text-red-500" />
              {previews.length > 1 && (
                <>
                  <Chevron dir="left" onClick={() => navegar("prev")} big responsive />
                  <Chevron dir="right" onClick={() => navegar("next")} big responsive />
                </>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {previews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "bg-white scale-125" : "bg-gray-500 opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
)

CargaImagenes.displayName = "CargaImagenes"

// Chevron reutilizable
const Chevron = ({
  dir,
  onClick,
  big,
  responsive,
}: {
  dir: "left" | "right"
  onClick: () => void
  big?: boolean
  responsive?: boolean
}) => {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight
  const positionClass = dir === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`absolute top-1/2 -translate-y-1/2 ${positionClass} z-10`}
    >
      <Icon
        className={`text-white drop-shadow-lg cursor-pointer transition ${
          big ? "w-10 h-10" : "w-6 h-6"
        }`}
      />
    </button>
  )
}

const IconButton = ({
  icon,
  onClick,
  className = "",
}: {
  icon: React.ReactNode
  onClick: () => void
  className?: string
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation()
      onClick()
    }}
    className={`absolute z-10 cursor-pointer ${className}`}
  >
    {icon}
  </button>
)
