"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { priceLine, lineKey } from "@/lib/pricing";

const CartContext = createContext(null);
const STORAGE_KEY = "crave_cart_v1";

// Turns a saved or new basket line into a full line, priced from the menu data.
function buildLine(itemId, selections, qty) {
  const result = priceLine(itemId, selections);
  if (result.error) return null;
  return {
    key: lineKey(itemId, selections),
    itemId,
    selections,
    qty,
    name: result.item.name,
    unitPence: result.unitPence,
    options: result.chosen,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  // Load the saved cart once the page is in the browser.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const lines = saved
        .map((s) => buildLine(s.itemId, s.selections || {}, Math.min(50, Math.max(1, Number(s.qty) || 1))))
        .filter(Boolean);
      setItems(lines);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map(({ itemId, selections, qty }) => ({ itemId, selections, qty })))
      );
    } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const addLine = useCallback((itemId, selections, qty = 1) => {
    const line = buildLine(itemId, selections, qty);
    if (!line) return false;
    setItems((current) => {
      const existing = current.find((l) => l.key === line.key);
      if (existing) {
        return current.map((l) => (l.key === line.key ? { ...l, qty: Math.min(50, l.qty + qty) } : l));
      }
      return [...current, line];
    });
    setToast(`${qty} x ${line.name} added to cart`);
    return true;
  }, []);

  const setQty = useCallback((key, qty) => {
    setItems((current) =>
      qty < 1 ? current.filter((l) => l.key !== key) : current.map((l) => (l.key === key ? { ...l, qty: Math.min(50, qty) } : l))
    );
  }, []);

  const removeLine = useCallback((key) => setItems((current) => current.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, l) => sum + l.qty, 0);
    const subtotalPence = items.reduce((sum, l) => sum + l.unitPence * l.qty, 0);
    return { items, ready, count, subtotalPence, addLine, setQty, removeLine, clear, toast };
  }, [items, ready, toast, addLine, setQty, removeLine, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

// "Salad: Lettuce, Onion" style lines for showing a cart item's choices.
export function optionSummary(options) {
  const groups = {};
  for (const opt of options) (groups[opt.group] ||= []).push(opt.label);
  return Object.entries(groups).map(([group, labels]) => `${group}: ${labels.join(", ")}`);
}
