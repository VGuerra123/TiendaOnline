'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

/* ——— Componentes cargados sólo en cliente ——— */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

const AudioVideoPage = dynamic(
  () =>
    import('@/components/pages/audio-video-page').then(
      (m) => m.AudioVideoPage,
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

export default function AudioVideo() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<LoadingRing />}>
          <AudioVideoPage />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
