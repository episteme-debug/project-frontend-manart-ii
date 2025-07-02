import Image from "next/image"
import { Star, Heart, MapPin, Palette} from "lucide-react"

const culturalElements = [
  { icon: Heart, label: "Hecho con Amor", description: "Cada pieza cuenta una historia" },
  { icon: MapPin, label: "Tradición Ancestral", description: "Legado de nuestros ancestros" },
  { icon: Palette, label: "Arte Vivo", description: "Colores de nuestra tierra" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/static/web/hero-background.png')] opacity-80 bg-cover bg-center"></div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 bg-white/65 backdrop-blur-sm rounded-2xl p-6">
            <div className="inline-flex items-center space-x-3 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="w-6 h-1 bg-[#F5AE20] rounded-full"></div>
              <div className="w-6 h-1 bg-[#1B2BA0] rounded-full"></div>
              <div className="w-6 h-1 bg-[#850E05] rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">Patrimonio Cultural Colombiano</span>
            </div>

            <div className=" rounded-2xl p-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block text-[#F5AE20]">El Alma</span>
                <span className="block text-[#1B2BA0]">de Nuestras</span>
                <span className="block text-[#850E05]">Manos</span>
              </h1>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5">
              <p className="text-xl font-medium text-gray-800 leading-relaxed mb-3">
                Cada hilo, cada color, cada forma cuenta la historia de Colombia
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Desde las montañas andinas hasta la costa caribe, descubre el arte
                que define nuestra identidad y conecta generaciones.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#F5AE20] hover:bg-[#f58b20] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Descubrir Tesoros</span>
                    <Heart className="w-5 h-5" />
                  </span>
              </button>
              <button className="px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-xl font-bold border-2 border-[#1B2BA0] hover:border-[#1B2BA0]/80 transition-all duration-200 hover:scale-105">
                Conocer Artesanos
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {culturalElements.map((element, index) => (
                <div key={index} className="text-center bg-white/85 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="w-12 h-12 bg-[#F5AE20] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <element.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">{element.label}</h3>
                  <p className="text-xs text-gray-700">{element.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/static/web/hero-background2.png"
                alt="Artesanía colombiana - Mochila Wayuu"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Mochila Wayuu Tradicional
                    </h3>
                    <p className="text-[#F5AE20] font-semibold">
                      Artesana: María Chaco
                    </p>
                    <p className="text-xs text-gray-600">La Guajira, Colombia</p>
                  </div>
                  <span className="text-2xl font-bold text-[#1B2BA0]">$30.000</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#F5AE20] fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">(127)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#F5AE20] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#1B2BA0] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#850E05] rounded-full"></div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                  Tejida con técnicas ancestrales wayuu, esta mochila representa
                  meses de trabajo artesanal y la sabiduría de generaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}