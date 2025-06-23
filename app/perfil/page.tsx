/* app/perfil/page.tsx
   —————————————————————————————————————————
   • Client Component (usa ‘use client’).
   • Header y Footer se cargan dinámicamente
     con ssr:false para evitar problemas
     en el build de Next.js 15.
   • El viewport, si lo necesitas, va en un
     export separado; aquí sólo dejamos el
     título en metadata.
   ————————————————————————————————————————— */
'use client';

import dynamic from 'next/dynamic';
import { ProfilePage } from '@/components/pages/profile-page';

/* Header y Footer sólo en cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

/* (Opcional) metadata + viewport */
export const metadata = { title: 'Perfil | Mercart' };
export const viewport = { width: 'device-width', initialScale: 1 };

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ProfilePage />
      </main>

      <Footer />
    </div>
  );
}
