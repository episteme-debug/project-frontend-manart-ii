import { Footer } from "@/components/home/layout/footer";
import { Header } from "@/components/home/layout/header";

export default function CatalogoLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <main className="min-h-lvh">
          {children}
        </main>
      </section>
      <Footer />
    </div >
  );
}
