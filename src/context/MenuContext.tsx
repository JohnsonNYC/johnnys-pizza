// MenuDataContext.js
import { createContext, useState } from "react";
import { SpecialtyPizza } from "../types";
import { ReactNode } from "react";

import { Dispatch, SetStateAction } from "react";

interface MenuContextType {
  menuData: SpecialtyPizza[];
  setMenuData: Dispatch<SetStateAction<SpecialtyPizza[]>>;
}

interface MenuDataProviderProps {
  children: ReactNode;
}

const defaultMenuContext: MenuContextType = {
  menuData: [],
  setMenuData: () => {},
};

export const MenuDataContext =
  createContext<MenuContextType>(defaultMenuContext);

export function MenuDataProvider({ children }: MenuDataProviderProps) {
  const [menuData, setMenuData] = useState<SpecialtyPizza[]>([]);

  return (
    <MenuDataContext.Provider value={{ menuData, setMenuData }}>
      {children}
    </MenuDataContext.Provider>
  );
}
