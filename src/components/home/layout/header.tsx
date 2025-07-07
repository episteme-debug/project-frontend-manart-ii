"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Star, User, Menu, X, LogIn, UserPlus, LogOut, Settings } from "lucide-react"
import Image from "next/image"
import { ChevronDown, Package, MapPin } from 'lucide-react';
import { useProductos } from '@/contexts/ProductoContexto';
import { useCarrito } from '@/contexts/CarritoContext';
import { useOptimizedNavigation } from '@/hooks/use-optimized-navigation';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { terminoBusqueda, setTerminoBusqueda, productosFiltrados, isLoading } = useProductos();
  const { cantidadTotal } = useCarrito();
  const { navigateTo, isNavigating } = useOptimizedNavigation();
  const { user, logout } = useAuth();

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mostrar resultados cuando hay término de búsqueda
  useEffect(() => {
    setShowSearchResults(terminoBusqueda.length > 0);
  }, [terminoBusqueda]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (terminoBusqueda.trim() && !isNavigating) {
      navigateTo(`/catalogo?search=${encodeURIComponent(terminoBusqueda)}`);
      setShowSearchResults(false);
    }
  }, [terminoBusqueda, navigateTo, isNavigating]);

  const handleProductClick = useCallback((productoId: number) => {
    if (!isNavigating) {
      navigateTo(`/catalogo/detalleproducto/${productoId}`);
      setTerminoBusqueda('');
      setShowSearchResults(false);
    }
  }, [navigateTo, isNavigating, setTerminoBusqueda]);

  const resultadosLimitados = productosFiltrados.slice(0, 5);

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass py-3 border-b-2 border-amber-600 !border-b-amber-600">
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
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth">
                Inicio
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth"
              >
                Sobre Nosotros
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth"
                >
                  Catálogo de Productos
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link
                      href="/catalogo/"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                      prefetch={true}
                    >
                      <Package className="w-4 h-4" />
                      General
                    </Link>

                    <div className="border-t mx-2 my-1"></div>

                    <Link
                      href="/catalogo/regiones"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                      prefetch={true}
                    >
                      <MapPin className="w-4 h-4" />
                      Regiones
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-smooth">
                Blog Artesanales
              </Link>
            </nav>

            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar artesanías..."
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 glass border-0 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-amber-500"
                    disabled={isNavigating}
                  />
                </form>

                {/* Resultados de búsqueda */}
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mx-auto"></div>
                        <p className="mt-2">Buscando...</p>
                      </div>
                    ) : resultadosLimitados.length > 0 ? (
                      <>
                        {resultadosLimitados.map((producto) => (
                          <button
                            key={producto.idProducto}
                            onClick={() => handleProductClick(producto.idProducto)}
                            disabled={isNavigating}
                            className="w-full p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">
                                  {producto.nombreProducto}
                                </h4>
                                <p className="text-sm text-gray-500 truncate">
                                  {producto.regionProducto} • ${producto.precioProducto.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                        {productosFiltrados.length > 5 && (
                          <div className="p-3 border-t border-gray-100">
                            <button
                              onClick={handleSearchSubmit}
                              disabled={isNavigating}
                              className="w-full text-center text-amber-600 hover:text-amber-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Ver todos los resultados ({productosFiltrados.length})
                            </button>
                          </div>
                        )}
                      </>
                    ) : terminoBusqueda.trim() ? (
                      <div className="p-4 text-center text-gray-500">
                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p>No se encontraron productos</p>
                        <p className="text-sm">Intenta con otros términos</p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="relative p-2 hover:bg-amber-100 rounded-lg transition-smooth">
                <Star className="w-5 h-5" />
              </button>

              <Link
                href={"/carrito"}
                className="relative p-2 hover:bg-amber-100 rounded-lg transition-smooth"
                prefetch={true}
              >
                <ShoppingCart className="w-5 h-5" />
                {cantidadTotal > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cantidadTotal > 99 ? '99+' : cantidadTotal}
                  </span>
                )}
              </Link>

              {/* Menú de usuario */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-amber-100 rounded-lg transition-smooth flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  {user && (
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.nombre}
                    </span>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          prefetch={true}
                        >
                          <Settings className="w-4 h-4" />
                          Mi Cuenta
                        </Link>

                        <div className="border-t mx-2 my-1"></div>

                        <button
                          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left"
                          onClick={logout}
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          prefetch={true}
                        >
                          <LogIn className="w-4 h-4" />
                          Iniciar Sesión
                        </Link>

                        <div className="border-t mx-2 my-1"></div>

                        <Link
                          href="/registro"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          prefetch={true}
                        >
                          <UserPlus className="w-4 h-4" />
                          Registrarse
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-amber-100 rounded-lg transition-smooth"
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
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg" 
                    disabled={isNavigating}
                  />
                </div>
                <nav className="space-y-2">
                  <Link href="/home" className="block py-2 text-black hover:text-amber-600 transition-smooth" prefetch={true}>
                    Inicio
                  </Link>
                  <Link
                    href="/sobre-nosotros"
                    className="block py-2 text-gray-700 hover:text-amber-600 transition-smooth"
                    prefetch={true}
                  >
                    Sobre Nosotros
                  </Link>
                  <Link href="/catalogo" className="block py-2 text-gray-700 hover:text-amber-600 transition-smooth" prefetch={true}>
                    Catálogo de Productos
                  </Link>
                  <Link href="/blog" className="block py-2 text-gray-700 hover:text-amber-600 transition-smooth" prefetch={true}>
                    Blog Artesanales
                  </Link>
                </nav>
                
                {/* Menú de usuario móvil */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Cuenta</h3>
                  {user ? (
                    <>
                      <div className="px-2 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="space-y-2">
                        <Link href="/dashboard" className="flex items-center gap-3 py-2 text-gray-700 hover:text-amber-600 transition-smooth" prefetch={true}>
                          <Settings className="w-4 h-4" />
                          Mi Cuenta
                        </Link>
                        <button
                          className="flex items-center gap-3 py-2 text-red-600 hover:text-red-700 transition-smooth w-full text-left"
                          onClick={logout}
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                                              <Link href="/login" className="flex items-center gap-3 py-2 text-gray-700 hover:text-amber-600 transition-smooth" prefetch={true}>
                          <LogIn className="w-4 h-4" />
                          Iniciar Sesión
                        </Link>
                        <Link href="/registro" className="flex items-center gap-3 py-2 text-gray-700 hover:text-amber-600 transition-smooth" prefetch={true}>
                          <UserPlus className="w-4 h-4" />
                          Registrarse
                        </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
