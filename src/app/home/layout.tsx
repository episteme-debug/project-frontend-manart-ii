import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Sitio Principal - Artesanías ManArt'
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      {children}
    </div>
  )
}
