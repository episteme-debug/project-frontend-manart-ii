import Image from "next/image"
import { Star, Heart } from "lucide-react"

// Adaptable para API - estructura simple
const products = [
  {
    id: 1,
    name: "Mochila Wayuu Tradicional",
    price: 145,
    image: "/placeholder.svg?height=300&width=300",
    artisan: "María Uriana",
    rating: 4.9,
    category: "textiles",
  },
  {
    id: 2,
    name: "Cerámica de Ráquira",
    price: 89,
    image: "/placeholder.svg?height=300&width=300",
    artisan: "Carlos Rodríguez",
    rating: 4.8,
    category: "ceramica",
  },
  {
    id: 3,
    name: "Sombrero Vueltiao",
    price: 67,
    image: "/placeholder.svg?height=300&width=300",
    artisan: "Ana Pérez",
    rating: 5.0,
    category: "textiles",
  },
  {
    id: 4,
    name: "Hamaca de San Jacinto",
    price: 198,
    image: "/placeholder.svg?height=300&width=300",
    artisan: "Luis Martínez",
    rating: 4.7,
    category: "textiles",
  },
]

export function ProductGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient-tropical">Productos Destacados</h2>
          <p className="text-xl text-gray-600">Artesanías auténticas hechas a mano</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="glass rounded-2xl overflow-hidden animate-3d-hover animate-progressive-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-smooth hover:scale-110"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-smooth hover:scale-110">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">por {product.artisan}</p>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gradient-emerald">€{product.price}</span>
                  <button className="px-4 py-2 gradient-emerald text-white rounded-lg transition-smooth hover:scale-105">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
