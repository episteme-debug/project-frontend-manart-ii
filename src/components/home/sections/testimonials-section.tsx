import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Isabella Rodriguez",
    role: "Coleccionista de Arte",
    location: "Madrid, España",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "La calidad es excepcional. Cada pieza que he comprado supera mis expectativas. La conexión directa con los artesanos hace que cada compra sea una experiencia única.",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Interior Designer",
    location: "Londres, Reino Unido",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "ArtisanHub ha revolucionado cómo encuentro piezas únicas para mis proyectos. La autenticidad y calidad son incomparables.",
  },
  {
    id: 3,
    name: "Sophie Dubois",
    role: "Galerista",
    location: "París, Francia",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Como galerista, valoro la autenticidad por encima de todo. Esta plataforma me ha conectado con artesanos extraordinarios.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Historias de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lo que dicen quienes han descubierto el arte auténtico en nuestra plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass rounded-3xl p-8 shadow-modern">
              <div className="space-y-6">
                <Quote className="w-12 h-12 text-purple-300" />

                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-slate-700 leading-relaxed">"{testimonial.text}"</blockquote>

                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                    <div className="text-slate-500 text-xs">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
