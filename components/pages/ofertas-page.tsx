// src/pages/OfertasPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  List,
  SlidersHorizontal,
  Zap,
  Clock,
  Star,
  ShoppingCart,
  Heart,
  Eye,
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
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

interface OfferProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  tags: string[];
  inStock: boolean;
  discount: number;
  timeLeft: string;
  offerType: 'flash' | 'daily' | 'weekly' | 'clearance';
  soldCount: number;
  totalStock: number;
}

export function OfertasPage() {
  const [allProducts, setAllProducts] = useState<OfferProduct[]>([]);
  const [filtered, setFiltered] = useState<OfferProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'flash' | 'daily' | 'weekly' | 'clearance'>('flash');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'flash' | 'price-low' | 'price-high' | 'rating' | 'newest'>('flash');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'flash', label: 'Ofertas Flash', icon: Zap, color: 'from-red-500 to-orange-500' },
    { id: 'daily', label: 'Oferta del Día', icon: Flame, color: 'from-orange-500 to-yellow-500' },
    { id: 'weekly', label: 'Ofertas Semanales', icon: TrendingUp, color: 'from-blue-500 to-purple-500' },
    { id: 'clearance', label: 'Liquidación', icon: Gift, color: 'from-green-500 to-teal-500' },
  ] as const;

  const mockProducts: OfferProduct[] = [
    // …aquí tu array de objetos de ejemplo exactamente como antes…
  ];

  // Countdown timer (solo para flash sales)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t.seconds > 0) return { ...t, seconds: t.seconds - 1 };
        if (t.minutes > 0) return { hours: t.hours, minutes: t.minutes - 1, seconds: 59 };
        if (t.hours > 0) return { hours: t.hours - 1, minutes: 59, seconds: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Carga inicial de productos
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Filtrado y orden
  useEffect(() => {
    let curr = allProducts.filter((p) => p.offerType === activeTab);

    // búsqueda
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      curr = curr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    // marcas
    if (selectedBrands.length) curr = curr.filter((p) => selectedBrands.includes(p.brand));
    // categorías
    if (selectedCats.length) curr = curr.filter((p) => selectedCats.includes(p.category));
    // precio
    curr = curr.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // orden
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
        curr.sort((a, b) => b.discount - a.discount);
    }

    setFiltered(curr);
  }, [
    allProducts,
    activeTab,
    searchQuery,
    selectedBrands,
    selectedCats,
    priceRange,
    sortBy,
  ]);

  const handleAdd = async (p: OfferProduct) => {
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
      toast({ title: 'Artículo añadido al carrito' });
    } catch {
      toast({ variant: 'destructive', title: 'Error al añadir al carrito' });
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(n);

  const getSoldPct = (sold: number, total: number) =>
    Math.min(100, Math.round((sold / total) * 100));

  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));
  const cats = Array.from(new Set(allProducts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <FloatingElements count={20} className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-black text-gradient">Ofertas Especiales</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Descuentos increíbles en los mejores productos tecnológicos. ¡Aprovecha antes de que se agoten!
          </p>
          {/* TIMER */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center space-x-6 bg-red-500 text-white px-10 py-4 rounded-3xl shadow-xl"
          >
            <Clock className="w-8 h-8" />
            <div className="text-center">
              <p className="uppercase text-sm font-bold">Termina en</p>
              <div className="flex items-center text-3xl font-black space-x-2">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TABS */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {tabs.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Button
                variant={activeTab === t.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-2 px-6 py-4 rounded-xl text-lg font-bold ${
                  activeTab === t.id
                    ? `bg-gradient-to-r ${t.color} text-white shadow-lg`
                    : 'border hover:bg-gray-100'
                }`}
              >
                <t.icon className="w-6 h-6" />
                <span>{t.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* CONTROLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <Input
              placeholder="Buscar ofertas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 rounded-xl px-4"
            />

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <SelectTrigger className="w-40 h-12 rounded-xl">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flash">Más descontadas</SelectItem>
                  <SelectItem value="price-low">Precio ↑</SelectItem>
                  <SelectItem value="price-high">Precio ↓</SelectItem>
                  <SelectItem value="rating">Mejor calificadas</SelectItem>
                  <SelectItem value="newest">Nuevas</SelectItem>
                </SelectContent>
              </Select>

              <Button size="icon" variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')}>
                <Grid />
              </Button>
              <Button size="icon" variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')}>
                <List />
              </Button>

              <Button variant="outline" onClick={() => setShowFilters((f) => !f)} className="lg:hidden">
                <SlidersHorizontal />
              </Button>
            </div>

            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                  {/* PRECIO */}
                  <div>
                    <h3 className="font-black mb-2">Rango de Precio</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(r) => setPriceRange(r as [number, number])}
                      max={6500000}
                      step={50000}
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  {/* MARCAS */}
                  <div>
                    <h3 className="font-black mb-2">Marcas</h3>
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

                  {/* CATEGORÍAS */}
                  <div>
                    <h3 className="font-black mb-2">Categorías</h3>
                    <div className="space-y-2">
                      {cats.map((c) => (
                        <label key={c} className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedCats.includes(c)}
                            onCheckedChange={(cOn) =>
                              setSelectedCats((prev) =>
                                cOn ? [...prev, c] : prev.filter((x) => x !== c)
                              )
                            }
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* FILTROS RÁPIDOS */}
                  <div>
                    <h3 className="font-black mb-2">Filtros Rápidos</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Destacados</Badge>
                      <Badge variant="outline">En Oferta</Badge>
                      <Badge variant="outline">Más Vendidos</Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* GRID / LIST */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div className="flex justify-center py-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="loading-ring"><div/><div/><div/><div/></div>
            </motion.div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-black mb-4">No hay ofertas disponibles</h3>
              <Button
                onClick={() => {
                  setSearchQuery(''); setSelectedBrands([]); setSelectedCats([]); setPriceRange([0,6500000]);
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          ) : (
            <motion.div
              key={activeTab + sortBy}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-3xl overflow-hidden border hover:border-primary/40 relative"
                >
                  {/* BADGES */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-red-500 text-white px-4 py-2 font-black">-{p.discount}%</Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      <Clock className="inline w-4 h-4 mr-1"/> {p.timeLeft}
                    </Badge>
                  </div>

                  {/* IMAGE */}
                  <div className="relative aspect-square">
                    <ProductShowcase image={p.image} title={p.name} className="w-full h-full"/>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Button size="icon" variant="secondary"><Eye/></Button>
                      <Button size="icon" variant="secondary"><Heart/></Button>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-5 h-5 ${idx < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'}`}/>
                        ))}
                        <span className="text-sm ml-1">({p.reviews})</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{p.brand}</Badge>
                    </div>

                    <h3 className="text-xl font-black line-clamp-2 group-hover:text-primary transition">{p.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{p.description}</p>

                    {/* PROGRESS */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>Vendidos: {p.soldCount}</span>
                        <span>Stock: {p.totalStock - p.soldCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${getSoldPct(p.soldCount, p.totalStock)}%` }}
                        />
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-primary">{formatPrice(p.price)}</span>
                        <span className="text-sm line-through text-gray-400">{formatPrice(p.originalPrice)}</span>
                      </div>
                      <span className="text-sm text-green-600 font-bold">
                        Ahorra {formatPrice(p.originalPrice - p.price)}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleAdd(p)}
                      className="w-full flex items-center justify-center gap-2 py-3 font-black bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:scale-105 transition"
                    >
                      <ShoppingCart className="w-5 h-5"/> Comprar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-20 text-center p-12 bg-gray-50 rounded-3xl">
          <h2 className="text-3xl font-black mb-4">¿No encontraste tu oferta?</h2>
          <p className="text-gray-600 mb-6">Suscríbete para recibir alertas de descuentos exclusivos.</p>
          <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 font-black rounded-xl hover:scale-105 transition">
            <Zap className="w-6 h-6 mr-2"/> Suscribirse
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
