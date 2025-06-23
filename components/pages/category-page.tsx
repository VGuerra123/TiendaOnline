'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Star, ShoppingCart, Heart, Eye, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  // Mock data para categorías específicas
  const categoryData = {
    gaming: {
      title: 'Gaming y Streaming',
      description: 'Todo lo que necesitas para dominar en el gaming y streaming profesional',
      products: [
        {
          id: '1',
          name: 'NVIDIA GeForce RTX 4090 Gaming X Trio',
          description: 'Tarjeta gráfica gaming de alta gama con 24GB GDDR6X, perfecta para gaming en 4K y ray tracing',
          price: 2899000,
          originalPrice: 3199000,
          image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.9,
          reviews: 1247,
          brand: 'NVIDIA',
          category: 'Tarjetas Gráficas',
          tags: ['RTX', '4K Gaming', 'Ray Tracing', 'DLSS'],
          inStock: true,
          featured: true,
        },
        {
          id: '2',
          name: 'Razer DeathAdder V3 Pro Gaming Mouse',
          description: 'Ratón gaming inalámbrico con sensor Focus Pro 30K y switches ópticos',
          price: 299000,
          originalPrice: 349000,
          image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          reviews: 892,
          brand: 'Razer',
          category: 'Periféricos Gaming',
          tags: ['Inalámbrico', 'RGB', 'Pro Gaming'],
          inStock: true,
          featured: true,
        },
        {
          id: '3',
          name: 'Corsair K95 RGB Platinum XT',
          description: 'Teclado mecánico gaming con switches Cherry MX y iluminación RGB personalizable',
          price: 459000,
          image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.7,
          reviews: 654,
          brand: 'Corsair',
          category: 'Periféricos Gaming',
          tags: ['Mecánico', 'RGB', 'Cherry MX'],
          inStock: true,
          featured: false,
        },
        {
          id: '4',
          name: 'ASUS ROG Swift PG32UQX Monitor Gaming 32"',
          description: 'Monitor gaming 4K 144Hz con tecnología Mini LED y HDR1400',
          price: 4299000,
          originalPrice: 4799000,
          image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.9,
          reviews: 423,
          brand: 'ASUS',
          category: 'Monitores Gaming',
          tags: ['4K', '144Hz', 'HDR', 'Mini LED'],
          inStock: true,
          featured: true,
        },
        {
          id: '5',
          name: 'SteelSeries Arctis Pro Wireless',
          description: 'Audífonos gaming inalámbricos con audio Hi-Res y micrófono retráctil',
          price: 699000,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.6,
          reviews: 1156,
          brand: 'SteelSeries',
          category: 'Audio Gaming',
          tags: ['Inalámbrico', 'Hi-Res', 'Micrófono'],
          inStock: true,
          featured: false,
        },
        {
          id: '6',
          name: 'Elgato Stream Deck XL',
          description: 'Controlador de streaming con 32 teclas LCD personalizables para creadores de contenido',
          price: 549000,
          image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          reviews: 789,
          brand: 'Elgato',
          category: 'Streaming',
          tags: ['Streaming', 'Creadores', 'LCD'],
          inStock: true,
          featured: true,
        },
      ]
    },
    computacion: {
      title: 'Computación',
      description: 'Laptops, desktops y equipos de computación para profesionales y entusiastas',
      products: [
        {
          id: '7',
          name: 'MacBook Pro 16" M3 Max',
          description: 'Laptop profesional con chip M3 Max, 36GB RAM y pantalla Liquid Retina XDR',
          price: 8999000,
          originalPrice: 9499000,
          image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.9,
          reviews: 2341,
          brand: 'Apple',
          category: 'Laptops',
          tags: ['M3 Max', 'Profesional', 'Retina XDR'],
          inStock: true,
          featured: true,
        },
        {
          id: '8',
          name: 'Dell XPS 15 OLED',
          description: 'Ultrabook premium con pantalla OLED 4K, Intel Core i9 y NVIDIA RTX 4070',
          price: 4599000,
          image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.7,
          reviews: 1876,
          brand: 'Dell',
          category: 'Laptops',
          tags: ['OLED', 'Core i9', 'RTX 4070'],
          inStock: true,
          featured: true,
        },
        {
          id: '9',
          name: 'Intel Core i9-14900K',
          description: 'Procesador de 14va generación con 24 núcleos y frecuencia hasta 6.0 GHz',
          price: 1299000,
          image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.8,
          reviews: 967,
          brand: 'Intel',
          category: 'Procesadores',
          tags: ['14va Gen', '24 Núcleos', '6.0 GHz'],
          inStock: true,
          featured: false,
        },
        {
          id: '10',
          name: 'ASUS ROG Strix Z790-E Gaming',
          description: 'Tarjeta madre premium con soporte DDR5, PCIe 5.0 y conectividad WiFi 6E',
          price: 899000,
          originalPrice: 999000,
          image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.6,
          reviews: 543,
          brand: 'ASUS',
          category: 'Tarjetas Madre',
          tags: ['DDR5', 'PCIe 5.0', 'WiFi 6E'],
          inStock: true,
          featured: false,
        },
        {
          id: '11',
          name: 'Corsair Dominator Platinum RGB 32GB DDR5',
          description: 'Memoria RAM DDR5-5600 de alto rendimiento con iluminación RGB premium',
          price: 649000,
          image: 'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.7,
          reviews: 721,
          brand: 'Corsair',
          category: 'Memorias RAM',
          tags: ['DDR5', 'RGB', 'Alto Rendimiento'],
          inStock: true,
          featured: true,
        },
        {
          id: '12',
          name: 'Samsung 990 PRO 2TB NVMe SSD',
          description: 'SSD NVMe PCIe 4.0 con velocidades hasta 7,450 MB/s para máximo rendimiento',
          price: 459000,
          originalPrice: 529000,
          image: 'https://images.pexels.com/photos/2582926/pexels-photo-2582926.jpeg?auto=compress&cs=tinysrgb&w=600',
          rating: 4.9,
          reviews: 1432,
          brand: 'Samsung',
          category: 'Almacenamiento',
          tags: ['NVMe', 'PCIe 4.0', '7450 MB/s'],
          inStock: true,
          featured: true,
        },
      ]
    }
  };

  useEffect(() => {
    loadProducts();
  }, [slug]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedBrands, priceRange, sortBy]);

  const loadProducts = async () => {
    setLoading(true);
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const categoryProducts = categoryData[slug as keyof typeof categoryData]?.products || [];
    setProducts(categoryProducts);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtro por marcas
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filtro por precio
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Ordenamiento
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

  const categoryInfo = categoryData[slug as keyof typeof categoryData];
  const brands = [...new Set(products.map(p => p.brand))];

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Categoría no encontrada</h1>
          <p className="text-accent">La categoría que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={15} className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gradient mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-accent max-w-3xl mx-auto">{categoryInfo.description}</p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Badge className="bg-primary/10 text-primary px-4 py-2">
              {filteredProducts.length} productos disponibles
            </Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 py-2">
              Envío gratis disponible
            </Badge>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 rounded-xl border-2">
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
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-12 w-12 rounded-xl"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-12 w-12 rounded-xl"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="h-12 px-6 rounded-xl border-2 lg:hidden"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl border border-gray-200/50 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Filtros</h3>
                <Filter className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Rango de Precio</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    step={50000}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-accent">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Marcas</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
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
                        <label htmlFor={brand} className="text-sm text-accent cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Filtros Rápidos</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setProducts(products.filter(p => p.featured))}
                    >
                      Destacados
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setProducts(products.filter(p => p.originalPrice))}
                    >
                      En Oferta
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setProducts(products.filter(p => p.rating >= 4.5))}
                    >
                      Mejor Calificados
                    </Badge>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrands([]);
                    setPriceRange([0, 10000000]);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-0 z-50 lg:hidden"
              >
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
                <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Filtros</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-8">
                    {/* Same filter content as desktop */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Rango de Precio</h4>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000000}
                        step={50000}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-accent">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Marcas</h4>
                      <div className="space-y-3">
                        {brands.map(brand => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedBrands([...selectedBrands, brand]);
                                } else {
                                  setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                }
                              }}
                            />
                            <label htmlFor={`mobile-${brand}`} className="text-sm text-accent cursor-pointer">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBrands([]);
                        setPriceRange([0, 10000000]);
                        setShowMobileFilters(false);
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
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
                transition={{ delay: 0.4 }}
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group card-3d bg-white rounded-3xl overflow-hidden border border-gray-200/50 hover:border-primary/30 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-64 h-64' : 'aspect-square'
                    }`}>
                      <ProductShowcase
                        image={product.image}
                        title={product.name}
                        className="w-full h-full"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.featured && (
                          <Badge className="bg-secondary text-secondary-foreground font-bold">
                            Destacado
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge className="bg-red-500 text-white font-bold">
                            -{calculateDiscount(product.price, product.originalPrice)}%
                          </Badge>
                        )}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-3">
                        <Button size="sm" variant="secondary" className="rounded-full p-3 bg-white/90 backdrop-blur-sm">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full p-3 bg-white/90 backdrop-blur-sm">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Rating and Brand */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="text-sm text-accent ml-2">
                            ({product.reviews})
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {product.brand}
                        </Badge>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-accent line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-accent line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-green-600 font-medium">
                          Hasta 12 cuotas sin interés
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 gradient-primary hover:scale-105 transition-all duration-300 rounded-xl py-3"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Agregar al Carrito
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
                className="text-center py-20"
              >
                <h3 className="text-2xl font-bold text-accent mb-4">No se encontraron productos</h3>
                <p className="text-accent/80 mb-6">Intenta ajustar los filtros o términos de búsqueda</p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrands([]);
                    setPriceRange([0, 10000000]);
                  }}
                  className="gradient-primary"
                >
                  Limpiar Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}