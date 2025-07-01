import Image from "next/image"
import { Star, Users, Shield, Zap } from "lucide-react"

const trustIndicators = [
  { icon: Users, value: "500+", label: "Artesanos" },
  { icon: Shield, value: "100%", label: "Auténtico" },
  { icon: Zap, value: "24h", label: "Soporte" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('/static/web/hero-background.png')] opacity-80"></div>

      <div className="container mx-auto px-4 relative z-10 py-10  bg-[rgba(255,255,255,0.7)]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Artesanías Colombianas Auténticas</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-[#F5AE20]">Descubre La</span>
                <span className="text-[#1B2BA0]"> Magia De </span>
                <span className="text-[#850E05]">Colombia</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Conectamos maestros artesanos colombianos con amantes del arte auténtico.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#f58b20] text-white rounded-lg font-medium transition-smooth hover:scale-105">
                Explorar Catálogo
              </button>
              <button className="px-8 py-4 glass border-0 rounded-lg font-medium transition-smooth hover:scale-105">
                Ver Artesanos
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#f58b20] rounded-xl flex items-center justify-center mx-auto mb-2">
                    <indicator.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-[#f58b20]">{indicator.value}</div>
                  <div className="text-sm text-gray-600">{indicator.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-sticky-image">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/static/web/hero-background2.png?height=600&width=500"
                alt="Artesanía colombiana"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2">Mochila Wayuu Tradicional</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">por María Uriana</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-2xl font-bold">€145</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
