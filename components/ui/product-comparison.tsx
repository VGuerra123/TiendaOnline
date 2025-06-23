'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Star, Check, Zap, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  specs: Record<string, string>;
  features: string[];
  pros: string[];
  cons: string[];
}

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: () => void;
  onRemoveProduct: (id: string) => void;
}

export function ProductComparison({ 
  isOpen, 
  onClose, 
  products, 
  onAddProduct, 
  onRemoveProduct 
}: ProductComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState('specs');

  const categories = [
    { id: 'specs', label: 'Especificaciones', icon: Zap },
    { id: 'features', label: 'Características', icon: Star },
    { id: 'pros-cons', label: 'Pros y Contras', icon: Check },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
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
            <div className="bg-gradient-to-r from-deep-blue to-turquesa p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black">Comparador Premium</h2>
                  <p className="text-white/80 font-medium">Compara hasta 4 productos lado a lado</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-xl p-3"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 p-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-deep-blue to-turquesa text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Products */}
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-turquesa/50 transition-all"
                  >
                    {/* Product Header */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {product.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white font-bold">
                          -{calculateDiscount(product.price, product.originalPrice)}%
                        </Badge>
                      )}
                    </div>

                    <div className="p-4">
                      {/* Product Info */}
                      <div className="mb-4">
                        <Badge className="mb-2 bg-primary/10 text-primary">{product.brand}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.reviews})</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black text-primary">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Category Content */}
                      {selectedCategory === 'specs' && (
                        <div className="space-y-2">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-600 font-medium">{key}:</span>
                              <span className="font-bold text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedCategory === 'features' && (
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedCategory === 'pros-cons' && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold text-green-600 mb-2">Pros</h4>
                            {product.pros.map((pro, idx) => (
                              <div key={idx} className="flex items-center space-x-2 mb-1">
                                <Check className="w-3 h-3 text-green-500" />
                                <span className="text-sm">{pro}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="font-bold text-red-600 mb-2">Contras</h4>
                            {product.cons.map((con, idx) => (
                              <div key={idx} className="flex items-center space-x-2 mb-1">
                                <X className="w-3 h-3 text-red-500" />
                                <span className="text-sm">{con}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Add Product Slot */}
                {products.length < 4 && (
                  <motion.button
                    onClick={onAddProduct}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-turquesa hover:text-turquesa transition-all min-h-[400px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-12 h-12 mb-4" />
                    <span className="font-bold text-lg">Agregar Producto</span>
                    <span className="text-sm">Compara hasta 4 productos</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-turquesa" />
                    <span>Garantía Premium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-deep-blue" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-cool-grey" />
                    <span>Instalación Incluida</span>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
                >
                  Cerrar Comparador
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}