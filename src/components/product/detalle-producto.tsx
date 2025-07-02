"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
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
    const [imagenesProductos, setImagenesProductos] = useState<{ [id: number]: string }>({});
    const [imagenPrincipal, setImagenPrincipal] = useState("/imagen-defecto.png");
    const [isFavorite, setIsFavorite] = useState(false);

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
                        const urlCompleta = `http://localhost:8080/${rutaNormalizada}`;
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

    // Simulamos múltiples imágenes para el carousel
    const imagenesCarousel = Array.from({ length: 6 }, (_, i) => 
        imagenesProductos[producto.idProducto] || "/imagen-defecto.png"
    );

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-6 lg:py-10">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-gray-600">
                    <span>Inicio</span> / <span>Catálogo</span> / <span className="text-blue-600 font-medium">{producto.nombreProducto}</span>
                </nav>

                {/* Contenido principal */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Grid principal - Responsive */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 lg:p-8">
                        
                        {/* Sección de imágenes */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Thumbnail carousel - Oculto en móvil */}
                                <div className="hidden lg:block lg:w-20">
                                    <Carousel orientation="vertical" className="w-full h-[500px]">
                                        <CarouselContent className="flex flex-col h-full">
                                            {imagenesCarousel.map((imagen, i) => (
                                                <CarouselItem
                                                    key={i}
                                                    className="relative flex justify-center items-center h-[70px] mb-2 cursor-pointer"
                                                    onClick={() => setImagenPrincipal(imagen)}
                                                >
                                                    <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                                                        <Image 
                                                            src={imagen} 
                                                            alt={`Thumbnail ${i}`} 
                                                            fill 
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="hidden lg:flex" />
                                        <CarouselNext className="hidden lg:flex" />
                                    </Carousel>
                                </div>

                                {/* Imagen principal */}
                                <div className="flex-1">
                                    <div className="relative aspect-square max-w-[600px] mx-auto bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                                        <Image
                                            src={imagenPrincipal}
                                            alt={producto.nombreProducto}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            priority
                                        />
                                        <button 
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg"
                                        >
                                            <Heart className={`w-6 h-6 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
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
                                                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors"
                                                    onClick={() => setImagenPrincipal(imagen)}
                                                >
                                                    <Image 
                                                        src={imagen} 
                                                        alt={`Thumbnail ${i}`} 
                                                        fill 
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </div>

                        {/* Información del producto */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Header del producto */}
                            <div className="space-y-4">
                                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
                                    {producto.nombreProducto}
                                </h1>
                                
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center space-x-1">
                                        {stars.map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">(23 reseñas)</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>Por: <span className="font-medium text-blue-600">Artesano Especialista</span></span>
                                </div>
                            </div>

                            {/* Precio */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <span className="text-3xl lg:text-4xl font-bold text-blue-600">
                                            ${producto.precioProducto.toLocaleString()}
                                        </span>
                                        <span className="text-lg text-gray-600 ml-2">COP</span>
                                        <p className="text-sm text-gray-600 mt-1">Precio incluye IVA</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Package className="w-4 h-4" />
                                        <span className="text-sm font-medium">{producto.stockProducto} disponibles</span>
                                    </div>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-800">Descripción</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {producto.descripcionProducto}
                                </p>
                            </div>

                            {/* Acciones */}
                            <div className="space-y-4">
                                <ComprarAhora idProducto={producto.idProducto} />
                                <ActivarBoton idProducto={producto.idProducto} />
                            </div>

                            {/* Información de envío y garantías */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Card className="border-green-200 bg-green-50">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <Truck className="w-8 h-8 text-green-600" />
                                        <div>
                                            <p className="font-medium text-green-800">Envío gratis</p>
                                            <p className="text-sm text-green-600">A partir de $50.000</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-blue-200 bg-blue-50">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <Shield className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <p className="font-medium text-blue-800">Garantía</p>
                                            <p className="text-sm text-blue-600">30 días</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Métodos de pago */}
                            <Card className="bg-gray-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="w-5 h-5" />
                                        Métodos de pago
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Image 
                                        src="/Metodo_de_pago.png" 
                                        alt="Métodos de pago" 
                                        width={300} 
                                        height={100}
                                        className="w-full max-w-sm"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sección de detalles extendidos */}
                    <div className="border-t border-gray-200 p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">Descripción detallada</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Descripción extendida del producto con todos los detalles técnicos, 
                                    materiales utilizados, proceso de elaboración y características especiales 
                                    que hacen único a este producto artesanal.
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">Especificaciones</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium">Material:</span>
                                        <span className="text-gray-600">Artesanal</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium">Origen:</span>
                                        <span className="text-gray-600">Colombia</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium">Peso:</span>
                                        <span className="text-gray-600">Variable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de reseñas */}
                    <div className="border-t border-gray-200 p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">Opiniones</h2>
                                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                                    <div className="text-4xl font-bold text-yellow-600 mb-2">4.0</div>
                                    <div className="flex justify-center items-center space-x-1 mb-2">
                                        {stars.map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">Basado en 23 reseñas</p>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">Reseñas más recientes</h3>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((_, index) => (
                                        <Card key={index} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center space-x-1">
                                                        {stars.map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">02/11/2025</span>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    Excelente producto artesanal, la calidad es excepcional y el acabado perfecto. 
                                                    Muy satisfecho con la compra, llegó en perfecto estado.
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">- Cliente verificado</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Productos relacionados */}
                    <div className="border-t border-gray-200 p-6 lg:p-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800">También te podría interesar</h2>
                            <div className="relative">
                                <Carousel className="w-full">
                                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50" />
                                    <CarouselContent className="ml-4">
                                        {posts.map((post, index) => (
                                            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
                                                    <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
                                                        <Image
                                                            src="/imagen-defecto.png"
                                                            alt={post.nombreProducto}
                                                            fill
                                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <CardContent className="p-4 space-y-3">
                                                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                            {post.nombreProducto}
                                                        </h4>
                                                        <div className="flex items-center space-x-1">
                                                            {stars.slice(0, 4).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="w-3 h-3 text-yellow-400 fill-current"
                                                                />
                                                            ))}
                                                            <Star className="w-3 h-3 text-gray-300" />
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-lg font-bold text-blue-600">
                                                                ${post.precioProducto.toLocaleString()}
                                                            </span>
                                                            <span className="text-xs text-gray-500">COP</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50" />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}