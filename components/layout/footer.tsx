'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin, ArrowRight, Sparkles, Zap, Crown, MessageCircle, Send, Globe, Shield, Award, Rocket, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function Footer() {
  const footerLinks = {
    productos: [
      { name: 'Smartphones Premium', href: '/categoria/smartphones', icon: '📱', hot: true },
      { name: 'Laptops Pro', href: '/categoria/laptops', icon: '💻', hot: false },
      { name: 'Gaming Beast', href: '/categoria/gaming', icon: '🎮', hot: true },
      { name: 'Audio Premium', href: '/categoria/audio', icon: '🎧', hot: false },
      { name: 'Smart Home', href: '/categoria/accesorios', icon: '🏠', hot: true },
    ],
    soporte: [
      { name: 'Centro de Ayuda Premium', href: '/ayuda', icon: '🆘' },
      { name: 'Garantía Extendida', href: '/garantias', icon: '🛡️' },
      { name: 'Envío Express Chile', href: '/envios', icon: '🚀' },
      { name: 'Devoluciones Fáciles', href: '/devoluciones', icon: '↩️' },
      { name: 'Soporte IA 24/7', href: '/contacto', icon: '🤖' },
    ],
    empresa: [
      { name: 'Sobre Mercart Chile', href: '/nosotros', icon: '🏢' },
      { name: 'Carreras Tech', href: '/carreras', icon: '💼' },
      { name: 'Prensa Chile', href: '/prensa', icon: '📰' },
      { name: 'Términos Chile', href: '/terminos', icon: '📋' },
      { name: 'Privacidad Premium', href: '/privacidad', icon: '🔒' },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-gray-900 to-black">
      {/* Background Effects Premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(4,68,172,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(4,172,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(4,68,172,0.03)_49%,rgba(4,68,172,0.03)_51%,transparent_52%)] bg-[length:40px_40px]" />
      </div>
      <FloatingElements count={30} className="opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        {/* Newsletter CTA Premium */}
        <motion.div 
          className="mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/20 via-turquesa/20 to-cool-grey/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Badge className="bg-gradient-to-r from-deep-blue to-turquesa text-white px-6 py-3 font-black text-lg rounded-full shadow-2xl">
                        <Crown className="w-5 h-5 mr-2" />
                        Exclusivo Chile
                      </Badge>
                    </motion.div>
                    <Badge className="bg-gradient-to-r from-turquesa to-cool-grey text-white px-6 py-3 font-black text-lg rounded-full shadow-2xl">
                      <Brain className="w-5 h-5 mr-2" />
                      IA Premium
                    </Badge>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-turquesa via-deep-blue to-cool-grey bg-clip-text text-transparent">
                      Únete al Futuro Tech Chile
                    </span>
                  </h3>
                  <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
                    Suscríbete y recibe ofertas exclusivas, lanzamientos anticipados y contenido premium 
                    que transformará tu experiencia tecnológica en Chile.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="tu@email.cl"
                      className="flex-1 h-16 rounded-2xl bg-white/20 border-white/30 text-white placeholder:text-gray-300 text-lg font-medium backdrop-blur-md"
                      aria-label="Email para newsletter premium"
                    />
                    <Button 
                      className="group bg-gradient-to-r from-deep-blue to-turquesa hover:from-turquesa hover:to-deep-blue px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl text-lg"
                      aria-label="Suscribirse al newsletter premium"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Suscribirse
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-turquesa" />
                      <span className="font-bold">100% Seguro Chile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-deep-blue" />
                      <span className="font-bold">Sin Spam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-cool-grey" />
                      <span className="font-bold">Contenido Exclusivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links Premium */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-r from-deep-blue to-turquesa flex items-center justify-center shadow-2xl">
                <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Productos</h4>
            </div>
            <ul className="space-y-4">
              {footerLinks.productos.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-3 text-gray-300 hover:text-turquesa transition-all duration-300 font-medium text-base lg:text-lg"
                    tabIndex={0}
                  >
                    <span className="text-lg lg:text-xl">{link.icon}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                    {link.hot && (
                      <Badge className="bg-gradient-to-r from-turquesa to-deep-blue text-white text-xs px-2 py-1 rounded-full font-bold">
                        HOT
                      </Badge>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-r from-turquesa to-cool-grey flex items-center justify-center shadow-2xl">
                <Crown className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Soporte</h4>
            </div>
            <ul className="space-y-4">
              {footerLinks.soporte.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-3 text-gray-300 hover:text-deep-blue transition-all duration-300 font-medium text-base lg:text-lg"
                    tabIndex={0}
                  >
                    <span className="text-lg lg:text-xl">{link.icon}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-r from-cool-grey to-deep-blue flex items-center justify-center shadow-2xl">
                <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Empresa</h4>
            </div>
            <ul className="space-y-4">
              {footerLinks.empresa.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-3 text-gray-300 hover:text-turquesa transition-all duration-300 font-medium text-base lg:text-lg"
                    tabIndex={0}
                  >
                    <span className="text-lg lg:text-xl">{link.icon}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-r from-deep-blue to-cool-grey flex items-center justify-center shadow-2xl">
                <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Contacto</h4>
            </div>
            <div className="space-y-6">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-turquesa/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <span className="text-gray-300 font-bold text-lg">+56 2 2800-MERCART</span>
                  <p className="text-gray-500 text-sm">Soporte Premium 24/7</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-deep-blue/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-deep-blue" />
                </div>
                <div>
                  <span className="text-gray-300 font-bold text-lg">hola@mercart.cl</span>
                  <p className="text-gray-500 text-sm">Respuesta inmediata IA</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-cool-grey/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cool-grey" />
                </div>
                <div>
                  <span className="text-gray-300 font-bold text-lg">Santiago, Chile 🇨🇱</span>
                  <p className="text-gray-500 text-sm">Oficina principal</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section Premium */}
        <motion.div 
          className="border-t border-gray-700/50 pt-12 sm:pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Logo and Info Premium */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-r from-deep-blue to-turquesa flex items-center justify-center shadow-2xl overflow-hidden p-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="Mercart Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain filter brightness-0 invert"
                  priority
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <h5 className="text-white font-black text-2xl sm:text-3xl">
                  <span className="bg-gradient-to-r from-turquesa via-deep-blue to-cool-grey bg-clip-text text-transparent">
                    Mercart
                  </span>
                </h5>
                <p className="text-gray-400 font-bold text-lg sm:text-xl">Tecnología Premium Chile</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-3 mt-3">
                  <Badge className="bg-gradient-to-r from-deep-blue to-turquesa text-white text-sm px-3 py-2 font-bold rounded-full">
                    <Rocket className="w-3 h-3 mr-1" />
                    Líder Chile
                  </Badge>
                  <Badge className="bg-gradient-to-r from-turquesa to-cool-grey text-white text-sm px-3 py-2 font-bold rounded-full">
                    <Globe className="w-3 h-3 mr-1" />
                    Lanzamiento 2025
                  </Badge>
                </div>
              </div>
            </div>

            {/* Social Links Premium */}
            <div className="flex gap-6">
              <motion.div
                whileHover={{ scale: 1.2, rotateY: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href="https://instagram.com/mercartchile"
                  className="group w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-r from-[#E4405F] via-[#F56040] to-[#FFDC80] flex items-center justify-center transition-all duration-300 hover:shadow-2xl"
                  aria-label="Instagram Mercart Chile"
                  tabIndex={0}
                >
                  <Instagram className="w-8 h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, rotateY: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href="https://wa.me/56228000000"
                  className="group w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center transition-all duration-300 hover:shadow-2xl"
                  aria-label="WhatsApp Mercart Chile"
                  tabIndex={0}
                >
                  <MessageCircle className="w-8 h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Copyright Premium */}
          <div className="text-center text-gray-400 text-base lg:text-lg mt-12 pt-8 border-t border-gray-800/50">
            <motion.p 
              className="font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              &copy; 2025 Mercart Chile. Todos los derechos reservados. 
              <span className="text-transparent bg-gradient-to-r from-turquesa to-deep-blue bg-clip-text font-bold">
                {" "}Hecho con ❤️ en Chile 🇨🇱
              </span>
            </motion.p>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-turquesa rounded-full animate-pulse" />
                <span className="font-bold">Servidores Chile Activos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-deep-blue rounded-full animate-pulse" />
                <span className="font-bold">MercartIA Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cool-grey rounded-full animate-pulse" />
                <span className="font-bold">Lanzamiento Agosto 2025</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}