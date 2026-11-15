"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, BellOff, Printer } from "lucide-react";
import Receipt from "@/components/Receipt";
import { formatPence } from "@/lib/menuData";
import { optionSummary } from "@/components/CartProvider";

const STATUS_LABELS = {
  received: "New",
  preparing: "Preparing",
  ready: "Ready",
  "out-for-delivery": "Out for delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};

function nextSteps(order) {
  const after = order.fulfilment === "delivery" ? "out-for-delivery" : "ready";
  return {
    received: [["preparing", "Start preparing"]],
    preparing: [[after, order.fulfilment === "delivery" ? "Out for delivery" : "Ready to collect"]],
    ready: [["completed", "Mark collected"]],
    "out-for-delivery": [["completed", "Mark delivered"]],
  }[order.status] || [];
}

export default function AdminClient() {
  const [phase, setPhase] = useState("checking"); // checking | login | orders
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const [sound, setSound] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);
  const [fresh, setFresh] = useState(new Set());
  const [printing, setPrinting] = useState(null);
  const knownIds = useRef(null);
  const audioRef = useRef(null);
  const soundRef = useRef(false);
  const autoPrintRef = useRef(false);
  soundRef.current = sound;
  autoPrintRef.current = autoPrint;

  const beep = useCallback(() => {
    const ctx = audioRef.current;
    if (!ctx) return;
    [0, 0.25, 0.5].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.value = 0.2;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    });
  }, []);

  const printOrder = useCallback((order) => {
    setPrinting(order);
    setTimeout(() => window.print(), 150);
  }, []);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/orders", { cache: "no-store" });
      if (response.status === 401) {
        setPhase("login");
        return;
      }
      const data = await response.json();
      const list = data.orders || [];
      if (knownIds.current) {
        const added = list.filter((o) => !knownIds.current.has(o.id));
        if (added.length) {
          setFresh((current) => new Set([...current, ...added.map((o) => o.id)]));
          if (soundRef.current) beep();
          if (autoPrintRef.current) printOrder(added[added.length - 1]);
        }
      }
      knownIds.current = new Set(list.map((o) => o.id));
      setOrders(list);
      setPhase("orders");
    } catch {}
  }, [beep, printOrder]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (phase !== "orders") return undefined;
    const timer = setInterval(load, 8000);
    return () => clearInterval(timer);
  }, [phase, load]);

  async function login(event) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setLoginError(data.error || "Could not sign in.");
      return;
    }
    setPassword("");
    knownIds.current = null;
    load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setPhase("login");
    knownIds.current = null;
  }

  async function setStatus(order, status) {
    setFresh((current) => {
      const next = new Set(current);
      next.delete(order.id);
      return next;
    });
    const response = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) load();
  }

  function toggleSound() {
    if (!sound && !audioRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioRef.current = new Ctx();
    }
    setSound((s) => !s);
    if (!sound) setTimeout(beep, 50);
  }

  if (phase === "checking") return <p className="px-4 py-16 text-center text-neutral-500">Loading...</p>;

  if (phase === "login") {
    return (
      <form onSubmit={login} className="mx-auto my-16 max-w-sm rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">Shop orders</h1>
        <p className="mt-1 text-sm text-neutral-600">Sign in to see and print customer orders.</p>
        <label className="mt-5 block text-sm font-semibold">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-3 text-base" />
        </label>
        {loginError && <p role="alert" className="mt-3 text-sm font-semibold text-red-600">{loginError}</p>}
        <button type="submit" className="mt-5 w-full rounded-md bg-brand px-6 py-3 text-sm font-bold text-white">Sign in</button>
      </form>
    );
  }

  const active = orders.filter((o) => o.status !== "completed" && o.status !== "cancelled");
  const visible = showDone ? orders : active;

  return (
    <>
      <style>{`@media print { body * { visibility: hidden; } #print-area, #print-area * { visibility: visible; } #print-area { position: absolute; left: 0; top: 0; } }`}</style>

      <div className="mx-auto max-w-4xl px-4 py-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold">Shop orders <span className="text-base font-semibold text-neutral-500">({active.length} open)</span></h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            <button type="button" onClick={toggleSound} className={`flex items-center gap-2 rounded-full px-4 py-2 ${sound ? "bg-green-600 text-white" : "bg-neutral-200"}`}>
              {sound ? <Bell size={16} /> : <BellOff size={16} />} Sound {sound ? "on" : "off"}
            </button>
            <label className="flex items-center gap-2 rounded-full bg-neutral-200 px-4 py-2">
              <input type="checkbox" checked={autoPrint} onChange={(e) => setAutoPrint(e.target.checked)} /> Auto print
            </label>
            <label className="flex items-center gap-2 rounded-full bg-neutral-200 px-4 py-2">
              <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} /> Show finished
            </label>
            <button type="button" onClick={logout} className="rounded-full px-3 py-2 underline">Sign out</button>
          </div>
        </div>
        <p className="mt-1 text-xs text-neutral-500">Keep this page open. New orders appear by themselves every few seconds.</p>

        {visible.length === 0 && <p className="mt-10 text-center text-neutral-500">No orders yet.</p>}

        <ul className="mt-6 space-y-4">
          {visible.map((order) => (
            <li key={order.id} className={`rounded-2xl bg-white p-5 shadow-sm ${fresh.has(order.id) ? "ring-4 ring-yellow-400" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-extrabold">{order.number}</span>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${order.fulfilment === "delivery" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>{order.fulfilment === "delivery" ? "DELIVERY" : "COLLECTION"}</span>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${order.payment.method === "card" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>{order.payment.method === "card" ? `CARD ${order.payment.status === "demo-paid" ? "(TEST)" : "PAID"}` : "CASH"}</span>
                  <span className="rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-bold">{STATUS_LABELS[order.status]}</span>
                </div>
                <span className="text-sm text-neutral-500">{new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "short", timeStyle: "short" })}</span>
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-1 text-sm">
                  {order.lines.map((line, i) => (
                    <li key={i}>
                      <span className="font-bold">{line.qty} x {line.name}</span>
                      {optionSummary(line.options).map((t) => <span key={t} className="block pl-3 text-xs text-neutral-500">{t}</span>)}
                    </li>
                  ))}
                </ul>
                <div className="text-sm">
                  <p className="font-bold">{order.customer.name}</p>
                  <p><a href={`tel:${order.customer.phone}`} className="underline">{order.customer.phone}</a></p>
                  {order.fulfilment === "delivery" && <p>{order.customer.address}, {order.customer.town} {order.customer.postcode}</p>}
                  {order.customer.notes && <p className="mt-1 rounded bg-yellow-50 p-2 text-xs font-semibold">Note: {order.customer.notes}</p>}
                  <p className="mt-2 text-lg font-extrabold">{formatPence(order.totalPence)}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {nextSteps(order).map(([status, label]) => (
                  <button key={status} type="button" onClick={() => setStatus(order, status)} className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white hover:opacity-90">{label}</button>
                ))}
                <button type="button" onClick={() => printOrder(order)} className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-bold text-white"><Printer size={15} /> Print receipt</button>
                {order.status !== "completed" && order.status !== "cancelled" && (
                  <button type="button" onClick={() => window.confirm(`Cancel order ${order.number}?`) && setStatus(order, "cancelled")} className="rounded-md px-4 py-2 text-sm font-semibold text-red-600 hover:underline">Cancel order</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div id="print-area" className="hidden print:block">{printing && <Receipt order={printing} />}</div>
    </>
  );
}
