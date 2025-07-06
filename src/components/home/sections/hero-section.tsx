import { Heart } from "lucide-react"
import { Dancing_Script } from "next/font/google"

const dancing_script = Dancing_Script({
  variable: '--font-dancing-script',
  weight: ["700"],
  subsets: ['latin']
})

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-white/20 to-gray-50/30"></div>
      
      <div className="container mx-auto px-10 relative z-10 py-25">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badge with more padding */}
            <div className="inline-flex items-center space-x-3 bg-gray-100 backdrop-blur-sm rounded-lg px-8 py-4 border-2 border-gray-200 shadow-sm">
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
                className="text-white bg-gradient-to-r from-[#114E93] via-[#0D3A7A] to-[#092B61] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#114E93]/30 dark:focus:ring-[#114E93]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-[#114E93]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Descubrir Tesoros</span>
                  <Heart className="w-4 h-4" />
                </span>
              </button>
              
              <button 
                type="button" 
                className="text-[#114E93] bg-white border-2 border-[#114E93] hover:border-[#0D3A7A] hover:bg-[#114E93]/10 focus:ring-4 focus:outline-none focus:ring-[#114E93]/30 dark:focus:ring-[#114E93]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Conocer Artesanos
              </button>
            </div>
          </div>

          {/* Right Content - Video - 5 columns */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl border-2 border-gray-200">
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