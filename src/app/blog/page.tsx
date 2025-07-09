"use client"

import { CrearPost } from '@/components/blog/CrearPost'
import { ListaPosts } from '@/components/blog/ListaPosts'
import { PerfilArtesano } from '@/components/blog/PerfilArtesano'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogService, Post } from '@/services/BlogService'
import { Award, Calendar, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showCrearPost, setShowCrearPost] = useState(false)

  useEffect(() => {
    cargarPosts()
  }, [])

  const cargarPosts = async () => {
    try {
      setLoading(true)
      const postsData = await BlogService.obtenerPosts()
      setPosts(postsData)
    } catch (error) {
      console.error('Error al cargar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCrearPost = async (contenido: string, imagen?: string, tipo: 'noticia' | 'evento' | 'cultural' = 'cultural') => {
    try {
      const nuevoPost = await BlogService.crearPost(contenido, imagen, tipo)
      if (nuevoPost) {
        setPosts(prev => [nuevoPost, ...prev])
        setShowCrearPost(false)
      }
    } catch (error) {
      console.error('Error al crear post:', error)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      await BlogService.darLike(postId)
      // Actualizar el estado local
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ))
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const handleCompartir = async (postId: string) => {
    try {
      await BlogService.compartir(postId)
      // Actualizar el estado local
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, compartidos: post.compartidos + 1 }
          : post
      ))
    } catch (error) {
      console.error('Error al compartir:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-times">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar izquierda */}
          <div className="lg:col-span-1 space-y-6">
            <PerfilArtesano />
            
            {/* Estadísticas del blog */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="font-times text-lg text-gray-900">
                  Estadísticas del Blog
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    <span className="font-times text-sm text-gray-600">Posts totales</span>
                  </div>
                  <span className="font-times font-semibold text-amber-600">{posts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="font-times text-sm text-gray-600">Artesanos activos</span>
                  </div>
                  <span className="font-times font-semibold text-orange-600">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="font-times text-sm text-gray-600">Técnicas</span>
                  </div>
                  <span className="font-times font-semibold text-yellow-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    <span className="font-times text-sm text-gray-600">Eventos este mes</span>
                  </div>
                  <span className="font-times font-semibold text-amber-600">8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header del blog */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-times font-bold text-3xl text-gray-900 mb-2">
                    Blog Artesanal ManArt
                  </h1>
                  <p className="font-times text-gray-600">
                    Comparte y descubre la riqueza cultural de las artesanías colombianas
                  </p>
                </div>
                <Button 
                  onClick={() => setShowCrearPost(true)}
                  className="bg-amber-600 hover:bg-amber-700 font-times"
                >
                  Crear Post
                </Button>
              </div>
            </div>

            {/* Formulario de crear post */}
            {showCrearPost && (
              <CrearPost 
                onCrear={handleCrearPost}
                onCancelar={() => setShowCrearPost(false)}
              />
            )}

            {/* Lista de posts */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-amber-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-amber-200 rounded w-32"></div>
                            <div className="h-3 bg-amber-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-amber-200 rounded"></div>
                          <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                          <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <ListaPosts 
                posts={posts}
                onLike={handleLike}
                onCompartir={handleCompartir}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
