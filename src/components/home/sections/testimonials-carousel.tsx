"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Isabella Rodriguez",
    role: "Coleccionista de Arte",
    location: "Madrid, España",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "La calidad es excepcional. Cada pieza que he comprado supera mis expectativas. La conexión directa con los artesanos hace que cada compra sea una experiencia única.",
    product: "Cerámica Contemporánea",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Interior Designer",
    location: "Londres, Reino Unido",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "ArtisanHub ha revolucionado cómo encuentro piezas únicas para mis proyectos. La autenticidad y calidad son incomparables. Mis clientes quedan fascinados.",
    product: "Escultura en Madera",
  },
  {
    id: 3,
    name: "Sophie Dubois",
    role: "Galerista",
    location: "París, Francia",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Como galerista, valoro la autenticidad por encima de todo. Esta plataforma me ha conectado con artesanos extraordinarios que crean verdaderas obras maestras.",
    product: "Joyería Artesanal",
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Historias de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lo que dicen quienes han descubierto el arte auténtico en nuestra plataforma
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 lg:p-12 shadow-modern animate-scale-in">
            <div className="text-center space-y-8">
              <Quote className="w-16 h-16 text-purple-300 mx-auto" />

              <div className="space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full shadow-modern"
                  />
                  <div className="text-left">
                    <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-slate-600">{testimonials[currentIndex].role}</div>
                    <div className="text-sm text-slate-500">{testimonials[currentIndex].location}</div>
                  </div>
                </div>

                <div className="text-sm text-slate-500">Compró: {testimonials[currentIndex].product}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 glass border-0 shadow-modern hover:shadow-glow transition-all-smooth bg-transparent"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 glass border-0 shadow-modern hover:shadow-glow transition-all-smooth bg-transparent"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all-smooth ${
                  index === currentIndex ? "gradient-primary shadow-glow" : "bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
