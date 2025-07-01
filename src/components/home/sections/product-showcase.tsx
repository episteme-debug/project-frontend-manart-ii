import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Jarrón Minimalista Contemporáneo",
    price: "€189",
    originalPrice: "€250",
    image: "/placeholder.svg?height=400&width=400",
    artisan: "Elena Martín",
    location: "Barcelona, España",
    rating: 4.9,
    reviews: 47,
    badge: "Trending",
  },
  {
    id: 2,
    name: "Collar Geométrico Plata 925",
    price: "€295",
    image: "/placeholder.svg?height=400&width=400",
    artisan: "Marco Silva",
    location: "Porto, Portugal",
    rating: 5.0,
    reviews: 23,
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Tapiz Abstracto Lana Merino",
    price: "€420",
    image: "/placeholder.svg?height=400&width=400",
    artisan: "Sofia Andersson",
    location: "Estocolmo, Suecia",
    rating: 4.8,
    reviews: 31,
    badge: "Limitado",
  },
  {
    id: 4,
    name: "Escultura Orgánica Roble",
    price: "€340",
    image: "/placeholder.svg?height=400&width=400",
    artisan: "Hans Mueller",
    location: "Múnich, Alemania",
    rating: 4.9,
    reviews: 18,
    badge: "Exclusivo",
  },
]

export function ProductShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Colección <span className="text-gradient">Destacada</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Piezas cuidadosamente seleccionadas por nuestros curadores de arte
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group glass rounded-3xl overflow-hidden hover:shadow-modern transition-all hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 gradient-primary rounded-full text-white text-sm font-medium">
                  {product.badge}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    por <span className="font-medium">{product.artisan}</span>
                  </p>
                  <p className="text-xs text-slate-500">{product.location}</p>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 gradient-primary text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                  <Button variant="outline" className="glass border-0 bg-transparent">
                    Ver
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
