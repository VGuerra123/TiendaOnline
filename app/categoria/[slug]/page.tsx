import CategoryShell from './CategoryShell';

/*  Si no vas a añadir más rutas dinámicas en runtime
    establecemos `dynamicParams = false` para mejor
    rendimiento (opcional)                                   */
export const dynamicParams = false;

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

interface CategoryPageProps {
  params: { slug: string };
}

export default function Category({ params }: CategoryPageProps) {
  //  Delegamos la UI a nuestro wrapper cliente
  return <CategoryShell slug={params.slug} />;
}
