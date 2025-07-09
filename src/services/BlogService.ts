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

// Datos de ejemplo para el blog
const postsEjemplo: Post[] = [
  {
    id: '1',
    contenido: '¡Nuevas técnicas de tejido wayuu! Descubrí cómo las artesanas de La Guajira mantienen viva esta tradición centenaria. El tejido wayuu no solo es arte, es historia tejida con hilos de identidad cultural.',
    imagen: '/images/Mochilas_Wayuu.1.jpg',
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
    id: '2',
    contenido: 'Evento especial: Feria Artesanal de Ráquira este fin de semana. Ven a conocer las mejores cerámicas del país y aprende técnicas ancestrales de los maestros artesanos.',
    imagen: '/images/Cerámicas_de_Ráquira.1.jpg',
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
    id: '3',
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
    id: '4',
    contenido: 'El sombrero vueltiao, patrimonio cultural de Colombia. Cada trenza cuenta una historia, cada vuelta representa la sabiduría de los zenúes. ¡Orgullosos de nuestra herencia!',
    imagen: '/images/Sombrero_Vueltiao.1.webp',
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
    id: '5',
    contenido: 'Taller de bordado raizal en San Andrés. Aprende las técnicas tradicionales de las mujeres raizales y descubre la belleza de sus diseños únicos.',
    imagen: '/images/Bordado_tradicional_raizal.1.png',
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
      const nuevoPost: Post = {
        id: Date.now().toString(),
        contenido,
        imagen,
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
} 