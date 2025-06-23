'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { CategoryPage } from '@/components/pages/category-page';

/* Header & Footer sólo se hidratan en el cliente */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

/* Loader reutilizable */
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading-ring">
        <div /> <div /> <div /> <div />
      </div>
    </div>
  );
}

interface Props {
  slug: string;
}

export default function CategoryShell({ slug }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          {/* Contenido real de la categoría */}
          <CategoryPage slug={slug} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
