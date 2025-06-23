'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Zap, Truck, Shield, Play, ArrowRight, Sparkles, CheckCircle, Clock, Award, Crown, Gift, TrendingUp, Rocket, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { DiscountWheel } from '@/components/ui/discount-wheel';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });
const ProductShowcase = dynamic(() => import('@/components/3d/product-showcase').then(mod => ({ default: mod.ProductShowcase })), { ssr: false });

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDiscountWheel, setShowDiscountWheel] = useState(false);
  const [wonDiscount, setWonDiscount] = useState<{discount: number, code: string} | null>(null);
  
  const slides = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max',
      subtitle: 'Titanio. Tan Pro. Tan Max.',
      description: 'El iPhone más avanzado jamás creado. Con chip A17 Pro, cámaras profesionales y diseño en titanio que redefine la innovación móvil para Chile.',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Descubrir iPhone 15 Pro',
      ctaSecondary: 'Ver Demo 360°',
      price: 'Desde $1.299.990',
      originalPrice: '$1.499.990',
      discount: '25% OFF',
      badge: 'Lanzamiento Chile',
      color: 'from-deep-blue via-turquesa to-deep-blue',
      features: ['Chip A17 Pro', 'Titanio Premium', 'Cámara 48MP Pro', 'USB-C'],
      benefits: [
        { icon: CheckCircle, text: 'Garantía Premium 3 años', color: 'text-turquesa' },
        { icon: Truck, text: 'Envío Express 24h', color: 'text-deep-blue' },
        { icon: Award, text: 'Setup Profesional Gratis', color: 'text-cool-grey' }
      ]
    },
    {
      id: 2,
      title: 'RTX 4090 Gaming Beast',
      subtitle: 'El poder absoluto del gaming',
      description: 'Experimenta gaming en 4K con ray tracing completo. La tarjeta gráfica más potente del mundo para los gamers chilenos más exigentes.',
      image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Ver Gaming Setup',
      ctaSecondary: 'Comparar Modelos',
      price: 'Desde $2.899.990',
      originalPrice: '$3.299.990',
      discount: '18% OFF',
      badge: 'Más Vendido Chile',
      color: 'from-turquesa via-deep-blue to-turquesa',
      features: ['24GB GDDR6X', '4K Gaming 120fps', 'Ray Tracing RTX', 'DLSS 3.0'],
      benefits: [
        { icon: Zap, text: '4K 120fps Garantizado', color: 'text-turquesa' },
        { icon: Shield, text: 'Garantía Gaming 5 años', color: 'text-deep-blue' },
        { icon: Clock, text: 'Stock Limitado Chile', color: 'text-cool-grey' }
      ]
    },
    {
      id: 3,
      title: 'MacBook Pro M3 Max',
      subtitle: 'Superpotencia. Superportátil.',
      description: 'Rendimiento revolucionario con el chip M3 Max. Perfecto para creativos, desarrolladores y profesionales chilenos que no aceptan límites.',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Explorar MacBook Pro',
      ctaSecondary: 'Configurar Pro',
      price: 'Desde $5.999.990',
      originalPrice: '$6.499.990',
      discount: 'Oferta Chile',
      badge: 'Pro Exclusivo',
      color: 'from-cool-grey via-turquesa to-deep-blue',
      features: ['Chip M3 Max', '22h Batería', 'Liquid Retina XDR', 'Thunderbolt 5'],
      benefits: [
        { icon: CheckCircle, text: 'Financiamiento 0% Chile', color: 'text-turquesa' },
        { icon: Award, text: 'Setup Creativo Gratis', color: 'text-deep-blue' },
        { icon: Shield, text: 'AppleCare+ Incluido', color: 'text-cool-grey' }
      ]
    },
    {
      id: 4,
      title: 'Samsung Galaxy S24 Ultra',
      subtitle: 'Galaxy AI. Cámara Pro. Productividad.',
      description: 'El smartphone Android más avanzado con Galaxy AI, S Pen integrado y cámaras profesionales que capturan la belleza de Chile perfectamente.',
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'Conocer Galaxy S24',
      ctaSecondary: 'Ver Galaxy AI',
      price: 'Desde $3.999.990',
      originalPrice: '$4.299.990',
      discount: 'Pre-orden Chile',
      badge: 'Galaxy AI Chile',
      color: 'from-deep-blue via-cool-grey to-turquesa',
      features: ['Galaxy AI', 'S Pen Pro', 'Zoom 200x', 'Titanio'],
      benefits: [
        { icon: Brain, text: 'Galaxy AI Gratis', color: 'text-turquesa' },
        { icon: CheckCircle, text: 'Trade-in Chile', color: 'text-deep-blue' },
        { icon: Gift, text: 'Galaxy Buds Gratis', color: 'text-cool-grey' }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDiscountWin = (discount: number, code: string) => {
    setWonDiscount({ discount, code });
    setShowDiscountWheel(false);
    // Aquí podrías guardar el cupón en localStorage o enviarlo al backend
    localStorage.setItem('discountCode', JSON.stringify({ discount, code, expires: Date.now() + 24 * 60 * 60 * 1000 }));
  };

  return (
    <>
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-gray-50/10">
        {/* Background Effects Premium */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(4,68,172,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(4,172,212,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(4,68,172,0.01)_49%,rgba(4,68,172,0.01)_51%,transparent_52%)] bg-[length:60px_60px]" />
        </div>
        <FloatingElements count={25} className="opacity-20" />
        
        {/* Discount Wheel Trigger */}
        <motion.button
          onClick={() => setShowDiscountWheel(true)}
          className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 bg-gradient-to-r from-turquesa to-deep-blue text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 3 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Gift className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        </motion.button>
        
        <div className="relative min-h-screen">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center gap-8 lg:gap-16">
                    {/* Content Premium */}
                    <motion.div 
                      className="flex flex-col justify-center space-y-6 lg:space-y-10 py-12 lg:py-0 relative z-10 order-2 lg:order-1"
                      initial={{ x: -80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="space-y-6 lg:space-y-8">
                        {/* Badges Premium */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                          >
                            <Badge className={`bg-gradient-to-r ${slide.color} text-white px-6 py-3 text-base font-black rounded-full shadow-2xl`}>
                              <Crown className="w-4 h-4 mr-2" />
                              {slide.badge}
                            </Badge>
                          </motion.div>
                          <div className="flex items-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                              >
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              </motion.div>
                            ))}
                            <span className="text-cool-grey font-bold ml-2">
                              (4.9) • 50K+ reviews Chile
                            </span>
                          </div>
                        </div>
                        
                        {/* Title Premium */}
                        <div className="space-y-4">
                          <motion.h1 
                            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                          >
                            <span className={`bg-gradient-to-r ${slide.color} bg-clip-text text-transparent`}>
                              {slide.title}
                            </span>
                          </motion.h1>
                          <motion.h2 
                            className="text-xl sm:text-2xl lg:text-3xl text-cool-grey font-bold"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                          >
                            {slide.subtitle}
                          </motion.h2>
                          <motion.p 
                            className="text-base sm:text-lg lg:text-xl text-cool-grey/90 max-w-2xl leading-relaxed font-medium"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                          >
                            {slide.description}
                          </motion.p>
                        </div>

                        {/* Features Premium */}
                        <motion.div 
                          className="flex flex-wrap gap-3"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1, duration: 0.8 }}
                        >
                          {slide.features.map((feature, idx) => (
                            <motion.div 
                              key={idx} 
                              className="bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-turquesa/20"
                              whileHover={{ y: -3 }}
                            >
                              <span className="font-black text-deep-blue text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                        
                        {/* Pricing Premium */}
                        <motion.div 
                          className="space-y-4"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-deep-blue">
                              {slide.price}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-lg sm:text-xl lg:text-2xl text-cool-grey line-through font-bold">
                                {slide.originalPrice}
                              </span>
                              <Badge className="bg-gradient-to-r from-turquesa to-deep-blue text-white text-sm font-black px-4 py-2 rounded-full">
                                {slide.discount}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                            <div className="flex items-center space-x-2 text-turquesa font-bold">
                              <Zap className="w-4 h-4" />
                              <span>💳 Hasta 24 cuotas sin interés</span>
                            </div>
                            <div className="flex items-center space-x-2 text-deep-blue font-bold">
                              <Truck className="w-4 h-4" />
                              <span>🚚 Envío gratis a todo Chile</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Action Buttons Premium */}
                        <motion.div 
                          className="flex flex-col sm:flex-row gap-4 pt-4"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                        >
                          <Button 
                            size="lg" 
                            className={`bg-gradient-to-r ${slide.color} text-white px-8 py-5 rounded-2xl hover:scale-105 transition-all shadow-2xl relative overflow-hidden group font-black text-lg flex-1 sm:flex-none`}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {slide.cta}
                              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="px-8 py-5 rounded-2xl font-black text-lg border-3 border-deep-blue/30 hover:border-deep-blue hover:bg-deep-blue/10 transition-all duration-300 flex-1 sm:flex-none"
                          >
                            <Play className="w-5 h-5 mr-3" />
                            {slide.ctaSecondary}
                          </Button>
                        </motion.div>

                        {/* Benefits Premium */}
                        <motion.div 
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6"
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.6, duration: 0.8 }}
                        >
                          {slide.benefits.map((benefit, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-turquesa/20"
                              whileHover={{ y: -3 }}
                            >
                              <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                              <div>
                                <p className="font-black text-deep-blue text-sm">{benefit.text}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* 3D Product Showcase Premium */}
                    <motion.div 
                      className="relative flex items-center justify-center p-8 order-1 lg:order-2"
                      initial={{ x: 80, opacity: 0, scale: 0.9 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="relative w-full max-w-2xl">
                        <ProductShowcase
                          image={slide.image}
                          title={slide.title}
                          className="w-full h-80 sm:h-96 lg:h-[32rem] xl:h-[36rem]"
                        />
                        
                        {/* Enhanced floating elements */}
                        <motion.div
                          className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-turquesa/20"
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1, type: "spring" }}
                        >
                          <div className="text-center">
                            <p className="text-sm font-bold text-cool-grey">Precio Chile</p>
                            <p className="text-xl font-black text-deep-blue">{slide.price}</p>
                            <p className="text-sm text-turquesa font-bold">{slide.discount}</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl border border-turquesa/20"
                          initial={{ scale: 0, y: 30 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ delay: 1.2, type: "spring" }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-turquesa rounded-full animate-pulse" />
                            <span className="text-sm font-black text-deep-blue">Stock Chile Disponible</span>
                          </div>
                        </motion.div>

                        {/* Trending indicator */}
                        <motion.div
                          className="absolute top-6 left-6 bg-gradient-to-r from-turquesa to-deep-blue text-white rounded-2xl px-4 py-3 shadow-2xl"
                          initial={{ scale: 0, x: -30 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ delay: 1.4, type: "spring" }}
                        >
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-black">#1 en Chile</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Enhanced Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-deep-blue to-turquesa scale-125 shadow-2xl' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          
          {/* Enhanced Arrow Controls */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white text-deep-blue rounded-2xl p-4 shadow-2xl transition-all hover:scale-110 z-20 border border-turquesa/20"
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white text-deep-blue rounded-2xl p-4 shadow-2xl transition-all hover:scale-110 z-20 border border-turquesa/20"
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      {/* Discount Wheel Modal */}
      <DiscountWheel
        isOpen={showDiscountWheel}
        onClose={() => setShowDiscountWheel(false)}
        onWin={handleDiscountWin}
      />

      {/* Won Discount Notification */}
      <AnimatePresence>
        {wonDiscount && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-turquesa to-deep-blue text-white p-6 rounded-2xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8" />
              <div>
                <h3 className="font-black text-lg">¡Cupón Ganado!</h3>
                <p className="text-sm">Código: {wonDiscount.code}</p>
                <p className="text-sm">{wonDiscount.discount}% de descuento</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}