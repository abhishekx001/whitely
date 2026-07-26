import './globals.css'
import { Raleway, Fraunces } from 'next/font/google'
import WhatsAppProvider from '../components/WhatsAppProvider'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-raleway',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata = {
  title: "Whitely Beauty", 
  manifest: "/manifest.json",
  description: 'Whitely Pro Application',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
}

import WhatsAppButton from '../components/WhatsAppButton'
import ProductChatWidget from '../components/ProductChatWidget'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${fraunces.variable} overflow-x-hidden text-brand-ink bg-brand-base`}>
      <body className="overflow-x-hidden font-sans">
        <AuthProvider>
          <CartProvider>
            <WhatsAppProvider>
              {children}
              <WhatsAppButton />
              <ProductChatWidget />
            </WhatsAppProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
