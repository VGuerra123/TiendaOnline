'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingCart, Heart, Clock, Settings, LogOut, Bell, Gift, CreditCard, Truck, Package, Star, Award, Zap, ChevronRight, Calendar, BarChart3, Wallet, Smartphone, Laptop, Headphones, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FloatingElements } from '@/components/3d/floating-elements';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
    level: string;
    points: number;
    nextLevelPoints: number;
    memberSince: string;
  };
}

export function UserDashboard({ isOpen, onClose, user }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos de ejemplo
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Entregado',
      total: 2899000,
      items: 3,
      products: [
        { name: 'RTX 4090', image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'En tránsito',
      total: 459000,
      items: 1,
      products: [
        { name: 'Teclado Mecánico', image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    }
  ];

  const wishlistItems = [
    {
      name: 'iPhone 15 Pro Max',
      price: 4999000,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'MacBook Pro M3',
      price: 5999000,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'Oferta Exclusiva',
      message: 'iPhone 15 Pro Max con 25% OFF',
      time: '2 horas',
      icon: Gift,
      color: 'text-red-500'
    },
    {
      id: '2',
      title: 'Pedido en Camino',
      message: 'Tu pedido ORD-002 llegará mañana',
      time: '5 horas',
      icon: Truck,
      color: 'text-green-500'
    },
    {
      id: '3',
      title: 'Puntos VIP',
      message: 'Has ganado 500 puntos premium',
      time: '1 día',
      icon: Star,
      color: 'text-yellow-500'
    }
  ];

  const recommendations = [
    {
      name: 'RTX 4090 Ti',
      category: 'Gaming',
      price: 3499000,
      image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Gamepad
    },
    {
      name: 'MacBook Pro M3 Max',
      category: 'Laptops',
      price: 5999000,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Laptop
    },
    {
      name: 'Sony WH-1000XM5',
      category: 'Audio',
      price: 899000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Headphones
    },
    {
      name: 'iPhone 15 Pro',
      category: 'Smartphones',
      price: 3999000,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Smartphone
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'bg-green-100 text-green-800';
      case 'En tránsito': return 'bg-blue-100 text-blue-800';
      case 'Procesando': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-deep-blue via-turquesa to-deep-blue p-8 text-white relative overflow-hidden">
              <FloatingElements count={15} className="opacity-10" />
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black">{user.name}</h2>
                    <p className="text-white/80">{user.email}</p>
                    <div className="flex items-center mt-2 space-x-3">
                      <Badge className="bg-white/20 text-white px-3 py-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Nivel {user.level}
                      </Badge>
                      <Badge className="bg-white/20 text-white px-3 py-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Desde {user.memberSince}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center md:items-end">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-lg">{user.points} Puntos VIP</span>
                  </div>
                  <div className="w-full max-w-xs">
                    <Progress value={(user.points / user.nextLevelPoints) * 100} className="h-2 bg-white/20" />
                    <div className="flex justify-between mt-1 text-sm">
                      <span>{user.points} pts</span>
                      <span>Próximo nivel: {user.nextLevelPoints} pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="h-[60vh] overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="px-6">
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 h-14 rounded-none bg-transparent border-b-0">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-turquesa data-[state=active]:text-turquesa rounded-none"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Resumen
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-turquesa data-[state=active]:text-turquesa rounded-none"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Pedidos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="wishlist" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-turquesa data-[state=active]:text-turquesa rounded-none"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-turquesa data-[state=active]:text-turquesa rounded-none"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notificaciones
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-turquesa data-[state=active]:text-turquesa rounded-none"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Ajustes
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="overflow-y-auto h-full">
                {/* Overview Tab */}
                <TabsContent value="overview" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center">
                          <Package className="w-5 h-5 mr-2 text-deep-blue" />
                          Pedidos Recientes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {recentOrders.slice(0, 2).map(order => (
                            <div key={order.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                  <img 
                                    src={order.products[0].image} 
                                    alt={order.products[0].name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-bold text-sm">{order.id}</p>
                                  <p className="text-xs text-gray-500">{order.date}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-turquesa">
                          <ChevronRight className="w-4 h-4" />
                          Ver todos
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center">
                          <Heart className="w-5 h-5 mr-2 text-red-500" />
                          Lista de Deseos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {wishlistItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-bold text-sm">{item.name}</p>
                                  <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="text-deep-blue p-2">
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-turquesa">
                          <ChevronRight className="w-4 h-4" />
                          Ver todos
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center">
                          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
                          Notificaciones
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {notifications.slice(0, 3).map(notification => (
                            <div key={notification.id} className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notification.color.replace('text-', 'bg-').replace('500', '100')}`}>
                                <notification.icon className={`w-4 h-4 ${notification.color}`} />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-turquesa">
                          <ChevronRight className="w-4 h-4" />
                          Ver todas
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Recommendations */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-turquesa" />
                      Recomendados para ti
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {recommendations.map((item, index) => (
                        <Card key={index} className="overflow-hidden hover:border-turquesa transition-colors">
                          <div className="relative h-32 bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center">
                              <item.icon className="w-4 h-4 text-deep-blue" />
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                            <p className="font-bold text-deep-blue mt-1">{formatPrice(item.price)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Historial de Pedidos</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Filtrar por" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="delivered">Entregados</SelectItem>
                          <SelectItem value="processing">En proceso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      {recentOrders.map(order => (
                        <Card key={order.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden">
                                  <img 
                                    src={order.products[0].image} 
                                    alt={order.products[0].name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-bold">{order.id}</h4>
                                    <Badge className={getStatusColor(order.status)}>
                                      {order.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {new Date(order.date).toLocaleDateString('es-CL')} • {order.items} {order.items === 1 ? 'producto' : 'productos'}
                                  </p>
                                  <p className="font-bold text-deep-blue mt-1">
                                    {formatPrice(order.total)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <Button variant="outline" size="sm" className="rounded-xl">
                                  Ver Detalles
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="rounded-xl bg-gradient-to-r from-deep-blue to-turquesa text-white"
                                >
                                  Seguimiento
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Wishlist Tab */}
                <TabsContent value="wishlist" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Mi Lista de Deseos</h3>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir Lista
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden hover:border-turquesa transition-colors">
                          <div className="relative h-48">
                            <img 
                              src={item.image.replace('w=100', 'w=400')} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 text-red-500 hover:bg-white"
                            >
                              <Heart className="w-4 h-4 fill-red-500" />
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-bold mb-2">{item.name}</h4>
                            <p className="font-bold text-deep-blue mb-3">{formatPrice(item.price)}</p>
                            <Button 
                              className="w-full rounded-xl bg-gradient-to-r from-deep-blue to-turquesa text-white"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Agregar al Carrito
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Notificaciones</h3>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-xl"
                      >
                        Marcar todas como leídas
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {notifications.map(notification => (
                        <Card key={notification.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notification.color.replace('text-', 'bg-').replace('500', '100')}`}>
                                <notification.icon className={`w-5 h-5 ${notification.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-bold">{notification.title}</h4>
                                  <span className="text-xs text-gray-500">Hace {notification.time}</span>
                                </div>
                                <p className="text-gray-600">{notification.message}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Configuración de Cuenta</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-bold flex items-center">
                            <User className="w-5 h-5 mr-2 text-deep-blue" />
                            Información Personal
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre completo
                            </label>
                            <Input value={user.name} className="rounded-xl" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <Input value={user.email} className="rounded-xl" />
                          </div>
                          <Button 
                            className="w-full rounded-xl bg-gradient-to-r from-deep-blue to-turquesa text-white"
                          >
                            Guardar Cambios
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-bold flex items-center">
                            <Bell className="w-5 h-5 mr-2 text-deep-blue" />
                            Preferencias de Notificaciones
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="font-medium">Ofertas y promociones</label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="font-medium">Estado de pedidos</label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="font-medium">Recomendaciones</label>
                            <Switch defaultChecked />
                          </div>
                          <Button 
                            className="w-full rounded-xl bg-gradient-to-r from-deep-blue to-turquesa text-white"
                          >
                            Guardar Preferencias
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-bold flex items-center">
                            <CreditCard className="w-5 h-5 mr-2 text-deep-blue" />
                            Métodos de Pago
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                                <span className="font-medium">•••• 4589</span>
                              </div>
                              <Badge>Principal</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
                                <span className="font-medium">•••• 7821</span>
                              </div>
                              <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Button 
                            variant="outline"
                            className="w-full rounded-xl"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Método de Pago
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-bold flex items-center">
                            <Award className="w-5 h-5 mr-2 text-deep-blue" />
                            Programa VIP
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold">Nivel {user.level}</p>
                                <p className="text-sm text-gray-500">Premium</p>
                              </div>
                              <Badge className="bg-gradient-to-r from-deep-blue to-turquesa text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                VIP
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progreso al siguiente nivel</span>
                                <span>{user.points}/{user.nextLevelPoints}</span>
                              </div>
                              <Progress value={(user.points / user.nextLevelPoints) * 100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium">Beneficios actuales:</p>
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>Envío express gratis</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>Soporte VIP 24/7</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>Ofertas exclusivas</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <Button 
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Componentes auxiliares
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-turquesa ${className}`}
      {...props}
    />
  );
}

function Switch({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-gradient-to-r from-deep-blue to-turquesa' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function Pencil(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}