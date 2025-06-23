'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, Bell, Gift, Sparkles, Crown, Flame, Award, TrendingUp, Heart, GitCompare, History, Settings, Headphones, Brain, Rocket, Globe, Zap, Star, Shield, Truck, LogOut, Eye, Filter, Grid, List, ChevronDown, Play, Cpu, Smartphone, Monitor, Gamepad2, Volume2, Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/providers/cart-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { AuthModal } from '@/components/auth/auth-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationSystem, useNotifications } from '@/components/ui/notification-system';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user, userProfile, logout } = useAuth();
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      name: 'Gaming', 
      href: '/categoria/gaming', 
      icon: Gamepad2, 
      hot: true, 
      description: 'Equipos gaming profesionales',
      products: '2,500+',
      subcategories: [
        { name: 'Tarjetas Gráficas', href: '/gaming/gpu', icon: '🎮' },
        { name: 'Procesadores Gaming', href: '/gaming/cpu', icon: '⚡' },
        { name: 'Periféricos RGB', href: '/gaming/peripherals', icon: '🌈' },
        { name: 'Monitores Gaming', href: '/gaming/monitors', icon: '🖥️' }
      ]
    },
    { 
      name: 'Computación', 
      href: '/categoria/computacion', 
      icon: Monitor, 
      hot: false, 
      description: 'Laptops y desktops premium',
      products: '1,800+',
      subcategories: [
        { name: 'Laptops Pro', href: '/computacion/laptops', icon: '💻' },
        { name: 'Desktops', href: '/computacion/desktops', icon: '🖥️' },
        { name: 'Componentes', href: '/computacion/components', icon: '🔧' },
        { name: 'Workstations', href: '/computacion/workstations', icon: '⚙️' }
      ]
    },
    { 
      name: 'Smartphones', 
      href: '/smartphones', 
      icon: Smartphone, 
      hot: true, 
      description: 'Los últimos smartphones',
      products: '1,200+',
      subcategories: [
        { name: 'iPhone', href: '/smartphones/iphone', icon: '📱' },
        { name: 'Samsung Galaxy', href: '/smartphones/samsung', icon: '🌟' },
        { name: 'Google Pixel', href: '/smartphones/pixel', icon: '📸' },
        { name: 'Accesorios', href: '/smartphones/accessories', icon: '🔌' }
      ]
    },
    { 
      name: 'Audio & Video', 
      href: '/audio-video', 
      icon: Volume2, 
      hot: true, 
      description: 'Audio premium y video profesional',
      products: '800+',
      subcategories: [
        { name: 'Audífonos Premium', href: '/audio/headphones', icon: '🎧' },
        { name: 'Speakers', href: '/audio/speakers', icon: '🔊' },
        { name: 'Micrófonos Pro', href: '/audio/microphones', icon: '🎙️' },
        { name: 'Streaming Equipment', href: '/audio/streaming', icon: '📹' }
      ]
    },
    { 
      name: 'Smart Home', 
      href: '/smart-home', 
      icon: Home, 
      hot: true, 
      description: 'Domótica inteligente',
      products: '600+',
      subcategories: [
        { name: 'Iluminación Smart', href: '/smart-home/lighting', icon: '💡' },
        { name: 'Seguridad', href: '/smart-home/security', icon: '🔒' },
        { name: 'Climatización', href: '/smart-home/climate', icon: '🌡️' },
        { name: 'Asistentes IA', href: '/smart-home/assistants', icon: '🤖' }
      ]
    },
    { 
      name: 'Ofertas', 
      href: '/ofertas', 
      icon: Flame, 
      hot: true, 
      description: 'Descuentos increíbles',
      products: '300+',
      subcategories: [
        { name: 'Flash Sales', href: '/ofertas/flash', icon: '⚡' },
        { name: 'Liquidación', href: '/ofertas/clearance', icon: '🏷️' },
        { name: 'Bundles', href: '/ofertas/bundles', icon: '📦' },
        { name: 'Reacondicionados', href: '/ofertas/refurbished', icon: '♻️' }
      ]
    },
  ];

  const quickActions = [
    { name: 'Comparar Productos', icon: GitCompare, href: '/comparar', color: 'text-blue-500' },
    { name: 'Lista de Deseos', icon: Heart, href: '/wishlist', color: 'text-blue-500' },
    { name: 'Historial', icon: History, href: '/historial', color: 'text-blue-500' },
    { name: 'Soporte IA', icon: Brain, href: '/soporte', color: 'text-blue-500' },
  ];

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      addNotification({
        type: 'success',
        title: 'Sesión cerrada',
        message: 'Has cerrado sesión exitosamente',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      addNotification({
        type: 'info',
        title: 'Búsqueda realizada',
        message: `Buscando productos para: "${searchQuery}"`,
      });
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Notification System */}
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Top Bar Ultra Premium */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-2 px-4 text-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.03)_49%,rgba(255,255,255,0.03)_51%,transparent_52%)] bg-[length:20px_20px]" />
        <FloatingElements count={6} className="opacity-10" />
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-6">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="font-bold hidden sm:inline">🚀 Envío Express Gratis +$150K</span>
              <span className="font-bold sm:hidden">🚀 Envío Gratis</span>
            </motion.div>
            <motion.div
              className="hidden md:flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">⚡ Garantía Premium 5 años</span>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="font-bold">🛠️ Setup Pro Incluido</span>
            </motion.div>

          </div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Headphones className="w-4 h-4 text-blue-400" />
            <span className="font-bold hidden sm:inline">📞 Soporte IA 24/7</span>
            <span className="font-bold sm:hidden">📞 24/7</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Header Revolutionary */}
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-3xl shadow-2xl border-b border-gray-200/50' 
            : 'bg-white/95 backdrop-blur-2xl shadow-lg'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo Revolutionary - Más grande */}
            <Link href="/" className="flex items-center group flex-shrink-0 mr-4 sm:mr-8">
              <motion.div 
                className="relative"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo copy.png"
                  alt="Mercart"
                  width={200}
                  height={70}
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                  priority
                />
                
                {/* Efecto holográfico premium */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* Search Bar Revolutionary - Funcional */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-4 sm:mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Buscar productos, marcas o categorías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl pr-20 sm:pr-24 text-sm sm:text-base font-medium"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 sm:right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-4 sm:px-6 py-2 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Buscar</span>
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Actions Revolutionary */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Quick Actions - Desktop */}
              <div className="relative hidden xl:block">
                <motion.button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </motion.button>

                <AnimatePresence>
                  {showQuickActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden z-50 shadow-2xl border border-gray-200"
                    >
                      <div className="p-2">
                        {quickActions.map((action, index) => (
                          <Link
                            key={action.name}
                            href={action.href}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowQuickActions(false)}
                          >
                            <action.icon className={`w-5 h-5 ${action.color}`} />
                            <span className="font-bold text-sm text-gray-700">{action.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications Revolutionary */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-xs font-bold">3</span>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden z-50 shadow-2xl border border-gray-200"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                        <h3 className="font-black text-white text-lg">Notificaciones</h3>
                      </div>
                      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <Gift className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-bold text-sm text-gray-800">🎉 Oferta Flash Activada</p>
                              <p className="text-xs text-gray-600">iPhone 15 Pro Max con 25% OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center space-x-3">
                            <Truck className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-bold text-sm text-gray-800">📦 Pedido en camino</p>
                              <p className="text-xs text-gray-600">Tu MacBook Pro llegará mañana</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center space-x-3">
                            <Star className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="font-bold text-sm text-gray-800">⭐ Nuevo producto disponible</p>
                              <p className="text-xs text-gray-600">RTX 4090 Ti ya está aquí</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu / Auth */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                      {userProfile?.photoURL ? (
                        <img 
                          src={userProfile.photoURL} 
                          alt={userProfile.displayName || 'User'}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="font-black text-gray-800 text-sm">
                        {userProfile?.displayName || 'Usuario'}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Crown className="w-3 h-3 text-yellow-500" />
                        <p className="text-xs text-blue-600 font-bold">Premium</p>
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden z-50 shadow-2xl border border-gray-200"
                      >
                        <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                              {userProfile?.photoURL ? (
                                <img 
                                  src={userProfile.photoURL} 
                                  alt={userProfile.displayName || 'User'}
                                  className="w-full h-full rounded-2xl object-cover"
                                />
                              ) : (
                                <User className="w-8 h-8 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-black text-white text-lg">{userProfile?.displayName}</p>
                              <p className="text-sm text-white/80">{userProfile?.email}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold text-white">Cliente Premium</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <Link 
                            href="/perfil"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-gray-700">Mi Perfil</span>
                          </Link>
                          <Link 
                            href="/pedidos"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-gray-700">Mis Pedidos</span>
                          </Link>
                          <Link 
                            href="/favoritos"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Heart className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-gray-700">Lista de Deseos</span>
                          </Link>
                          <Link 
                            href="/comparar"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <GitCompare className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-gray-700">Comparador</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                          >
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Cerrar Sesión</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuthClick('login')}
                    className="bg-white/90 backdrop-blur-md font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm hover:bg-blue-50 border border-gray-200 text-gray-700 hover:text-blue-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    onClick={() => handleAuthClick('register')}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all text-xs sm:text-sm hover:scale-105"
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Registrarse
                  </Button>
                </div>
              )}
              
              {/* Cart Revolutionary */}
              <motion.div className="relative">
                <Link href="/carrito">
                  <motion.div
                    className="relative p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    <AnimatePresence>
                      {itemCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-2 -right-2"
                        >
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 text-xs font-black rounded-full shadow-lg border-2 border-white">
                            {itemCount}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="hidden lg:inline ml-2 sm:ml-3 font-black text-gray-700 group-hover:text-blue-600 transition-colors text-sm sm:text-base">Carrito</span>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />}
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Navigation Revolutionary - Desktop - Hover unificado azul */}
          <nav className="hidden md:block border-t border-gray-100">
            <div className="flex items-center justify-center space-x-1 py-3 sm:py-4">
              {categories.map((category, index) => (
                <motion.div 
                  key={category.name} 
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveMegaMenu(category.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={category.href}
                    className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-gray-700 hover:text-white transition-all font-bold relative overflow-hidden group bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 border border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transform hover:scale-105 text-xs sm:text-sm"
                  >
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                    <div className="text-left">
                      <span className="relative z-10 font-black">{category.name}</span>
                      <p className="text-xs opacity-70 font-medium hidden lg:block">{category.products}</p>
                    </div>
                    {category.hot && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-black shadow-lg">
                          <Flame className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          HOT
                        </Badge>
                      </motion.div>
                    )}
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Mega Menu Revolutionary */}
                  <AnimatePresence>
                    {activeMegaMenu === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden z-50 shadow-2xl border border-gray-200"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                          <div className="flex items-center space-x-3">
                            <category.icon className="w-6 h-6 text-white" />
                            <div>
                              <h3 className="font-black text-white text-lg">{category.name}</h3>
                              <p className="text-white/80 text-sm">{category.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group"
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="font-bold text-sm text-gray-700 group-hover:text-blue-600">{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-100">
                          <Link
                            href={category.href}
                            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                          >
                            <span>Ver Todo en {category.name}</span>
                            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Menu Revolutionary - Moderno y optimizado */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/98 backdrop-blur-3xl border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 pr-14 sm:pr-16 text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 font-bold text-sm sm:text-base"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
                
                {/* Mobile Categories - Grid de 2 columnas */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={category.href}
                        className="flex flex-col items-center justify-center p-4 sm:p-6 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 transition-all rounded-xl sm:rounded-2xl font-bold border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-lg min-h-[100px] sm:min-h-[120px] relative overflow-hidden group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <category.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 transition-colors" />
                        <div className="text-center">
                          <span className="text-sm sm:text-base font-black block">{category.name}</span>
                          <p className="text-xs opacity-70 mt-1 hidden sm:block">{category.products}</p>
                        </div>
                        {category.hot && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-black">
                            HOT
                          </Badge>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile Auth */}
                {!user && (
                  <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-center py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 text-sm sm:text-base"
                      onClick={() => {
                        handleAuthClick('login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                    <Button 
                      className="w-full justify-center py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-xl text-sm sm:text-base"
                      onClick={() => {
                        handleAuthClick('register');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Registrarse
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}