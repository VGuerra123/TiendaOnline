'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Zap, Shield, Gift, Truck, Award, Star, CreditCard, Clock, Sparkles, Brain, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingElements } from '@/components/3d/floating-elements';

interface PremiumMembershipProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanFeature {
  name: string;
  description: string;
  included: boolean;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'annual';
  description: string;
  features: PlanFeature[];
  popular: boolean;
  icon: React.ElementType;
  color: string;
  discount?: number;
}

export function PremiumMembership({ isOpen, onClose }: PremiumMembershipProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium-annual');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  const plans: MembershipPlan[] = [
    {
      id: 'standard-monthly',
      name: 'Estándar',
      price: 9990,
      billingPeriod: 'monthly',
      description: 'Para compradores ocasionales',
      popular: false,
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      features: [
        { name: 'Envío gratis', description: 'En compras sobre $100.000', included: true },
        { name: 'Soporte prioritario', description: 'Atención preferencial', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas especiales', included: true },
        { name: 'Garantía extendida', description: '1 año adicional', included: false },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: false },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: false },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: false },
        { name: 'Configuración premium', description: 'Setup profesional', included: false },
      ]
    },
    {
      id: 'standard-annual',
      name: 'Estándar',
      price: 7990,
      billingPeriod: 'annual',
      description: 'Para compradores ocasionales',
      popular: false,
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      discount: 20,
      features: [
        { name: 'Envío gratis', description: 'En compras sobre $100.000', included: true },
        { name: 'Soporte prioritario', description: 'Atención preferencial', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas especiales', included: true },
        { name: 'Garantía extendida', description: '1 año adicional', included: false },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: false },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: false },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: false },
        { name: 'Configuración premium', description: 'Setup profesional', included: false },
      ]
    },
    {
      id: 'premium-monthly',
      name: 'Premium',
      price: 19990,
      billingPeriod: 'monthly',
      description: 'Para entusiastas de la tecnología',
      popular: true,
      icon: Crown,
      color: 'from-deep-blue to-turquesa',
      features: [
        { name: 'Envío gratis', description: 'En todas las compras', included: true },
        { name: 'Soporte prioritario', description: 'Atención VIP', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas premium', included: true },
        { name: 'Garantía extendida', description: '2 años adicionales', included: true },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: true },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: true },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: false },
        { name: 'Configuración premium', description: 'Setup profesional', included: false },
      ]
    },
    {
      id: 'premium-annual',
      name: 'Premium',
      price: 15990,
      billingPeriod: 'annual',
      description: 'Para entusiastas de la tecnología',
      popular: true,
      icon: Crown,
      color: 'from-deep-blue to-turquesa',
      discount: 20,
      features: [
        { name: 'Envío gratis', description: 'En todas las compras', included: true },
        { name: 'Soporte prioritario', description: 'Atención VIP', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas premium', included: true },
        { name: 'Garantía extendida', description: '2 años adicionales', included: true },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: true },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: true },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: false },
        { name: 'Configuración premium', description: 'Setup profesional', included: false },
      ]
    },
    {
      id: 'elite-monthly',
      name: 'Elite',
      price: 29990,
      billingPeriod: 'monthly',
      description: 'La experiencia definitiva',
      popular: false,
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      features: [
        { name: 'Envío gratis', description: 'En todas las compras', included: true },
        { name: 'Soporte prioritario', description: 'Atención VIP', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas premium', included: true },
        { name: 'Garantía extendida', description: '3 años adicionales', included: true },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: true },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: true },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: true },
        { name: 'Configuración premium', description: 'Setup profesional', included: true },
      ]
    },
    {
      id: 'elite-annual',
      name: 'Elite',
      price: 23990,
      billingPeriod: 'annual',
      description: 'La experiencia definitiva',
      popular: false,
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      discount: 20,
      features: [
        { name: 'Envío gratis', description: 'En todas las compras', included: true },
        { name: 'Soporte prioritario', description: 'Atención VIP', included: true },
        { name: 'Ofertas exclusivas', description: 'Acceso a ofertas premium', included: true },
        { name: 'Garantía extendida', description: '3 años adicionales', included: true },
        { name: 'Instalación gratuita', description: 'Servicio de instalación', included: true },
        { name: 'Acceso anticipado', description: 'Preventas exclusivas', included: true },
        { name: 'Soporte IA 24/7', description: 'Asistencia inteligente', included: true },
        { name: 'Configuración premium', description: 'Setup profesional', included: true },
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getFeatureIcon = (featureName: string) => {
    switch (featureName) {
      case 'Envío gratis': return Truck;
      case 'Soporte prioritario': return Zap;
      case 'Ofertas exclusivas': return Gift;
      case 'Garantía extendida': return Shield;
      case 'Instalación gratuita': return Award;
      case 'Acceso anticipado': return Clock;
      case 'Soporte IA 24/7': return Brain;
      case 'Configuración premium': return Sparkles;
      default: return Check;
    }
  };

  const handleBillingPeriodChange = (period: 'monthly' | 'annual') => {
    setBillingPeriod(period);
    
    // Update selected plan to match the new billing period
    const currentPlanBase = selectedPlan.split('-')[0];
    setSelectedPlan(`${currentPlanBase}-${period}`);
  };

  const handleSubscribe = () => {
    // Aquí se procesaría la suscripción
    console.log('Suscripción al plan:', selectedPlan);
    onClose();
  };

  const filteredPlans = plans.filter(plan => plan.billingPeriod === billingPeriod);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(4,68,172,0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(4,172,212,0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(4,68,172,0.05)_49%,rgba(4,68,172,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
            </div>
            <FloatingElements count={20} className="opacity-10" />

            {/* Header */}
            <div className="p-8 text-white relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-turquesa to-deep-blue rounded-2xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black">Membresía Premium</h2>
                    <p className="text-white/80 font-medium">
                      Eleva tu experiencia tecnológica en Chile
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/10 rounded-xl p-3"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-8 relative z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 flex">
                <button
                  onClick={() => handleBillingPeriodChange('monthly')}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    billingPeriod === 'monthly'
                      ? 'bg-gradient-to-r from-deep-blue to-turquesa text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => handleBillingPeriodChange('annual')}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    billingPeriod === 'annual'
                      ? 'bg-gradient-to-r from-deep-blue to-turquesa text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Anual
                  <Badge className="ml-2 bg-green-500 text-white">20% OFF</Badge>
                </button>
              </div>
            </div>

            {/* Plans */}
            <div className="px-8 pb-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-3xl overflow-hidden ${
                      selectedPlan === plan.id
                        ? 'ring-4 ring-turquesa'
                        : 'ring-1 ring-white/20'
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${plan.color} p-6 relative overflow-hidden`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:10px_10px]" />
                      
                      {plan.popular && (
                        <Badge className="absolute top-4 right-4 bg-white text-deep-blue font-bold">
                          Popular
                        </Badge>
                      )}
                      
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                          <plan.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-1">{plan.name}</h3>
                        <p className="text-white/80 mb-4">{plan.description}</p>
                        
                        <div className="flex items-baseline">
                          <span className="text-3xl font-black text-white">{formatPrice(plan.price)}</span>
                          <span className="text-white/80 ml-2">/ mes</span>
                        </div>
                        
                        {plan.discount && (
                          <div className="mt-2 text-white/80 text-sm">
                            Ahorras {formatPrice(plan.price * 12 * (plan.discount / 100))} al año
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md p-6">
                      <div className="space-y-4">
                        {plan.features.map((feature, index) => {
                          const FeatureIcon = getFeatureIcon(feature.name);
                          return (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                feature.included
                                  ? 'bg-gradient-to-r from-deep-blue to-turquesa text-white'
                                  : 'bg-gray-300/20 text-gray-400'
                              }`}>
                                {feature.included ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                              </div>
                              <div>
                                <p className={`font-bold ${feature.included ? 'text-white' : 'text-gray-400'}`}>
                                  {feature.name}
                                </p>
                                <p className={`text-xs ${feature.included ? 'text-white/70' : 'text-gray-500'}`}>
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <Button
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full mt-6 rounded-xl py-3 font-bold ${
                          selectedPlan === plan.id
                            ? 'bg-gradient-to-r from-deep-blue to-turquesa text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar Plan'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6 flex items-center justify-between relative z-10">
              <div className="text-white/70 text-sm">
                <p>Cancela en cualquier momento. Sin compromiso.</p>
                <p>Precios en pesos chilenos (CLP). IVA incluido.</p>
              </div>
              <Button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Suscribirse
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}