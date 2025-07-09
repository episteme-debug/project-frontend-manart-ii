"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { Bell, LogOut, Mail, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

interface BlogLayoutProps {
  children: ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header fijo con identidad ManArt */}
      <header className="fixed top-0 w-full z-50 glass py-3 border-b-2 border-amber-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo ManArt */}
            <Link href="/home" className="flex items-center space-x-3 group">
              <Image
                src="/static/corporativo/logo.png"
                alt="Logo ManArt"
                height={80}
                width={80}
                className="object-contain"
                priority
              />
            </Link>

            {/* Navegación principal */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth">
                Inicio
              </Link>
              <Link href="/catalogo" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth">
                Catálogo
              </Link>
              <Link href="/blog" className="text-sm font-medium text-amber-600 border-b-2 border-amber-600">
                Blog Artesanal
              </Link>
            </nav>

            {/* Barra de búsqueda */}
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar en el blog..."
                  className="pl-10 glass border-0 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Navegación de usuario */}
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-amber-600">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-amber-600">
                <Mail className="w-5 h-5" />
              </Button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user.nombre}</span>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 hover:text-red-500">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal con padding para el header fijo */}
      <main className="blog-content pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {children}
        </div>
      </main>

      {/* Footer ManArt */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 border-t-2 border-amber-600">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-4">
                ManArt Blog
              </h3>
              <p className="text-amber-800 text-sm">
                Conectando la magia artesanal de Colombia con el mundo a través de historias y tradiciones.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-amber-800 mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <Link href="/home" className="block text-amber-700 hover:text-amber-900 text-sm">
                  Inicio
                </Link>
                <Link href="/catalogo" className="block text-amber-700 hover:text-amber-900 text-sm">
                  Catálogo
                </Link>
                <Link href="/blog" className="block text-amber-700 hover:text-amber-900 text-sm">
                  Blog
                </Link>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-amber-800 mb-4">Contacto</h4>
              <p className="text-amber-700 text-sm">somosartesaniasmanart@gmail.com</p>
              <p className="text-amber-700 text-sm">+57 316 810 92 02</p>
            </div>
          </div>
          
          <div className="border-t border-amber-300 mt-8 pt-8 text-center">
            <p className="text-amber-700 text-sm">
              © 2025 ManArt. Hecho con amor en Colombia
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 