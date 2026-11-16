"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CartLine, computeTotals, isPackId, MAX_QTY_PER_LINE, PackId, Totals } from "@/lib/pricing";

const STORAGE_KEY = "briva-cart-v1";

type CartContextValue = {
  lines: CartLine[];
  totals: Totals;
  ready: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (packId: PackId, qty?: number) => void;
  setQty: (packId: PackId, qty: number) => void;
  remove: (packId: PackId) => void;
  replace: (from: PackId, to: PackId) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const clamp = (n: number) => Math.max(0, Math.min(MAX_QTY_PER_LINE, Math.floor(n)));

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => isPackId(l?.packId) && Number.isFinite(l?.qty))
      .map((l) => ({ packId: l.packId, qty: clamp(l.qty) }))
      .filter((l) => l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable – cart still works in memory */
    }
  }, [lines, ready]);

  const setQty = useCallback((packId: PackId, qty: number) => {
    setLines((prev) => {
      const q = clamp(qty);
      const exists = prev.some((l) => l.packId === packId);
      if (q === 0) return prev.filter((l) => l.packId !== packId);
      if (!exists) return [...prev, { packId, qty: q }];
      return prev.map((l) => (l.packId === packId ? { ...l, qty: q } : l));
    });
  }, []);

  const add = useCallback((packId: PackId, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.packId === packId);
      if (!existing) return [...prev, { packId, qty: clamp(qty) }];
      return prev.map((l) => (l.packId === packId ? { ...l, qty: clamp(l.qty + qty) } : l));
    });
  }, []);

  const remove = useCallback((packId: PackId) => {
    setLines((prev) => prev.filter((l) => l.packId !== packId));
  }, []);

  const replace = useCallback((from: PackId, to: PackId) => {
    setLines((prev) => {
      const fromLine = prev.find((l) => l.packId === from);
      if (!fromLine) return prev;
      const rest = prev.filter((l) => l.packId !== from);
      const target = rest.find((l) => l.packId === to);
      if (target) return rest.map((l) => (l.packId === to ? { ...l, qty: clamp(l.qty + 1) } : l));
      return [...rest, { packId: to, qty: 1 }];
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals: computeTotals(lines),
      ready,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      replace,
      clear,
    }),
    [lines, ready, isOpen, add, setQty, remove, replace, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
