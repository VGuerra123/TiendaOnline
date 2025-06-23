'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check, Star, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  icon?: any;
}

interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'rating' | 'tags';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
}

interface InteractiveFiltersProps {
  sections: FilterSection[];
  onFiltersChange: (filters: Record<string, any>) => void;
  className?: string;
}

export function InteractiveFilters({ sections, onFiltersChange, className = "" }: InteractiveFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (sectionId: string, value: any) => {
    const newFilters = { ...activeFilters, [sectionId]: value };
    setActiveFilters(newFilters);
  };

  const applyFilters = () => {
    setAppliedFilters(activeFilters);
    onFiltersChange(activeFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setAppliedFilters({});
    onFiltersChange({});
  };

  const getAppliedFiltersCount = () => {
    return Object.keys(appliedFilters).filter(key => {
      const value = appliedFilters[key];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return value !== undefined && value !== null && value !== '';
    }).length;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="relative btn-secondary font-semibold px-6 py-3 rounded-2xl border-2"
      >
        <Filter className="w-5 h-5 mr-2" />
        Filtros Avanzados
        {getAppliedFiltersCount() > 0 && (
          <Badge className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
            {getAppliedFiltersCount()}
          </Badge>
        )}
      </Button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Filtros Avanzados</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {getAppliedFiltersCount() > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {getAppliedFiltersCount()} filtro(s) aplicado(s)
                  </p>
                )}
              </div>

              {/* Filter Sections */}
              <div className="p-6 space-y-8">
                {sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h4 className="font-bold text-gray-800 text-lg">{section.title}</h4>

                    {/* Checkbox Filters */}
                    {section.type === 'checkbox' && section.options && (
                      <div className="space-y-3">
                        {section.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={option.id}
                              checked={activeFilters[section.id]?.includes(option.id) || false}
                              onCheckedChange={(checked) => {
                                const currentValues = activeFilters[section.id] || [];
                                const newValues = checked
                                  ? [...currentValues, option.id]
                                  : currentValues.filter((id: string) => id !== option.id);
                                handleFilterChange(section.id, newValues);
                              }}
                            />
                            <label
                              htmlFor={option.id}
                              className="flex items-center justify-between flex-1 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                {option.icon && <option.icon className="w-4 h-4 text-gray-500" />}
                                <span className="text-sm font-medium text-gray-700">
                                  {option.label}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">({option.count})</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Range Filters */}
                    {section.type === 'range' && section.min !== undefined && section.max !== undefined && (
                      <div className="space-y-4">
                        <Slider
                          value={activeFilters[section.id] || [section.min, section.max]}
                          onValueChange={(value) => handleFilterChange(section.id, value)}
                          max={section.max}
                          min={section.min}
                          step={section.step || 1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            {formatPrice(activeFilters[section.id]?.[0] || section.min)}
                          </span>
                          <span>
                            {formatPrice(activeFilters[section.id]?.[1] || section.max)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Rating Filters */}
                    {section.type === 'rating' && (
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleFilterChange(section.id, rating)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                              activeFilters[section.id] === rating
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium">y más</span>
                            </div>
                            {activeFilters[section.id] === rating && (
                              <Check className="w-4 h-4 text-blue-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Tag Filters */}
                    {section.type === 'tags' && section.options && (
                      <div className="flex flex-wrap gap-2">
                        {section.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              const currentValues = activeFilters[section.id] || [];
                              const isSelected = currentValues.includes(option.id);
                              const newValues = isSelected
                                ? currentValues.filter((id: string) => id !== option.id)
                                : [...currentValues, option.id];
                              handleFilterChange(section.id, newValues);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              activeFilters[section.id]?.includes(option.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option.icon && <option.icon className="w-4 h-4 mr-1 inline" />}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-3">
                <Button
                  onClick={applyFilters}
                  className="w-full btn-primary font-bold py-3 rounded-2xl"
                >
                  Aplicar Filtros
                </Button>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full font-semibold py-3 rounded-2xl"
                >
                  Limpiar Todo
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}