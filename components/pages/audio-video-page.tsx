'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Star, ShoppingCart, Heart, Eye, SlidersHorizontal, Volume2, Headphones, Mic, Speaker, Radio, Music, Play, Pause, SkipForward, SkipBack, Volume1, VolumeX, Zap, Award, Crown, Flame, TrendingUp, Gift, Camera, Monitor } from 'lucide-react';
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
    type: string;
    connectivity: string;
    frequency: string;
    impedance?: string;
    battery?: string;
    features: string[];
  };
}

export function AudioVideoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'todos', label: 'Todos', icon: Volume2, count: 'Todo' },
    { id: 'audifonos', label: 'Audífonos', icon: Headphones, count: '150+' },
    { id: 'speakers', label: 'Speakers', icon: Speaker, count: '80+' },
    { id: 'microfonos', label: 'Micrófonos', icon: Mic, count: '45+' },
    { id: 'streaming', label: 'Streaming', icon: Radio, count: '60+' },
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Sony WH-1000XM5 Wireless Premium',
      description: 'Audífonos inalámbricos con cancelación de ruido líder en la industria, 30 horas de batería y audio Hi-Res certificado',
      price: 899000,
      originalPrice: 1299000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 2847,
      brand: 'Sony',
      category: 'Audífonos',
      tags: ['wireless', 'noise-cancelling', 'premium', 'bestseller', 'audifonos'],
      inStock: true,
      featured: true,
      specs: {
        type: 'Over-ear',
        connectivity: 'Bluetooth 5.2, USB-C',
        frequency: '4Hz - 40kHz',
        impedance: '48Ω',
        battery: '30 horas',
        features: ['Cancelación de ruido adaptativa', 'Audio Hi-Res', 'Carga rápida', 'Multipoint']
      }
    },
    {
      id: '2',
      name: 'Apple AirPods Pro 2da Gen',
      description: 'Audífonos inalámbricos con chip H2, cancelación activa de ruido y audio espacial personalizado para experiencia inmersiva',
      price: 649000,
      originalPrice: 749000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 1923,
      brand: 'Apple',
      category: 'Audífonos',
      tags: ['wireless', 'noise-cancelling', 'spatial-audio', 'bestseller', 'audifonos'],
      inStock: true,
      featured: true,
      specs: {
        type: 'In-ear',
        connectivity: 'Bluetooth 5.3, Lightning',
        frequency: '20Hz - 20kHz',
        battery: '6 horas + 24h estuche',
        features: ['Chip H2', 'Audio Espacial', 'Transparencia Adaptativa', 'Resistente al agua IPX4']
      }
    },
    {
      id: '3',
      name: 'Bose QuietComfort 45',
      description: 'Audífonos premium con cancelación de ruido mundialmente reconocida, comodidad excepcional y 24 horas de batería',
      price: 799000,
      originalPrice: 999000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviews: 1456,
      brand: 'Bose',
      category: 'Audífonos',
      tags: ['wireless', 'noise-cancelling', 'comfort', 'premium', 'audifonos'],
      inStock: true,
      featured: true,
      specs: {
        type: 'Over-ear',
        connectivity: 'Bluetooth 5.1, 3.5mm',
        frequency: '20Hz - 20kHz',
        battery: '24 horas',
        features: ['TriPort acoustic', 'EQ personalizable', 'Modo Aware', 'Carga rápida']
      }
    },
    {
      id: '4',
      name: 'JBL Charge 5 Portable Speaker',
      description: 'Speaker Bluetooth portátil con sonido potente, resistente al agua IP67 y función powerbank para cargar dispositivos',
      price: 299000,
      originalPrice: 399000,
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      reviews: 987,
      brand: 'JBL',
      category: 'Speakers',
      tags: ['portable', 'waterproof', 'powerbank', 'outdoor', 'speakers'],
      inStock: true,
      featured: false,
      specs: {
        type: 'Portable',
        connectivity: 'Bluetooth 5.1, USB-C',
        frequency: '65Hz - 20kHz',
        battery: '20 horas',
        features: ['IP67 resistente al agua', 'JBL Pro Sound', 'PartyBoost', 'Powerbank USB']
      }
    },
    {
      id: '5',
      name: 'Blue Yeti USB Microphone',
      description: 'Micrófono USB profesional con múltiples patrones de captación, ideal para streaming, podcasting y grabación musical',
      price: 399000,
      originalPrice: 499000,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 743,
      brand: 'Blue',
      category: 'Micrófonos',
      tags: ['usb', 'streaming', 'podcast', 'professional', 'microfonos'],
      inStock: true,
      featured: true,
      specs: {
        type: 'Condensador',
        connectivity: 'USB 2.0',
        frequency: '20Hz - 20kHz',
        features: ['4 patrones polares', 'Monitoreo en tiempo real', 'Control de ganancia', 'Mute instantáneo']
      }
    },
    {
      id: '6',
      name: 'Elgato Stream Deck MK.2',
      description: 'Controlador de streaming con 15 teclas LCD personalizables, integración múltiple y software avanzado para creadores',
      price: 449000,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 621,
      brand: 'Elgato',
      category: 'Streaming',
      tags: ['streaming', 'content-creation', 'customizable', 'professional', 'streaming'],
      inStock: true,
      featured: true,
      specs: {
        type: 'Control Surface',
        connectivity: 'USB-C',
        frequency: 'N/A',
        features: ['15 teclas LCD', 'Software personalizable', 'Integración múltiple', 'Soporte ajustable']
      }
    },
    {
      id: '7',
      name: 'Marshall Acton III Bluetooth Speaker',
      description: 'Speaker Bluetooth con diseño icónico Marshall, sonido rock clásico y controles analógicos para el hogar',
      price: 549000,
      originalPrice: 649000,
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      reviews: 432,
      brand: 'Marshall',
      category: 'Speakers',
      tags: ['bluetooth', 'home', 'vintage', 'rock', 'speakers'],
      inStock: true,
      featured: false,
      specs: {
        type: 'Home Speaker',
        connectivity: 'Bluetooth 5.0, 3.5mm',
        frequency: '50Hz - 20kHz',
        features: ['Diseño icónico', 'Marshall Signature Sound', 'Controles analógicos', 'Multi-host']
      }
    },
    {
      id: '8',
      name: 'Audio-Technica ATH-M50xBT2',
      description: 'Audífonos de estudio inalámbricos con calidad profesional, 50 horas de batería y drivers de precisión',
      price: 459000,
      originalPrice: 559000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviews: 876,
      brand: 'Audio-Technica',
      category: 'Audífonos',
      tags: ['studio', 'professional', 'wireless', 'monitoring', 'audifonos'],
      inStock: true,
      featured: false,
      specs: {
        type: 'Studio Monitor',
        connectivity: 'Bluetooth 5.0, 3.5mm',
        frequency: '15Hz - 28kHz',
        impedance: '38Ω',
        battery: '50 horas',
        features: ['Drivers de 45mm', 'Codec LDAC', 'Multipoint', 'Plegable']
      }
    },
    {
      id: '9',
      name: 'Logitech C920s HD Pro Webcam',
      description: 'Cámara web Full HD 1080p con enfoque automático, micrófono estéreo y obturador de privacidad para streaming profesional',
      price: 199000,
      originalPrice: 249000,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      reviews: 1234,
      brand: 'Logitech',
      category: 'Streaming',
      tags: ['webcam', '1080p', 'streaming', 'privacy-shutter', 'streaming'],
      inStock: true,
      featured: false,
      specs: {
        type: 'Webcam',
        connectivity: 'USB-A 3.0',
        frequency: 'N/A',
        features: ['Full HD 1080p', 'Enfoque automático', 'Micrófono estéreo', 'Obturador privacidad']
      }
    },
    {
      id: '10',
      name: 'Rode PodMic USB',
      description: 'Micrófono dinámico USB diseñado específicamente para podcasting con sonido broadcast y construcción robusta',
      price: 329000,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      reviews: 567,
      brand: 'Rode',
      category: 'Micrófonos',
      tags: ['podcast', 'dynamic', 'usb', 'broadcast', 'microfonos'],
      inStock: true,
      featured: true,
      specs: {
        type: 'Dinámico',
        connectivity: 'USB-C',
        frequency: '20Hz - 20kHz',
        features: ['Sonido broadcast', 'Filtro pop interno', 'Montaje swing', 'Plug & play']
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
        'audifonos': 'Audífonos',
        'speakers': 'Speakers',
        'microfonos': 'Micrófonos',
        'streaming': 'Streaming'
      };
      filtered = filtered.filter(product => product.category === tabCategoryMap[activeTab]);
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
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient">Audio & Video</h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Descubre el mundo del audio premium y video profesional. Desde audífonos de alta fidelidad 
            hasta equipos de streaming profesional para crear contenido de calidad mundial.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Badge className="bg-primary/10 text-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              {filteredProducts.length} productos disponibles
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              Audio Hi-Res certificado
            </Badge>
            <Badge className="bg-accent/10 text-accent px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-bold">
              Garantía premium incluida
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
                placeholder="Buscar productos de audio..."
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
                      max={2000000}
                      step={50000}
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
                        Hi-Res Audio
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 sm:px-4 py-1 sm:py-2 font-bold text-xs sm:text-sm"
                      >
                        Inalámbrico
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
                    {product.tags.includes('bestseller') && (
                      <Badge className="bg-green-500 text-white font-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Bestseller
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
                      <Volume1 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.type}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.connectivity.split(',')[0]}</span>
                    </div>
                    {product.specs.battery && (
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.battery}</span>
                      
                      </div>
                    )}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Music className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm font-semibold text-accent truncate">{product.specs.frequency.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Features - Hidden on mobile */}
                  <div className="flex-wrap gap-1 sm:gap-2 hidden sm:flex">
                    {product.specs.features.slice(0, 3).map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 font-bold"
                      >
                        {feature}
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
                      Hasta 12 cuotas sin interés • Envío gratis
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
            <h3 className="text-2xl sm:text-3xl font-black text-accent mb-4 sm:mb-6">No se encontraron productos</h3>
            <p className="text-accent/80 mb-6 sm:mb-8 text-base sm:text-lg">Intenta ajustar los filtros o términos de búsqueda</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedBrands([]);
                setSelectedCategories([]);
                setPriceRange([0, 2000000]);
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