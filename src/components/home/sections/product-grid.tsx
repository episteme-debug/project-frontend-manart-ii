import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { memo, useMemo } from "react";

const products = [
  {
    id: 1,
    name: "Mochila Wayuu Tradicional",
    price: 45000,
    image: "/images/PorDefectoProducto.png",
    artisan: "María Uriana",
    rating: 4.9,
    category: "textiles",
  },
  {
    id: 2,
    name: "Cerámica de Ráquira",
    price: 89000,
    image: "/images/PorDefectoProducto.png",
    artisan: "Carlos Rodríguez",
    rating: 4.8,
    category: "ceramica",
  },
  {
    id: 3,
    name: "Sombrero Vueltiao",
    price: 67000,
    image: "/images/PorDefectoProducto.png",
    artisan: "Ana Pérez",
    rating: 5.0,
    category: "textiles",
  },
  {
    id: 4,
    name: "Hamaca de San Jacinto",
    price: 198000,
    image: "/images/PorDefectoProducto.png",
    artisan: "Luis Martínez",
    rating: 4.7,
    category: "textiles",
  },
];

const StarRating = memo(({ rating }: { rating: number }) => {
  const stars = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.floor(rating)),
    [rating]
  );

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((filled, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${filled ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
        />
      ))}
      <span className="text-xs sm:text-sm text-gray-600 ml-1.5">{rating}</span>
    </div>
  );
});

StarRating.displayName = "StarRating";


const ProductCard = memo(({ product, index }: { product: typeof products[0]; index: number }) => {
  const formattedPrice = useMemo(() =>
    product.price.toLocaleString(),
    [product.price]
  );

  return (
    <article
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#FAE9CD] will-change-transform"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: `slideInUp 0.4s ease-out forwards`,
        transform: 'translateY(20px)'
      }}
    >

      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading={index < 4 ? "eager" : "lazy"}
          priority={index < 4}
        />

        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
          aria-label={`Agregar ${product.name} a favoritos`}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-green-500 text-white px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
          Destacado
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">

        <div className="min-h-[3rem] sm:min-h-[3.5rem]">
          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800 group-hover:text-[#9D0B0B] transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">por {product.artisan}</p>
        </div>

        <StarRating rating={product.rating} />

        <div className="flex justify-between items-center gap-2">
          <div className="flex-shrink-0">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold  text-[#010668]">
              ${formattedPrice}
            </span>
            <p className="text-xs text-gray-500">COP</p>
          </div>
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#FB9301] to-[#ffce3d] text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";

export function ProductGrid() {
  const memoizedProducts = useMemo(() => products, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-[#f5f5f5] via-[#fffdf2] to-[#ffe8c3] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <header className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-[#FB9301] to-[#eeb714] bg-clip-text text-transparent leading-tight">
            Productos Destacados
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Artesanías auténticas hechas a mano
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {memoizedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}