import { Heart, MapPin, Palette } from "lucide-react"
import { Dancing_Script } from "next/font/google"

const culturalElements = [
  { icon: Heart, label: "Hecho con Amor", description: "Cada pieza cuenta una historia" },
  { icon: MapPin, label: "Tradición Ancestral", description: "Legado de nuestros ancestros" },
  { icon: Palette, label: "Arte Vivo", description: "Colores de nuestra tierra" },
]

const dancing_script = Dancing_Script({
  variable: '--font-dancing-script',
  weight: ["700"],
  subsets: ['latin']
})

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badge with more padding */}
            <div className="inline-flex items-center space-x-3 bg-gray-100 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200 shadow-sm">
              <div className="w-4 h-1 bg-[#F5AE20] rounded-full"></div>
              <div className="w-4 h-1 bg-[#1B2BA0] rounded-full"></div>
              <div className="w-4 h-1 bg-[#850E05] rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Patrimonio Cultural Colombiano</span>
            </div>

            {/* Main Title with shadow */}
            <div className="space-y-1">
              <h1 className={`${dancing_script.className} text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight`}>
                <span className="block text-[#F5AE20]" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(245, 174, 32, 0.2)' }}>
                  El Alma
                </span>
                <span className="block text-gray-800" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  de Nuestras
                </span>
                <span className="block text-[#850E05]" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(133, 14, 5, 0.2)' }}>
                  Manos
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-3 max-w-lg">
              <p className="text-lg font-medium text-gray-700 leading-relaxed">
                Cada hilo, cada color, cada forma cuenta la historia de Colombia
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Desde las montañas andinas hasta la costa caribe, descubre el arte
                que define nuestra identidad y conecta generaciones.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                className="group bg-[#F5AE20] hover:bg-[#F5AE20]/90 text-white font-semibold rounded-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Descubrir Tesoros</span>
                  <Heart className="w-5 h-5 group-hover:animate-pulse" />
                </span>
              </button>
              
              <button 
                type="button" 
                className="bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold rounded-lg px-8 py-4 transition-all duration-300 hover:bg-gray-50"
              >
                Conocer Artesanos
              </button>
            </div>

            {/* Cultural Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {culturalElements.map((element, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-all duration-300 shadow-sm">
                    <element.icon className="w-6 h-6 text-[#F5AE20]" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800 mb-2">{element.label}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{element.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Video - 5 columns */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/static/web/videoclip_hero.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}