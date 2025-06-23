'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Truck, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/providers/cart-provider';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(() => import('@/components/3d/floating-elements').then(mod => ({ default: mod.FloatingElements })), { ssr: false });

export function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount, clearCart, proceedToCheckout, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === 'descuento10') {
      setAppliedCoupon('DESCUENTO10');
      setCouponCode('');
    }
  };

  const couponDiscount = appliedCoupon ? total * 0.1 : 0;
  const shipping = total > 150000 ? 0 : 15000;
  const finalTotal = total - couponDiscount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        <FloatingElements count={10} className="opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-4">Tu carrito está vacío</h1>
            <p className="text-xl text-accent mb-8 max-w-2xl mx-auto">
              Descubre nuestra increíble selección de productos tecnológicos y encuentra lo que necesitas
            </p>
            <Link href="/">
              <Button size="lg" className="gradient-primary text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300">
                Explorar Productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
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
          <h1 className="text-5xl font-bold text-gradient mb-4">Tu Carrito de Compras</h1>
          <p className="text-xl text-accent">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 border border-gray-200/50 hover:border-primary/30 transition-all duration-300 card-3d"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-accent">Variante: {item.variant}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(item.price)}
                          </span>
                          {item.compareAtPrice && (
                            <span className="text-lg text-accent line-through">
                              {formatPrice(item.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={loading}
                            className="h-10 w-10 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={loading}
                            className="h-10 w-10 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-semibold text-foreground">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.variantId)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-4"
            >
              <Button
                variant="outline"
                onClick={clearCart}
                disabled={loading}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vaciar Carrito
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/50 card-3d">
              <h2 className="text-2xl font-bold text-gradient mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-accent">Subtotal ({itemCount} productos)</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({appliedCoupon})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-accent">Envío</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/50 card-3d">
              <h3 className="text-lg font-semibold mb-4">Código de Descuento</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Ingresa tu código"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-xl"
                />
                <Button 
                  onClick={applyCoupon}
                  variant="outline"
                  className="rounded-xl"
                >
                  Aplicar
                </Button>
              </div>
              {appliedCoupon && (
                <div className="mt-3 p-3 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-700">
                    ✓ Código {appliedCoupon} aplicado correctamente
                  </p>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/50 card-3d">
              <h3 className="text-lg font-semibold mb-4">Beneficios Incluidos</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Envío gratis en compras +$150.000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Garantía oficial en todos los productos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Instalación gratuita disponible</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Hasta 12 cuotas sin interés</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={proceedToCheckout}
              disabled={loading}
              size="lg"
              className="w-full gradient-primary text-lg py-4 rounded-2xl hover:scale-105 transition-all duration-300"
            >
              {loading ? (
                <div className="loading-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  Proceder al Pago
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-accent text-center">
              Al continuar, aceptas nuestros términos y condiciones
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}