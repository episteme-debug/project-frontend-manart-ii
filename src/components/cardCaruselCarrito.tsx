'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

const stars = Array(5).fill(0)
export default function cardCaruselCarrito({ posts }: { posts: Post[] }) {
  const [favorito, setFavorito] = useState(false);





  return (
    <section className='w-full'>

      <div className="">
        {posts.map((producto) => (
          <div key={producto.idProducto} className="  rounded-lg  "  >

              <Card className="">
                <div className="group  static flex justify-center-safe m-0 p-0 ">
                  <div className=''>
                    <img src="/logo.png" alt="Logo" className='h-70 w-100' />
                  </div>
                </div>
                <div className=' p-5 h-full'>
                 <Link className=' m-0 p-0  ' href={`productos/detalleproducto/${producto.idProducto}`}>
                  <p className='text-2xl underline hover:text-amber-300 transition-colors duration-300'>{producto.nombreProducto}</p>
                  </Link><p>${producto.precioProducto} COP <span className='line-through'>Precio anterior</span></p>
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
    </section>
  );
}