import { Footer } from "@/components/home/layout/footer";
import { Header } from "@/components/home/layout/header";

export default function CatalogoLayout({children,}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Header/>
      <main className="min-h-lvh">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
