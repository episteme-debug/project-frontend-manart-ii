// src/fonts.ts
import { Merienda, Playfair_Display, Quicksand } from 'next/font/google'

export const merienda = Merienda({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merienda'
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair'
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-quicksand'
})
