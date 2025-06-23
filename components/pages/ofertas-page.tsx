'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, ShoppingCart, Heart, Eye, Clock, Flame, Gift, TrendingUp, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';

const ProductShowcase = dynamic(() => import('@/components/3d/product-showcase').then(mod => ({ default: mod.ProductShowcase })), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

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
  const [products, setProducts] = useState<OfferProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flash');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const tabs = [
    { id: 'flash', label: 'Ofertas Flash', icon: Zap, color: 'from-red-500 to-orange-500' },
    { id: 'daily', label: 'Oferta del Día', icon: Flame, color: 'from-orange-500 to-yellow-500' },
    { id: 'weekly', label: 'Ofertas Semanales', icon: TrendingUp, color: 'from-blue-500 to-purple-500' },
    { id: 'clearance', label: 'Liquidación', icon: Gift, color: 'from-green-500 to-teal-500' },
  ];

  const mockProducts: OfferProduct[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      description: 'El iPhone más avanzado con chip A17 Pro y cámaras profesionales',
      price: 4499000,
      originalPrice: 5499000,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 2847,
      brand: 'Apple',
      category: 'Smartphones',
      tags: ['5G', 'Titanio', 'Pro'],
      inStock: true,
      discount: 18,
      timeLeft: '02:45:30',
      offerType: 'flash',
      soldCount: 127,
      totalStock: 200
    },
    {
      id: '2',
      name: 'NVIDIA RTX 4090 Gaming X',
      description: 'Tarjeta gráfica gaming de alta gama para 4K y ray tracing',
      price: 2599000,
      originalPrice: 3199000,
      image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 1456,
      brand: 'NVIDIA',
      category: 'Gaming',
      tags: ['RTX', '4K Gaming', 'Ray Tracing'],
      inStock: true,
      discount: 19,
      timeLeft: '02:45:30',
      offerType: 'flash',
      soldCount: 89,
      totalStock: 150
    },
    {
      id: '3',
      name: 'MacBook Pro M3 14" 512GB',
      description: 'Laptop profesional con chip M3 Pro y pantalla Liquid Retina',
      price: 5299000,
      originalPrice: 6499000,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 1923,
      brand: 'Apple',
      category: 'Laptops',
      tags: ['M3 Pro', 'Profesional', 'Retina'],
      inStock: true,
      discount: 18,
      timeLeft: '1 día',
      offerType: 'daily',
      soldCount: 234,
      totalStock: 300
    },
    {
      id: '4',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone premium con S Pen y Galaxy AI integrado',
      price: 3599000,
      originalPrice: 4299000,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 1654,
      brand: 'Samsung',
      category: 'Smartphones',
      tags: ['5G', 'S Pen', 'Galaxy AI'],
      inStock: true,
      discount: 16,
      timeLeft: '3 días',
      offerType: 'weekly',
      soldCount: 156,
      totalStock: 250
    },
    {
      id: '5',
      name: 'Sony WH-1000XM5 Wireless',
      description: 'Audífonos premium con cancelación de ruido líder en la industria',
      price: 899000,
      originalPrice: 1299000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviews: 987,
      brand: 'Sony',
      category: 'Audio',
      tags: ['Wireless', 'Noise Cancelling', 'Premium'],
      inStock: true,
      discount: 31,
      timeLeft: 'Últimas unidades',
      offerType: 'clearance',
      soldCount: 445,
      totalStock: 500
    },
    {
      id: '6',
      name: 'iPad Pro M2 12.9" 256GB',
      description: 'Tablet profesional con chip M2 y pantalla Liquid Retina XDR',
      price: 3999000,
      originalPrice: 4799000,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 1234,
      brand: 'Apple',
      category: 'Tablets',
      tags: ['M2', 'Pro', 'Liquid Retina XDR'],
      inStock: true,
      discount: 17,
      timeLeft: '5 días',
      offerType: 'weekly',
      soldCount: 178,
      totalStock: 280
    }
  ];

  useEffect(() => {
    loadProducts();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProducts(mockProducts);
    setLoading(false);
  };

  const handleAddToCart = async (product: OfferProduct) => {
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

  const getProgressPercentage = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  const filteredProducts = products.filter(product => product.offerType === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={25} className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-7xl font-black text-gradient">Ofertas Especiales</h1>
          </div>
          <p className="text-2xl text-accent max-w-4xl mx-auto leading-relaxed font-medium mb-8">
            Descuentos increíbles en los mejores productos tecnológicos. 
            Ofertas limitadas, stock limitado. ¡No te quedes sin el tuyo!
          </p>
          
          {/* Flash Sale Timer */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center space-x-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-12 py-6 rounded-3xl shadow-2xl"
          >
            <Timer className="w-8 h-8" />
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider">Oferta Flash Termina En</p>
              <div className="flex items-center space-x-4 text-3xl font-black">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-10 py-6 rounded-3xl transition-all duration-400 text-lg font-black ${
                  activeTab === tab.id 
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105 neon-glow` 
                    : 'hover:scale-105 border-3 border-primary text-primary hover:bg-primary hover:text-white cyber-border'
                }`}
              >
                <tab.icon className="w-6 h-6 mr-3" />
                {tab.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group card-3d bg-white rounded-3xl overflow-hidden border border-gray-200/60 hover:border-primary/40 relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <Badge className="bg-red-500 text-white font-black px-6 py-3 text-lg rounded-2xl shadow-lg">
                      -{product.discount}%
                    </Badge>
                  </div>

                  {/* Timer Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <Badge className="bg-black/80 text-white font-bold px-4 py-2 rounded-xl backdrop-blur-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {product.timeLeft}
                    </Badge>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <ProductShowcase
                      image={product.image}
                      title={product.name}
                      className="w-full h-full"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 flex space-x-4">
                      <Button size="sm" variant="secondary" className="rounded-full p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                        <Eye className="w-6 h-6" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                        <Heart className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Rating and Brand */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-accent ml-2 font-bold">
                          ({product.reviews})
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-sm bg-primary/10 text-primary font-bold px-3 py-1">
                        {product.brand}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-accent line-clamp-2 leading-relaxed font-medium">
                        {product.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-accent">Vendidos: {product.soldCount}</span>
                        <span className="text-accent">Stock: {product.totalStock - product.soldCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(product.soldCount, product.totalStock)}%` }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-primary/10 text-primary px-3 py-1 font-bold"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-black text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xl text-accent line-through font-semibold">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-green-600">
                          Ahorras: {formatPrice(product.originalPrice - product.price)}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 font-bold">
                        Envío gratis • Garantía oficial incluida
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 gradient-primary hover:scale-105 transition-all duration-400 rounded-2xl py-4 font-black text-lg"
                      >
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Comprar Ahora
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20 p-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl"
        >
          <h2 className="text-4xl font-black text-gradient mb-6">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-xl text-accent mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestras alertas de ofertas y sé el primero en conocer 
            los mejores descuentos en tecnología.
          </p>
          <Button 
            size="lg" 
            className="gradient-primary font-black px-12 py-6 rounded-3xl text-xl hover:scale-105 transition-all duration-400"
          >
            <Zap className="w-6 h-6 mr-3" />
            Suscribirse a Ofertas
          </Button>
        </motion.div>
      </div>
    </div>
  );
}