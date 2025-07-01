import { TrendingUp, Users, Globe, Award } from "lucide-react"

const stats = [
  { icon: Users, value: "500+", label: "Artesanos Verificados" },
  { icon: Globe, value: "2.5K+", label: "Productos Únicos" },
  { icon: TrendingUp, value: "98%", label: "Satisfacción" },
  { icon: Award, value: "50K+", label: "Ventas Exitosas" },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient-emerald">Números que Inspiran</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-progressive-reveal">
              <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-gradient-emerald mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
