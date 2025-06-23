'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X, RotateCcw, Zap, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

export function Filters({ onFiltersChange, className = '' }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const brands = [
    { name: 'Apple', count: 245, popular: true },
    { name: 'Samsung', count: 189, popular: true },
    { name: 'Sony', count: 156, popular: false },
    { name: 'LG', count: 134, popular: false },
    { name: 'Xiaomi', count: 98, popular: true },
    { name: 'OnePlus', count: 67, popular: false },
    { name: 'Google', count: 45, popular: false },
    { name: 'Nothing', count: 23, popular: false },
  ];

  const categories = [
    { name: 'Smartphones', count: 456, icon: '📱' },
    { name: 'Laptops', count: 234, icon: '💻' },
    { name: 'Tablets', count: 123, icon: '📟' },
    { name: 'Audio', count: 189, icon: '🎧' },
    { name: 'Gaming', count: 167, icon: '🎮' },
    { name: 'Accesorios', count: 345, icon: '⚡' },
  ];

  const features = [
    { name: '5G', count: 234, trending: true },
    { name: 'Wireless Charging', count: 189, trending: false },
    { name: 'Water Resistant', count: 156, trending: false },
    { name: 'Fast Charging', count: 298, trending: true },
    { name: 'AI Camera', count: 167, trending: true },
    { name: 'OLED Display', count: 134, trending: false },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature]);
    } else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 10000000]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
  };

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + selectedFeatures.length;

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-between h-12 rounded-2xl glass-button font-semibold"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge className="premium-badge-primary ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </Button>
      </div>

      {/* Filters Content */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-foreground">Filtros</h3>
                {activeFiltersCount > 0 && (
                  <Badge className="premium-badge-primary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  size="sm"
                  className="text-cyan-500 hover:text-cyan-600 font-semibold"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Price Range */}
            <motion.div 
              className="glass-card rounded-2xl p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">💰</span>
                Rango de Precio
              </h4>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-blue-600">{formatPrice(priceRange[0])}</span>
                  <span className="text-blue-600">{formatPrice(priceRange[1])}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Hasta $500K', value: [0, 500000] },
                    { label: '$500K - $2M', value: [500000, 2000000] },
                    { label: 'Más de $2M', value: [2000000, 10000000] },
                  ].map((preset, index) => (
                    <Button
                      key={index}
                      onClick={() => setPriceRange(preset.value)}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-xl glass-button"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
              className="glass-card rounded-2xl p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">📂</span>
                Categorías
              </h4>
              <div className="space-y-3">
                {categories.map((category) => (
                  <motion.div 
                    key={category.name} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`category-${category.name}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                      />
                      <label 
                        htmlFor={`category-${category.name}`} 
                        className="flex items-center space-x-2 cursor-pointer font-medium"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Brands */}
            <motion.div 
              className="glass-card rounded-2xl p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">🏷️</span>
                Marcas
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {brands.map((brand) => (
                  <motion.div 
                    key={brand.name} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`brand-${brand.name}`}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={(checked) => handleBrandChange(brand.name, checked as boolean)}
                      />
                      <label 
                        htmlFor={`brand-${brand.name}`} 
                        className="cursor-pointer font-medium flex items-center space-x-2"
                      >
                        <span>{brand.name}</span>
                        {brand.popular && (
                          <TrendingUp className="w-3 h-3 text-orange-500" />
                        )}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {brand.count}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="glass-card rounded-2xl p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Características
              </h4>
              <div className="space-y-3">
                {features.map((feature) => (
                  <motion.div 
                    key={feature.name} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`feature-${feature.name}`}
                        checked={selectedFeatures.includes(feature.name)}
                        onCheckedChange={(checked) => handleFeatureChange(feature.name, checked as boolean)}
                      />
                      <label 
                        htmlFor={`feature-${feature.name}`} 
                        className="cursor-pointer font-medium flex items-center space-x-2"
                      >
                        <span>{feature.name}</span>
                        {feature.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1">
                            <Zap className="w-3 h-3 mr-1" />
                            HOT
                          </Badge>
                        )}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.count}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Filters */}
            <motion.div 
              className="glass-card rounded-2xl p-6"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">🚀</span>
                Filtros Rápidos
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Más Vendidos', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Mejor Calificados', icon: Star, color: 'from-yellow-500 to-orange-500' },
                  { label: 'En Oferta', icon: Zap, color: 'from-red-500 to-pink-500' },
                  { label: 'Nuevos', icon: Zap, color: 'from-green-500 to-emerald-500' },
                ].map((filter, index) => (
                  <motion.button
                    key={index}
                    className={`px-4 py-2 rounded-xl bg-gradient-to-r ${filter.color} text-white font-semibold text-sm flex items-center space-x-2 hover:scale-105 transition-transform`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Apply Filters Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full h-12 rounded-2xl btn-primary font-bold text-lg"
                onClick={() => onFiltersChange?.({
                  priceRange,
                  brands: selectedBrands,
                  categories: selectedCategories,
                  features: selectedFeatures,
                })}
              >
                Aplicar Filtros
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-white/20 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}