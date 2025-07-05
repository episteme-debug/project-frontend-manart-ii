import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ProductoProvider } from "@/contexts/ProductoContexto";
import { CarritoProvider } from "@/contexts/CarritoContext";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ManArt",
  description: "Proyecto artesanal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProductoProvider>
          <CarritoProvider>
            {children}
          </CarritoProvider>
        </ProductoProvider>
      </body>
    </html>
  );
}
