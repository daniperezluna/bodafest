import React from 'react'
import '@/assets/css/animate.css'
import '@/assets/scss/style.scss'
import logo from "@/assets/images/main-logo-small.png"
import LayoutChildren from '@/lib/layoutChildren'
import NavbarTwo from '@/components/common/navbars/NavbarTwo'
import FooterTwo from '@/components/common/footers/FooterTwo'
import { Analytics } from "@vercel/analytics/react"
import { Open_Sans, Poppins, Plus_Jakarta_Sans, Roboto } from "next/font/google"

export const metadata = {
  title: 'BodaFest - Eli y Dani',
  description: 'Bienvenidos al bodafest de vuestras vidas',
  icons: {
    icon: `${logo.src}`,
  },
  openGraph: {
    title: 'BodaFest - Eli y Dani',
    description: 'Bienvenidos al bodafest de vuestras vidas',
    url: "https://bodafesteliydani.es",
    siteName: "BodaFest - Eli y Dani",
    images: [
      {
        url: "https://bodafesteliydani.es/main-image-og.png",
        width: 1200,
        height: 630,
        alt: "Imagen de Open Graph",
      },
    ],
    locale: "es_ES",
  },
}

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  style: ['italic', 'normal'],
  variable: '--family-style-1',
  adjustFontFallback: false
})

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  style: ['italic', 'normal'],
  variable: '--family-style-4',
  adjustFontFallback: false
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  variable: '--family-style-3',
  adjustFontFallback: false
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--family-style-2',
  adjustFontFallback: false
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${open_sans.variable} ${plus_jakarta_sans.variable} ${poppins.variable} ${roboto.variable} `}>
      <body suppressHydrationWarning={true}>
        <Analytics />
        <LayoutChildren>
          <NavbarTwo />
            {children}
          <FooterTwo styleNum={3} />
        </LayoutChildren>
      </body>
    </html>
  )
}
