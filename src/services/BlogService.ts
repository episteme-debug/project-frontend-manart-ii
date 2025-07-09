export interface Post {
  id: string
  contenido: string
  imagen?: string
  tipo: 'noticia' | 'evento' | 'cultural'
  fecha: string
  autor: {
    id: number
    nombre: string
    avatar: string
  }
  likes: number
  compartidos: number
  comentarios: number
}

// Generar IDs únicos de forma estática
const generarIdsUnicos = (cantidad: number) => {
  const ids = []
  for (let i = 0; i < cantidad; i++) {
    ids.push(Date.now().toString() + '-' + Math.floor(Math.random() * 1000000).toString())
  }
  return ids
}

const idsUnicos = generarIdsUnicos(5)

const postsEjemplo: Post[] = [
  {
    id: idsUnicos[0],
    contenido: '¡Nuevas técnicas de tejido wayuu! Descubrí cómo las artesanas de La Guajira mantienen viva esta tradición centenaria. El tejido wayuu no solo es arte, es historia tejida con hilos de identidad cultural.',
    imagen: '/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg',
    tipo: 'cultural',
    fecha: '2025-01-15T10:30:00Z',
    autor: {
      id: 1,
      nombre: 'María Wayuu',
      avatar: '/images/usuario.webp'
    },
    likes: 45,
    compartidos: 12,
    comentarios: 8
  },
  {
    id: idsUnicos[1],
    contenido: 'Evento especial: Feria Artesanal de Ráquira este fin de semana. Ven a conocer las mejores cerámicas del país y aprende técnicas ancestrales de los maestros artesanos.',
    imagen: '/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg',
    tipo: 'evento',
    fecha: '2025-01-14T15:45:00Z',
    autor: {
      id: 2,
      nombre: 'Carlos Ráquira',
      avatar: '/images/usuario.webp'
    },
    likes: 78,
    compartidos: 23,
    comentarios: 15
  },
  {
    id: idsUnicos[2],
    contenido: 'Noticia importante: El gobierno lanza programa de apoyo para artesanos indígenas. Incluye capacitación, financiamiento y promoción internacional de sus productos.',
    tipo: 'noticia',
    fecha: '2025-01-13T09:15:00Z',
    autor: {
      id: 3,
      nombre: 'Ana Cultural',
      avatar: '/images/usuario.webp'
    },
    likes: 156,
    compartidos: 89,
    comentarios: 34
  },
  {
    id: idsUnicos[3],
    contenido: 'El sombrero vueltiao, patrimonio cultural de Colombia. Cada trenza cuenta una historia, cada vuelta representa la sabiduría de los zenúes. ¡Orgullosos de nuestra herencia!',
    imagen: '/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg',
    tipo: 'cultural',
    fecha: '2025-01-12T14:20:00Z',
    autor: {
      id: 4,
      nombre: 'Luis Zenú',
      avatar: '/images/usuario.webp'
    },
    likes: 203,
    compartidos: 67,
    comentarios: 28
  },
  {
    id: idsUnicos[4],
    contenido: 'Taller de bordado raizal en San Andrés. Aprende las técnicas tradicionales de las mujeres raizales y descubre la belleza de sus diseños únicos.',
    imagen: '/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg',
    tipo: 'evento',
    fecha: '2025-01-11T11:00:00Z',
    autor: {
      id: 5,
      nombre: 'Isabel Raizal',
      avatar: '/images/usuario.webp'
    },
    likes: 92,
    compartidos: 31,
    comentarios: 19
  }
]

export class BlogService {
  static async obtenerPosts(): Promise<Post[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    return postsEjemplo
  }

  static async crearPost(contenido: string, imagen?: string, tipo: 'noticia' | 'evento' | 'cultural' = 'cultural'): Promise<Post | null> {
    try {
      const uniqueId = Date.now().toString() + '-' + Math.floor(Math.random() * 1000000).toString();
      const nuevoPost: Post = {
        id: uniqueId,
        contenido,
        imagen: imagen || '/static/cargascliente/categoriaproductos/imagen/descarga6.jpeg',
        tipo,
        fecha: new Date().toISOString(),
        autor: {
          id: Date.now(),
          nombre: 'Usuario ManArt',
          avatar: '/images/usuario.webp'
        },
        likes: 0,
        compartidos: 0,
        comentarios: 0
      }

      postsEjemplo.unshift(nuevoPost)
      return nuevoPost
    } catch (error) {
      console.error('Error al crear post:', error)
      return null
    }
  }

  static async darLike(postId: string): Promise<boolean> {
    const post = postsEjemplo.find(p => p.id === postId)
    if (post) {
      post.likes++
      return true
    }
    return false
  }

  static async compartir(postId: string): Promise<boolean> {
    const post = postsEjemplo.find(p => p.id === postId)
    if (post) {
      post.compartidos++
      return true
    }
    return false
  }

  static async eliminarPost(postId: string): Promise<boolean> {
    const index = postsEjemplo.findIndex(p => p.id === postId)
    if (index !== -1) {
      postsEjemplo.splice(index, 1)
      return true
    }
    return false
  }
} 