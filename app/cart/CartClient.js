"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, optionSummary } from "@/components/CartProvider";
import ClosedBanner from "@/components/ClosedBanner";
import { useShopStatus } from "@/components/useShopStatus";
import { formatPence } from "@/lib/menuData";

export default function CartClient() {
  const { items, ready, subtotalPence, setQty, removeLine, clear } = useCart();
  const { open } = useShopStatus();

  if (!ready) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-neutral-500">Loading your cart...</div>;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-bold">Your cart is empty.</p>
        <p className="mt-2 text-sm text-neutral-600">Pick something tasty from our menu.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white hover:opacity-90">
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <>
      <ClosedBanner />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <ul className="space-y-3">
          {items.map((line) => (
            <li key={line.key} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold leading-snug">{line.name}</p>
                  {optionSummary(line.options).map((text) => (
                    <p key={text} className="mt-0.5 text-xs leading-5 text-neutral-500">{text}</p>
                  ))}
                </div>
                <p className="shrink-0 font-bold">{formatPence(line.unitPence * line.qty)}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setQty(line.key, line.qty - 1)} aria-label={`Decrease ${line.name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100">
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-bold" aria-live="polite">{line.qty}</span>
                  <button type="button" onClick={() => setQty(line.key, line.qty + 1)} aria-label={`Increase ${line.name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100">
                    <Plus size={16} />
                  </button>
                </div>
                <button type="button" onClick={() => removeLine(line.key)} className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline">
                  <Trash2 size={15} /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-bold">{formatPence(subtotalPence)}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Any delivery charge is added at checkout.</p>

          {open ? (
            <Link href="/checkout" className="mt-5 block rounded-md bg-brand px-6 py-3.5 text-center text-sm font-bold text-white hover:opacity-90">
              Go to Checkout
            </Link>
          ) : (
            <p className="mt-5 rounded-md bg-red-100 px-4 py-3 text-center text-sm font-semibold">
              We&apos;re closed right now, so checkout is not available. You can keep your cart and order when we open.
            </p>
          )}
          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/menu" className="font-semibold underline">Add more items</Link>
            <button type="button" onClick={clear} className="font-semibold text-neutral-500 hover:underline">Empty cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
