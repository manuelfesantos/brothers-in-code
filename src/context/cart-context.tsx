import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { CartItemType } from "@/types/cart";

export interface CartContext {
  cart: CartItemType[];
  setCart: Dispatch<SetStateAction<CartItemType[]>>;
}

export const cartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItemType[]>([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
