import { Header } from "@/components/home/layout/header"
import { Footer } from "@/components/home/layout/footer"
import { HeroSection } from "@/components/home/sections/hero-section"
import { ProductGrid } from "@/components/home/sections/product-grid"
import { StatsSection } from "@/components/home/sections/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
