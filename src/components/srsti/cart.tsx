import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/srsti/products";

interface CartCtx {
  count: number;
  add: (p: Product) => void;
}

const Ctx = createContext<CartCtx>({ count: 0, add: () => undefined });

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const add = useCallback((p: Product) => {
    setCount((c) => c + 1);
    toast.success(`${p.name} added to your basket`, {
      description: `${p.volume} · Batch ${p.trace.batch}`,
    });
  }, []);
  const value = useMemo(() => ({ count, add }), [count, add]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
