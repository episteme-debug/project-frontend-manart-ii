"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: "Mochilas Wayuu",
    description: "Tejidas a mano por artesanas Wayuu",
    image: "/static/cargascliente/producto/imagen/Mochilas_Wayuu.1.jpg",
    color: "from-yellow-400 to-orange-500",
    borderColor: "border-yellow-300",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800"
  },
  {
    id: 2,
    name: "Cerámicas de Ráquira",
    description: "Arte en barro de la capital artesanal",
    image: "/static/cargascliente/producto/imagen/Cerámicas_de_Ráquira.1.jpg",
    color: "from-red-400 to-pink-500",
    borderColor: "border-red-300",
    bgColor: "bg-red-50",
    textColor: "text-red-800"
  },
  {
    id: 3,
    name: "Textiles Emberá",
    description: "Tejidos ancestrales de la selva",
    image: "/static/cargascliente/producto/imagen/Bordados_tradicionales_raizales.1.jpg",
    color: "from-green-400 to-emerald-500",
    borderColor: "border-green-300",
    bgColor: "bg-green-50",
    textColor: "text-green-800"
  },
  {
    id: 4,
    name: "Joyería Indígena",
    description: "Adornos tradicionales únicos",
    image: "/static/cargascliente/producto/imagen/Bisutería_Emberá.1.jpg",
    color: "from-purple-400 to-indigo-500",
    borderColor: "border-purple-300",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800"
  },
  {
    id: 5,
    name: "Sombreros Vueltiao",
    description: "Símbolo de la cultura Zenú",
    image: "/static/cargascliente/producto/imagen/Sombrero_Vueltiao.1.jpg",
    color: "from-amber-400 to-yellow-500",
    borderColor: "border-amber-300",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800"
  },
  {
    id: 6,
    name: "Hamacas de San Jacinto",
    description: "Descanso tejido con tradición",
    image: "/static/cargascliente/producto/imagen/Hamacas_de_San_Jacinto.1.jpg",
    color: "from-blue-400 to-cyan-500",
    borderColor: "border-blue-300",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800"
  }
]

export function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === categories.length - 3 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === categories.length - 3 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - 3 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

  const visibleCategories = categories.slice(currentIndex, currentIndex + 3)

  return (
    <section className="py-16 relative">
      <div 
        className="absolute bg-gray-50"
      ></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-white/60"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explora Nuestras Categorías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre la riqueza artesanal de Colombia a través de nuestras categorías tradicionales
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-hidden transition-transform duration-500 ease-in-out"
          >
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-full md:w-1/3 lg:w-1/3"
              >
                <Link href={`/catalogo?categoria=${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="group cursor-pointer">
                    {/* Category Card */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-gray-200">
                      {/* Background Image */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm opacity-90 mb-4">{category.description}</p>
                        
                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Explorar</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Color Accent */}
                      <div className={`absolute top-4 right-4 w-3 h-3 rounded-md bg-gradient-to-r ${category.color}`}></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: categories.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-md transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-[#114E93] to-[#0D3A7A] scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 