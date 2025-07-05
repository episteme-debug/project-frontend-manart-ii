"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import { listarproductos } from '../../services/apis/carrito/listarProductosCarrito';
import { Button } from "@/components/ui/button";
import { eliminarproducto } from "../../services/apis/carrito/eliminarProducto";
import { traerSubtotal } from "../../services/apis/carrito/traerSubtotaldeCarrito"
import { ActualizarCantidad } from '@/api/CarritoCompras';
import { generarPago } from '@/api/Pedido';
import FormularioPago from '../FormularioPago';
import { ShoppingCart, Trash2, Plus, Minus, Package, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarrito } from '@/contexts/CarritoContext';

interface Productos {
  idCarrito: number;
  idItem: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  imagenProducto: string;
}

function ListarProductoCarritos() {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState<number | null>(null);
  const [visible, setvisible] = useState(true);
  const [datosPayU, setDatosPayU] = useState(null);
  const [cargando, setCargando] = useState(false);

  const { actualizarCarrito } = useCarrito();

  function inhabilitar(estado: boolean) {
    setvisible(estado)
  }

  useEffect(() => {
    listarproductos().then((data) => setProductos(data)).finally(() => setLoading(false));
  }, []);

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
    
    // Actualizar el contexto del carrito
    await actualizarCarrito();
  };

  const handleContinuarCompra = async () => {
    setCargando(true);
    try {
      const datos = await generarPago();
      setDatosPayU(datos);
    } catch (error) {
      console.error("Error al generar pago:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleCantidadChange = async (idItem: number, nuevaCantidad: number) => {
    if (nuevaCantidad >= 1) {
      await ActualizarCantidad(idItem, nuevaCantidad);
      const productosActualizados = await listarproductos();
      setProductos(productosActualizados);
      
      // Actualizar el contexto del carrito
      await actualizarCarrito();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#ffffff]">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-[#010668]" />
            Mi Carrito
          </h1>
        </div>

        {/* Carrito vacío */}
        <Card className={`mb-8 border-0 shadow-lg ${visible ? 'block' : 'hidden'}`}>
          <CardContent className="text-center py-16 px-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">Tu carrito está vacío</h2>
                <p className="text-gray-600">Descubre nuestros productos y empieza a agregar artículos increíbles</p>
              </div>
              <Link href={"/catalogo"} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl">
                Ver productos
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contenido del carrito */}
        <div className={`${visible ? 'hidden' : 'block'}`}>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            <div className="xl:col-span-3">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="text-xl text-gray-800">
                    Productos ({productos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {productos.map((producto, index) => (
                      console.log(producto),
                      <div key={producto.idItem} className={`p-4 lg:p-6 transition-colors hover:bg-gray-50 ${index !== productos.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                          
                          {/* Imagen del producto */}
                          <div className="w-full lg:w-32 h-48 lg:h-32 flex-shrink-0">
                            <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden">
                              <Image
                                src={`/static/${producto.imagenProducto}`}
                                alt={producto.nombreProducto}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          {/* Información del producto */}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                              
                              {/* Nombre y detalles */}
                              <div className="space-y-2">
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 line-clamp-2">
                                  {producto.nombreProducto}
                                </h3>
                                <p className="text-gray-600">
                                  Precio unitario: <span className="font-medium">${producto.precioUnitario.toLocaleString()} COP</span>
                                </p>
                              </div>

                              {/* Precio total */}
                              <div className="lg:text-right">
                                <p className="text-2xl font-bold text-[#010668]">
                                  ${producto.subtotal.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">COP</p>
                              </div>
                            </div>

                            {/* Controles de cantidad y eliminar */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                              
                              {/* Control de cantidad */}
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 font-medium">Cantidad:</span>
                                <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => handleCantidadChange(producto.idItem, producto.cantidad - 1)}
                                    className="p-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={producto.cantidad <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <div className="w-16 h-10 flex items-center justify-center bg-white border-x border-gray-200">
                                    <span className="font-medium">{producto.cantidad}</span>
                                  </div>
                                  <button
                                    onClick={() => handleCantidadChange(producto.idItem, producto.cantidad + 1)}
                                    className="p-2 hover:bg-gray-200 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEliminar(producto.idItem)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-1">
              <div className="sticky top-6 space-y-6">
                
                <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#ffbd2e] to-[#ffe79d] text-white">
                    <CardTitle className="text-xl font-semibold">Resumen de compra</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-xl font-semibold text-gray-800">
                          {subtotal !== null ? `$${subtotal.toLocaleString()}` : "Cargando..."}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Envío:</span>
                          <span className="text-green-600 font-medium">Gratis</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-lg font-semibold text-gray-800">Total:</span>
                          <span className="text-2xl font-bold text-[#010668]">
                            {subtotal !== null ? `$${subtotal.toLocaleString()}` : "Cargando..."}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 text-right">COP</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {!datosPayU && (
                        <Button
                          onClick={handleContinuarCompra}
                          disabled={cargando || productos.length === 0}
                          className="w-full bg-gradient-to-r  from-[#ffbd2e] to-[#ffe79d] hover:from-[#ff2e2e] hover:to-[#ff9d9d] text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                        >
                          {cargando ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Generando...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Continuar con la compra
                            </div>
                          )}
                        </Button>
                      )}

                      {datosPayU && <FormularioPago datos={datosPayU} />}
                    </div>
                  </CardContent>
                </Card>

               {/*  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Envío gratis</p>
                        <p className="text-gray-600">A partir de $50.000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Garantía extendida</p>
                        <p className="text-gray-600">30 días de devolución</p>
                      </div>
                    </div>
                  </CardContent> 
                </Card>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListarProductoCarritos;