'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Star, ShoppingCart, Heart, Eye, SlidersHorizontal, Smartphone, Zap, Camera, Battery, Cpu, Wifi, Shield, Crown, Flame, TrendingUp, Gift, Award, Brain, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';

const ProductShowcase = dynamic(() => import('@/components/3d/product-showcase').then(mod => ({ default: mod.ProductShowcase })), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

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
  const [priceRange, setPriceRange] = useState([0, 8000000]);
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
    {
      id: '1',
      name: 'iPhone 15 Pro Max Titanio Natural',
      description: 'El iPhone más avanzado con chip A17 Pro, cámaras profesionales y diseño en titanio que redefine la innovación móvil',
      price: 4999000,
      originalPrice: 5499000,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 2847,
      brand: 'Apple',
      category: 'Flagship',
      tags: ['5G', 'Titanio', 'Pro', 'A17 Pro', 'flagship', 'camera-pro'],
      inStock: true,
      featured: true,
      specs: {
        screen: '6.7" Super Retina XDR OLED',
        processor: 'A17 Pro (3nm)',
        camera: '48MP Principal + 12MP Ultra Wide + 12MP Teleobjetivo',
        battery: '4441 mAh con carga rápida 27W',
        storage: '256GB',
        ram: '8GB',
        os: 'iOS 17',
        connectivity: ['5G', 'WiFi 6E', 'Bluetooth 5.3', 'USB-C', 'MagSafe']
      }
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra 5G',
      description: 'Smartphone Android premium con S Pen integrado, Galaxy AI y cámaras profesionales de 200MP para fotografía excepcional',
      price: 3999000,
      originalPrice: 4299000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 1923,
      brand: 'Samsung',
      category: 'Flagship',
      tags: ['5G', 'S Pen', 'Galaxy AI', 'Zoom 100x', 'flagship', 'camera-pro'],
      inStock: true,
      featured: true,
      specs: {
        screen: '6.8" Dynamic AMOLED 2X 120Hz',
        processor: 'Snapdragon 8 Gen 3 for Galaxy',
        camera: '200MP Principal + 50MP Periscope + 12MP Ultra Wide + 10MP Teleobjetivo',
        battery: '5000 mAh con carga súper rápida 45W',
        storage: '256GB',
        ram: '12GB',
        os: 'Android 14 con One UI 6.1',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.3', 'USB-C', 'S Pen']
      }
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro',
      description: 'Fotografía computacional avanzada con Google AI, Android puro y actualizaciones garantizadas por 7 años',
      price: 2999000,
      originalPrice: 3299000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviews: 1456,
      brand: 'Google',
      category: 'Flagship',
      tags: ['5G', 'Google AI', 'Pixel Camera', 'Android 14', 'flagship', 'camera-pro'],
      inStock: true,
      featured: true,
      specs: {
        screen: '6.7" LTPO OLED 120Hz',
        processor: 'Google Tensor G3',
        camera: '50MP Principal + 48MP Ultra Wide + 48MP Teleobjetivo',
        battery: '5050 mAh con carga inalámbrica 30W',
        storage: '128GB',
        ram: '12GB',
        os: 'Android 14 (7 años de actualizaciones)',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.3', 'USB-C', 'Carga inalámbrica']
      }
    },
    {
      id: '4',
      name: 'Xiaomi 14 Ultra Leica',
      description: 'Flagship con cámaras Leica profesionales, carga rápida 90W y pantalla AMOLED de 120Hz para experiencia premium',
      price: 2499000,
      originalPrice: 2799000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      reviews: 987,
      brand: 'Xiaomi',
      category: 'Flagship',
      tags: ['5G', 'Leica', 'Carga 90W', 'MIUI 15', 'flagship', 'camera-pro'],
      inStock: true,
      featured: false,
      specs: {
        screen: '6.73" AMOLED 120Hz',
        processor: 'Snapdragon 8 Gen 3',
        camera: '50MP Leica Principal + 50MP Ultra Wide + 50MP Periscope + 50MP Teleobjetivo',
        battery: '5300 mAh con HyperCharge 90W',
        storage: '512GB',
        ram: '16GB',
        os: 'MIUI 15 basado en Android 14',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.4', 'USB-C', 'Carga inalámbrica 80W']
      }
    },
    {
      id: '5',
      name: 'OnePlus 12 5G',
      description: 'Rendimiento extremo con Snapdragon 8 Gen 3, carga súper rápida 100W y OxygenOS optimizado para gaming',
      price: 2199000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      reviews: 743,
      brand: 'OnePlus',
      category: 'Gaming',
      tags: ['5G', 'Carga 100W', 'OxygenOS', 'Gaming', 'gaming'],
      inStock: true,
      featured: false,
      specs: {
        screen: '6.82" AMOLED 120Hz',
        processor: 'Snapdragon 8 Gen 3',
        camera: '50MP Hasselblad Principal + 64MP Periscope + 48MP Ultra Wide',
        battery: '5400 mAh con SuperVOOC 100W',
        storage: '256GB',
        ram: '12GB',
        os: 'OxygenOS 14 basado en Android 14',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.4', 'USB-C', 'Carga inalámbrica 50W']
      }
    },
    {
      id: '6',
      name: 'Nothing Phone (2a) Plus',
      description: 'Diseño único con Glyph Interface, Android puro optimizado y experiencia de usuario innovadora y transparente',
      price: 1299000,
      originalPrice: 1499000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      reviews: 621,
      brand: 'Nothing',
      category: 'Budget',
      tags: ['5G', 'Glyph', 'Nothing OS', 'Transparente', 'budget'],
      inStock: true,
      featured: true,
      specs: {
        screen: '6.7" AMOLED 120Hz',
        processor: 'MediaTek Dimensity 7200 Pro',
        camera: '50MP Principal + 50MP Ultra Wide',
        battery: '5000 mAh con carga rápida 50W',
        storage: '256GB',
        ram: '12GB',
        os: 'Nothing OS 2.6 basado en Android 14',
        connectivity: ['5G', 'WiFi 6', 'Bluetooth 5.3', 'USB-C', 'Glyph Interface']
      }
    },
    {
      id: '7',
      name: 'ASUS ROG Phone 8 Pro',
      description: 'Smartphone gaming definitivo con sistema de refrigeración avanzado, 165Hz y accesorios gaming profesionales',
      price: 3299000,
      originalPrice: 3599000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 892,
      brand: 'ASUS',
      category: 'Gaming',
      tags: ['5G', 'Gaming', 'ROG', '165Hz', 'Refrigeración', 'gaming'],
      inStock: true,
      featured: true,
      specs: {
        screen: '6.78" AMOLED 165Hz',
        processor: 'Snapdragon 8 Gen 3',
        camera: '50MP Principal + 13MP Ultra Wide + 32MP Macro',
        battery: '6000 mAh con HyperCharge 65W',
        storage: '512GB',
        ram: '16GB',
        os: 'ROG UI basado en Android 14',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.4', 'USB-C', 'AirTriggers', 'Cooling Fan']
      }
    },
    {
      id: '8',
      name: 'Motorola Edge 50 Ultra',
      description: 'Smartphone premium con cámaras Leica, pantalla curva elegante y experiencia Android casi pura con Moto gestures',
      price: 1899000,
      originalPrice: 2199000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.3,
      reviews: 567,
      brand: 'Motorola',
      category: 'Budget',
      tags: ['5G', 'Leica', 'Moto', 'Curva', 'budget'],
      inStock: true,
      featured: false,
      specs: {
        screen: '6.7" pOLED curva 144Hz',
        processor: 'Snapdragon 8s Gen 3',
        camera: '50MP Leica Principal + 50MP Ultra Wide + 64MP Periscope',
        battery: '4500 mAh con TurboPower 125W',
        storage: '512GB',
        ram: '12GB',
        os: 'Android 14 con Moto Experience',
        connectivity: ['5G', 'WiFi 7', 'Bluetooth 5.4', 'USB-C', 'Carga inalámbrica 50W']
      }
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy, activeTab]);

  const loadProducts = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProducts(mockProducts);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by tab
    if (activeTab !== 'todos') {
      const tabCategoryMap: { [key: string]: string } = {
        'flagship': 'Flagship',
        'gaming': 'Gaming',
        'budget': 'Budget'
      };
      
      if (activeTab === 'camera') {
        filtered = filtered.filter(product => product.tags.includes('camera-pro'));
      } else if (tabCategoryMap[activeTab]) {
        filtered = filtered.filter(product => product.category === tabCategoryMap[activeTab]);
      }
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
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

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem({
        id: product.id,
        variantId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        compareAtPrice: product.originalPrice,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const brands = [...new Set(products.map(p => p.brand))];
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={20} className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient">Smartphones</h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Descubre los smartphones más avanzados del mundo. Tecnología de vanguardia, 
            cámaras profesionales y rendimiento excepcional en la palma de tu mano.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Badge className="bg-primary/10 text-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              {filteredProducts.length} modelos disponibles
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              5G incluido
            </Badge>
            <Badge className="bg-accent/10 text-accent px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              Garantía oficial
            </Badge>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl scale-105'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="text-left">
                <div className="font-black">{tab.label}</div>
                <div className="text-xs opacity-80 hidden sm:block">{tab.count}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between mb-6 sm:mb-8">
            <div className="flex-1 max-w-lg w-full">
              <Input
                placeholder="Buscar smartphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 sm:border-3 focus:border-primary text-base sm:text-lg px-4 sm:px-6"
              />
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-6 w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-56 h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 sm:border-3 text-sm sm:text-lg">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificados</SelectItem>
                  <SelectItem value="newest">Más Recientes</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl"
                >
                  <Grid className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl hidden sm:flex"
                >
                  <List className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 sm:h-14 px-4 sm:px-8 rounded-xl sm:rounded-2xl border-2 sm:border-3 lg:hidden font-bold text-sm sm:text-base"
              >
                <SlidersHorizontal className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/60 p-4 sm:p-8 mb-6 sm:mb-8 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Rango de Precio</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={8000000}
                      step={100000}
                      className="mb-4 sm:mb-6"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-accent font-semibold">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Marcas</h3>
                    <div className="space-y-3 sm:space-y-4 max-h-32 sm:max-h-40 overflow-y-auto">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2 sm:space-x-3">
                          <Checkbox
                            id={brand}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                              }
                            }}
                          />
                          <label htmlFor={brand} className="text-accent cursor-pointer font-semibold text-sm sm:text-base">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Categorías</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2 sm:space-x-3">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                          />
                          <label htmlFor={category} className="text-accent cursor-pointer font-semibold text-sm sm:text-base">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <h3 className="font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">Filtros Rápidos</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 sm:px-4 py-1 sm:py-2 font-bold text-xs sm:text-sm"
                      >
                        Destacados
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 sm:px-4 py-1 sm:py-2 font-bold text-xs sm:text-sm"
                      >
                        En Oferta
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 sm:px-4 py-1 sm:py-2 font-bold text-xs sm:text-sm"
                      >
                        5G
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 sm:px-4 py-1 sm:py-2 font-bold text-xs sm:text-sm"
                      >
                        Cámara Pro
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 sm:py-32">
            <div className="loading-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`grid gap-4 sm:gap-6 lg:gap-10 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group card-3d bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/60 hover:border-primary/40 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-80 h-80' : 'aspect-square'
                }`}>
                  <ProductShowcase
                    image={product.image}
                    title={product.name}
                    className="w-full h-full"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-col gap-2 sm:gap-3">
                    {product.featured && (
                      <Badge className="bg-secondary text-secondary-foreground font-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Destacado
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-red-500 text-white font-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </Badge>
                    )}
                    {product.tags.includes('5G') && (
                      <Badge className="bg-green-500 text-white font-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        <Wifi className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        5G
                      </Badge>
                    )}
                  </div>
                  
                  {/* Quick Actions - Hidden on mobile */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 space-x-4 hidden sm:flex">
                    <Button size="sm" variant="secondary" className="rounded-full p-3 sm:p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                      <Eye className="w-4 h-4 sm:w-6 sm:h-6" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full p-3 sm:p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                      <Heart className="w-4 h-4 sm:w-6 sm:h-6" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-3 sm:p-6 lg:p-8 space-y-3 sm:space-y-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Rating and Brand */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 sm:w-5 sm:h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-accent ml-1 sm:ml-2 font-bold">
                        ({product.reviews})
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs sm:text-sm bg-primary/10 text-primary font-bold px-2 sm:px-3 py-1">
                      {product.brand}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-accent line-clamp-2 leading-relaxed font-medium text-xs sm:text-base hidden sm:block">
                      {product.description}
                    </p>
                  </div>

                  {/* Specs - Simplified for mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.processor.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.camera.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.battery.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.storage}</span>
                    </div>
                  </div>

                  {/* Tags - Hidden on mobile */}
                  <div className="flex-wrap gap-1 sm:gap-2 hidden sm:flex">
                    {product.tags.slice(0, 4).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span className="text-lg sm:text-2xl lg:text-3xl font-black text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm sm:text-xl text-accent line-through font-semibold">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-green-600 font-bold">
                      Hasta 24 cuotas sin interés
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 text-white font-black py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 text-xs sm:text-lg"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
                      <span className="hidden sm:inline">Agregar al Carrito</span>
                      <span className="sm:hidden">Agregar</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 sm:py-32"
          >
            <h3 className="text-2xl sm:text-3xl font-black text-accent mb-4 sm:mb-6">No se encontraron smartphones</h3>
            <p className="text-accent/80 mb-6 sm:mb-8 text-base sm:text-lg">Intenta ajustar los filtros o términos de búsqueda</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedBrands([]);
                setSelectedCategories([]);
                setPriceRange([0, 8000000]);
                setActiveTab('todos');
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl"
            >
              Limpiar Filtros
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}