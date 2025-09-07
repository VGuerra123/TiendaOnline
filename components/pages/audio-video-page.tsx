// src/pages/AudioVideoPage.tsx
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
  Volume2,
  Headphones,
  Mic,
  Speaker,
  Radio,
  Music,
  Play,
  Zap,
  Crown,
  Flame,
  TrendingUp,
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
  }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy, activeTab]);

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
        featured: false,
        specs: {
          type: p.productType,
          connectivity:
            p.variants[0]?.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(', ') || '',
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
      const map: Record<string, string> = {
        audifonos: 'Audífonos',
        speakers: 'Speakers',
        microfonos: 'Micrófonos',
        streaming: 'Streaming',
      };
      filtered = filtered.filter((p) => p.category === map[activeTab]);
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

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

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
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo añadir al carrito',
      });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);

  const calculateDiscount = (price: number, original?: number) =>
    original ? Math.round(((original - price) / original) * 100) : 0;

  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={20} className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Aquí iría el renderizado de productos con filteredProducts */}
      </div>
    </div>
  );
}
