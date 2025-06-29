'use client'
import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import Image from "next/image";
import { traerArchivo } from "../../api/detalleCategoria/taerArchivos"
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
  const [imagenesProductos, setImagenesProductos] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    const cargarImagenesDePosts = async () => {
      const nuevasImagenes: { [id: number]: string } = {};

      for (const post of posts) {
        try {
          const entidad = "Producto";
          const data = await traerArchivo(entidad, post.idProducto);
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

    cargarImagenesDePosts();

  }, [posts]);
  return (
    <section className='w-full'>

      <div className="">
        {posts.map((producto) => (
          <div key={producto.idProducto} className="  rounded-lg  "  >


            <Card className=" rounded-lg  ">
              <div className="group  static flex justify-center-safe m-0 p-0 ">
                <div className="max-h-300">
                  <Image src={imagenesProductos[producto.idProducto] || "/imagen-defecto.png"} alt={producto.nombreProducto} width={300}
                    height={300}
                    className="object-contain w-full max-h-[250px]"
                    priority />
                </div>
              </div>
              <div className=' p-5 h-full'>
                <Link className=' m-0 p-0  ' href={`${producto.idProducto}`}>
                  <p className='text-2xl underline hover:text-amber-300 transition-colors duration-300'>{producto.nombreProducto}</p>
                </Link>
                <p>${producto.precioProducto} COP </p>
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