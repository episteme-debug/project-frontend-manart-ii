"use client"

import { useRef, useState, useImperativeHandle, forwardRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Trash, X, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export type CargaImagenesRef = {
  getArchivos: () => File[]
}

export const CargaImagenes = forwardRef<CargaImagenesRef>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    getArchivos: () => files
  }))

  const cargar = async (inputFiles: FileList) => {
    const nuevos = Array.from(inputFiles).slice(0, 10 - files.length)

    const leerImagen = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    }

    const nuevasPreviews = await Promise.all(nuevos.map(leerImagen))

    setFiles(prev => [...prev, ...nuevos])
    setPreviews(prev => {
      const actualizadas = [...prev, ...nuevasPreviews]
      setIndex(actualizadas.length - 1)
      return actualizadas
    })
  }

  const eliminar = (i: number) => {
    setPreviews(prev => prev.filter((_, j) => j !== i))
    setFiles(prev => prev.filter((_, j) => j !== i))
    setIndex(i > 0 ? i - 1 : 0)
  }

  const navegar = (dir: "prev" | "next") => {
    setIndex(prev =>
      dir === "prev" ? (prev === 0 ? previews.length - 1 : prev - 1)
        : (prev === previews.length - 1 ? 0 : prev + 1)
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-4 flex flex-col items-center gap-4">
          <div
            className="relative w-full max-w-sm rounded border overflow-hidden aspect-square shadow cursor-pointer"
            onClick={() => previews.length > 0 && setOpen(true)}
          >
            <Image
              src={previews[index] || "/images/PorDefectoProducto.png"}
              alt="Vista previa"
              fill
              className="object-contain bg-white"
            />
            {previews.length > 1 && (
              <>
                <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80" size="icon" onClick={e => { e.stopPropagation(); navegar("prev") }}><ChevronLeft /></Button>
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80" size="icon" onClick={e => { e.stopPropagation(); navegar("next") }}><ChevronRight /></Button>
              </>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            ref={inputRef}
            onChange={e => e.target.files && cargar(e.target.files)}
          />
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={files.length >= 10}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            {files.length >= 10 ? "Máximo 10 imágenes" : "Cargar imágenes"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Formatos: JPG, PNG. Máx 5MB por imagen. Puedes subir hasta 10.
          </p>
        </CardContent>
      </Card>

      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center px-4">
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image src={previews[index]} alt="Ampliada" fill className="object-contain" />
            <Button className="absolute top-4 right-4 bg-white/80" size="icon" onClick={() => setOpen(false)}><X /></Button>
            <Button className="absolute top-4 left-4 bg-white/80" size="icon" onClick={() => eliminar(index)}><Trash /></Button>
            {previews.length > 1 && (
              <>
                <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60" size="icon" onClick={() => navegar("prev")}><ChevronLeft /></Button>
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60" size="icon" onClick={() => navegar("next")}><ChevronRight /></Button>
              </>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            {previews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white scale-125" : "bg-gray-500 opacity-60"} transition`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
})

CargaImagenes.displayName = "CargaImagenes"
