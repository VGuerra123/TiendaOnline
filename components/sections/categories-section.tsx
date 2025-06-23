'use client';

import Link from 'next/link';
import { ArrowRight, Gamepad2, Monitor, Smartphone, Volume2, Settings, Zap, TrendingUp, Star, Sparkles, Crown, Flame, Eye, ChevronRight, Layers, Cpu, Wifi, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function CategoriesSection() {
  const categories = [
    {
      name: 'Gaming y Streaming',
      description: 'Equipos gaming profesionales y streaming de última generación',
      icon: Gamepad2,
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/categoria/gaming',
      color: 'from-blue-600 to-cyan-600',
      products: '2,500+ productos',
      trending: true,
      discount: '25% OFF',
      featured: true,
      stats: { sales: '15K+', rating: 4.9 }
    },
    {
      name: 'Computación',
      description: 'Laptops, desktops y workstations de máximo rendimiento',
      icon: Monitor,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/categoria/computacion',
      color: 'from-blue-600 to-cyan-600',
      products: '1,800+ productos',
      trending: false,
      discount: '20% OFF',
      featured: true,
      stats: { sales: '12K+', rating: 4.8 }
    },
    {
      name: 'Smartphones',
      description: 'Los smartphones más avanzados con IA y tecnología 5G',
      icon: Smartphone,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/smartphones',
      color: 'from-blue-600 to-cyan-600',
      products: '1,200+ productos',
      trending: true,
      discount: '15% OFF',
      featured: true,
      stats: { sales: '20K+', rating: 4.9 }
    },
    {
      name: 'Audio & Video',
      description: 'Audio premium y equipos de video profesional para creadores',
      icon: Volume2,
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/audio-video',
      color: 'from-blue-600 to-cyan-600',
      products: '800+ productos',
      trending: true,
      discount: 'Nuevo',
      featured: true,
      stats: { sales: '8K+', rating: 4.8 }
    },
    {
      name: 'Smart Home',
      description: 'Domótica inteligente y automatización del hogar',
      icon: Home,
      image: 'https://images.pexels.com/photos/8293712/pexels-photo-8293712.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/smart-home',
      color: 'from-blue-600 to-cyan-600',
      products: '600+ productos',
      trending: true,
      discount: '35% OFF',
      featured: false,
    },
    {
      name: 'Conectividad',
      description: 'Redes y networking',
      icon: Wifi,
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/categoria/redes',
      color: 'from-blue-600 to-cyan-600',
      products: '900+ productos',
      trending: false,
      discount: '15% OFF',
      featured: false,
    },
    {
      name: 'Ofertas Especiales',
      description: 'Descuentos exclusivos y promociones limitadas',
      icon: Zap,
      image: 'https://images.pexels.com/photos/7947858/pexels-photo-7947858.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/ofertas',
      color: 'from-blue-600 to-cyan-600',
      products: '300+ ofertas',
      trending: true,
      discount: 'Hasta 50%',
      featured: false,
      stats: { sales: '8K+', rating: 4.7 }
    },
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Simplified Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05),transparent_50%)]" />
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
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse" />
            <span className="text-blue-600 font-bold text-sm sm:text-base">Categorías Premium</span>
            <Sparkles className="w-4 h-4 text-cyan-600" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
              Explora Nuestras Categorías
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Descubre la tecnología más avanzada organizada por categorías especializadas. 
            Encuentra exactamente lo que necesitas con la mejor calidad, precio y garantía oficial.
          </motion.p>
        </motion.div>

        {/* Featured Categories */}
        <motion.div 
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800">Categorías Principales</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium hidden sm:block">Las categorías más populares</p>
              </div>
            </div>
            <Badge className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm sm:text-base rounded-full">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2" />
              Trending
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 60, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: 1 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="group perspective-1000"
              >
                <Link href={category.href} className="block">
                  <div className="relative h-64 sm:h-72 lg:h-80 xl:h-96 rounded-2xl sm:rounded-3xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-105 hover:-rotate-1 group-hover:shadow-2xl">
                    {/* Background */}
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-75 group-hover:opacity-65 transition-opacity duration-500`} />
                      
                      {/* Grid Overlay */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="w-full h-full bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3">
                      {category.trending && (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Badge className="bg-white/20 backdrop-blur-md text-white font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg text-xs sm:text-sm">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            HOT
                          </Badge>
                        </motion.div>
                      )}
                      <Badge className="bg-black/30 backdrop-blur-md text-white font-medium px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        {category.products}
                      </Badge>
                    </div>

                    {/* Icon Container */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                      <motion.div 
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-500"
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 10,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <category.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white mb-1 sm:mb-2 group-hover:translate-y-0 transform translate-y-2 transition-transform duration-500">
                          {category.name}
                        </h3>
                        
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                        >
                          <p className="text-white/90 font-medium mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                            {category.description}
                          </p>
                          
                          {category.stats && (
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-white font-bold text-xs sm:text-sm">{category.stats.rating}</span>
                              </div>
                              <div className="text-white/80 font-medium text-xs sm:text-sm">
                                {category.stats.sales} ventas
                              </div>
                            </div>
                          )}
                          
                          <Badge className="bg-white/20 backdrop-blur-md text-white font-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                            {category.discount}
                          </Badge>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-between mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100"
                        >
                          <span className="text-white font-bold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            Explorar
                          </span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800">Más Categorías</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium hidden sm:block">Explora otras opciones</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {regularCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.8 + index * 0.1, 
                  duration: 0.6,
                  type: "spring"
                }}
                className="group"
              >
                <Link href={category.href} className="block">
                  <div className="relative h-40 sm:h-48 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-60 transition-opacity duration-400`} />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-all group-hover:scale-110 duration-400">
                          <category.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        {category.trending && (
                          <Badge className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-2 py-1 rounded-full">
                            <Flame className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            HOT
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-black text-white mb-1 sm:mb-2 group-hover:translate-y-0 transform translate-y-1 transition-transform duration-400">
                          {category.name}
                        </h3>
                        <Badge className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                          {category.discount}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}