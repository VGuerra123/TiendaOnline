/* app/smart-home/page.tsx */
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SmartHomePage } from '@/components/pages/smart-home-page';

/* ——— Header & Footer sólo se hidratan en el cliente ——— */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

/* ——— Loader reutilizable ——— */
const LoadingRing = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="loading-ring">
      <div /> <div /> <div /> <div />
    </div>
  </div>
);

export default function SmartHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<LoadingRing />}>
          <SmartHomePage />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
