"use client";

import { createContext, useState, useEffect } from "react";
import { CartContextType, CartProviderProps, CartItem, Product } from "@/types";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const getLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      return JSON.parse(cartItems) as CartItem[];
    }
  }
  return [];
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getLocalStorage());

  const addToCart = (item: Product) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem: CartItem) => cartItem.name === item.name
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem: CartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: CartItem) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem: CartItem) => cartItem.name === item.name
    );

    // If the quantity is equal to 1, then remove the item from the cart
    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem: CartItem) => cartItem.name !== item.name)
      );
    } else if (isItemInCart) {
      // If the quantity is greater than 1, then subtract 1
      setCartItems(
        cartItems.map((cartItem: CartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  };

  // Persist state in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
