/* app/perfil/page.tsx */
'use client';

import dynamic from 'next/dynamic';
import { ProfilePage } from '@/components/pages/profile-page';

/* Header y Footer se hidratan en el cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

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
