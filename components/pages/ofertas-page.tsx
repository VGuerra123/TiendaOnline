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
  const [isDesktop, setIsDesktop] = useState(false);

  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'flash', label: 'Ofertas Flash', icon: Zap, color: 'from-red-500 to-orange-500' },
    { id: 'daily', label: 'Oferta del Día', icon: Flame, color: 'from-orange-500 to-yellow-500' },
    { id: 'weekly', label: 'Ofertas Semanales', icon: TrendingUp, color: 'from-blue-500 to-purple-500' },
    { id: 'clearance', label: 'Liquidación', icon: Gift, color: 'from-green-500 to-teal-500' },
  ] as const;

  const mockProducts: OfferProduct[] = [
    // Productos de prueba
  ];

  // Detectar si es escritorio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const check = () => setIsDesktop(window.innerWidth >= 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }
  }, []);

  // Countdown timer
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let curr = allProducts.filter((p) => p.offerType === activeTab);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      curr = curr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedBrands.length) curr = curr.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCats.length) curr = curr.filter((p) => selectedCats.includes(p.category));

    curr = curr.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

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
  }, [allProducts, activeTab, searchQuery, selectedBrands, selectedCats, priceRange, sortBy]);

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
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

  const getSoldPct = (sold: number, total: number) =>
    Math.min(100, Math.round((sold / total) * 100));

  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));
  const cats = Array.from(new Set(allProducts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <FloatingElements count={20} className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* ... resto del JSX ... */}

        <AnimatePresence>
          {(showFilters || isDesktop) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {/* filtros aquí */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
