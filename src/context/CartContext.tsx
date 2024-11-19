import React, { createContext, useState, ReactNode } from "react";
import { Pizza } from "../types"; // Adjust the import path as needed

interface CartContextType {
  cart: { id: string; pizza: Pizza }[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (index: number) => void;
  updateItemQuantity: (index: number, quantity: number) => void;
}

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItemQuantity: () => {},
};
export const CartContext = createContext<CartContextType>(defaultCartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<{ id: string; pizza: Pizza }[]>([]);

  const addToCart = (pizza: Pizza) => {
    setCart((prevCart) => [...prevCart, { id: `${Date.now()}`, pizza }]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
