// src/pages/CategoryPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import { shopifyService } from '@/lib/shopify';

const ProductShowcase = dynamic(
  () =>
    import('@/components/3d/product-showcase').then((m) => ({
      default: m.ProductShowcase,
    })),
  { ssr: false }
);
const FloatingElements = dynamic(
  () =>
    import('@/components/3d/floating-elements').then((m) => ({
      default: m.FloatingElements,
    })),
  { ssr: false }
);

interface CategoryPageProps {
  slug: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}

export function CategoryPage({ slug }: CategoryPageProps) {
  // --- Estado principal ---
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Controles de UI
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { addItem } = useCart();
  const { toast } = useToast();

  // Mapeo slug → título/legal category
  const categoryMap: Record<string, string> = {
    gaming: 'Gaming y Streaming',
    computacion: 'Computación',
    smartphones: 'Smartphones',
    'audio-video': 'Audio & Video',
    'smart-home': 'Smart Home',
    ofertas: 'Ofertas Especiales',
  };
  const displayTitle = categoryMap[slug] || 'Categoría';

  // --- Carga desde Shopify ---
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Trae hasta 250 productos
        const shopify = await shopifyService.getAllProducts(250);
        // Mapea a nuestro modelo
        const mapped: Product[] = shopify.map((p) => ({
          id: p.id,
          name: p.title,
          description: p.description,
          price: Math.round(parseFloat(p.priceRange.minVariantPrice.amount)),
          originalPrice:
            p.priceRange.maxVariantPrice.amount !== p.priceRange.minVariantPrice.amount
              ? Math.round(parseFloat(p.priceRange.maxVariantPrice.amount))
              : undefined,
          image: p.images[0]?.src || '',
          rating: 0,
          reviews: 0,
          brand: p.vendor,
          category: p.productType,
          tags: p.tags,
          inStock: p.availableForSale,
          featured: false,
        }));
        // Filtra SOLO la categoría actual
        const catName = categoryMap[slug];
        setAllProducts(
          catName
            ? mapped.filter((x) => x.category === catName)
            : mapped
        );
      } catch (err) {
        console.error(err);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No pudimos cargar los productos',
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // --- Filtrado / búsqueda / orden ---
  useEffect(() => {
    let curr = [...allProducts];

    // búsqueda de texto
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      curr = curr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // marcas
    if (selectedBrands.length) {
      curr = curr.filter((p) => selectedBrands.includes(p.brand));
    }

    // rango de precio
    curr = curr.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // ordenamiento
    switch (sortBy) {
      case 'price-low':
        curr.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        curr.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        curr.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        curr.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        curr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFiltered(curr);
  }, [allProducts, searchQuery, selectedBrands, priceRange, sortBy]);

  // --- Añadir al carrito ---
  const handleAddToCart = async (p: Product) => {
    try {
      await addItem({
        id: p.id,
        variantId: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        image: p.image,
        compareAtPrice: p.originalPrice,
      });
      toast({ title: 'Añadido al carrito' });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo añadir al carrito',
      });
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(n);

  // lista de marcas para filtro
  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <FloatingElements count={15} className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-gradient mb-4">{displayTitle}</h1>
          <p className="text-lg text-gray-600">
            Explora nuestra selección de <strong>{displayTitle}</strong>.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Badge className="bg-primary/10 text-primary px-4 py-2">
              {filtered.length} productos
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 py-2">
              Envío gratis
            </Badge>
          </div>
        </motion.div>

        {/* CONTROLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 rounded-xl"
            />

            <div className="flex items-center gap-3">
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as any)}
              >
                <SelectTrigger className="w-40 h-12 rounded-xl">
                  <SelectValue placeholder="Ordenar por" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio ↑</SelectItem>
                  <SelectItem value="price-high">Precio ↓</SelectItem>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="icon"
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid />
              </Button>
              <Button
                size="icon"
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List />
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowMobileFilters((f) => !f)}
                className="lg:hidden"
              >
                <SlidersHorizontal />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* SIDEBAR - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Filtros</h3>
                <Filter className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-6">
                {/* Rango de precio */}
                <div>
                  <h4 className="font-medium mb-2">Precio</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={(r) => setPriceRange(r as [number, number])}
                    max={2000000}
                    step={50000}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                {/* Marcas */}
                <div>
                  <h4 className="font-medium mb-2">Marcas</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((b) => (
                      <label key={b} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedBrands.includes(b)}
                          onCheckedChange={(c) =>
                            setSelectedBrands((prev) =>
                              c ? [...prev, b] : prev.filter((x) => x !== b)
                            )
                          }
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Clear */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrands([]);
                    setPriceRange([0, 2000000]);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </motion.div>

          {/* MOBILE FILTERS */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setShowMobileFilters(false)}
                />
                <div className="relative w-72 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Filtros</h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X />
                    </Button>
                  </div>
                  {/* mismo contenido que desktop */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Precio</h4>
                      <Slider
                        value={priceRange}
                        onValueChange={(r) => setPriceRange(r as [number, number])}
                        max={2000000}
                        step={50000}
                      />
                      <div className="flex justify-between text-sm mt-1">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Marcas</h4>
                      <div className="space-y-2">
                        {brands.map((b) => (
                          <label key={b} className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedBrands.includes(b)}
                              onCheckedChange={(c) =>
                                setSelectedBrands((prev) =>
                                  c ? [...prev, b] : prev.filter((x) => x !== b)
                                )
                              }
                            />
                            <span>{b}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBrands([]);
                        setPriceRange([0, 2000000]);
                        setShowMobileFilters(false);
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PRODUCTOS */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-32">
                <div className="loading-ring">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">No encontramos productos</h2>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrands([]);
                    setPriceRange([0, 2000000]);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`grid gap-8 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`group bg-white rounded-2xl overflow-hidden border hover:border-primary/40 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Imagen */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-64 h-64' : 'aspect-square'
                      }`}
                    >
                      <ProductShowcase
                        image={p.image}
                        title={p.name}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Button size="icon" variant="secondary">
                          <Eye />
                        </Button>
                        <Button size="icon" variant="secondary">
                          <Heart />
                        </Button>
                      </div>
                    </div>

                    {/* Detalles */}
                    <div className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, x) => (
                            <Star
                              key={x}
                              className={`w-4 h-4 ${
                                x < Math.floor(p.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm">({p.reviews})</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {p.brand}
                        </Badge>
                      </div>
                      <h3 className="font-semibold line-clamp-2">{p.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span className="text-sm line-through text-gray-400">
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(p)}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg"
                        >
                          <ShoppingCart className="w-4 h-4" /> Agregar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
