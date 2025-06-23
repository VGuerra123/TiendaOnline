'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchWithSuggestionsProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchWithSuggestions({ 
  onSearch, 
  placeholder = "Buscar productos...", 
  className = "" 
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState([
    'iPhone 15 Pro Max',
    'RTX 4090',
    'MacBook Pro M3',
    'Samsung Galaxy S24'
  ]);
  
  const [trendingSearches] = useState([
    'Gaming PC',
    'Audífonos Bluetooth',
    'Monitor 4K',
    'SSD NVMe'
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const clearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full pr-20 pl-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all"
          />
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearQuery}
              className="absolute right-12 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          )}
          
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">Búsquedas recientes</span>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-600">Tendencias</span>
              </div>
              <div className="space-y-1">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}