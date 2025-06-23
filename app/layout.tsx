import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { CartProvider } from '@/components/providers/cart-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { NotificationProvider } from '@/components/ui/notification-system';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/ui/chatbot';
import { FloatingSocialButtons } from '@/components/ui/floating-social-buttons';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Mercart - Tu Marketplace Tecnológico Premium en Chile',
  description: 'Descubre la mejor selección de tecnología en Chile con experiencias de compra premium, diseños modernos y los mejores precios. Gaming, computación, smartphones y más.',
  keywords: 'tecnología chile, gaming, computadoras, smartphones, componentes, marketplace chile, innovación, tienda tecnología santiago',
  authors: [{ name: 'Mercart Chile' }],
  creator: 'Mercart',
  publisher: 'Mercart',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mercart-chile-2025.vercel.app'),
  openGraph: {
    title: 'Mercart - Tu Marketplace Tecnológico Premium en Chile',
    description: 'Descubre la mejor selección de tecnología en Chile con experiencias de compra premium y los mejores precios.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://mercart-chile-2025.vercel.app',
    siteName: 'Mercart',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercart - Marketplace Tecnológico Chile',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercart - Tu Marketplace Tecnológico Premium en Chile',
    description: 'Descubre la mejor selección de tecnología en Chile con experiencias de compra premium y los mejores precios.',
    images: ['/twitter-image.jpg'],
    creator: '@mercartchile',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0444ac" />
        <meta name="msapplication-TileColor" content="#0444ac" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              {children}
              <Toaster />
              <FloatingSocialButtons />
              <Chatbot />
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}