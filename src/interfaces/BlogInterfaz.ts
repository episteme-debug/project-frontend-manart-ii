export interface Artesano {
  id: number
  nombre: string
  apellido: string
  username: string
  avatar: string
  region: string
  tecnica: string
  descripcion: string
  experiencia: number
  seguidores: number
  siguiendo: number
  posts: number
}

export interface Post {
  id: number
  contenido: string
  tipo: 'noticia' | 'evento' | 'cultural'
  multimedia?: {
    tipo: 'imagen' | 'video'
    url: string
    alt?: string
  }[]
  artesano: Artesano
  fecha: Date
  likes: number
  compartidos: number
  comentarios: number
  isLiked: boolean
  isCompartido: boolean
}

export interface PostCreacion {
  contenido: string
  tipo: 'noticia' | 'evento' | 'cultural'
  multimedia?: File[]
}

export interface Comentario {
  id: number
  contenido: string
  artesano: Artesano
  fecha: Date
  likes: number
} 