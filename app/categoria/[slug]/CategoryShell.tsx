'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

/* ─── Cargas dinámicas sólo en cliente ─── */
const Header = dynamic(
  () => import('@/components/layout/header').then((m) => m.Header),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/layout/footer').then((m) => m.Footer),
  { ssr: false },
);

const CategoryPage = dynamic(
  () =>
    import('@/components/pages/category-page').then(
      (m) => m.CategoryPage,
    ),
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
          <CategoryPage slug={slug} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
