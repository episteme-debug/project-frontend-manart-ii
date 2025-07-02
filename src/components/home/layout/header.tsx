"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, User, Menu, X } from
  "lucide-react"
import Image from "next/image"
import { ChevronDown, Package, MapPin } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <header className="fixed top-0 w-full z-50 glass py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-3 group">
              <Image
                src="/static/corporativo/logo.png"
                alt="Logo ManArt"
                height={120}
                width={120}
                className="object-contain"
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-smooth">
                Inicio
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-smooth"
              >
                Sobre Nosotros
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600 transition-smooth"
                >
                  Catálogo de Productos
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link
                      href="/catalogo/"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50"
                    >
                      <Package className="w-4 h-4" />
                      General
                    </Link>

                    <div className="border-t mx-2 my-1"></div>

                    <Link
                      href="/catalogo/regiones"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50"
                    >
                      <MapPin className="w-4 h-4" />
                      Regiones
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-smooth">
                Blog Artesanales
              </Link>
            </nav>

            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar artesanías..."
                  className="w-full pl-10 pr-4 py-2 glass border-0 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="relative p-2 hover:bg-green-50 rounded-lg transition-smooth">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 gradient-tropical rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              <Link
                href={"/carrito"}
                className="relative p-2 hover:bg-green-50 rounded-lg transition-smooth"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 gradient-emerald rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </Link>

              <button className="p-2 hover:bg-green-50 rounded-lg transition-smooth">
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-green-50 rounded-lg transition-smooth"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 glass rounded-2xl p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                </div>
                <nav className="space-y-2">
                  <Link href="/home" className="block py-2 text-black hover:text-green-600 transition-smooth">
                    Inicio
                  </Link>
                  <Link
                    href="/sobre-nosotros"
                    className="block py-2 text-gray-700 hover:text-green-600 transition-smooth"
                  >
                    Sobre Nosotros
                  </Link>
                  <Link href="/catalogo" className="block py-2 text-gray-700 hover:text-green-600 transition-smooth">
                    Catálogo de Productos
                  </Link>
                  <Link href="/blog" className="block py-2 text-gray-700 hover:text-green-600 transition-smooth">
                    Blog Artesanales
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      
    </>
  )
}
