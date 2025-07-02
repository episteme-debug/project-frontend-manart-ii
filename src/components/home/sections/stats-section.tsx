import { Mountain, TreePine, Waves, Heart } from "lucide-react"

const patrimonioStats = [
  {
    icon: Mountain,
    value: "3 Cordilleras",
    label: "Guardianes Ancestrales",
    description: "Cada pico cuenta historias milenarias de resistencia y sabiduría muisca"
  },
  {
    icon: TreePine,
    value: "80+ Etnias",
    label: "Voces Amazónicas Vivas",
    description: "Comunidades que protegen el pulmón del mundo con conocimiento sagrado"
  },
  {
    icon: Waves,
    value: "Sierra Sagrada",
    label: "Corazón Tayronа",
    description: "Donde los koguis tejen el equilibrio cósmico entre mar y montaña"
  },
  {
    icon: Heart,
    value: "5000 Años",
    label: "Memoria Colectiva",
    description: "Tradiciones que laten en cada tejido, canto y ritual de nuestros pueblos"
  },
]

export function PatrimonioSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden">

      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-lg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-4">
            Raíces que nos Definen
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-amber-600 mb-6 leading-tight font-s">
            Patrimonio Vivo de Colombia
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Desde los nevados andinos hasta la exuberante Amazonía, cada territorio colombiano
            late con la sabiduría ancestral de comunidades que han tejido durante milenios
            una relación sagrada con la naturaleza.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {patrimonioStats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-emerald-100/50 hover:border-emerald-200"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-emerald-300/50 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 mb-2">
                  {stat.value}
                </div>
                <div className="font-bold text-gray-800 text-lg mb-3">
                  {stat.label}
                </div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 rounded-3xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-emerald-300/50 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Heart className="w-6 h-6 animate-pulse" />
            Protejamos Nuestra Herencia Cultural
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Cada compra es un acto de resistencia cultural, cada producto artesanal
            es un hilo que mantiene viva la memoria de nuestros ancestros.
          </p>
        </div>
      </div>
    </section>
  )
}