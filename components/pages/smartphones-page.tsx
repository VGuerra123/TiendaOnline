// src/pages/SmartphonesPage.tsx
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
  Smartphone,
  Zap,
  Camera,
  Battery,
  Cpu,
  Wifi,
  Shield,
  Crown,
  Flame,
  TrendingUp,
  Gift,
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

const ProductShowcase = dynamic(
  () =>
    import('@/components/3d/product-showcase').then((mod) => ({
      default: mod.ProductShowcase,
    })),
  { ssr: false }
);
const FloatingElements = dynamic(
  () =>
    import('@/components/3d/floating-elements').then((mod) => ({
      default: mod.FloatingElements,
    })),
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
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    storage: string;
    ram: string;
    os: string;
    connectivity: string[];
  };
}

export function SmartphonesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');

  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'todos', label: 'Todos', icon: Smartphone, count: 'Todo' },
    { id: 'flagship', label: 'Flagship', icon: Crown, count: '25+' },
    { id: 'gaming', label: 'Gaming', icon: Zap, count: '15+' },
    { id: 'camera', label: 'Cámara Pro', icon: Camera, count: '20+' },
    { id: 'budget', label: 'Accesibles', icon: Gift, count: '30+' },
  ];

  const mockProducts: Product[] = [
    /* …tus 8 objetos mock tal cual los proporcionaste… */
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtrar por pestaña
    if (activeTab !== 'todos') {
      if (activeTab === 'camera') {
        filtered = filtered.filter((p) => p.tags.includes('camera-pro'));
      } else {
        const mapCat: Record<string, string> = {
          flagship: 'Flagship',
          gaming: 'Gaming',
          budget: 'Budget',
        };
        filtered = filtered.filter((p) => p.category === mapCat[activeTab]);
      }
    }

    // Búsqueda
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Marcas
    if (selectedBrands.length) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Categorías (checkbox)
    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Rango de precio
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Orden
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
  }, [
    products,
    activeTab,
    searchQuery,
    selectedBrands,
    selectedCategories,
    priceRange,
    sortBy,
  ]);

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
      toast({ title: 'Producto añadido al carrito' });
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
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient">
              Smartphones
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
            Descubre los smartphones más avanzados del mundo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge className="bg-primary/10 text-primary px-4 py-2 font-bold">
              {filteredProducts.length} modelos
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 py-2 font-bold">
              5G incluido
            </Badge>
            <Badge className="bg-accent/10 text-accent px-4 py-2 font-bold">
              Garantía oficial
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
                  ? 'flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-blue-50'
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
              placeholder="Buscar smartphones..."
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
                  <SelectItem value="rating">Mejor calificados</SelectItem>
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
                  {/* Rango de Precio */}
                  <div>
                    <h3 className="font-black mb-2">Rango de Precio</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(r) => setPriceRange(r as [number, number])}
                      max={8000000}
                      step={100000}
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
                            onCheckedChange={(chk) => {
                              setSelectedBrands((prev) =>
                                chk ? [...prev, b] : prev.filter((x) => x !== b)
                              );
                            }}
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
                            onCheckedChange={(chk) => {
                              setSelectedCategories((prev) =>
                                chk ? [...prev, c] : prev.filter((x) => x !== c)
                              );
                            }}
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
                      <Badge variant="outline">5G</Badge>
                      <Badge variant="outline">Cámara Pro</Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* GRID / LISTADO */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-black mb-4">
              No se encontraron smartphones
            </h3>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrands([]);
                setSelectedCategories([]);
                setPriceRange([0, 8000000]);
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
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`group bg-white rounded-2xl border hover:shadow-lg overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* IMAGEN */}
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
                      <Badge className="bg-secondary text-secondary-foreground px-2 py-1 font-black text-xs">
                        <Crown className="w-3 h-3 inline mr-1" />
                        Destacado
                      </Badge>
                    )}
                    {p.originalPrice && (
                      <Badge className="bg-red-500 text-white px-2 py-1 font-black text-xs">
                        <Flame className="w-3 h-3 inline mr-1" />
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

                {/* DETALLES */}
                <div className={`p-4 space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(p.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs ml-1">({p.reviews})</span>
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

                  {/* SPECS RÁPIDAS */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Cpu className="w-4 h-4 text-primary" />
                      {p.specs.processor.split(' ')[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Battery className="w-4 h-4 text-primary" />
                      {p.specs.battery.split(' ')[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="w-4 h-4 text-primary" />
                      {p.specs.camera.split(' ')[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary" />
                      {p.specs.storage}
                    </div>
                  </div>

                  {/* PRECIO */}
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
                      Hasta 24 cuotas sin interés
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
