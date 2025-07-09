"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Post } from '@/services/BlogService'
import { Calendar, Heart, MessageCircle, Share2, Pencil, Trash2, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface ListaPostsProps {
  posts: Post[]
  onLike: (postId: string) => void
  onCompartir: (postId: string) => void
  onDelete?: (postId: string) => void
  onEdit?: (post: Post) => void
  renderUserIconOnImage?: () => JSX.Element
}

export function ListaPosts({ posts, onLike, onCompartir, onDelete, onEdit, renderUserIconOnImage }: ListaPostsProps) {
  const [likes, setLikes] = useState<Record<string, boolean>>({})
  const { user } = useAuth()

  const handleLike = (postId: string) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
    onLike(postId)
  }

  const handleCompartir = (postId: string) => {
    onCompartir(postId)
    if (navigator.share) {
      navigator.share({
        title: 'Post de ManArt',
        text: 'Mira este post interesante sobre artesanías colombianas',
        url: window.location.href
      })
    }
  }

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha)
    const ahora = new Date()
    const diffMs = ahora.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora mismo'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const esPropietario = user && post.autor && user.nombre === post.autor.nombre
        return (
          <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Header del post */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-amber-300 bg-amber-50">
                    <User className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-times font-semibold text-gray-900 text-lg">
                      {post.autor.nombre}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="font-times">{formatearFecha(post.fecha)}</span>
                    </div>
                  </div>
                </div>
                {esPropietario && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit && onEdit(post)}
                      className="text-amber-600 hover:text-amber-800"
                      title="Editar"
                    >
                      <Pencil className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete && onDelete(post.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Contenido del post */}
              <div className="mb-4">
                <p className="text-gray-800 font-times text-base leading-relaxed mb-4">
                  {post.contenido}
                </p>
                
                {post.imagen && (
                  <div className="rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src={post.imagen} 
                      alt="Imagen del post" 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {renderUserIconOnImage && renderUserIconOnImage()}
                  </div>
                )}
              </div>

              {/* Acciones del post */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 font-times ${
                      likes[post.id] 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likes[post.id] ? 'fill-current' : ''}`} />
                    <span>{post.likes + (likes[post.id] ? 1 : 0)}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCompartir(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 font-times"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>{post.compartidos}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 font-times"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comentarios}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 