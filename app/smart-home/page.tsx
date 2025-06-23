/* app/smart-home/page.tsx
   ──────────────────────────────────────────────────────────────
   • Evitamos el error “window is not defined” haciendo que
     SmartHomePage se cargue dinámicamente con ssr:false.
   • Quitamos cualquier viewport incrustado en metadata
     (el warning de Next 15) y, si lo necesitas, lo expones con
     export const viewport = { … }.
   ────────────────────────────────────────────────────────────── */
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

/* Header y Footer → sólo en cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

/* Smart-home page → también se hidrata 100 % en cliente,
   así cualquier referencia a window/document es segura     */
const SmartHomePage = dynamic(
  () =>
    import('@/components/pages/smart-home-page').then(
      (m) => m.SmartHomePage,
    ),
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

/* (Opcional) Si quieres definir viewport, hazlo en su export dedicado */
// export const viewport = { width: 'device-width', initialScale: 1 };

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
