import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/srsti/products";

export interface CartItem {
  id: string; // Unique combination of productId + volume
  productId: string;
  name: string;
  volume: string;
  price: number;
  quantity: number;
  image: string;
  batch: string;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  isFreeShipping: boolean;
  add: (product: Product) => void;
  addItem: (product: Product, volume?: string, price?: number, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1500;

const Ctx = createContext<CartCtx>({
  items: [],
  count: 0,
  subtotal: 0,
  isCartOpen: false,
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  remainingForFreeShipping: FREE_SHIPPING_THRESHOLD,
  isFreeShipping: false,
  add: () => undefined,
  addItem: () => undefined,
  updateQuantity: () => undefined,
  removeItem: () => undefined,
  clearCart: () => undefined,
  setIsCartOpen: () => undefined,
  openCart: () => undefined,
  closeCart: () => undefined,
});

const STORAGE_KEY = "srsti-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback(
    (product: Product, chosenVolume?: string, chosenPrice?: number, qty: number = 1) => {
      const vol = chosenVolume || product.volume;
      const price = chosenPrice !== undefined ? chosenPrice : product.price;
      const itemId = `${product.id}-${vol.replace(/\s+/g, "")}`;

      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === itemId);
        if (existingIndex > -1 && prev[existingIndex]) {
          const updated = [...prev];
          const item = updated[existingIndex];
          if (item) {
            item.quantity += qty;
          }
          return updated;
        }
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            volume: vol,
            price: price,
            quantity: qty,
            image: product.image,
            batch: product.trace.batch,
          },
        ];
      });

      toast.success(`${product.name} added to your basket`, {
        description: `${vol} · Batch ${product.trace.batch}`,
      });
      setIsCartOpen(true);
    },
    [],
  );

  const add = useCallback(
    (product: Product) => {
      addItem(product, product.volume, product.price, 1);
    },
    [addItem],
  );

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.info("Item removed from basket");
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isCartOpen,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      remainingForFreeShipping,
      isFreeShipping,
      add,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setIsCartOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      count,
      subtotal,
      isCartOpen,
      remainingForFreeShipping,
      isFreeShipping,
      add,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
