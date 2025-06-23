import CategoryShell from './CategoryShell';

/* Si tu conjunto de slugs es fijo, mejora el rendimiento */
export const dynamicParams = false;

/* Rutas estáticas para el build */
export async function generateStaticParams() {
  const categories = [
    'gaming',
    'computacion',
    'smartphones',
    'audio',
    'domotica',
    'accesorios',
  ];
  return categories.map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export default async function Category({ params }: PageProps) {
  /* Server component delega toda la UI a CategoryShell */
  return <CategoryShell slug={params.slug} />;
}
