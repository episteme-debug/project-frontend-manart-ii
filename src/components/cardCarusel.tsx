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
export default function cardCarusel({ posts }: { posts: Post[] }) {
  const[favorito,setFavorito] = useState(false);





  return (
    <section className='w-full'>

      <div className="">
        {posts.map((post) => (
          <div key={post.idProducto} className="mb-1 m-0 "  >
            <Card className="w-full bg-white h-130 m-0 p-0 ">
              <Link href={`productos/detalleproducto/${post.idProducto}`}>
              <div className="group static flex justify-end ">
                <div className='hidden group-hover:flex space-x-1 justify-end w-[24%] m-0 p-0  absolute '>
                  
                </div>
                <div className=''>
                  <img src="/logo.png" alt="Logo" className='h-70 w-100' />
                </div>
              </div>
              <div className=' p-5 h-full'>
                 <h1 className='text-2xl'>{post.nombreProducto}</h1>
                
                <CardDescription>{post.descripcionProducto}</CardDescription>
                <p>${post.precioProducto} COP <span>Descuento si aplica</span></p>
                <CardDescription>Precio anterior</CardDescription>
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
    </section>
  );
}