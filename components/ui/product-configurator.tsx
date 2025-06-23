'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Cpu, MemoryStick as Memory, HardDrive, Zap, Monitor, Gamepad, Smartphone, Headphones, Plus, Minus, ShoppingCart, Save, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductShowcase } from '@/components/3d/product-showcase';

interface ProductConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    basePrice: number;
    image: string;
    category: string;
  };
}

interface ConfigOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  recommended?: boolean;
}

interface ConfigCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  options: ConfigOption[];
  required: boolean;
}

export function ProductConfigurator({ isOpen, onClose, product }: ProductConfiguratorProps) {
  // Configuraciones disponibles según la categoría del producto
  const getConfigCategories = (): ConfigCategory[] => {
    switch (product.category) {
      case 'laptop':
        return [
          {
            id: 'processor',
            name: 'Procesador',
            icon: Cpu,
            required: true,
            options: [
              { id: 'i5', name: 'Intel Core i5', description: 'Rendimiento equilibrado', price: 0, recommended: false },
              { id: 'i7', name: 'Intel Core i7', description: 'Alto rendimiento', price: 200000, recommended: true },
              { id: 'i9', name: 'Intel Core i9', description: 'Rendimiento extremo', price: 500000, recommended: false },
            ]
          },
          {
            id: 'memory',
            name: 'Memoria RAM',
            icon: Memory,
            required: true,
            options: [
              { id: '8gb', name: '8GB DDR4', description: 'Multitarea básica', price: 0, recommended: false },
              { id: '16gb', name: '16GB DDR4', description: 'Multitarea avanzada', price: 100000, recommended: true },
              { id: '32gb', name: '32GB DDR4', description: 'Workstation', price: 250000, recommended: false },
            ]
          },
          {
            id: 'storage',
            name: 'Almacenamiento',
            icon: HardDrive,
            required: true,
            options: [
              { id: '256gb', name: '256GB SSD', description: 'Básico', price: 0, recommended: false },
              { id: '512gb', name: '512GB SSD', description: 'Recomendado', price: 80000, recommended: true },
              { id: '1tb', name: '1TB SSD', description: 'Profesional', price: 180000, recommended: false },
            ]
          },
          {
            id: 'gpu',
            name: 'Tarjeta Gráfica',
            icon: Monitor,
            required: true,
            options: [
              { id: 'integrated', name: 'Integrada', description: 'Uso básico', price: 0, recommended: false },
              { id: 'rtx3050', name: 'NVIDIA RTX 3050', description: 'Gaming casual', price: 300000, recommended: true },
              { id: 'rtx4060', name: 'NVIDIA RTX 4060', description: 'Gaming avanzado', price: 600000, recommended: false },
            ]
          }
        ];
      case 'smartphone':
        return [
          {
            id: 'storage',
            name: 'Almacenamiento',
            icon: HardDrive,
            required: true,
            options: [
              { id: '128gb', name: '128GB', description: 'Uso básico', price: 0, recommended: false },
              { id: '256gb', name: '256GB', description: 'Uso avanzado', price: 150000, recommended: true },
              { id: '512gb', name: '512GB', description: 'Uso profesional', price: 300000, recommended: false },
            ]
          },
          {
            id: 'color',
            name: 'Color',
            icon: Smartphone,
            required: true,
            options: [
              { id: 'black', name: 'Negro Titanio', description: 'Elegante y clásico', price: 0, recommended: true },
              { id: 'white', name: 'Blanco Perla', description: 'Minimalista', price: 0, recommended: false },
              { id: 'blue', name: 'Azul Profundo', description: 'Exclusivo', price: 20000, recommended: false },
            ]
          }
        ];
      case 'gaming':
        return [
          {
            id: 'cpu',
            name: 'Procesador',
            icon: Cpu,
            required: true,
            options: [
              { id: 'i7', name: 'Intel Core i7', description: 'Gaming avanzado', price: 0, recommended: false },
              { id: 'i9', name: 'Intel Core i9', description: 'Gaming extremo', price: 300000, recommended: true },
              { id: 'ryzen9', name: 'AMD Ryzen 9', description: 'Alternativa premium', price: 280000, recommended: false },
            ]
          },
          {
            id: 'gpu',
            name: 'Tarjeta Gráfica',
            icon: Gamepad,
            required: true,
            options: [
              { id: 'rtx4070', name: 'NVIDIA RTX 4070', description: 'Gaming 1440p', price: 0, recommended: false },
              { id: 'rtx4080', name: 'NVIDIA RTX 4080', description: 'Gaming 4K', price: 500000, recommended: true },
              { id: 'rtx4090', name: 'NVIDIA RTX 4090', description: 'Gaming 4K extremo', price: 1000000, recommended: false },
            ]
          },
          {
            id: 'memory',
            name: 'Memoria RAM',
            icon: Memory,
            required: true,
            options: [
              { id: '16gb', name: '16GB DDR5', description: 'Estándar gaming', price: 0, recommended: false },
              { id: '32gb', name: '32GB DDR5', description: 'Gaming avanzado', price: 150000, recommended: true },
              { id: '64gb', name: '64GB DDR5', description: 'Streaming profesional', price: 350000, recommended: false },
            ]
          }
        ];
      default:
        return [];
    }
  };

  const configCategories = getConfigCategories();
  
  // Estado para las selecciones del usuario
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    // Inicializar con las opciones recomendadas
    const initialOptions: Record<string, string> = {};
    configCategories.forEach(category => {
      const recommendedOption = category.options.find(option => option.recommended);
      if (recommendedOption) {
        initialOptions[category.id] = recommendedOption.id;
      } else if (category.options.length > 0) {
        initialOptions[category.id] = category.options[0].id;
      }
    });
    return initialOptions;
  });

  // Calcular precio total
  const calculateTotalPrice = (): number => {
    let total = product.basePrice;
    
    configCategories.forEach(category => {
      const selectedOptionId = selectedOptions[category.id];
      if (selectedOptionId) {
        const option = category.options.find(opt => opt.id === selectedOptionId);
        if (option) {
          total += option.price;
        }
      }
    });
    
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOptionSelect = (categoryId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: optionId
    }));
  };

  const handleAddToCart = () => {
    // Aquí se agregaría el producto configurado al carrito
    console.log('Producto configurado agregado al carrito:', {
      productId: product.id,
      configuration: selectedOptions,
      totalPrice: calculateTotalPrice()
    });
    onClose();
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
                  <h2 className="text-3xl font-black">Configurador Premium</h2>
                  <p className="text-white/80 font-medium">
                    Personaliza tu {product.name} a medida
                  </p>
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

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[70vh]">
              {/* Product Preview */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <ProductShowcase
                    image={product.image}
                    title={product.name}
                    className="w-full h-80 lg:h-96"
                  />
                  <h3 className="text-2xl font-bold mt-6 mb-2">{product.name}</h3>
                  <div className="text-3xl font-black text-deep-blue">
                    {formatPrice(calculateTotalPrice())}
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Configuración personalizada
                  </p>
                </div>
              </div>

              {/* Configuration Options */}
              <div className="overflow-y-auto p-6">
                <Tabs defaultValue={configCategories[0]?.id}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    {configCategories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-turquesa data-[state=active]:text-white"
                      >
                        <category.icon className="w-5 h-5 mr-2" />
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {configCategories.map(category => (
                    <TabsContent key={category.id} value={category.id} className="space-y-4">
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Selecciona {category.name}</h3>
                        
                        {category.options.map(option => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                              selectedOptions[category.id] === option.id
                                ? 'border-turquesa bg-turquesa/5'
                                : 'border-gray-200 hover:border-turquesa/50'
                            }`}
                            onClick={() => handleOptionSelect(category.id, option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  selectedOptions[category.id] === option.id
                                    ? 'bg-turquesa text-white'
                                    : 'bg-gray-200'
                                }`}>
                                  {selectedOptions[category.id] === option.id && (
                                    <Check className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-bold">{option.name}</h4>
                                    {option.recommended && (
                                      <Badge className="ml-2 bg-deep-blue text-white text-xs">
                                        Recomendado
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-sm">{option.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-deep-blue">
                                  {option.price > 0 ? `+ ${formatPrice(option.price)}` : 'Incluido'}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 font-medium">Precio Total:</div>
                  <div className="text-3xl font-black text-deep-blue">
                    {formatPrice(calculateTotalPrice())}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Hasta 24 cuotas sin interés • Envío gratis
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Config
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar al Carrito
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}