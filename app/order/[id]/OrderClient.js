"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { formatPence } from "@/lib/menuData";
import { optionSummary } from "@/components/CartProvider";
import { site } from "@/app/site";

const STEPS = {
  delivery: [["received", "Order received"], ["preparing", "Being prepared"], ["out-for-delivery", "Out for delivery"], ["completed", "Delivered"]],
  collection: [["received", "Order received"], ["preparing", "Being prepared"], ["ready", "Ready to collect"], ["completed", "Collected"]],
};

export default function OrderClient({ id }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stop = false;
    async function load() {
      try {
        const response = await fetch(`/api/orders/${id}`, { cache: "no-store" });
        if (response.status === 404) {
          if (!stop) setError("We could not find this order. Please check your link or call us.");
          return;
        }
        const data = await response.json();
        if (!stop) setOrder(data);
      } catch {}
    }
    load();
    const timer = setInterval(load, 10000);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, [id]);

  if (error) return <p className="mx-auto max-w-xl px-4 py-16 text-center font-semibold">{error}</p>;
  if (!order) return <p className="mx-auto max-w-xl px-4 py-16 text-center text-neutral-500">Loading your order...</p>;

  const steps = STEPS[order.fulfilment];
  const cancelled = order.status === "cancelled";
  const currentIndex = steps.findIndex(([key]) => key === order.status);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-brand">Thank you, {order.firstName}!</p>
        <h2 className="mt-1 text-2xl font-extrabold">Order {order.number}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {order.fulfilment === "delivery" ? "Delivery" : "Collection"} · Placed {new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "medium", timeStyle: "short" })}
        </p>

        {cancelled ? (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">
            This order was cancelled. Please call us on {site.phoneDisplay} if you have any questions.
          </p>
        ) : (
          <ol className="mt-6 space-y-4">
            {steps.map(([key, label], index) => {
              const done = index <= currentIndex;
              return (
                <li key={key} className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${done ? "bg-green-600 text-white" : "bg-neutral-200 text-neutral-500"}`}>
                    {done ? <Check size={16} /> : index + 1}
                  </span>
                  <span className={`text-sm ${index === currentIndex ? "font-extrabold" : done ? "font-semibold" : "text-neutral-500"}`}>{label}</span>
                </li>
              );
            })}
          </ol>
        )}
        <p className="mt-4 text-xs text-neutral-500">This page updates by itself. Keep this link to check on your order.</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-extrabold">Your items</h3>
        <ul className="mt-3 divide-y divide-neutral-100 text-sm">
          {order.lines.map((line, index) => (
            <li key={index} className="flex justify-between gap-3 py-2">
              <span className="min-w-0">
                <span className="font-semibold">{line.qty} x {line.name}</span>
                {optionSummary(line.options).map((t) => <span key={t} className="block text-xs text-neutral-500">{t}</span>)}
              </span>
              <span className="shrink-0 font-semibold">{formatPence(line.lineTotalPence)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 border-t border-neutral-200 pt-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPence(order.subtotalPence)}</dd></div>
          {order.deliveryFeePence > 0 && <div className="flex justify-between"><dt>Delivery</dt><dd>{formatPence(order.deliveryFeePence)}</dd></div>}
          <div className="flex justify-between text-lg font-extrabold"><dt>Total</dt><dd>{formatPence(order.totalPence)}</dd></div>
          <div className="flex justify-between text-neutral-600"><dt>Payment</dt><dd>{order.payment.method === "card" ? "Paid by card" : order.fulfilment === "delivery" ? "Cash on delivery" : "Cash on collection"}</dd></div>
        </dl>
      </div>

      <p className="mt-6 text-center text-sm">
        Problem with your order? Call <a href={`tel:${site.phoneLink}`} className="font-bold underline">{site.phoneDisplay}</a>.
      </p>
      <p className="mt-3 text-center"><Link href="/menu" className="text-sm font-semibold underline">Back to the menu</Link></p>
    </div>
  );
}
