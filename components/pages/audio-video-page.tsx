// src/pages/AudioVideoPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  SlidersHorizontal,
  Volume2,
  Headphones,
  Speaker,
  Mic,
  Radio,
  Crown,
  Flame,
  TrendingUp,
  Volume1,
  Zap,
  Award,
  Music,
} from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import { shopifyService } from '@/lib/shopify';

const ProductShowcase = dynamic(
  () => import('@/components/3d/product-showcase').then((m) => ({ default: m.ProductShowcase })),
  { ssr: false }
);
const FloatingElements = dynamic(
  () => import('@/components/3d/floating-elements').then((m) => ({ default: m.FloatingElements })),
  { ssr: false }
);

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
  specs: {
    type: string;
    connectivity: string;
    frequency: string;
    features: string[];
  };
}

export function AudioVideoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');

  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'todos', label: 'Todos', icon: Volume2 },
    { id: 'audifonos', label: 'Audífonos', icon: Headphones },
    { id: 'speakers', label: 'Speakers', icon: Speaker },
    { id: 'microfonos', label: 'Micrófonos', icon: Mic },
    { id: 'streaming', label: 'Streaming', icon: Radio },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [
    products,
    searchQuery,
    selectedBrands,
    selectedCategories,
    priceRange,
    sortBy,
    activeTab,
  ]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const shopifyProducts = await shopifyService.getAllProducts(50);
      const mapped = shopifyProducts.map((p) => ({
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
        featured: p.tags.includes('bestseller'),
        specs: {
          type: p.productType,
          connectivity:
            p.variants[0]?.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(', ') ||
            '',
          frequency: '',
          features: [],
        },
      }));
      setProducts(mapped);
    } catch (error) {
      console.error('Error loading products from Shopify:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar los productos de Shopify',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (activeTab !== 'todos') {
      const mapCat: Record<string, string> = {
        audifonos: 'Audífonos',
        speakers: 'Speakers',
        microfonos: 'Micrófonos',
        streaming: 'Streaming',
      };
      filtered = filtered.filter((p) => p.category === mapCat[activeTab]);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedBrands.length) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

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
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(n);

  const calculateDiscount = (price: number, orig?: number) =>
    orig ? Math.round(((orig - price) / orig) * 100) : 0;

  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={20} className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient">
              Audio & Video
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Descubre el mundo del audio premium y video profesional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Badge className="bg-primary/10 text-primary px-4 py-2 font-bold">
              {filteredProducts.length} productos
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 py-2 font-bold">
              Audio Hi-Res certificado
            </Badge>
            <Badge className="bg-accent/10 text-accent px-4 py-2 font-bold">
              Garantía premium
            </Badge>
          </div>
        </motion.div>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={
                activeTab === t.id
                  ? 'flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'flex items-center space-x-2 px-4 py-2 rounded-xl border hover:bg-blue-50'
              }
            >
              <t.icon className="w-5 h-5" />
              <span className="font-bold">{t.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* SEARCH & CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 rounded-xl px-4"
            />
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12 rounded-xl">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio ↑</SelectItem>
                  <SelectItem value="price-high">Precio ↓</SelectItem>
                  <SelectItem value="rating">Mejor calif.</SelectItem>
                  <SelectItem value="newest">Nuevos</SelectItem>
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
                onClick={() => setShowFilters((v) => !v)}
                className="lg:hidden"
              >
                <SlidersHorizontal />
              </Button>
            </div>

            {/* PANEL DE FILTROS */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                  {/* Precio */}
                  <div>
                    <h3 className="font-black mb-2">Rango de Precio</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(r) =>
                        setPriceRange(r as [number, number])
                      }
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
                    <h3 className="font-black mb-2">Marcas</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {brands.map((b) => (
                        <label key={b} className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedBrands.includes(b)}
                            onCheckedChange={(chk) =>
                              setSelectedBrands((prev) =>
                                chk
                                  ? [...prev, b]
                                  : prev.filter((x) => x !== b)
                              )
                            }
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categorías */}
                  <div>
                    <h3 className="font-black mb-2">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((c) => (
                        <label key={c} className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedCategories.includes(c)}
                            onCheckedChange={(chk) =>
                              setSelectedCategories((prev) =>
                                chk
                                  ? [...prev, c]
                                  : prev.filter((x) => x !== c)
                              )
                            }
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filtros Rápidos */}
                  <div>
                    <h3 className="font-black mb-2">Filtros Rápidos</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Destacados</Badge>
                      <Badge variant="outline">En Oferta</Badge>
                      <Badge variant="outline">Mejor Calificados</Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading-ring"><div /><div /><div /><div /></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-black mb-4">
              No se encontraron productos
            </h3>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrands([]);
                setSelectedCategories([]);
                setPriceRange([0, 2000000]);
                setActiveTab('todos');
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`group bg-white rounded-2xl border hover:shadow-lg overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* IMAGE */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 h-80' : 'aspect-square'
                  }`}
                >
                  <ProductShowcase
                    image={p.image}
                    title={p.name}
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {p.featured && (
                      <Badge className="bg-secondary text-secondary-foreground px-2 sm:px-4 py-1 text-xs sm:text-sm font-black">
                        <Crown className="w-3 h-3 mr-1 inline" />
                        Destacado
                      </Badge>
                    )}
                    {p.originalPrice && (
                      <Badge className="bg-red-500 text-white px-2 sm:px-4 py-1 text-xs sm:text-sm font-black">
                        <Flame className="w-3 h-3 mr-1 inline" />
                        -{calculateDiscount(p.price, p.originalPrice)}%
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Button size="icon" variant="secondary" className="mx-2">
                      <Eye />
                    </Button>
                    <Button size="icon" variant="secondary" className="mx-2">
                      <Heart />
                    </Button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className={`p-4 space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < Math.floor(p.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold ml-1">
                        ({p.reviews})
                      </span>
                    </div>
                    <Badge variant="secondary" className="px-2 text-xs font-bold">
                      {p.brand}
                    </Badge>
                  </div>

                  <h3 className="font-black text-lg line-clamp-2 group-hover:text-primary transition">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 hidden sm:block">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 text-xs">
                      <Volume1 className="w-4 h-4 text-primary" />
                      {p.specs.type}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Zap className="w-4 h-4 text-primary" />
                      {p.specs.connectivity.split(',')[0]}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Award className="w-4 h-4 text-primary" />
                      {p.specs.frequency || '—'}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Music className="w-4 h-4 text-primary" />
                      {p.specs.features[0] || '—'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-primary">
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-sm line-through text-gray-500">
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-green-600 font-bold">
                      Hasta 12 cuotas sin interés
                    </p>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(p)}
                    className="w-full flex items-center justify-center gap-2 py-2 font-black text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:scale-105 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al carrito
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
