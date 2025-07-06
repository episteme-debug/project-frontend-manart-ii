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
import { Star, Heart, Filter, X, ChevronDown, ChevronUp, Eye, Tag, MapPin, Percent, DollarSign } from "lucide-react"
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

  const productosPorPagina = 12;
  const [paginaFiltro, setPaginaFiltro] = useState(1);
  const [totalPaginasFiltro, setTotalPaginasFiltro] = useState(1);

  useEffect(() => {
    const cargarImagenesDePosts = async () => {
      const nuevasImagenes: { [id: number]: string } = {};

      // Cargar imágenes en paralelo para mejor rendimiento
      const promesas = posts.map(async (post) => {
        try {
          const entidad = "Producto";
          const data = await TraerArchivo(entidad, post.idProducto);
          if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
            const rutaNormalizada = data[0].ruta.replace(/\\/g, "/");
            const urlCompleta = `http://localhost:8080/${rutaNormalizada}`;
            return { id: post.idProducto, url: urlCompleta };
          }
        } catch (error) {
          console.error(`Error al cargar imagen del producto ${post.idProducto}:`, error);
        }
        return null;
      });

      const resultados = await Promise.all(promesas);
      resultados.forEach(resultado => {
        if (resultado) {
          nuevasImagenes[resultado.id] = resultado.url;
        }
      });

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

  const getCardStyle = (index: number) => {
    const styles = [
      "hover:shadow-[#114E93]/20",
      "hover:shadow-blue-100/50", 
      "hover:shadow-purple-100/50",
      "hover:shadow-orange-100/50"
    ];
    return styles[index % styles.length];
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden w-full">
      <div className="container mx-auto px-4 py-6 lg:py-10 h-full">
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h1 className="text-2xl font-bold text-gray-800">Catálogo</h1>
          <Button
            onClick={() => setMostrarFiltrosMobile(!mostrarFiltrosMobile)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#114E93] to-[#0D3A7A] hover:from-[#0D3A7A] hover:to-[#092B61] shadow-lg"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Sidebar de filtros rediseñado */}
          <aside className={`
            lg:w-80 lg:flex-shrink-0 lg:block bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 overflow-hidden
            ${mostrarFiltrosMobile ? 'block' : 'hidden lg:block'}
            ${mostrarFiltrosMobile ? 'fixed inset-x-4 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto' : ''}
          `}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#114E93] to-[#0D3A7A] rounded-xl">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
                </div>
                {hayFiltrosActivos && (
                  <Button
                    onClick={limpiarTodosFiltros}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
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
                <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 shadow-lg">
                  <h3 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Filtros Aplicados
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {nombreCategoria && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 rounded-md text-sm font-medium shadow-sm">
                        {nombreCategoria}
                        <button onClick={() => setnombreCategoria(null)} className="hover:bg-amber-300 rounded-md p-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {porcentajeDescuento && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 rounded-md text-sm font-medium shadow-sm">
                        {porcentajeDescuento}% descuento
                        <button onClick={() => setporcentajeDescuento(null)} className="hover:bg-amber-300 rounded-md p-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {precioMin && precioMax && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 rounded-md text-sm font-medium shadow-sm">
                        ${precioMin.toLocaleString()} - ${precioMax.toLocaleString()}
                        <button onClick={() => { setprecioMin(null); setprecioMax(null); }} className="hover:bg-amber-300 rounded-md p-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {region && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 rounded-md text-sm font-medium shadow-sm">
                        {regiones.find(r => r.value === region)?.label}
                        <button onClick={() => setregion(null)} className="hover:bg-amber-300 rounded-md p-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Categorías */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSeccion('categorias')}
                  className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-[#114E93]/10 to-[#0D3A7A]/10 hover:from-[#114E93]/20 hover:to-[#0D3A7A]/20 rounded-lg transition-all duration-300 border border-[#114E93]/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#114E93] rounded-lg">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Categorías</h3>
                  </div>
                  {seccionesAbiertas.categorias ? <ChevronUp className="w-5 h-5 text-[#114E93]" /> : <ChevronDown className="w-5 h-5 text-[#114E93]" />}
                </button>
                {seccionesAbiertas.categorias && (
                  <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
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
                        className={`w-full justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-300 ${nombreCategoria === categoria.nombreCategoria
                          ? "bg-gradient-to-r from-[#114E93] to-[#0D3A7A] text-white hover:from-[#0D3A7A] hover:to-[#092B61] shadow-lg"
                          : "hover:bg-[#114E93]/10 hover:text-[#114E93] hover:border-[#114E93]/30 border-[#114E93]/20"
                          }`}
                      >
                        {categoria.nombreCategoria}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Precios */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSeccion('precios')}
                  className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-lg transition-all duration-300 border border-amber-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500 rounded-lg">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Rango de Precios</h3>
                  </div>
                  {seccionesAbiertas.precios ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5 text-amber-600" />}
                </button>
                {seccionesAbiertas.precios && (
                  <div className="mt-4 space-y-2">
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
                        className={`w-full justify-start text-left py-3 px-4 rounded-lg transition-all duration-300 ${precioMin === rango_precio.min && precioMax === rango_precio.max
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-lg"
                          : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 border-amber-100"
                          }`}
                      >
                        ${rango_precio.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Descuentos */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSeccion('descuentos')}
                  className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-lg transition-all duration-300 border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Percent className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Descuentos</h3>
                  </div>
                  {seccionesAbiertas.descuentos ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-purple-600" />}
                </button>
                {seccionesAbiertas.descuentos && (
                  <div className="mt-4 space-y-3">
                    {promociones.map((promocion) => (
                      <label key={promocion.idPromocion} className="flex items-center space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-purple-50 transition-colors">
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
                          className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500"
                        />
                        <span className="text-gray-700 group-hover:text-purple-600 transition-colors font-medium">
                          {promocion.nombrePromocion} ({promocion.porcentajeDescuentoPromocion}%)
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Regiones */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSeccion('regiones')}
                  className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 rounded-lg transition-all duration-300 border border-cyan-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500 rounded-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Regiones</h3>
                  </div>
                  {seccionesAbiertas.regiones ? <ChevronUp className="w-5 h-5 text-cyan-600" /> : <ChevronDown className="w-5 h-5 text-cyan-600" />}
                </button>
                {seccionesAbiertas.regiones && (
                  <div className="mt-4 space-y-3 max-h-48 overflow-y-auto">
                    {regiones.map((regionItem) => (
                      <label key={regionItem.value} className="flex items-center space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-cyan-50 transition-colors">
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
                          className="w-4 h-4 text-cyan-600 border-cyan-300 focus:ring-cyan-500"
                        />
                        <span className="text-gray-700 group-hover:text-cyan-600 transition-colors font-medium">
                          {regionItem.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Overlay para mobile */}
          {mostrarFiltrosMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMostrarFiltrosMobile(false)}
            />
          )}

          {/* Main content con tamaño fijo */}
          <main className="flex-1 h-full overflow-y-auto min-w-0 w-full lg:min-w-[calc(100%-20rem)] lg:max-w-[calc(100%-20rem)]">
            {/* Contenido filtrado */}
            <div className={`${mostrarSeccionFiltros ? "hidden" : "block"} min-h-[600px]`}>
              {productosPaginados.length === 0 ? (
                <div className="text-center py-20 min-h-[400px] flex flex-col justify-center">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {productosPaginados.map((producto, index) => {
                    console.log(producto)
                    const cardStyle = getCardStyle(index);
                    return (
                      <div
                        key={producto.idProducto}
                        className={`group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-200 h-full transform hover:-translate-y-2 ${cardStyle}`}
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Botones de acción */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg">
                              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                            </button>
                            <Link
                              href={`/catalogo/detalleproducto/${producto.idProducto}`}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 border border-gray-200"
                            >
                              <Eye className="w-5 h-5 text-gray-600 hover:text-[#114E93]" />
                            </Link>
                          </div>

                        </div>

                        <div className="p-6 space-y-4">
                          <div className="space-y-2">
                            <Link
                              href={`/catalogo/detalleproducto/${producto.idProducto}`}
                              className="font-bold text-lg text-gray-800 group-hover:text-[#114E93] transition-colors line-clamp-2 leading-tight block"
                            >
                              {producto.nombreProducto}
                            </Link>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-[#114E93] to-[#0D3A7A] rounded-md flex items-center justify-center">
                                <span className="text-white text-xs font-bold">A</span>
                              </div>
                              <p className="text-sm text-gray-500">por {producto.nombreUsuario}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">(4.0)</span>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <div className="space-y-1">
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-[#114E93]">${producto.precioProducto.toLocaleString()}</span>
                                <span className="text-xs text-gray-500">COP</span>
                              </div>
                            </div>
{/*                             <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 shadow-lg cursor-pointer">
                              <ShoppingCart className="w-3 h-3" />
                              Agregar
                            </button> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contenido principal */}
            <div className={`${mostrarTodos ? "block" : "hidden"} min-h-[600px]`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {posts.map((post, index) => {
                  const cardStyle = getCardStyle(index);
                  return (
                    <div
                      key={post.idProducto}
                      className={`group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-200 h-full transform hover:-translate-y-2 ${cardStyle}`}
                    >
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={
                            post.listaArchivos && post.listaArchivos.length > 0
                              ? `/static/${post.listaArchivos[0].ruta.replace(/^\/+/, "")}`
                              : "/images/ImagenProductoPorDefecto.jpg"
                          }
                          alt={post.nombreProducto}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Botones de acción */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg">
                            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                          </button>
                          <Link
                            href={`catalogo/detalleproducto/${post.idProducto}`}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 border border-gray-200"
                          >
                            <Eye className="w-5 h-5 text-gray-600 hover:text-[#114E93]" />
                          </Link>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <Link
                            className="font-bold text-lg text-gray-800 group-hover:text-[#114E93] transition-colors line-clamp-2 leading-tight block"
                            href={`catalogo/detalleproducto/${post.idProducto}`}
                          >
                            {post.nombreProducto}
                          </Link>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#114E93] to-[#0D3A7A] rounded-md flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{post.nombreUsuario.charAt(0)}</span>
                            </div>
                            <p className="text-sm text-gray-500">por {post.nombreUsuario}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {stars.map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">(4.0)</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="space-y-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-[#114E93]">${post.precioProducto.toLocaleString()}</span>
                              <span className="text-xs text-gray-500">COP</span>
                            </div>
                          </div>
{/*                           <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 shadow-lg cursor-pointer">
                            <ShoppingCart className="w-3 h-3" />
                            Agregar
                          </button> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Paginación */}
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
