import CategoryShell from './CategoryShell';

/*  Si tu conjunto de slugs es fijo (preconstruido)
    marca dynamicParams = false para mejor optimización */
export const dynamicParams = false;

/*  Genera las rutas estáticas  */
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
  /*  Encapsulamos toda la UI cliente en CategoryShell */
  return <CategoryShell slug={params.slug} />;
}
