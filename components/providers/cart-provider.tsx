'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { shopifyService, ShopifyCart } from '@/lib/shopify';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  compareAtPrice?: number;
}

interface CartContextType {
  items: CartItem[];
  shopifyCart: ShopifyCart | null;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
  loading: boolean;
  proceedToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shopifyCart, setShopifyCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
  }, [items]);

  const initializeCart = async () => {
    try {
      // Load cart from localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }

      // Check if we have a Shopify cart ID
      const cartId = localStorage.getItem('shopify_cart_id');
      if (cartId) {
        try {
          const cart = await shopifyService.getCart(cartId);
          setShopifyCart(cart);
        } catch (error) {
          // If cart is invalid, create a new one
          localStorage.removeItem('shopify_cart_id');
        }
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  };

  const createOrGetCart = async (): Promise<ShopifyCart> => {
    if (shopifyCart) {
      return shopifyCart;
    }

    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      try {
        const cart = await shopifyService.getCart(cartId);
        setShopifyCart(cart);
        return cart;
      } catch (error) {
        localStorage.removeItem('shopify_cart_id');
      }
    }

    // Create new cart
    const newCart = await shopifyService.createCart();
    localStorage.setItem('shopify_cart_id', newCart.id);
    setShopifyCart(newCart);
    return newCart;
  };

  const addItem = async (newItem: CartItem) => {
    setLoading(true);
    try {
      // Update local cart
      setItems(prev => {
        const existingItem = prev.find(item => item.variantId === newItem.variantId);
        if (existingItem) {
          return prev.map(item =>
            item.variantId === newItem.variantId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        return [...prev, newItem];
      });

      // Update Shopify cart
      const cart = await createOrGetCart();
      const updatedCart = await shopifyService.addLinesToCart(cart.id, [{
        variantId: newItem.variantId,
        quantity: newItem.quantity
      }]);
      setShopifyCart(updatedCart);

      toast({
        title: "Producto agregado",
        description: `${newItem.name} se agregó al carrito`,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (variantId: string) => {
    setLoading(true);
    try {
      const itemToRemove = items.find(item => item.variantId === variantId);
      if (!itemToRemove) return;

      // Update local cart
      setItems(prev => prev.filter(item => item.variantId !== variantId));

      // Update Shopify cart
      if (shopifyCart) {
        const lineItem = shopifyCart.lineItems.find(item => item.variant.id === variantId);
        if (lineItem) {
          const updatedCart = await shopifyService.removeLinesFromCart(shopifyCart.id, [lineItem.id]);
          setShopifyCart(updatedCart);
        }
      }

      toast({
        title: "Producto eliminado",
        description: `${itemToRemove.name} se eliminó del carrito`,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto del carrito",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(variantId);
      return;
    }

    setLoading(true);
    try {
      // Update local cart
      setItems(prev =>
        prev.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
      );

      // Update Shopify cart
      if (shopifyCart) {
        const lineItem = shopifyCart.lineItems.find(item => item.variant.id === variantId);
        if (lineItem) {
          const updatedCart = await shopifyService.updateLinesInCart(shopifyCart.id, [{
            id: lineItem.id,
            quantity
          }]);
          setShopifyCart(updatedCart);
        }
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      setItems([]);
      localStorage.removeItem('cart');
      localStorage.removeItem('shopify_cart_id');
      setShopifyCart(null);

      toast({
        title: "Carrito vaciado",
        description: "Se eliminaron todos los productos del carrito",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const proceedToCheckout = () => {
    if (shopifyCart && shopifyCart.webUrl) {
      window.open(shopifyCart.webUrl, '_blank');
    } else {
      toast({
        title: "Error",
        description: "No se pudo proceder al checkout",
        variant: "destructive",
      });
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        shopifyCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        loading,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}