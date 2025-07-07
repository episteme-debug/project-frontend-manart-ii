import Link from "next/link"
import { Star, Mail, Phone, MapPin, Sparkles, Palette, Users, Shield } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Fondo con patrón artesanal */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-amber-300 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-orange-300 rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-yellow-300 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-amber-300 rotate-12"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Sección principal con disposición innovadora */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo y descripción - Ocupa 4 columnas */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                ManArt
              </h3>
            </div>
            <p className="text-amber-800 text-lg leading-relaxed">
              Conectamos la magia artesanal de Colombia con el mundo, preservando tradiciones centenarias y apoyando a nuestros artesanos.
            </p>
            
           
          </div>

          {/* Enlaces organizados en forma de árbol - Ocupa 8 columnas */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Navegación */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <h4 className="font-bold text-amber-800 text-lg">Navegación</h4>
                </div>
                <div className="space-y-3">
                  <Link href="/" className="block text-amber-700 hover:text-amber-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    <span>Inicio</span>
                  </Link>
                  <Link href="/sobre-nosotros" className="block text-amber-700 hover:text-amber-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    <span>Sobre Nosotros</span>
                  </Link>
                  <Link href="/catalogo" className="block text-amber-700 hover:text-amber-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    <span>Catálogo</span>
                  </Link>
                  <Link href="/blog" className="block text-amber-700 hover:text-amber-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    <span>Blog</span>
                  </Link>
                </div>
              </div>

              {/* Categorías */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h4 className="font-bold text-orange-800 text-lg">Artesanías</h4>
                </div>
                <div className="space-y-3">
                  <Link href="/catalogo?cat=textiles" className="block text-orange-700 hover:text-orange-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    <span>Textiles</span>
                  </Link>
                  <Link href="/catalogo?cat=ceramica" className="block text-orange-700 hover:text-orange-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    <span>Cerámica</span>
                  </Link>
                  <Link href="/catalogo?cat=joyeria" className="block text-orange-700 hover:text-orange-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    <span>Joyería</span>
                  </Link>
                  <Link href="/catalogo?cat=madera" className="block text-orange-700 hover:text-orange-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    <span>Madera</span>
                  </Link>
                </div>
              </div>

              {/* Soporte */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h4 className="font-bold text-yellow-800 text-lg">Soporte</h4>
                </div>
                <div className="space-y-3">
                  <Link href="/ayuda" className="block text-yellow-700 hover:text-yellow-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    <span>Centro de Ayuda</span>
                  </Link>
                  <Link href="/contacto" className="block text-yellow-700 hover:text-yellow-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    <span>Contacto</span>
                  </Link>
                  <Link href="/envios" className="block text-yellow-700 hover:text-yellow-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    <span>Envíos</span>
                  </Link>
                  <Link href="/devoluciones" className="block text-yellow-700 hover:text-yellow-900 transition-all duration-300 hover:translate-x-1 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    <span>Devoluciones</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de contacto con diseño artesanal */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 mb-12 border border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-amber-800">Ubicación</h5>
                <p className="text-amber-700 text-sm">Mosquera, Cundinamarca</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-orange-800">Teléfono</h5>
                <p className="text-orange-700 text-sm">+57 316 810 92 02</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-yellow-800">Email</h5>
                <p className="text-yellow-700 text-sm">somosartesaniasmanart@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer inferior con elementos artesanales */}
        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-amber-700 font-medium">
                © 2025 ManArt. Hecho con amor en Colombia
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-amber-700">
                <Users className="w-4 h-4" />
                <span className="text-sm">Artesanos</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Calidad</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Tradición</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
