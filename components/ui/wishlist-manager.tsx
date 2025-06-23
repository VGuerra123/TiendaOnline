'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingCart, Share2, Star, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  inStock: boolean;
  addedAt: Date;
}

interface WishlistManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistManager({ isOpen, onClose }: WishlistManagerProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock data - en una app real esto vendría de una API o localStorage
  useEffect(() => {
    const mockItems: WishlistItem[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro Max 256GB Titanio',
        price: 4999990,
        originalPrice: 5499990,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviews: 2847,
        brand: 'Apple',
        category: 'Smartphones',
        inStock: true,
        addedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'MacBook Pro M3 Max 16" 1TB',
        price: 5999990,
        originalPrice: 6499990,
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        reviews: 1923,
        brand: 'Apple',
        category: 'Laptops',
        inStock: true,
        addedAt: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'NVIDIA RTX 4090 Gaming X Trio',
        price: 2899990,
        originalPrice: 3299990,
        image: 'https://images.pexels.com/photos/7947661/pexels-photo-7947661.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviews: 1456,
        brand: 'NVIDIA',
        category: 'Gaming',
        inStock: false,
        addedAt: new Date('2024-01-05')
      }
    ];
    setWishlistItems(mockItems);
  }, []);

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

  const handleRemoveItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó de tu lista de deseos",
    });
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Producto sin stock",
        description: "Este producto no está disponible actualmente",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Agregado al carrito",
      description: `${item.name} se agregó al carrito`,
    });
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast({
      title: "Productos eliminados",
      description: `${selectedItems.length} productos eliminados de tu lista`,
    });
  };

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href + '/wishlist/shared');
    toast({
      title: "Enlace copiado",
      description: "El enlace de tu lista se copió al portapapeles",
    });
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
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-deep-blue to-turquesa p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black flex items-center">
                    <Heart className="w-8 h-8 mr-3 fill-white" />
                    Mi Lista VIP
                  </h2>
                  <p className="text-white/80 font-medium">
                    {wishlistItems.length} productos guardados
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShareWishlist}
                    className="text-white hover:bg-white/20 rounded-xl px-4 py-2"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartir
                  </Button>
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
            </div>

            {/* Actions Bar */}
            {wishlistItems.length > 0 && (
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === wishlistItems.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-turquesa rounded focus:ring-turquesa"
                      />
                      <span className="font-medium">Seleccionar todos</span>
                    </label>
                    {selectedItems.length > 0 && (
                      <Badge className="bg-turquesa/10 text-turquesa">
                        {selectedItems.length} seleccionados
                      </Badge>
                    )}
                  </div>
                  {selectedItems.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveSelected}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar seleccionados
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">
                    Tu lista está vacía
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Agrega productos a tu lista de deseos para verlos aquí
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
                  >
                    Explorar Productos
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg ${
                        selectedItems.includes(item.id) 
                          ? 'border-turquesa shadow-lg' 
                          : 'border-gray-200 hover:border-turquesa/50'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        
                        {/* Checkbox */}
                        <div className="absolute top-3 left-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-5 h-5 text-turquesa rounded focus:ring-turquesa"
                          />
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Badges */}
                        <div className="absolute bottom-3 left-3 flex flex-col gap-2">
                          {item.originalPrice && (
                            <Badge className="bg-red-500 text-white font-bold">
                              -{calculateDiscount(item.price, item.originalPrice)}%
                            </Badge>
                          )}
                          {!item.inStock && (
                            <Badge className="bg-gray-500 text-white font-bold">
                              Sin Stock
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <Badge className="mb-2 bg-primary/10 text-primary text-xs">
                          {item.brand}
                        </Badge>
                        
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {item.name}
                        </h3>

                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({item.reviews})</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black text-primary">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Agregado el {item.addedAt.toLocaleDateString('es-CL')}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            className="flex-1 bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {item.inStock ? 'Agregar' : 'Sin Stock'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3 py-2 rounded-xl border-turquesa/30 hover:bg-turquesa/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">
                      Total estimado: {formatPrice(wishlistItems.reduce((sum, item) => sum + item.price, 0))}
                    </p>
                    <p>
                      Ahorro potencial: {formatPrice(wishlistItems.reduce((sum, item) => 
                        sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0
                      ))}
                    </p>
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-deep-blue to-turquesa text-white font-bold px-8 py-3 rounded-xl"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}