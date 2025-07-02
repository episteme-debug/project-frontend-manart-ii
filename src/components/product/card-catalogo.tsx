"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { filtrarProducto } from "@/api/Producto";
import Image from "next/image";
import { TraerArchivo } from "@/api/CategoriaProducto";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArchivoMultimediaRespuesta } from "@/interfaces/ArchivoMultimediaInterfaz";
import { Star, Heart, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz";

interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: boolean;
  archivoMultimedia: ArchivoMultimediaRespuesta[];
}
interface Promociones {
  idPromocion: number;
  nombrePromocion: string;
  porcentajeDescuentoPromocion: number;
  estadoPromocion: true;
}
interface Rango {
  precioMinimo: number;
  precioMaximo: number;
}
const stars = Array(5).fill(0);
interface CardCatalogoProps {
  posts: ProductoRespuesta[];
  page: number;
  totalPages: number;
  categorias: Categoria[];
  promociones: Promociones[];
  rango: Rango;
}

export default function CardCatalogo({
  posts,
  page,
  totalPages,
  categorias,
  promociones,
  rango
}: CardCatalogoProps) {

  const [productos, setProductos] = useState<ProductoRespuesta[]>([]);
  const [imagenesProductos, setImagenesProductos] = useState<{ [id: number]: string }>({});

  const [mostrarTodos, setMostrarTodos] = useState(true);
  function cambiarMostrarTodos(valor: boolean) {
    setMostrarTodos(valor);
  }

  const [filtrosOcultos, setFiltrosOcultos] = useState(false);
  const [mostrarFiltrosMobile, setMostrarFiltrosMobile] = useState(false);

  function cambiarOcultamientoFiltros(valor: boolean) {
    setFiltrosOcultos(valor);
  }

  const [mostrarSeccionFiltros, setMostrarSeccionFiltros] = useState(true);
  function cambiarVisibilidadSeccion(valor: boolean) {
    setMostrarSeccionFiltros(valor);
  }

  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    categorias: true,
    precios: true,
    descuentos: true,
    regiones: true
  });

  const toggleSeccion = (seccion: keyof typeof seccionesAbiertas) => {
    setSeccionesAbiertas(prev => ({
      ...prev,
      [seccion]: !prev[seccion]
    }));
  };

  const [nombreCategoria, setnombreCategoria] = useState<string | null>(null);
  const [porcentajeDescuento, setporcentajeDescuento] = useState<number | null>(null);
  const [precioMin, setprecioMin] = useState<number | null>(null);
  const [precioMax, setprecioMax] = useState<number | null>(null);
  const [region, setregion] = useState<string | null>(null)

  const productosPorPagina = 15;
  const [paginaFiltro, setPaginaFiltro] = useState(1);
  const [totalPaginasFiltro, setTotalPaginasFiltro] = useState(1);

  useEffect(() => {
    const cargarTodasImagenes = async () => {
      const nuevasImagenes: { [id: number]: string } = {};

      for (const producto of productos) {
        try {
          const entidad = "Producto";
          const data = await TraerArchivo(entidad, producto.idProducto);
          if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
            const rutaNormalizada = data[0].ruta.replace(/\\/g, "/")
            const urlCompleta = `http://localhost:8080/${rutaNormalizada}`
            nuevasImagenes[producto.idProducto] = urlCompleta;
          }
        } catch (error) {
          console.error(`Error al cargar imagen de producto ${producto.idProducto}:`, error);
        }
      }

      setImagenesProductos(nuevasImagenes);
    };

    if (!mostrarTodos) {
      cargarTodasImagenes();
    }
  }, [productos]);

  useEffect(() => {
    const cargarImagenesDePosts = async () => {
      const nuevasImagenes: { [id: number]: string } = {};

      for (const post of posts) {
        try {
          const entidad = "Producto";
          const data = await TraerArchivo(entidad, post.idProducto);
          if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
            const rutaNormalizada = data[0].ruta.replace(/\\/g, "/");
            const urlCompleta = `http://localhost:8080/${rutaNormalizada}`;
            nuevasImagenes[post.idProducto] = urlCompleta;
          }
        } catch (error) {
          console.error(`Error al cargar imagen del producto ${post.idProducto}:`, error);
        }
      }

      setImagenesProductos(nuevasImagenes);
    };

    if (mostrarTodos) {
      cargarImagenesDePosts();
    }
  }, [mostrarTodos, posts]);

  useEffect(() => {
    if (
      nombreCategoria != null ||
      porcentajeDescuento != null ||
      precioMax != null ||
      precioMin != null ||
      region != null
    ) {
      cambiarMostrarTodos(false);
      filtrarPorProducto();
    } else {
      cambiarVisibilidadSeccion(true);
      cambiarMostrarTodos(true);
    }
  }, [nombreCategoria, porcentajeDescuento, precioMin, precioMax, region]);

  const filtrarPorProducto = async () => {
    try {
      const res = await filtrarProducto(
        nombreCategoria || undefined,
        porcentajeDescuento ?? undefined,
        precioMin ?? undefined,
        precioMax ?? undefined,
        region ?? undefined
      );
      if (res) {
        setProductos(res);
        const total = Math.ceil(res.length / productosPorPagina);
        setTotalPaginasFiltro(total);
        setPaginaFiltro(1);
      }
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  const productosPaginados = productos.slice(
    (paginaFiltro - 1) * productosPorPagina,
    paginaFiltro * productosPorPagina
  );

  const limpiarTodosFiltros = () => {
    setnombreCategoria(null);
    setporcentajeDescuento(null);
    setprecioMin(null);
    setprecioMax(null);
    setregion(null);
  };

  const hayFiltrosActivos = nombreCategoria != null || porcentajeDescuento != null || precioMax != null || precioMin != null || region != null;

  const rangosPrecio = [
    { min: rango.precioMinimo, max: 30000, label: `${rango.precioMinimo.toLocaleString()} - 30.000` },
    { min: 30000, max: 50000, label: "30.000 - 50.000" },
    { min: 50000, max: 100000, label: "50.000 - 100.000" },
    { min: 100000, max: rango.precioMaximo, label: `100.000 - ${rango.precioMaximo.toLocaleString()}` }
  ];

  const regiones = [
    { value: "ANDINA", label: "Región Andina" },
    { value: "CARIBE", label: "Región Caribe" },
    { value: "PACIFICA", label: "Región Pacífica" },
    { value: "AMAZONICA", label: "Región Amazónica" },
    { value: "ORINOQUIA", label: "Región Orinoquía" },
    { value: "INSULAR", label: "Región Insular" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdf8ef] via-[#fcf5eb] to-[#fcf4e8]">
      <div className="container mx-auto px-4 py-6 lg:py-10">

        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h1 className="text-2xl font-bold text-gray-800">Catálogo</h1>
          <Button
            onClick={() => setMostrarFiltrosMobile(!mostrarFiltrosMobile)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          <aside className={`
            lg:w-80 lg:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden
            ${mostrarFiltrosMobile ? 'block' : 'hidden lg:block'}
            ${mostrarFiltrosMobile ? 'fixed inset-x-4 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto' : ''}
          `}>
            <div className="p-6">

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-[#010668]" />
                  <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
                </div>
                {hayFiltrosActivos && (
                  <Button
                    onClick={limpiarTodosFiltros}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Limpiar
                  </Button>
                )}
                {mostrarFiltrosMobile && (
                  <Button
                    onClick={() => setMostrarFiltrosMobile(false)}
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {hayFiltrosActivos && (
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-sm font-semibold text-amber-800 mb-3">Filtros Aplicados</h3>
                  <div className="flex flex-wrap gap-2">
                    {nombreCategoria && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm">
                        {nombreCategoria}
                        <button onClick={() => setnombreCategoria(null)} className="hover:bg-amber-300 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {porcentajeDescuento && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm">
                        {porcentajeDescuento}% descuento
                        <button onClick={() => setporcentajeDescuento(null)} className="hover:bg-amber-300 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {precioMin && precioMax && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm">
                        ${precioMin.toLocaleString()} - ${precioMax.toLocaleString()}
                        <button onClick={() => { setprecioMin(null); setprecioMax(null); }} className="hover:bg-amber-300 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {region && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm">
                        {regiones.find(r => r.value === region)?.label}
                        <button onClick={() => setregion(null)} className="hover:bg-amber-300 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <button
                  onClick={() => toggleSeccion('categorias')}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">Categorías</h3>
                  {seccionesAbiertas.categorias ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {seccionesAbiertas.categorias && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {categorias.map((categoria) => (
                      <Button
                        key={categoria.idCategoria}
                        onClick={() => {
                          setnombreCategoria(categoria.nombreCategoria);
                          cambiarMostrarTodos(false);
                          cambiarOcultamientoFiltros(false);
                          cambiarVisibilidadSeccion(false);
                          setMostrarFiltrosMobile(false);
                        }}
                        variant={nombreCategoria === categoria.nombreCategoria ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto py-3 px-4 ${nombreCategoria === categoria.nombreCategoria
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                          }`}
                      >
                        {categoria.nombreCategoria}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button
                  onClick={() => toggleSeccion('precios')}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">Rango de Precios</h3>
                  {seccionesAbiertas.precios ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {seccionesAbiertas.precios && (
                  <div className="mt-3 space-y-2">
                    {rangosPrecio.map((rango_precio, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          setprecioMin(rango_precio.min);
                          setprecioMax(rango_precio.max);
                          cambiarMostrarTodos(false);
                          cambiarOcultamientoFiltros(false);
                          cambiarVisibilidadSeccion(false);
                          setMostrarFiltrosMobile(false);
                        }}
                        variant={precioMin === rango_precio.min && precioMax === rango_precio.max ? "default" : "outline"}
                        className={`w-full justify-start text-left py-3 px-4 ${precioMin === rango_precio.min && precioMax === rango_precio.max
                            ? "bg-[#010668] text-white hover:bg-[#45507f7a]"
                            : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                          }`}
                      >
                        ${rango_precio.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button
                  onClick={() => toggleSeccion('descuentos')}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">Descuentos</h3>
                  {seccionesAbiertas.descuentos ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {seccionesAbiertas.descuentos && (
                  <div className="mt-3 space-y-3">
                    {promociones.map((promocion) => (
                      <label key={promocion.idPromocion} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="promocion"
                          value={promocion.porcentajeDescuentoPromocion}
                          checked={porcentajeDescuento === promocion.porcentajeDescuentoPromocion}
                          onChange={() => {
                            setporcentajeDescuento(promocion.porcentajeDescuentoPromocion);
                            cambiarMostrarTodos(false);
                            cambiarOcultamientoFiltros(false);
                            cambiarVisibilidadSeccion(false);
                            setMostrarFiltrosMobile(false);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {promocion.nombrePromocion} ({promocion.porcentajeDescuentoPromocion}%)
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button
                  onClick={() => toggleSeccion('regiones')}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">Regiones</h3>
                  {seccionesAbiertas.regiones ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {seccionesAbiertas.regiones && (
                  <div className="mt-3 space-y-3 max-h-48 overflow-y-auto">
                    {regiones.map((regionItem) => (
                      <label key={regionItem.value} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="region"
                          value={regionItem.value}
                          checked={region === regionItem.value}
                          onChange={() => {
                            setregion(regionItem.value);
                            cambiarMostrarTodos(false);
                            cambiarOcultamientoFiltros(false);
                            cambiarVisibilidadSeccion(false);
                            setMostrarFiltrosMobile(false);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {regionItem.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {mostrarFiltrosMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMostrarFiltrosMobile(false)}
            />
          )}

          <main className="flex-1">

            <div className={`${mostrarSeccionFiltros ? "hidden" : "block"}`}>
              {productosPaginados.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {productosPaginados.map((producto, index) => (
                    <div
                      key={producto.idProducto}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <Image
                          src={"/images/ImagenProductoPorDefecto.jpg"}
                          alt={producto.nombreProducto}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white">
                          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                        </button>
                        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Nuevo
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {producto.nombreProducto}
                          </h3>
                          <p className="text-sm text-gray-500">por Artesano</p>
                        </div>

                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">4.0</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-2xl font-bold text-blue-600">${producto.precioProducto.toLocaleString()}</span>
                            <p className="text-xs text-gray-500">COP</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={`${mostrarTodos ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.idProducto}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={
                          post.listaArchivos.length > 0
                            ? `/static/${post.listaArchivos[0].ruta.replace(/^\/+/, "")}`
                            : "/images/ImagenProductoPorDefecto.jpg"
                        }
                        alt={post.nombreProducto}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        priority
                      />
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <Link
                          className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 block"
                          href={`catalogo/detalleproducto/${post.idProducto}`}
                        >
                          {post.nombreProducto}
                        </Link>
                        <p className="text-sm text-gray-500">por Artesano</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        {stars.map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">4.0</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-2xl font-bold text-blue-600">${post.precioProducto.toLocaleString()}</span>
                          <p className="text-xs text-gray-500">COP</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              {(mostrarTodos && totalPages > 1) && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href={`?page=${Math.max(1, page - 1)}`} />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href={`?page=${i + 1}`}
                            aria-current={page === i + 1 ? "page" : undefined}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext href={`?page=${Math.min(totalPages, page + 1)}`} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {!mostrarTodos && totalPaginasFiltro > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setPaginaFiltro((prev) => Math.max(1, prev - 1))
                          }
                          className="cursor-pointer"
                        />
                      </PaginationItem>

                      {[...Array(totalPaginasFiltro)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            onClick={() => setPaginaFiltro(i + 1)}
                            aria-current={paginaFiltro === i + 1 ? "page" : undefined}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setPaginaFiltro((prev) =>
                              Math.min(totalPaginasFiltro, prev + 1)
                            )
                          }
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </main>
        </div>
       </div> 
    </section>
  );
}
