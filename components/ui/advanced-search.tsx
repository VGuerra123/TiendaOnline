'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star, Zap, Sliders, SortAsc, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  brands: string[];
  rating: number;
  features: string[];
  sortBy: string;
  inStock: boolean;
  onSale: boolean;
}

export function AdvancedSearch({ isOpen, onClose, onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    priceRange: [0, 10000000],
    brands: [],
    rating: 0,
    features: [],
    sortBy: 'relevance',
    inStock: false,
    onSale: false,
  });

  const categories = [
    'Gaming y Streaming',
    'Computación',
    'Smartphones',
    'Audio y Video',
    'Smart Home',
    'Componentes',
    'Accesorios'
  ];

  const brands = [
    'Apple', 'Samsung', 'NVIDIA', 'AMD', 'Intel', 'Sony', 'LG', 
    'ASUS', 'MSI', 'Corsair', 'Razer', 'Logitech', 'Dell', 'HP'
  ];

  const features = [
    '5G', 'WiFi 6', 'Bluetooth 5.0', 'USB-C', 'Wireless Charging',
    'Ray Tracing', 'DLSS', 'RGB Lighting', 'Mechanical Keys',
    'Noise Cancelling', 'Water Resistant', 'Fast Charging'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'rating', label: 'Mejor Calificados' },
    { value: 'newest', label: 'Más Recientes' },
    { value: 'popular', label: 'Más Populares' },
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      priceRange: [0, 10000000],
      brands: [],
      rating: 0,
      features: [],
      sortBy: 'relevance',
      inStock: false,
      onSale: false,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
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
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-deep-blue to-turquesa p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black flex items-center">
                    <Search className="w-8 h-8 mr-3" />
                    Búsqueda Avanzada
                  </h2>
                  <p className="text-white/80 font-medium">
                    Encuentra exactamente lo que buscas
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
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Search Query */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Buscar productos
                    </label>
                    <Input
                      value={filters.query}
                      onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                      placeholder="Escribe lo que buscas..."
                      className="h-12 rounded-xl border-2 focus:border-turquesa"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Categoría
                    </label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-2">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas las categorías</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Rango de precio
                    </label>
                    <div className="space-y-4">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                        max={10000000}
                        step={50000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm font-medium text-gray-600">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Calificación mínima
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setFilters(prev => ({ ...prev, rating }))}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-xl border-2 transition-all ${
                            filters.rating === rating
                              ? 'border-turquesa bg-turquesa/10 text-turquesa'
                              : 'border-gray-200 hover:border-turquesa/50'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${rating <= filters.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          <span className="font-medium">{rating}+</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Filtros rápidos
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          checked={filters.inStock}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: !!checked }))}
                        />
                        <span className="font-medium">Solo productos en stock</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          checked={filters.onSale}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, onSale: !!checked }))}
                        />
                        <span className="font-medium">Solo productos en oferta</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Ordenar por
                    </label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brands */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Marcas
                    </label>
                    <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-xl p-4">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                          <Checkbox
                            checked={filters.brands.includes(brand)}
                            onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                          />
                          <span className="font-medium">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Características
                    </label>
                    <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-xl p-4">
                      {features.map(feature => (
                        <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                          <Checkbox
                            checked={filters.features.includes(feature)}
                            onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
                          />
                          <span className="font-medium">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.brands.length > 0 || filters.features.length > 0 || filters.category || filters.rating > 0) && (
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-700 mb-3">Filtros activos:</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <Badge className="bg-turquesa/10 text-turquesa">
                        Categoría: {filters.category}
                      </Badge>
                    )}
                    {filters.rating > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {filters.rating}+ estrellas
                      </Badge>
                    )}
                    {filters.brands.map(brand => (
                      <Badge key={brand} className="bg-deep-blue/10 text-deep-blue">
                        {brand}
                      </Badge>
                    ))}
                    {filters.features.map(feature => (
                      <Badge key={feature} className="bg-cool-grey/10 text-cool-grey">
                        {feature}
                      </Badge>
                    ))}
                    {filters.inStock && (
                      <Badge className="bg-green-100 text-green-800">
                        En stock
                      </Badge>
                    )}
                    {filters.onSale && (
                      <Badge className="bg-red-100 text-red-800">
                        En oferta
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar filtros
                </Button>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
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