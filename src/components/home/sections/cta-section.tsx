import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Únete a la Revolución Artesanal</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black leading-tight">
              ¿Listo para Descubrir Arte <span className="text-yellow-300">Extraordinario</span>?
            </h2>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Únete a miles de coleccionistas que ya han encontrado piezas únicas. Tu próxima obra maestra te está
              esperando.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 shadow-modern group">
              Comenzar Ahora
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              Explorar Colección
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
