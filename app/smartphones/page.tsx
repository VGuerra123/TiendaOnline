/* app/smartphones/page.tsx */
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SmartphonesPage } from '@/components/pages/smartphones-page';

/* Header y Footer se hidratan sólo en el cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

/* Loader reutilizable */
function LoadingRing() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading-ring">
        <div /> <div /> <div /> <div />
      </div>
    </div>
  );
}

export default function Smartphones() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<LoadingRing />}>
          <SmartphonesPage />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
