"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { listarproductos } from '../services/apis/listarProductosCarrito';
import { Button } from "@/components/ui/button";
import { eliminarproducto } from "../services/apis/eliminarProducto";
import { traerSubtotal } from "../services/apis/gatSubtotaldeCarrito";
import { actualizarCantidad } from "../services/apis/actualizarCatidades"

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
  //Listar producto de carrito
  const [productos, setProductos] = useState<Productos[]>([]);

  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState<number | null>(null);

  useEffect(() => {
    listarproductos().then((data) => setProductos(data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      const idCarrito = productos[0].idCarrito;
      traerSubtotal(idCarrito).then((total) => setSubtotal(total));
    }
  }, [productos]);

  //Eliminar producto de carrito
  const handleEliminar = async (idItem: number) => {
    await eliminarproducto(idItem);
    const productosActualizados = await listarproductos();
    setProductos(productosActualizados);
  };

  if (loading) {
    return <p>Cargando Productos...</p>;
  }

  return (
    <section>
      <div className="mb-6">
        <div className="w-full flex">
          <div className="w-[75%] bg-white shadow-xl p-5">
            {productos.map((producto) => (
              <div key={producto.idItem} className="flex w-full shadow-xs mb-5" id='cardProductoscarrito'>
                <div className="w-50">
                  <AspectRatio ratio={14 / 9}>
                    <Image
                      src="/logo.png"
                      alt="Image"
                      className="rounded-md object-cover w-full h-full"
                      width={600}
                      height={0}
                    />
                  </AspectRatio>
                </div>
                <div className="w-full content-center grid grid-cols-8">
                  <div className="col-span-4 pl-3">
                    <h1>{producto.nombreProducto}</h1>
                  </div>
                  <div className="col-span-2 justify-items-center w-auto">
                    <div className="flex justify-self-center">
                      <button
                        className="bg-gray-300 w-10"
                        onClick={async () => {
                          const nuevaCantidad = producto.cantidad - 1;
                          if (nuevaCantidad >= 1) {
                            await actualizarCantidad(producto.idItem, nuevaCantidad);
                            const productosActualizados = await listarproductos();
                            setProductos(productosActualizados);
                          }
                        }}
                      >
                        -
                      </button>

                      <input
                        type="text"
                        className="text-center w-10 border-2 border-gray-950"
                        value={producto.cantidad}
                        readOnly
                        max={7}
                      />


                      <button
                        className="bg-gray-300 w-10"
                        onClick={async () => {
                          const nuevaCantidad = producto.cantidad + 1;
                          await actualizarCantidad(producto.idItem, nuevaCantidad);
                          const productosActualizados = await listarproductos();
                          setProductos(productosActualizados);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 content-center justify-items-center">
                    <p><span>$</span>{producto.subtotal}</p><span>COP</span>
                  </div>
                  <div className="col-start-1 col-end-8 pl-3">
                    <Button
                      variant="outline"
                      className="shadow-none underline border-none"
                      onClick={() => handleEliminar(producto.idItem)}
                    >
                      Eliminar
                    </Button>
                    <Link href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400 ml-5">
                      Compra ahora
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[25%] pr-5 pl-5">
            <div className="shadow-2xl bg-white justify-items-center p-4">
              <h1 className="text-2xl mb-4">Resumen de compra</h1>
              <hr />
              <p className="text-xl mt-4">
                Subtotal:{" "}
                <span className="font-semibold text-green-600">
                  {subtotal !== null ? `$${subtotal}` : "Cargando..."}
                </span>
              </p>
              <hr className="my-4" />
              <p className="text-xl">Costo de envío:</p>
              <hr className="my-4" />
              <p className="text-xl">Cupones:</p>
              <hr className="my-4" />
              <p className="text-xl">Total de compra:{" "}
                <span className="font-semibold text-green-600">
                  {subtotal !== null ? `$${subtotal}` : "Cargando..."}
                </span></p>
              <hr className="my-4" />
              <Button variant="outline" className="bg-amber-300 mb-4">
                Continuar con la compra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListarProductoCarritos;
