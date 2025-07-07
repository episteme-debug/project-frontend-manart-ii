"use client"

import Image from "next/image";
import { Star, Eye } from "lucide-react";
import { memo, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz";
import { ObtenerProductos } from "@/api/Producto";

const StarRating = memo(({ rating }: { rating: number }) => {
  const stars = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.floor(rating)),
    [rating]
  );

  return (
    <div className="flex items-center space-x-1">
      {stars.map((filled, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${filled ? "text-amber-400 fill-current" : "text-gray-300"}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating})</span>
    </div>
  );
});

StarRating.displayName = "StarRating";

const ProductCard = memo(({ producto, index }: { producto: ProductoRespuesta; index: number }) => {
  const getCardStyle = (index: number) => {
    const styles = [
      "hover:shadow-amber-200/50",
      "hover:shadow-orange-200/50", 
      "hover:shadow-yellow-200/50",
      "hover:shadow-amber-300/50"
    ];
    return styles[index % styles.length];
  };

  return (
    <div
      className={`group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-200 h-full transform hover:-translate-y-2 ${getCardStyle(index)}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: `slideInUp 0.6s ease-out forwards`,
        transform: 'translateY(20px)'
      }}
    >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={
            producto.listaArchivos && producto.listaArchivos.length > 0
              ? `/static/${producto.listaArchivos[0].ruta.replace(/^\/+/, "")}`
              : "/images/ImagenProductoPorDefecto.jpg"
          }
          alt={producto.nombreProducto}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading={index < 4 ? "eager" : "lazy"}
          priority={index < 4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Botones de acción */}
        <div className="absolute top-4 left-4">
          <button className="w-10 h-10 bg-gradient-to-r from-slate-100 to-gray-100 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg">
            <Star className="w-5 h-5 text-gray-600 hover:text-amber-500 fill-current" />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <Link
            href={`/catalogo/detalleproducto/${producto.idProducto}`}
            className="w-10 h-10 bg-gradient-to-r from-slate-100 to-gray-100 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-5 h-5 text-gray-600 hover:text-amber-600" />
          </Link>
        </div>

        {/* Badge destacado */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-md text-xs font-medium shadow-lg border border-amber-500">
          Destacado
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
                      <Link
              href={`/catalogo/detalleproducto/${producto.idProducto}`}
              className="font-bold text-lg text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight block"
            >
            {producto.nombreProducto}
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-slate-100 to-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-xs font-medium">
                {producto.nombreUsuario ? producto.nombreUsuario.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <p className="text-sm text-gray-500">por {producto.nombreUsuario || 'Artesano'}</p>
          </div>
        </div>

        <StarRating rating={4.0} />

        <div className="flex justify-between items-center pt-2">
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-amber-700">
                ${producto.precioProducto.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">COP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export function ProductGrid() {
  const [productos, setProductos] = useState<ProductoRespuesta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productosObtenidos = await ObtenerProductos();
        
        // Seleccionar solo los primeros 4 productos principales
        const productosPrincipales = productosObtenidos.slice(0, 4);
        
        setProductos(productosPrincipales);
      } catch (err) {
        setError('Error al cargar los productos destacados');
        console.error('Error cargando productos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const memoizedProductos = useMemo(() => productos, [productos]);

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <header className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Productos Destacados
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-amber-700 max-w-2xl mx-auto">
              Artesanías auténticas hechas a mano
            </p>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <header className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Productos Destacados
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-amber-700 max-w-2xl mx-auto">
              Artesanías auténticas hechas a mano
            </p>
          </header>
          
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 shadow-lg"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <header className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
            Productos Destacados
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-amber-700 max-w-2xl mx-auto">
            Artesanías auténticas hechas a mano
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {memoizedProductos.map((producto, index) => (
            <ProductCard key={producto.idProducto} producto={producto} index={index} />
          ))}
        </div>

        {memoizedProductos.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-amber-500"
            >
              Ver Todos los Productos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}