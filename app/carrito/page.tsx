/* app/carrito/page.tsx */
'use client';

import dynamic from 'next/dynamic';
import { CartPage } from '@/components/pages/cart-page';

/* Header y Footer renderizados sólo en el cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <CartPage />
      </main>

      <Footer />
    </div>
  );
}
