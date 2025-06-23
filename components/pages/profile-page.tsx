'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, CreditCard, Package, Settings, Bell, Shield, Heart, LogOut, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function ProfilePage() {
  const { user, userProfile, updateUserProfile, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    phoneNumber: userProfile?.phoneNumber || '',
    address: {
      street: userProfile?.address?.street || '',
      city: userProfile?.address?.city || '',
      state: userProfile?.address?.state || '',
      zipCode: userProfile?.address?.zipCode || '',
      country: userProfile?.address?.country || 'Colombia',
    },
    preferences: {
      newsletter: userProfile?.preferences?.newsletter || true,
      notifications: userProfile?.preferences?.notifications || true,
      language: userProfile?.preferences?.language || 'es',
    },
  });

  if (!user) {
    router.push('/');
    return null;
  }

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Entregado',
      total: 2899000,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'En tránsito',
      total: 459000,
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Procesando',
      total: 1299000,
      items: 2,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <FloatingElements count={15} className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
            {userProfile?.photoURL ? (
              <img 
                src={userProfile.photoURL} 
                alt={userProfile.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            ¡Hola, {userProfile?.displayName || 'Usuario'}!
          </h1>
          <p className="text-xl text-accent">Gestiona tu cuenta y preferencias</p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-14 rounded-2xl bg-white border border-gray-200/50">
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="w-4 h-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              Direcciones
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4 mr-2" />
              Preferencias
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Seguridad
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-3d">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gradient">Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    className="rounded-xl"
                  >
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nombre completo</Label>
                      <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        disabled={!isEditing}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Teléfono</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        disabled={!isEditing}
                        className="rounded-xl"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Miembro desde</Label>
                      <Input
                        value={userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('es-CO') : ''}
                        disabled
                        className="rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl">
                        Cancelar
                      </Button>
                      <Button onClick={handleSave} className="gradient-primary rounded-xl">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Mis Pedidos</CardTitle>
                  <CardDescription>Historial de tus compras y estado de envíos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-gray-200/50 rounded-2xl hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{order.id}</h3>
                            <p className="text-sm text-accent">
                              {new Date(order.date).toLocaleDateString('es-CO')} • {order.items} productos
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="font-bold text-primary">{formatPrice(order.total)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Direcciones de Envío</CardTitle>
                  <CardDescription>Gestiona tus direcciones de entrega</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="street">Dirección</Label>
                      <Input
                        id="street"
                        value={formData.address.street}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, street: e.target.value }
                        }))}
                        className="rounded-xl"
                        placeholder="Calle 72 #10-34"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, city: e.target.value }
                        }))}
                        className="rounded-xl"
                        placeholder="Bogotá"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Departamento</Label>
                      <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, state: e.target.value }
                        }))}
                        className="rounded-xl"
                        placeholder="Cundinamarca"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Código Postal</Label>
                      <Input
                        id="zipCode"
                        value={formData.address.zipCode}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, zipCode: e.target.value }
                        }))}
                        className="rounded-xl"
                        placeholder="110111"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSave} className="gradient-primary rounded-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Dirección
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Preferencias</CardTitle>
                  <CardDescription>Personaliza tu experiencia en TechMart</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200/50 rounded-2xl">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Newsletter</h3>
                        <p className="text-sm text-accent">Recibe ofertas y novedades por email</p>
                      </div>
                      <Switch
                        checked={formData.preferences.newsletter}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, newsletter: checked }
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200/50 rounded-2xl">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Notificaciones Push</h3>
                        <p className="text-sm text-accent">Recibe notificaciones sobre tus pedidos</p>
                      </div>
                      <Switch
                        checked={formData.preferences.notifications}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, notifications: checked }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSave} className="gradient-primary rounded-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Seguridad de la Cuenta</CardTitle>
                  <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200/50 rounded-2xl">
                      <h3 className="font-semibold mb-2">Cambiar Contraseña</h3>
                      <p className="text-sm text-accent mb-4">
                        Actualiza tu contraseña regularmente para mantener tu cuenta segura
                      </p>
                      <Button variant="outline" className="rounded-xl">
                        Cambiar Contraseña
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-gray-200/50 rounded-2xl">
                      <h3 className="font-semibold mb-2">Autenticación de Dos Factores</h3>
                      <p className="text-sm text-accent mb-4">
                        Agrega una capa extra de seguridad a tu cuenta
                      </p>
                      <Button variant="outline" className="rounded-xl">
                        Configurar 2FA
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-red-200/50 rounded-2xl bg-red-50/50">
                      <h3 className="font-semibold mb-2 text-red-700">Cerrar Sesión</h3>
                      <p className="text-sm text-red-600 mb-4">
                        Cierra sesión en todos los dispositivos
                      </p>
                      <Button 
                        variant="destructive" 
                        onClick={handleLogout}
                        className="rounded-xl"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}