'use client';

import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Eye, Zap, TrendingUp, Crown, Flame, Gift, Sparkles, Award, Rocket, Cpu, Smartphone, Monitor, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { shopifyService, ShopifyProduct } from '@/lib/shopify';
import dynamic from 'next/dynamic';

const ProductShowcase = dynamic(() => import('@/components/3d/product-showcase').then(mod => ({ default: mod.ProductShowcase })), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('destacados');
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { 
      id: 'destacados', 
      label: 'Élite Tech', 
      icon: Crown, 
      color: 'from-deep-blue to-turquesa',
      description: 'Lo más exclusivo del mercado tech'
    },
    { 
      id: 'ofertas', 
      label: 'Ofertas Premium', 
      icon: Zap, 
      color: 'from-turquesa to-cool-grey',
      description: 'Ofertas que no puedes dejar pasar'
    },
    { 
      id: 'nuevos', 
      label: 'Recién Llegados', 
      icon: Rocket, 
      color: 'from-cool-grey to-deep-blue',
      description: 'Lo último en tecnología'
    },
    { 
      id: 'premium', 
      label: 'Premium', 
      icon: Award, 
      color: 'from-deep-blue via-turquesa to-cool-grey',
      description: 'Tecnología de vanguardia'
    },
  ];

  // Mock products with Chilean pricing
  const mockProducts = {
    destacados: [
      {
        id: '1',
        title: 'NVIDIA GeForce RTX 4090 Gaming Beast',
        description: 'La experiencia gaming definitiva en 4K con Ray Tracing completo y DLSS 3.0',
        handle: 'rtx-4090',
        images: [{ 
          id: '1', 
          src: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'RTX 4090'
        }],
        variants: [{
          id: 'var1',
          title: 'Default',
          price: { amount: '899990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '1099990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '899990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '899990', currencyCode: 'CLP' }
        },
        tags: ['gaming', 'graphics', 'rtx', 'bestseller', 'elite'],
        productType: 'Graphics Card',
        vendor: 'NVIDIA',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Gaming',
        icon: Cpu,
        stats: { sales: '1.2K', rating: 4.9, reviews: 1247 }
      },
      {
        id: '2',
        title: 'MacBook Pro M3 Max Titanium Edition',
        description: 'Potencia profesional redefinida con el chip M3 Max y pantalla Liquid Retina XDR',
        handle: 'macbook-pro-m3',
        images: [{ 
          id: '2', 
          src: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'MacBook Pro'
        }],
        variants: [{
          id: 'var2',
          title: 'Default',
          price: { amount: '1899990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '2199990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '1899990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '1899990', currencyCode: 'CLP' }
        },
        tags: ['laptop', 'apple', 'professional', 'bestseller', 'elite'],
        productType: 'Laptop',
        vendor: 'Apple',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Computing',
        icon: Monitor,
        stats: { sales: '2.3K', rating: 4.9, reviews: 1923 }
      },
      {
        id: '3',
        title: 'iPhone 15 Pro Max Titanium',
        description: 'El smartphone más avanzado con chip A17 Pro y cámaras que capturan la realidad',
        handle: 'iphone-15-pro-max',
        images: [{ 
          id: '3', 
          src: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'iPhone 15 Pro Max'
        }],
        variants: [{
          id: 'var3',
          title: 'Default',
          price: { amount: '1299990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '1499990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '1299990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '1299990', currencyCode: 'CLP' }
        },
        tags: ['smartphone', 'apple', 'premium', 'bestseller', 'elite'],
        productType: 'Smartphone',
        vendor: 'Apple',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Mobile',
        icon: Smartphone,
        stats: { sales: '5.1K', rating: 4.9, reviews: 2847 }
      },
      {
        id: '4',
        title: 'Samsung Galaxy S24 Ultra AI Revolution',
        description: 'Inteligencia artificial integrada con S Pen y cámaras profesionales de 200MP',
        handle: 'galaxy-s24-ultra',
        images: [{ 
          id: '4', 
          src: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'Galaxy S24 Ultra'
        }],
        variants: [{
          id: 'var4',
          title: 'Default',
          price: { amount: '1199990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '1399990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '1199990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '1199990', currencyCode: 'CLP' }
        },
        tags: ['smartphone', 'samsung', 'android', 'bestseller', 'ai'],
        productType: 'Smartphone',
        vendor: 'Samsung',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Mobile',
        icon: Smartphone,
        stats: { sales: '3.8K', rating: 4.8, reviews: 1923 }
      }
    ],
    ofertas: [
      {
        id: '5',
        title: 'Sony WH-1000XM5 Premium Audio',
        description: 'Audífonos premium con cancelación de ruido avanzada y 30h de batería',
        handle: 'sony-wh1000xm5',
        images: [{ 
          id: '5', 
          src: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'Sony WH-1000XM5'
        }],
        variants: [{
          id: 'var5',
          title: 'Default',
          price: { amount: '299990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '399990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '299990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '299990', currencyCode: 'CLP' }
        },
        tags: ['audio', 'wireless', 'noise-cancelling', 'sale', 'premium'],
        productType: 'Headphones',
        vendor: 'Sony',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Audio',
        icon: Headphones,
        stats: { sales: '987', rating: 4.7, reviews: 987 }
      }
    ],
    nuevos: [
      {
        id: '7',
        title: 'Nothing Phone (2a) Transparent Future',
        description: 'Smartphone único con Glyph Interface y diseño transparente innovador',
        handle: 'nothing-phone-2a',
        images: [{ 
          id: '7', 
          src: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'Nothing Phone 2a'
        }],
        variants: [{
          id: 'var7',
          title: 'Default',
          price: { amount: '399990', currencyCode: 'CLP' },
          compareAtPrice: { amount: '449990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '399990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '399990', currencyCode: 'CLP' }
        },
        tags: ['smartphone', 'nothing', 'glyph', 'new', 'future'],
        productType: 'Smartphone',
        vendor: 'Nothing',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'Mobile',
        icon: Smartphone,
        stats: { sales: '621', rating: 4.4, reviews: 621 }
      }
    ],
    premium: [
      {
        id: '8',
        title: 'Apple Vision Pro Spatial Reality',
        description: 'Computadora espacial que redefine la realidad con visionOS y tecnología avanzada',
        handle: 'apple-vision-pro',
        images: [{ 
          id: '8', 
          src: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
          altText: 'Apple Vision Pro'
        }],
        variants: [{
          id: 'var8',
          title: 'Default',
          price: { amount: '3999990', currencyCode: 'CLP' },
          availableForSale: true,
          selectedOptions: []
        }],
        priceRange: {
          minVariantPrice: { amount: '3999990', currencyCode: 'CLP' },
          maxVariantPrice: { amount: '3999990', currencyCode: 'CLP' }
        },
        tags: ['vr', 'apple', 'premium', 'revolutionary', 'spatial'],
        productType: 'VR Headset',
        vendor: 'Apple',
        availableForSale: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        category: 'VR',
        icon: Eye,
        stats: { sales: '156', rating: 5.0, reviews: 89 }
      }
    ]
  };

  useEffect(() => {
    loadProducts();
  }, [activeTab]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productData = mockProducts[activeTab as keyof typeof mockProducts] || mockProducts.destacados;
      setProducts(productData as ShopifyProduct[]);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.variants[0];
    if (!variant) return;

    try {
      await addItem({
        id: product.id,
        variantId: variant.id,
        name: product.title,
        price: parseFloat(variant.price.amount),
        quantity: 1,
        image: product.images[0]?.src || '',
        compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const formatPrice = (amount: string, currencyCode: string = 'CLP') => {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: string, compareAtPrice?: string) => {
    if (!compareAtPrice) return 0;
    const current = parseFloat(price);
    const original = parseFloat(compareAtPrice);
    return Math.round(((original - current) / original) * 100);
  };

  const getProductBadge = (product: ShopifyProduct & { stats?: any }, tabId: string) => {
    if (tabId === 'ofertas' && product.variants[0]?.compareAtPrice) {
      const discount = calculateDiscount(product.variants[0].price.amount, product.variants[0].compareAtPrice.amount);
      return { text: `-${discount}%`, color: 'bg-gradient-to-r from-turquesa to-deep-blue', icon: Flame };
    }
    if (tabId === 'nuevos') return { text: 'NUEVO', color: 'bg-gradient-to-r from-deep-blue to-turquesa', icon: Sparkles };
    if (tabId === 'premium') return { text: 'PREMIUM', color: 'bg-gradient-to-r from-cool-grey to-deep-blue', icon: Crown };
    if (product.tags.includes('bestseller')) return { text: 'BESTSELLER', color: 'bg-gradient-to-r from-turquesa to-cool-grey', icon: TrendingUp };
    return null;
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(4,68,172,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(4,172,212,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(4,68,172,0.02)_49%,rgba(4,68,172,0.02)_51%,transparent_52%)] bg-[length:30px_30px]" />
      </div>
      <FloatingElements count={15} className="opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full mb-6 sm:mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="w-2 h-2 bg-gradient-to-r from-deep-blue to-turquesa rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-deep-blue font-bold text-sm sm:text-base">Productos Élite</span>
            <Sparkles className="w-4 h-4 text-turquesa" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-deep-blue via-turquesa to-cool-grey bg-clip-text text-transparent">
              Lo Mejor en Tecnología
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-cool-grey max-w-4xl mx-auto leading-relaxed font-medium px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Descubre nuestra colección curada de los productos más revolucionarios del mercado tecnológico. 
            Cada producto ha sido seleccionado por nuestros expertos para ofrecerte la experiencia definitiva.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            >
              <Button
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-xl sm:rounded-2xl transition-all text-sm sm:text-base lg:text-lg font-bold overflow-hidden ${
                  activeTab === tab.id 
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105 premium-glow` 
                    : 'btn-secondary hover:scale-105 card-3d border-2'
                }`}
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <div className="text-center sm:text-left">
                    <div className="font-black">{tab.label}</div>
                    <div className={`text-xs font-medium hidden sm:block ${activeTab === tab.id ? 'text-white/80' : 'text-cool-grey'}`}>
                      {tab.description}
                    </div>
                  </div>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Holographic effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20 sm:py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="loading-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-deep-blue" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
            >
              {products.map((product, index) => {
                const badge = getProductBadge(product, activeTab);
                const productWithStats = product as ShopifyProduct & { stats?: any, category?: string, icon?: any };
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group perspective-1000"
                  >
                    <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-rotate-1">
                      {/* Card Container */}
                      <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/50 hover:border-turquesa/50 transition-all duration-500 shadow-lg hover:shadow-2xl">
                        
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden">
                          <ProductShowcase
                            image={product.images[0]?.src || ''}
                            title={product.title}
                            className="w-full h-full"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 flex flex-col gap-2 sm:gap-3">
                            {badge && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                              >
                                <Badge className={`${badge.color} text-white font-black px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg premium-glow`}>
                                  <badge.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                  {badge.text}
                                </Badge>
                              </motion.div>
                            )}
                            {product.tags.includes('bestseller') && (
                              <Badge className="bg-gradient-to-r from-turquesa to-deep-blue text-white font-black px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-xl sm:rounded-2xl">
                                <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Bestseller
                              </Badge>
                            )}
                          </div>

                          {/* Category Icon */}
                          <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center">
                              {productWithStats.icon && <productWithStats.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                            </div>
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex space-x-3 sm:space-x-4">
                            <motion.div
                              whileHover={{ scale: 1.2, rotateY: 180 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button size="sm" variant="secondary" className="rounded-full p-3 sm:p-4 glass-card shadow-lg backdrop-blur-md">
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.2, rotateY: 180 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button size="sm" variant="secondary" className="rounded-full p-3 sm:p-4 glass-card shadow-lg backdrop-blur-md">
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                              </Button>
                            </motion.div>
                          </div>

                          {/* Holographic Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/10 via-transparent to-turquesa/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-gradient-to-b from-white to-gray-50/50">
                          {/* Rating */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                                >
                                  <Star 
                                    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                                      i < 4 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                </motion.div>
                              ))}
                              <span className="text-xs sm:text-sm text-cool-grey ml-1 sm:ml-2 font-bold">
                                ({productWithStats.stats?.rating || 4.9})
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs sm:text-sm bg-deep-blue/10 text-deep-blue font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-deep-blue/20">
                              {product.vendor}
                            </Badge>
                          </div>

                          {/* Title & Description */}
                          <div className="space-y-2 sm:space-y-3">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-800 group-hover:text-deep-blue transition-colors line-clamp-2 leading-tight">
                              {product.title}
                            </h3>
                            <p className="text-cool-grey line-clamp-2 leading-relaxed font-medium text-sm sm:text-base">
                              {product.description}
                            </p>
                          </div>

                          {/* Stats */}
                          {productWithStats.stats && (
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-turquesa" />
                                <span className="font-bold text-cool-grey">{productWithStats.stats.sales} ventas</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                                <span className="font-bold text-cool-grey">{productWithStats.stats.reviews} reviews</span>
                              </div>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {product.tags.slice(0, 3).map((tag, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, rotateZ: 5 }}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs bg-gradient-to-r from-turquesa/10 to-deep-blue/10 text-turquesa px-2 py-1 sm:px-3 sm:py-1 font-bold rounded-full border border-turquesa/20"
                                >
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>

                          {/* Pricing */}
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-deep-blue">
                                {formatPrice(product.variants[0]?.price.amount || '0')}
                              </span>
                              {product.variants[0]?.compareAtPrice && (
                                <span className="text-base sm:text-lg lg:text-xl text-cool-grey line-through font-semibold">
                                  {formatPrice(product.variants[0].compareAtPrice.amount)}
                                </span>
                              )}
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-turquesa" />
                                <span className="text-xs sm:text-sm text-turquesa font-bold">
                                  Hasta 24 cuotas sin interés
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-cool-grey" />
                                <span className="text-xs sm:text-sm text-cool-grey font-bold">
                                  Envío gratis • Garantía oficial
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                            <motion.div 
                              className="flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-gradient-to-r from-deep-blue to-turquesa hover:from-turquesa hover:to-deep-blue text-white font-black py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                              >
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                                Agregar al Carrito
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotateY: 180 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="btn-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-turquesa/30 hover:border-turquesa"
                              >
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More */}
        <motion.div 
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/20 via-turquesa/20 to-cool-grey/20 rounded-2xl sm:rounded-3xl blur-xl" />
            <div className="relative glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-deep-blue via-turquesa to-cool-grey bg-clip-text text-transparent mb-3 sm:mb-4">
                ¿Quieres ver más productos increíbles?
              </h3>
              <p className="text-cool-grey mb-4 sm:mb-6 font-medium text-sm sm:text-base">
                Explora nuestra colección completa de productos tecnológicos
              </p>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  Explorar Más Productos
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}