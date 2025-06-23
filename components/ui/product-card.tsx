'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Zap, Gift, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductShowcase } from '@/components/3d/product-showcase';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    brand: string;
    tags: string[];
    inStock: boolean;
    featured?: boolean;
  };
  onAddToCart: (product: any) => void;
  index?: number;
}

export function ProductCard({ product, onAddToCart, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discount = calculateDiscount();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group product-card holographic"
      style={{ aspectRatio: '4/5' }}
    >
      {/* Enhanced Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl">
        <ProductShowcase
          image={product.image}
          title={product.name}
          className="w-full h-full"
        />
        
        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-turquesa text-white font-bold px-3 py-1 text-sm rounded-xl shadow-premium premium-glow">
              ⭐ Destacado
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-coral-accent to-accent-yellow text-white font-bold px-3 py-1 text-sm rounded-xl shadow-premium">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge className="bg-slate-accent text-white font-bold px-3 py-1 text-sm rounded-xl">
              Agotado
            </Badge>
          )}
        </div>
        
        {/* Enhanced Quick Actions */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-400 flex space-x-3">
          <motion.div
            whileHover={{ scale: 1.2, rotateY: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button size="sm" variant="secondary" className="rounded-full p-3 glass-card shadow-premium-lg">
              <Eye className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotateY: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              size="sm" 
              variant="secondary" 
              className={`rounded-full p-3 glass-card shadow-premium-lg ${
                isWishlisted ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </motion.div>
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl" />
      </div>

      {/* Enhanced Content */}
      <div className="p-6 space-y-4 bg-white/95 backdrop-blur-xl rounded-b-3xl">
        {/* Enhanced Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              >
                <Star 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              </motion.div>
            ))}
            <span className="text-sm text-slate-accent ml-1 font-semibold">
              ({product.reviews})
            </span>
          </div>
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary font-bold px-2 py-1 neon-border">
            {product.brand}
          </Badge>
        </div>

        {/* Enhanced Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 neon-glow">
            {product.name}
          </h3>
          <p className="text-slate-accent line-clamp-2 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotateZ: 2 }}
            >
              <Badge 
                variant="secondary" 
                className="text-xs bg-turquesa/10 text-turquesa px-2 py-1 font-semibold rounded-full neon-border"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Pricing */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary neon-glow">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-accent line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Truck className="w-3 h-3 text-emerald-accent" />
              <span className="text-emerald-accent font-semibold">Envío gratis</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-violet-accent" />
              <span className="text-violet-accent font-semibold">Garantía</span>
            </div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex gap-3 pt-2">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="w-full gradient-primary hover:scale-105 transition-all duration-400 rounded-xl py-3 font-bold shadow-premium-lg premium-glow"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? 'Agregar' : 'Agotado'}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotateY: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="btn-secondary rounded-xl p-3 card-3d"
            >
              <Zap className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}