"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { filtarCategorias } from "../../services/apis/producto/filtarCategoria"
import { InputOTPSeparator } from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}
interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: boolean;
  archivoMultimedia: any[];
}
interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
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
  posts: Post[];
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


  const [productos, setProductos] = useState<Producto[]>([]);

  const [mostrarTodos, setMostrarTodos] = useState(true);
  function cambiarMostrarTodos(valor: boolean) {
    setMostrarTodos(valor);
  }

  const [filtrosOcultos, setFiltrosOcultos] = useState(false);
  function cambiarOcultamientoFiltros(valor: boolean) {
    setFiltrosOcultos(valor);
  }

  const [mostrarSeccionFiltros, setMostrarSeccionFiltros] = useState(true);
  function cambiarVisibilidadSeccion(valor: boolean) {
    setMostrarSeccionFiltros(valor);
  }

  const [nombreCategoria, setnombreCategoria] = useState<string | null>(null);
  const [porcentajeDescuento, setporcentajeDescuento] = useState<number | null>(null);
  const [precioMin, setprecioMin] = useState<number | null>(null);
  const [precioMax, setprecioMax] = useState<number | null>(null);

  useEffect(() => {
    if (
      nombreCategoria != null ||
      porcentajeDescuento != null ||
      precioMax != null ||
      precioMin != null
    ) {
      cambiarMostrarTodos(false);
      filtrarPorCategoria();
    } else {
      cambiarVisibilidadSeccion(true);
      cambiarMostrarTodos(true);
    }
  }, [nombreCategoria, porcentajeDescuento, precioMin, precioMax]);

  const filtrarPorCategoria = async () => {
    try {
      const res = await filtarCategorias(
        nombreCategoria || undefined,
        porcentajeDescuento ?? undefined,
        precioMin ?? undefined,
        precioMax ?? undefined
      );
      if (res) {
        setProductos(res);
      }
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  return (
    <section className="min-h-screen grid justify-items-center">
      <section className="grid grid-cols-5 w-[90%] shadow-2xl pt-5">
        <div className="col-start-1 col-end-2 col-span-1 row-span-2 shadow-2xl h-auto ">
          <div className=" ">
            {(nombreCategoria != null ||
              porcentajeDescuento != null ||
              precioMax != null ||
              precioMin != null) && (
                <div className={` pb-1  ${filtrosOcultos ? "hidden" : "block"}`}>
                  <h2 className="text-2xl mt-2 ml-2 ">Filtros Aplicados</h2>
                  {nombreCategoria != null && (
                    <div>
                      <div className="flex items-center  justify-center bg-amber-300 m-1 mb-2  max-w-65 w-50 rounded-lg">
                        <p className="ml-1">{nombreCategoria}</p>
                        <Button
                          className="bg-transparent hover:bg-transparent border-none shadow-none text-black"
                          onClick={() => {
                            setnombreCategoria(null);
                          }}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  )}
                  {porcentajeDescuento != null && (
                    <div className=" flex items-center  justify-center bg-amber-300 m-1  max-w-65 w-50 rounded-lg">
                      <p className="ml-2 bg-amber-300">
                        {porcentajeDescuento}% de Descuentos
                      </p>
                      <Button
                        className="bg-transparent hover:bg-transparent border-none shadow-none text-black"
                        onClick={() => {
                          setporcentajeDescuento(null);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  )}
                  {precioMin != null && precioMin != null && (
                    <div className=" flex items-center  justify-center bg-amber-300 m-1  max-w-65 w-55 rounded-lg">
                      <p className="ml-2 bg-amber-300">
                        Precios {precioMin} a {precioMax}
                      </p>
                      <Button
                        className="bg-transparent hover:bg-transparent border-none shadow-none text-black"
                        onClick={() => {
                          setprecioMin(null);
                          setprecioMax(null);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  )}
                </div>
              )}
          </div>
          <h2 className="text-2xl ml-2 ">Categorias</h2>
          <div className="grid pl-1 max-w-100 ">
            <div className="flex ">
              <div className="flex flex-wrap gap-2 mb-4   w-60">
                {categorias.map((categoria) => (
                  <div key={categoria.idCategoria} className="flex bg-gray-300 whitespace-normal">
                    <Button
                      onClick={() => {
                        setnombreCategoria(categoria.nombreCategoria);
                        cambiarMostrarTodos(false);
                        cambiarOcultamientoFiltros(false);
                        cambiarVisibilidadSeccion(false);
                      }}
                      className={` rounded hover:bg-amber-500
            ${nombreCategoria === categoria.nombreCategoria
                          ? "bg-amber-400 text-white"
                          : "bg-gray-300 text-black"
                        }`}
                    >
                      {categoria.nombreCategoria}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />

          <div className="g w-full ">
            <div className="ml-2">
              <h2>Rango de precios</h2>
              <Button className="flex  bg-gray-300 not-hover" onClick={() => {
                setprecioMin(rango.precioMinimo);
                setprecioMax(30000);
                cambiarMostrarTodos(false);
                cambiarOcultamientoFiltros(false);
                cambiarVisibilidadSeccion(false);
              }}
                className={` rounded mb-2 hover:bg-amber-500
            ${precioMin === rango.precioMinimo && precioMax === 30000
                    ? "bg-amber-400 text-white"
                    : "bg-gray-300 text-black"
                  }`}
              >
                <span className="text-black">{rango.precioMinimo}</span>
                <InputOTPSeparator />
                <span className="text-black">30.000</span>
              </Button>
              <Button className="flex" onClick={() => {
                setprecioMin(30000);
                setprecioMax(50000);
                cambiarMostrarTodos(false);
                cambiarOcultamientoFiltros(false);
                cambiarVisibilidadSeccion(false);
              }}
               className={` rounded mb-2 hover:bg-amber-500
            ${precioMin === 30000 && precioMax === 50000
                    ? "bg-amber-400 text-white"
                    : "bg-gray-300 text-black"
                  }`}>
                <span>30.000</span>
                <InputOTPSeparator />
                <span>50.000</span>
              </Button>
              <Button className="flex" onClick={() => {
                setprecioMin(50000);
                setprecioMax(100000);
                cambiarMostrarTodos(false);
                cambiarOcultamientoFiltros(false);
                cambiarVisibilidadSeccion(false);
              }}
               className={` rounded mb-2 hover:bg-amber-500
            ${precioMin === 50000 && precioMax === 100000
                    ? "bg-amber-400 text-white"
                    : "bg-gray-300 text-black"
                  }`}>
                <span>50.000</span>
                <InputOTPSeparator />
                <span>100.000</span>
              </Button>
              <Button className="flex" onClick={() => {
                setprecioMin(100000);
                setprecioMax(rango.precioMaximo);
                cambiarMostrarTodos(false);
                cambiarOcultamientoFiltros(false);
                cambiarVisibilidadSeccion(false);
              }}
               className={` rounded mb-2 hover:bg-amber-500
            ${precioMin === 100000 && precioMax === rango.precioMaximo
                    ? "bg-amber-400 text-white"
                    : "bg-gray-300 text-black"
                  }`}>
                <span>100.000</span>
                <InputOTPSeparator />
                <span>{rango.precioMaximo}</span>
              </Button>
            </div>
          </div>
          <br />
          <div className="">
            <h2 className="text-2xl ml-2">Descuentos</h2>
            {promociones.map((promocion) => (
              <div key={promocion.idPromocion}>
                <label className="ml-2">
                  <input
                    type="radio"
                    name={promocion.nombrePromocion}
                    value={promocion.porcentajeDescuentoPromocion}
                    checked={
                      porcentajeDescuento ===
                      promocion.porcentajeDescuentoPromocion
                    }
                    onChange={() => {
                      setporcentajeDescuento(
                        promocion.porcentajeDescuentoPromocion
                      );
                      cambiarMostrarTodos(false);
                      cambiarOcultamientoFiltros(false);
                      cambiarVisibilidadSeccion(false);
                    }}

                  />
                  {promocion.nombrePromocion}{" "}
                  {promocion.porcentajeDescuentoPromocion}%
                </label>
                <br />
              </div>
            ))}
          </div>

          <br />
          <div className="">
            <h2 className="text-2xl ml-2">Calificacion</h2>
            <div className="flex ml-2">
              {stars.map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < 1 ? "yellow" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <br />
          <div className="">
            <h2 className="text-2xl ml-2">Regiones</h2>
            <Link href="#" className="ml-2">
              Región Andina
            </Link>
            <br />
            <Link href="#" className="ml-2">
              Región Caribe
            </Link>
            <br />
            <Link href="#" className="ml-2">
              Región Pacífica
            </Link>
            <br />
            <Link href="#" className="ml-2">
              Región Amazónica
            </Link>
            <br />
            <Link href="#" className="ml-2">
              Región Orinoquía
            </Link>
            <br />
            <Link href="#" className="ml-2">
              Región Insular
            </Link>
            <br />
          </div>
        </div>
        <div className="col-start-2 col-end-6  flex justify-center">
          <div className=" w-[90%]  ">
            <div
              className={`grid grid-cols-3 gap-5  place-content-stretch mr-5 ml-5 ${mostrarSeccionFiltros ? "hidden" : "block"
                }`}
            >
              {productos.map((producto) => (
                <div
                  key={producto.idProducto}
                  className="  rounded-lg shadow-xl  "
                >
                  <Card className="">
                    <div className="group  static flex justify-center-safe m-0 p-0 ">
                      <div className="">
                        <img src="logo.png" alt="Logo" className="h-70 w-100" />
                      </div>
                    </div>
                    <div className=" p-5 h-full">
                      <Link
                        className=" m-0 p-0  "
                        href={`productos/detalleproducto/${producto.idProducto}`}
                      >
                        <p className="text-2xl underline hover:text-amber-300 transition-colors duration-300">
                          {producto.nombreProducto}
                        </p>
                      </Link>
                      <p>
                        ${producto.precioProducto} COP{" "}
                        <span className="line-through">Precio anterior</span>
                      </p>
                      <div className="flex">
                        {stars.map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < producto.idProducto ? "yellow" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div
              id="Productos"
              className={`grid grid-cols-3 gap-5  place-content-stretch mr-5 ml-5 ${mostrarTodos ? "block" : "hidden"
                }`}
            >
              {posts.map((post) => (
                <div
                  key={post.idProducto}
                  className=" w-[100%] rounded-lg shadow-xl  "
                >
                  <Card className="">
                    <div className="group static flex justify-center-safe">
                      <div className="">
                        <img src="logo.png" alt="Logo" className="h-70 w-100" />
                      </div>
                    </div>
                    <div className=" p-5 h-full">
                      <Link
                        className=" m-0 p-0  "
                        href={`productos/detalleproducto/${post.idProducto}`}
                      >
                        <p className="text-2xl underline hover:text-amber-300 transition-colors duration-300">
                          {post.nombreProducto}
                        </p>
                      </Link>{" "}
                      <p>
                        ${post.precioProducto} COP{" "}
                        <span className="line-through">Precio anterior</span>
                      </p>
                      <div className="flex">
                        {stars.map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < post.idProducto ? "yellow" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-6">
          {(mostrarTodos && totalPages > 1) && (

            <div className="flex justify-center items-center my-4 col-start-5 col-end-10">
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

        </div>
      </section>
    </section >
  );
}
