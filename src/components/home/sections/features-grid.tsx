import { Sparkles, Globe, Shield, Heart, MessageCircle, Zap } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Autenticidad Garantizada",
    description: "Cada pieza es verificada por expertos en arte tradicional",
    gradient: "gradient-primary",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Conectamos artesanos de 50+ países con coleccionistas mundiales",
    gradient: "gradient-secondary",
  },
  {
    icon: Shield,
    title: "Compra Protegida",
    description: "Garantía total de satisfacción con devolución sin preguntas",
    gradient: "gradient-accent",
  },
  {
    icon: Heart,
    title: "Impacto Social",
    description: "Tu compra apoya directamente a comunidades artesanales",
    gradient: "gradient-warm",
  },
  {
    icon: MessageCircle,
    title: "Conexión Directa",
    description: "Chatea con artesanos y conoce la historia de cada pieza",
    gradient: "gradient-cool",
  },
  {
    icon: Zap,
    title: "Experiencia Premium",
    description: "Embalaje especial y entrega cuidadosa garantizada",
    gradient: "gradient-dark",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            ¿Por qué elegir <span className="text-gradient">ArtisanHub</span>?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Más que un marketplace, somos el puente entre tradición milenaria y coleccionismo moderno
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 glass rounded-3xl hover:shadow-modern transition-all hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
