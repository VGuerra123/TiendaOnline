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
  Crown,
  Flame,
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
  const [isDesktop, setIsDesktop] = useState(false);

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
    // tus objetos mock
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Detectar si es escritorio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const check = () => setIsDesktop(window.innerWidth >= 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];

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
  }, [products, activeTab, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy]);

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
        {/* ... header, tabs, search ... */}

        {/* PANEL DE FILTROS */}
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

        {/* ... listado de productos ... */}
      </div>
    </div>
  );
}
