"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { listarproductos } from '../../services/apis/carrito/listarProductosCarrito';
import { Button } from "@/components/ui/button";
import { eliminarproducto } from "../../services/apis/carrito/eliminarProducto";
import { traerSubtotal } from "../../services/apis/carrito/traerSubtotaldeCarrito"
import { actualizarCantidad } from "../../services/apis/carrito/actualizarCatidades"
import { traerArchivo } from "../../api/detalleCategoria/taerArchivos"

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
  const [subtotal, setSubtotal] = useState<number | null>(null);
  const [imagenesProductos, setImagenesProductos] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    listarproductos().then((data) => setProductos(data)).finally(() => setLoading(false));
  }, []);

  const [visible, setvisible] = useState(true);
  function inhabilitar(estado: boolean) {
    setvisible(estado)
  }

  useEffect(() => {
    if (productos.length > 0) {
      const idCarrito = productos[0].idCarrito;
      traerSubtotal(idCarrito).then((total) => setSubtotal(total));
      inhabilitar(false);
    } else {
      setSubtotal(0.0);
      inhabilitar(true);
    }
  }, [productos]);
  const handleEliminar = async (idItem: number) => {
    await eliminarproducto(idItem);
    const productosActualizados = await listarproductos();
    setProductos(productosActualizados);
  };

  useEffect(() => {
    const cargarImagenesDePosts = async () => {
      const nuevasImagenes: { [id: number]: string } = {};

      for (const post of productos) {
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
  }, [productos]);

  if (loading) {
    return <p>Cargando Productos...</p>;
  }
  return (
    <section>
      <div className={`bg-white shadow-xl w-[100%] h-[200] mb-4 flex items-stretch justify-center ${visible ? 'block' : 'hidden'}`}>
        <div className='self-center  '><h1 className='text-2xl'>Tu carrito esta vacio mira nuestro productos y empieza a agregar</h1> </div>
      </div>
      <div className={`mb-6 ${visible ? 'hidden' : 'block'} `}>
        <div className="w-full flex">
          <div className="w-[75%] bg-white shadow-xl p-5">
            {productos.map((producto) => (
              <div key={producto.idItem} className="flex w-full shadow-xs mb-5" id='cardProductoscarrito'>
                <div className="w-50">
                  <AspectRatio ratio={14 / 9}>
                    <Image src={imagenesProductos[producto.idProducto] || "/imagen-defecto.png"} alt={producto.nombreProducto} width={300}
                      height={300}
                      className="object-contain w-full max-h-[100px]"
                      priority />
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
                    <p><span>$</span>{producto.subtotal} <span>COP</span></p>
                  </div>
                  <div className="col-start-1 col-end-8 pl-3">
                    <Button
                      variant="outline"
                      className="shadow-none underline border-none"
                      onClick={() => handleEliminar(producto.idItem)
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[25%] pr-5 pl-5">
            <div className="shadow-2xl bg-white p-4">
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
