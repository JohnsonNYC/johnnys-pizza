import React, { createContext, useState, ReactNode } from "react";
import { Pizza } from "../types";

interface CartContextType {
  cart: { id: string; pizza: Pizza }[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (uniqueId: string) => void;
  updateItemQuantity: (uniqueId: string, quantity: number) => void;
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

  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== uniqueId));
  };

  const updateItemQuantity = (uniqueId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map(({ id, pizza }) => {
        return id === uniqueId
          ? { id, pizza: { ...pizza, quantity } }
          : { id, pizza };
      })
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
