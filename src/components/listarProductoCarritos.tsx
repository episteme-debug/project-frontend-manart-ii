"use client"
import React from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { listarproductos } from '../services/apis/listarProductosCarrito';
import { Button } from "@/components/ui/button";


interface Productos {
  idCarrito: number;
  idItem: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}



function ListarProductoCarritos() {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarproductos().then((data) => setProductos(data)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Cargando Productos...</p>;
  }
  return (
    <section>
      <div className="mb-6">
        <div className="w-full flex">
          
            <div className=" w-[75%] bg-white shadow-xl p-5  ">
              {productos.map((producto) => (
              <div  key={producto.idItem}  className="flex w-full shadow-xs mb-5">
                <div className=" w-50 ">
                  <AspectRatio ratio={14 / 9}>
                    <Image
                      src="/logo.png"
                      alt="Image"
                      className="rounded-md  object-cover w-full h-full"
                      width={600}
                      height={0}
                    />
                  </AspectRatio>
                </div>
                <div className=" w-full content-center grid grid-cols-8">
                  <div className="col-span-4 b pl-3">
                    <h1>{producto.nombreProducto}</h1>
                  </div>
                  <div className="col-span-2  justify-items-center w-auto">
                    <div className="flex justify-self-center ">
                      <button className=" bg-gray-300 w-10">-</button>
                      <input type="text" className="text-center w-10 border-2 border-gray-950" value={producto.cantidad ?? ""} />
                      <button className="bg-gray-300 w-10 ">+</button>
                    </div>
                  </div>
                  <div className="col-span-2 content-center justify-items-center ">
                    <p><span>$</span>{producto.subtotal}</p><span>COP</span>
                  </div>
                  <div className="col-start-1 col-end-8  pl-3  ">
                    <Link href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400">Eliminar</Link>
                    <Link href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400 ml-5">Compra ahora</Link>
                  </div>
                </div>
              </div>
              ))}
            </div>
          <div className=" w-[25%] pr-5 pl-5">
            <div className="shadow-2xl bg-white justify-items-center">
              <h1 className="text-2xl">Resumen de compra</h1>
              <hr />
              <br />
              <p className="text-xl">Sudtotal:</p>
              <hr />
              <br />
              <p className="text-xl">Costo de envio:</p>
              <hr />
              <br />
              <p className="text-xl">Cupones:</p>
              <hr />
              <br />
              <p className="text-xl">Total de compra:</p>
              <hr />
              <br />
              <Button variant="outline" className=' bg-amber-300 mb-4  
            '>Continuar con la compra</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListarProductoCarritos;
