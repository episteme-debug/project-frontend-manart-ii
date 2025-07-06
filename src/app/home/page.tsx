import { Header } from "@/components/home/layout/header"
import { Footer } from "@/components/home/layout/footer"
import { HeroSection } from "@/components/home/sections/hero-section"
import { CategoriesCarousel } from "@/components/home/sections/categories-carousel"
import { ProductGrid } from "@/components/home/sections/product-grid"
import { PatrimonioSection } from "@/components/home/sections/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoriesCarousel />
        <ProductGrid />
        <PatrimonioSection />
      </main>
      <Footer />
    </div>
  )
}
