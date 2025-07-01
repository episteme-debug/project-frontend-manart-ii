import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">ArtesanHub</h3>
            <p className="text-gray-300">Conectamos la magia artesanal de Colombia con el mundo.</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bogotá, Colombia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+57 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hola@artesanhub.co</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-bold">Navegación</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-smooth">
                Inicio
              </Link>
              <Link href="/sobre-nosotros" className="block text-gray-300 hover:text-white transition-smooth">
                Sobre Nosotros
              </Link>
              <Link href="/catalogo" className="block text-gray-300 hover:text-white transition-smooth">
                Catálogo
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-smooth">
                Blog
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Categorías</h4>
            <div className="space-y-2">
              <Link href="/catalogo?cat=textiles" className="block text-gray-300 hover:text-white transition-smooth">
                Textiles
              </Link>
              <Link href="/catalogo?cat=ceramica" className="block text-gray-300 hover:text-white transition-smooth">
                Cerámica
              </Link>
              <Link href="/catalogo?cat=joyeria" className="block text-gray-300 hover:text-white transition-smooth">
                Joyería
              </Link>
              <Link href="/catalogo?cat=madera" className="block text-gray-300 hover:text-white transition-smooth">
                Madera
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold">Soporte</h4>
            <div className="space-y-2">
              <Link href="/ayuda" className="block text-gray-300 hover:text-white transition-smooth">
                Centro de Ayuda
              </Link>
              <Link href="/contacto" className="block text-gray-300 hover:text-white transition-smooth">
                Contacto
              </Link>
              <Link href="/envios" className="block text-gray-300 hover:text-white transition-smooth">
                Envíos
              </Link>
              <Link href="/devoluciones" className="block text-gray-300 hover:text-white transition-smooth">
                Devoluciones
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>© 2024 ArtesanHub. Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>en Colombia</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
