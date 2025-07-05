"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, X, ChevronDown, ChevronUp, ShoppingCart, Eye, Tag, Percent, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import CardCarousel from "./card-carousel";
import ActivarBoton from "../carrito/agregar-carrito";
import { TraerArchivos } from "@/api/ArchivoMultimedia";
import ComprarAhora from "../carrito/comprar-ahora";
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
import { Star, Heart, Truck, Shield, CreditCard, MapPin, User, Package } from "lucide-react";
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz";

const stars = Array(5).fill(0);

interface DetalleProductoClienteProps {
    producto: ProductoRespuesta
    posts: ProductoRespuesta[]
}

export default function DetalleProductoCliente({ producto, posts }: DetalleProductoClienteProps) {
    const [imagenesProductos, setImagenesProductos] = useState<{ [id: number]: string }>({});
    const [imagenPrincipal, setImagenPrincipal] = useState(`/static/${producto.listaArchivos[0].ruta.replace(/^\/+/, "")}`);
    const [isFavorite, setIsFavorite] = useState(false);

    const getCardStyle = (index: number) => {
        const styles = [
            "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
            "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
            "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200",
            "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200",
            "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200",
            "bg-gradient-to-br from-lime-50 to-green-50 border-lime-200"
        ];
        return styles[index % styles.length];
    };

    useEffect(() => {
        const cargarImagenesDePosts = async () => {
            const nuevasImagenes: { [id: number]: string } = {};
            if (posts.length === 0) return;
            for (const post of posts) {
                try {
                    const entidad = "Producto";
                    const data = await TraerArchivos(entidad, producto.idProducto);
                    if (Array.isArray(data) && data.length > 0 && data[0].ruta) {
                        const rutaNormalizada = data[0].ruta.replace(/\\/g, "/");
                        const urlCompleta = `/static/${post.listaArchivos[0].ruta.replace(/^\/+/, "")}`;
                        nuevasImagenes[producto.idProducto] = urlCompleta;
                        setImagenPrincipal(urlCompleta);
                    }
                } catch (error) {
                    console.error(`Error al cargar imagen del producto ${post.idProducto}:`, error);
                }
            }
            setImagenesProductos(nuevasImagenes);
        };
        cargarImagenesDePosts();
    }, [posts]);


    const imagenesCarousel = producto.listaArchivos.length > 0
        ? producto.listaArchivos.map(archivo =>
            `/static/${archivo.ruta.replace(/^\/+/, "")}`
        )
        : ["/images/ImagenProductoPorDefecto.jpg"];

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-6 lg:py-10">
                {/* Contenido principal */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                    {/* Grid principal - Responsive */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 lg:p-8">

                        {/* Sección de imágenes */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Thumbnail carousel - Oculto en móvil */}
                                <div className="hidden lg:block lg:w-24">
                                    <Carousel orientation="vertical" className="w-full h-[500px]">
                                        <CarouselContent className="flex flex-col h-full">
                                            {imagenesCarousel.map((imagen, i) => (
                                                <CarouselItem
                                                    key={i}
                                                    className="relative flex justify-center items-center h-[80px] mb-3 cursor-pointer group"
                                                    onClick={() => setImagenPrincipal(imagen)}
                                                >
                                                    <div className="relative w-[70px] h-[70px] rounded-xl overflow-hidden border-2 border-gray-200 hover:border-amber-400 transition-all duration-300 group-hover:shadow-lg">
                                                        <Image
                                                            src={imagen}
                                                            alt={`Thumbnail ${i}`}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="hidden lg:flex bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
                                        <CarouselNext className="hidden lg:flex bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
                                    </Carousel>
                                </div>

                                {/* Imagen principal */}
                                <div className="flex-1">
                                    <div className="relative aspect-square max-w-[600px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
                                        <Image
                                            src={imagenPrincipal}
                                            alt={producto.nombreProducto}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            priority
                                        />
                                        <button
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            className="absolute top-6 right-6 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-xl hover:shadow-2xl"
                                        >
                                            <Heart className={`w-7 h-7 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-600 hover:text-red-400'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel horizontal para móvil */}
                            <div className="lg:hidden">
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {imagenesCarousel.map((imagen, i) => (
                                            <CarouselItem key={i} className="basis-1/4">
                                                <div
                                                    className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-amber-400 transition-all duration-300 hover:shadow-lg"
                                                    onClick={() => setImagenPrincipal(imagen)}
                                                >
                                                    <Image
                                                        src={imagen}
                                                        alt={`Thumbnail ${i}`}
                                                        fill
                                                        className="object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
                                    <CarouselNext className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
                                </Carousel>
                            </div>
                        </div>

                        {/* Información del producto */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Header del producto */}
                            <div className="space-y-6">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                                    {producto.nombreProducto}
                                </h1>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center space-x-1">
                                        {stars.map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-6 h-6 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">(23 reseñas)</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Por: <span className="font-semibold text-[#9D0B0B]">{producto.nombreUsuario}</span></span>
                                </div>
                            </div>

                            {/* Precio */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-200 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                    <div>
                                        <span className="text-4xl lg:text-5xl font-bold text-[#010668]">
                                            ${producto.precioProducto.toLocaleString()}
                                        </span>
                                        <span className="text-xl text-gray-600 ml-3">COP</span>
                                        <p className="text-sm text-gray-600 mt-2">Precio incluye IVA</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-green-600 bg-white/80 px-4 py-2 rounded-2xl">
                                        <Package className="w-5 h-5" />
                                        <span className="font-semibold">{producto.stockProducto} disponibles</span>
                                    </div>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">i</span>
                                    </div>
                                    Descripción
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {producto.descripcionProducto}
                                </p>
                            </div>

                            {/* Acciones */}
                            <div className="space-y-4">
                                <ComprarAhora idProducto={producto.idProducto} />
                                <ActivarBoton idProducto={producto.idProducto} />
                            </div>
                        </div>
                    </div>

                    {/* Sección de detalles extendidos */}
                    <div className="border-t border-gray-200 p-8 lg:p-10 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-lg font-bold">📋</span>
                                    </div>
                                    Descripción detallada
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Descripción extendida del producto con todos los detalles técnicos,
                                    materiales utilizados, proceso de elaboración y características especiales
                                    que hacen único a este producto artesanal.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-lg font-bold">⚙️</span>
                                    </div>
                                    Especificaciones
                                </h2>
                                <div className="space-y-4 bg-white/80 p-6 rounded-2xl shadow-lg">
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="font-semibold text-gray-800">Material:</span>
                                        <span className="text-gray-600">Artesanal</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="font-semibold text-gray-800">Origen:</span>
                                        <span className="text-gray-600">Colombia</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span className="font-semibold text-gray-800">Peso:</span>
                                        <span className="text-gray-600">Variable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de reseñas */}
                    <div className="border-t border-gray-200 p-8 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white fill-current" />
                                    </div>
                                    Opiniones
                                </h2>
                                <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 shadow-lg">
                                    <div className="text-5xl font-bold text-amber-600 mb-3">4.0</div>
                                    <div className="flex justify-center items-center space-x-1 mb-3">
                                        {stars.map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-6 h-6 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 font-medium">Basado en 23 reseñas</p>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800">Reseñas más recientes</h3>
                                <div className="space-y-6 max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((_, index) => (
                                        <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center space-x-1">
                                                        {stars.map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-5 h-5 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">02/11/2025</span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">
                                                    Excelente producto artesanal, la calidad es excepcional y el acabado perfecto.
                                                    Muy satisfecho con la compra, llegó en perfecto estado.
                                                </p>
                                                <p className="text-sm text-gray-500 mt-3 font-medium">- Cliente verificado</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Productos relacionados */}
                    <div className="border-t border-gray-200 p-8 lg:p-10 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">💡</span>
                                </div>
                                También te podría interesar
                            </h2>
                            <div className="relative">
                                <Carousel className="w-full">
                                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 w-12 h-12" />
                                    <CarouselContent className="ml-8 mr-8">
                                        {posts.map((post, index) => {
                                            const cardStyle = getCardStyle(index);
                                            return (
                                                <div
                                                    key={post.idProducto}
                                                    className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border h-full transform hover:-translate-y-2 ${cardStyle}`}
                                                >
                                                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                                        <Image
                                                            src={
                                                                post.listaArchivos.length > 0
                                                                    ? `/static/${post.listaArchivos[0].ruta.replace(/^\/+/, "")}`
                                                                    : "/images/ImagenProductoPorDefecto.jpg"
                                                            }
                                                            alt={post.nombreProducto}
                                                            fill
                                                            className="object-cover transition-all duration-500 group-hover:scale-110"
                                                            priority
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                        {/* Botones de acción */}
                                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                            <button className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg">
                                                                <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
                                                            </button>
                                                            <Link
                                                                href={`/catalogo/detalleproducto/${post.idProducto}`}
                                                                className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                                            >
                                                                <Eye className="w-6 h-6 text-gray-600 hover:text-emerald-600" />
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 space-y-4">
                                                        <div className="space-y-2">
                                                            <Link
                                                                className="font-bold text-lg text-gray-800 hover:text-emerald-700 transition-colors line-clamp-2 leading-tight block"
                                                                href={`catalogo/detalleproducto/${post.idProducto}`}
                                                            >
                                                                {post.nombreProducto}
                                                            </Link>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-sm font-bold">A</span>
                                                                </div>
                                                                <p className="text-sm text-gray-500">por Artesano</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-1">
                                                            {stars.map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-300"}`}
                                                                />
                                                            ))}
                                                            <span className="text-sm text-gray-600 ml-2">(4.0)</span>
                                                        </div>

                                                        <div className="flex justify-between items-center pt-2">
                                                            <div className="space-y-1">
                                                                <div className="flex items-baseline gap-1">
                                                                    <span className="text-2xl font-bold text-emerald-700">${post.precioProducto.toLocaleString()}</span>
                                                                    <span className="text-xs text-gray-500">COP</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </CarouselContent>
                                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 w-12 h-12" />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}