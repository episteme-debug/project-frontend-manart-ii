"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Image, X, Images, User } from 'lucide-react'
import { useRef, useState } from 'react'

interface CrearPostProps {
  onCrear: (contenido: string, imagen?: string, tipo?: 'noticia' | 'evento' | 'cultural') => void
  onCancelar: () => void
  post?: {
    contenido: string
    imagen?: string
    tipo: 'noticia' | 'evento' | 'cultural'
  }
}

// Galería de imágenes de artesanías colombianas - IDs estáticos
const imagenesArtesanias = Array.from({ length: 12 }, (_, i) => ({
  id: `artesania-${i + 1}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
  nombre: "Imagen Artesanal",
  url: "/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg",
  descripcion: "Artesanía colombiana"
}))

export function CrearPost({ onCrear, onCancelar, post }: CrearPostProps) {
  const [contenido, setContenido] = useState(post?.contenido || '')
  const [tipo, setTipo] = useState<'noticia' | 'evento' | 'cultural'>(post?.tipo || 'cultural')
  const [imagen, setImagen] = useState<string>(post?.imagen || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contenido.trim()) return

    setIsSubmitting(true)
    try {
      await onCrear(contenido, imagen || undefined, tipo)
      setContenido('')
      setImagen('')
      setTipo('cultural')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagen(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const selectGalleryImage = (imageUrl: string) => {
    setImagen(imageUrl)
    setShowGallery(false)
  }

  const removeImage = () => {
    setImagen('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header del post */}
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-amber-300 bg-amber-50">
              <User className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-times font-semibold text-gray-900">
                  Compartir experiencia
                </span>
              </div>
              
              {/* Selector de tipo */}
              <div className="mb-3">
                <Select value={tipo} onValueChange={(value: 'noticia' | 'evento' | 'cultural') => setTipo(value)}>
                  <SelectTrigger className="w-48 border-amber-300 focus:ring-amber-500 font-times">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noticia">Noticia</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Área de texto */}
          <Textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="¿Qué está pasando en el mundo artesanal colombiano?"
            className="min-h-[120px] border-amber-300 resize-none text-lg focus:ring-amber-500 focus:border-amber-500 font-times"
            maxLength={280}
          />

          {/* Contador de caracteres */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-times">{contenido.length}/280 caracteres</span>
            <span className="font-times px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </span>
          </div>

          {/* Imagen preview */}
          {imagen && (
            <div className="relative group">
              <img
                src={imagen}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Galería de imágenes de artesanías */}
          {showGallery && (
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
              <h3 className="font-times font-semibold text-gray-900 mb-3">Seleccionar imagen de artesanía</h3>
              <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                {imagenesArtesanias.map((artesania) => (
                  <div
                    key={artesania.id}
                    className="cursor-pointer group relative"
                    onClick={() => selectGalleryImage(artesania.url)}
                  >
                    <img
                      src={artesania.url}
                      alt={artesania.nombre}
                      className="w-full h-20 object-cover rounded-lg border-2 border-transparent group-hover:border-amber-400 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-times opacity-0 group-hover:opacity-100 text-center px-1">
                        {artesania.nombre}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGallery(false)}
                className="mt-3 border-amber-300 text-amber-600 hover:bg-amber-50 font-times"
              >
                Cerrar galería
              </Button>
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-200">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowGallery(!showGallery)}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-times"
              >
                <Images className="w-5 h-5 mr-2" />
                Galería artesanal
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-times"
              >
                <Image className="w-5 h-5 mr-2" />
                Subir imagen
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancelar}
                className="border-amber-300 text-amber-600 hover:bg-amber-50 font-times"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !contenido.trim()}
                className="bg-amber-600 hover:bg-amber-700 font-times"
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Button>
            </div>
          </div>

          {/* Input de archivo oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </form>
      </CardContent>
    </Card>
  )
} 