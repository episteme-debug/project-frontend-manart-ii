'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { traersCategorias } from "../services/apis/traersCategorias";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from 'axios';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


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


const stars = Array(5).fill(0)
export default function CardCatalogo({
  posts,
  page,
  totalPages
}: {
  posts: Post[],
  page: number,
  totalPages: number
}) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  //Todas las cards sin flitos para ocultarlas
  const [visible, setvisible] = useState(true);
  function inhabilitar(estado: boolean) {
    setvisible(estado)
  }
  //Fitros aplicados
  const [Visibles, setVisibles] = useState(false);
  function habilitar(activar: boolean) {
    setVisibles(activar)
  }
  
  const [nombreCategoria, setnombreCategoria] = useState<string | null>(null);
  const [porcentajeDescuento, setporcentajeDescuento] = useState<number | null>(null);
  const [precioMin, setprecioMin] = useState<number | null>(null);
  const [precioMax, setprecioMax] = useState<number | null>(null);

  //
  useEffect(() => {
    filtrarPorCategoria();

  }, [nombreCategoria, porcentajeDescuento, precioMin, precioMax]);
  const filtrarPorCategoria = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/producto/public/filtar`, {
        params: {
          nombreCategoria: nombreCategoria || undefined,
          porcentajeDescuento: porcentajeDescuento ?? undefined,
          precioMin: precioMin ?? undefined,
          precioMax: precioMax ?? undefined
        }
      }
      )
      setProductos(res.data);
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  };
  useEffect(() => {
    traersCategorias()
      .then((data) => setCategorias(data))
  }, []);
  return (
    <section className='grid grid-cols-10  w-[100%] min-h-screen'>
      <div className="col-start-1 col-end-4 col-span-1 row-span-2 mt-3 pt-1 shadow-2xl h-auto mr-3">
        {(nombreCategoria != null || porcentajeDescuento != null || precioMax != null || precioMin != null) &&(
        <div className={`bg-blue-300  ${visible ? 'hidden' : 'block'}`}>
          <h2 className='text-2xl mt-2 ml-2'>Filtros Aplicados</h2>
          {nombreCategoria != null &&(
          <div className='bg-blue-400 flex ml-2 '>
               <p>{nombreCategoria}</p>
            <Button className=''onClick={() => {
                      setnombreCategoria(null)
                      habilitar(false)
                    }
                    }>X</Button>
         
          </div>
          )}
          {porcentajeDescuento != null &&(
          <div className='bg-blue-400 flex ml-2 '>
            <p>{porcentajeDescuento}</p>
            <Button className='' onClick={() => {
              setporcentajeDescuento(null);
            }
            }>X</Button>
          </div>
          )}
        </div>
        )}
        <h2 className='text-2xl ml-2'>Categorias</h2>
        <div className='grid  p-1'>
          <div className="flex">
            <div className="flex flex-wrap gap-2 mb-4 ml-1">
              {categorias.map((categoria) => (
                <div key={categoria.idCategoria} className='flex bg-gray-300'>
                  <Button

                    onClick={() => {
                      setnombreCategoria(categoria.nombreCategoria);
                      inhabilitar(false)
                      habilitar(true)
                    }
                    }
                    className={` rounded hover:bg-blue-600
            ${nombreCategoria === categoria.nombreCategoria
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-black'
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

        <div className=' '>
          <label className='m-2 text-2xl' >Precio</label>
          <div className=' ml-2 flex'>
            <input type="number" min="60000" max="450000" name="cantidadMinima" id="" className='border-2  w-[45%] m ' placeholder="Lo minimo es:" />
            <InputOTPSeparator />
            <input type="number" min="60000" max="450000" name="cantidadMaxima" id="" className='border-2  w-[45%]' placeholder="Lo maximo es:" />
          </div>
          <div>
            <Button variant="outline" className='ml-2 mt-1'>Filtrar</Button>
          </div>
        </div>
        <br />
        <div className=''>
          <h2 className='text-2xl ml-2'>Descuentos</h2>
          <label className='ml-2'>
            <input type="radio" name="20" value={20} checked={porcentajeDescuento === 20} onChange={() => {
              setporcentajeDescuento(20)
              habilitar(true)
            }} id="" />
            20% dcto o mas
          </label>
          <br />
          <label className='ml-2'>
            <input type="radio" name="30" value={30} checked={porcentajeDescuento === 30} onChange={() => {
              setporcentajeDescuento(30)
              habilitar(true)
            }} id="" />
            30% dcto o mas
          </label>
          <br />
          <label className='ml-2'>
            <input type="radio" name="40" value={40} checked={porcentajeDescuento === 40} onChange={() => {
              setporcentajeDescuento(40)
              habilitar(true)
            }} id="" />
            40% dcto o mas
          </label>
          <br />
          <label className='ml-2'>
            <input type="radio" name="50" value={50} checked={porcentajeDescuento === 50} onChange={() => {
              setporcentajeDescuento(50)
              habilitar(true)
            }} id="" />
            50% dcto o mas
          </label>
          <br />
          <label className='ml-2'>
            <input type="radio" name="60" value={60} checked={porcentajeDescuento === 60} onChange={() => {
              setporcentajeDescuento(60)
              habilitar(true)
            }} id="" />
            60% dcto o mas
          </label>
        </div>

        <br />
        <div className=''>
          <h2 className='text-2xl ml-2'>Calificacion</h2>
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
        <div className=''>
          <h2 className='text-2xl ml-2'>Regiones</h2>
          <Link href="#" className='ml-2'>Región Andina</Link>
          <br />
          <Link href="#" className='ml-2'>Región Caribe</Link>
          <br />
          <Link href="#" className='ml-2'>Región Pacífica</Link>
          <br />
          <Link href="#" className='ml-2'>Región Amazónica</Link>
          <br />
          <Link href="#" className='ml-2'>Región Orinoquía</Link>
          <br />
          <Link href="#" className='ml-2'>Región Insular</Link>
          <br />
        </div>
      </div>
      <div className='col-start-4 col-end-10 w-[115%] mt-3'>
        <div className="grid grid-cols-3 gap-3 col-span-4  mb-3 ">
          {productos.map((producto) => (
            <div key={producto.idProducto} className="rounded-lg  m-0 shadow-xl "  >
              <Card className=" m-0 p-0  ">
                <Link href={`productos/detalleproducto/${producto.idProducto}`}>
                  <div className="group static flex justify-end ">

                    <div className='h-70 w-100'>
                      <img src="logo.png" alt="Logo" className='' />
                    </div>
                  </div>
                  <div className=' p-5 h-full'>
                    <h1 className='text-2xl'>{producto.nombreProducto}</h1>
                    <p>${producto.precioProducto} COP <span className='line-through'>Precio anterior</span></p>
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
                </Link>
              </Card>
            </div>
          ))}
        </div>

        <div id='Productos' className={`grid grid-cols-3 gap-3 col-span-4 mt-3  ${visible ? 'block' : 'hidden'}`}>
          {posts.map((post) => (
            <div key={post.idProducto} className=" rounded-lg m-0 shadow-xl bg-red-300"  >
              <Card className=" m-0 p-0  ">
                <Link href={`productos/detalleproducto/${post.idProducto}`}>
                  <div className="group static flex justify-end ">

                    <div className=''>
                      <img src="logo.png" alt="Logo" className='h-70 w-100' />
                    </div>
                  </div>
                  <div className=' p-5 h-full'>
                    <h1 className='text-2xl'>{post.nombreProducto}</h1>
                    <p>${post.precioProducto} COP <span className='line-through'>Precio anterior</span></p>
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
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-full my-4 col-start-5 col-end-10 ">
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

    </section>
  );
}

