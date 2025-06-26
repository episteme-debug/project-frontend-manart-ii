"use client";

import React from "react";
import Image from "next/image";
import CardCarusel from "../cardCarusel";
import ActivarBoton from "../../components/carrito/agregarCarrito";
import ComparaAhora from "../../components/carrito/comparAhora";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const stars = Array(5).fill(0);

interface DetalleProductoClienteProps {
    producto: {
        idProducto: number;
        nombreProducto: string;
        descripcionProducto: string;
        precioProducto: number;
        stockProducto: number;
    };
    posts: {
        idProducto: number;
        nombreProducto: string;
        descripcionProducto: string;
        precioProducto: number;
        stockProducto: number;
    }[];
}

export default function DetalleProductoCliente({ producto, posts }: DetalleProductoClienteProps) {
    return (
        <section className="grid w-full h-screen p-2 justify-items-center ">
            <section className="grid grid-cols-10 bg-gray-450 shadow-2xl max-w-[85%] rounded-md p-5">
                {/* Imagenes */}
                <div className="flex mr-1 pt-5 col-span-4 rounded-tl-lg h-[465px]">
                    <div className="relative h-full overflow-hidden">
                        <Carousel orientation="vertical" className="w-full h-full relative">
                            <CarouselContent className="flex flex-col h-full">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <CarouselItem
                                        key={i}
                                        className="relative flex justify-center items-center h-[70px] mb-1"
                                    >
                                        <div className="relative w-[60px] h-[60px]">
                                            <Image src="/logo.png" alt={`Logo ${i}`} fill className="object-contain rounded" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className="ml-6 flex-1 h-full">
                        <div className="relative w-full h-full">
                            <Image src="/logo.png" alt="Main Image" fill className="rounded-lg object-cover border-1 border-gray" />
                        </div>
                    </div>
                </div>

                {/* Info producto */}
                <div className="col-span-3 pt-5 p-3 h-150">
                    <div className="flex justify-end pr-5 ">
                        <button className=" rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    d="M12.001 4.529c2.349-4.47 12-2.157 9.267 4.068C19.506 12.516 12 19 12 19s-7.505-6.484-9.268-10.403C-.001 2.372 9.652.06 12.001 4.529z"
                                />
                            </svg>
                        </button>

                    </div>
                    <h1 className="text-4xl text-amber-500 pb-4">{producto.nombreProducto}</h1>
                    <h3 className="text-2xl pb-3">
                        Precio: ${producto.precioProducto} COP
                    </h3>
                    <div className="col-start-1 col-end-5 flex pb-3">
                        {stars.map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" fill={i < 1 ? "yellow" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562..." />
                            </svg>
                        ))}
                    </div>
                    <p className="text-xl pb-3">Nombre del artesano</p>
                    <p className="text-xl pb-3">{producto.descripcionProducto}</p>
                </div>

                {/* Agregar al carrito */}
                <div className=" col-span-3">
                    <div className="rounded-lg m-5">
                        <Card className="h-[100%] min-h-50">
                            <CardHeader>
                                <CardTitle>Cantidad disponibles: {producto.stockProducto}</CardTitle>
                                <CardDescription>Costo de Envio: $$$$</CardDescription>
                            </CardHeader>
                            <ComparaAhora idProducto={producto.idProducto} />
                            <ActivarBoton idProducto={producto.idProducto} />
                        </Card>
                    </div>
                    <div className="rounded-lg m-5">
                        <Card className="h-[100%] min-h-50">
                            <CardHeader>
                                <CardTitle>Metodos de pago</CardTitle>
                                <CardDescription>Descripción de métodos de pago.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image src="/Metodo_de_pago.png" alt="Metodo_de_pago" width={900} height={600} />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Descripción extendida */}
                <div className="col-start-1 col-end-8 h-full">
                    <hr />
                    <div className="flex-auto m-2 shadow-2x1 p-2">
                        <h1 className="text-2xl">Descripcion del producto</h1>
                        <p>Texto descriptivo del producto.</p>
                    </div>
                    <div className="border-1 border-gray-200"></div>
                    <div className="flex-auto m-2 shadow-2x1">
                        <h1 className="text-2xl">Detalle del producto</h1>
                        <p>Detalle extendido del producto.</p>
                    </div>
                </div>

                {/* Opiniones */}
                <div className="col-start-1 col-end-11 mt-5 grid grid-cols-6 w-full h-[350px]">
                    <div className="col-span-2 ml-2 w-80">
                        <h1>Opiniones del producto</h1>
                        <img src="/Estrellas.png" alt="" />
                    </div>
                    <div className="col-span-4">
                        <h1>Las más recientes</h1>
                        <div className="relative h-[300px]">
                            <Carousel orientation="vertical" className="relative h-full">
                                <CarouselPrevious className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md" />
                                <CarouselContent className="h-80">
                                    <CarouselItem className="basis-1/2 border-2 border-gray-200">
                                        <div className="grid grid-cols-5 h-auto p-2 ">
                                            <div className="col-span-4">
                                                <p>OPINION Lorem ipsum dolor sit amet consectetur...</p>
                                            </div>
                                            <div className="col-span-1 ml-14 "><span>02/11/2025</span></div>
                                            <div className="col-start-1 col-end-5 flex">
                                                {stars.map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill={i < 1 ? "yellow" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562..." />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselNext className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md" />
                            </Carousel>
                        </div>
                    </div>
                </div>

                {/* Relacionados */}
                <div className="w-full col-start-1 col-end-11 grid">
                    <div className="p-9 max-w-[95%]">
                        <hr />
                        <h1>Esto también te podría interesar</h1>
                        <br />
                        <Carousel>
                            <CarouselPrevious className="z-50 bg-white shadow-md" />
                            <CarouselContent className="w-[100%]">
                                {posts.map((post, index) => (
                                    <CarouselItem key={index} className="basis-1/4">
                                        <CardCarusel posts={[post]} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className="z-50 bg-white shadow-md" />
                        </Carousel>
                    </div>
                </div>
            </section>
        </section>
    );
}
