"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Banknote, CreditCard, Lock } from "lucide-react";
import { useCart, optionSummary } from "@/components/CartProvider";
import ClosedBanner from "@/components/ClosedBanner";
import { useShopStatus } from "@/components/useShopStatus";
import { checkCard } from "@/components/cardCheck";
import { formatPence } from "@/lib/menuData";
import { orderConfig } from "@/lib/config";

const inputClass = (error) =>
  `mt-1 w-full rounded-md border px-3 py-3 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${error ? "border-red-500 bg-red-50" : "border-neutral-300 bg-white"}`;

function Field({ label, error, required, children }) {
  return (
    <label className="block text-sm font-semibold">
      {label} {required && <span className="text-red-600" aria-hidden="true">*</span>}
      {children}
      {error && <span role="alert" className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

export default function CheckoutClient() {
  const router = useRouter();
  const { items, ready, subtotalPence, clear } = useCart();
  const { open, next } = useShopStatus();

  const [fulfilment, setFulfilment] = useState("delivery");
  const [method, setMethod] = useState("cash");
  const [cardEnabled, setCardEnabled] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", address: "", town: "Mansfield", postcode: "", notes: "" });
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((c) => setCardEnabled(Boolean(c.cardEnabled)))
      .catch(() => {});
  }, []);

  const deliveryFee = fulfilment === "delivery" ? orderConfig.deliveryFeePence : 0;
  const total = subtotalPence + deliveryFee;

  const setField = (key) => (event) => {
    setCustomer((c) => ({ ...c, [key]: event.target.value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const setCardField = (key, format) => (event) => {
    const value = format ? format(event.target.value) : event.target.value;
    setCard((c) => ({ ...c, [key]: value }));
    setErrors((e) => ({ ...e, [`card-${key}`]: undefined }));
  };

  function validate() {
    const found = {};
    if (customer.name.trim().length < 2) found.name = "Please enter your name.";
    const digits = customer.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) found.phone = "Please enter a valid phone number.";
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) found.email = "That email address does not look right.";
    if (fulfilment === "delivery") {
      if (customer.address.trim().length < 5) found.address = "Please enter your full address.";
      if (customer.town.trim().length < 2) found.town = "Please enter your town.";
      if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/.test(customer.postcode.trim())) found.postcode = "Please enter a valid UK postcode.";
    }
    let cardResult = null;
    if (method === "card") {
      cardResult = checkCard(card);
      for (const [key, message] of Object.entries(cardResult.errors)) found[`card-${key}`] = message;
    }
    return { found, cardResult };
  }

  async function submit(event) {
    event.preventDefault();
    setFormError("");
    const { found, cardResult } = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError("Please fix the highlighted details.");
      document.querySelector('[role="alert"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: honeypot,
          fulfilment,
          customer,
          lines: items.map((l) => ({ itemId: l.itemId, selections: l.selections, qty: l.qty })),
          // Only the brand and last 4 digits are sent. The full card number never leaves this form.
          payment: method === "card" ? { method: "card", card: { last4: cardResult.last4, brand: cardResult.brand } } : { method: "cash" },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data.fields) setErrors(data.fields);
        setFormError(data.error || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      try {
        localStorage.setItem("crave_last_order", data.id);
      } catch {}
      clear();
      router.push(`/order/${data.id}`);
    } catch {
      setFormError("We could not reach the shop. Please check your connection and try again.");
      setBusy(false);
    }
  }

  if (!ready) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-neutral-500">Loading...</div>;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-bold">Your cart is empty.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white">Browse the Menu</Link>
      </div>
    );
  }

  return (
    <>
      <ClosedBanner />
      <form onSubmit={submit} noValidate className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          {/* Delivery or collection */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold">1. How would you like your order?</h2>
            <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Delivery or collection">
              {[["delivery", "Delivery"], ["collection", "Collection"]].map(([value, label]) => (
                <button key={value} type="button" role="radio" aria-checked={fulfilment === value} onClick={() => setFulfilment(value)} className={`rounded-lg border-2 px-4 py-3 text-sm font-bold ${fulfilment === value ? "border-brand bg-brand/10 text-brand" : "border-neutral-200"}`}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* Details */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold">2. Your details</h2>
            <div className="mt-3 space-y-4">
              <Field label="Full name" required error={errors.name}>
                <input className={inputClass(errors.name)} value={customer.name} onChange={setField("name")} autoComplete="name" />
              </Field>
              <Field label="Phone number" required error={errors.phone}>
                <input className={inputClass(errors.phone)} value={customer.phone} onChange={setField("phone")} type="tel" inputMode="tel" autoComplete="tel" />
              </Field>
              <Field label="Email (optional, for your receipt)" error={errors.email}>
                <input className={inputClass(errors.email)} value={customer.email} onChange={setField("email")} type="email" autoComplete="email" />
              </Field>
              {fulfilment === "delivery" && (
                <>
                  <Field label="Address (house number and street)" required error={errors.address}>
                    <input className={inputClass(errors.address)} value={customer.address} onChange={setField("address")} autoComplete="street-address" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Town" required error={errors.town}>
                      <input className={inputClass(errors.town)} value={customer.town} onChange={setField("town")} autoComplete="address-level2" />
                    </Field>
                    <Field label="Postcode" required error={errors.postcode}>
                      <input className={inputClass(errors.postcode)} value={customer.postcode} onChange={setField("postcode")} autoComplete="postal-code" />
                    </Field>
                  </div>
                </>
              )}
              <Field label="Notes for the shop (optional)">
                <textarea className={inputClass(false)} rows={2} value={customer.notes} onChange={setField("notes")} maxLength={300} placeholder="Allergies, delivery instructions..." />
              </Field>
              {/* Spam trap: real people never see or fill this in */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold">3. Payment</h2>
            <div className="mt-3 space-y-3" role="radiogroup" aria-label="Payment method">
              <button type="button" role="radio" aria-checked={method === "cash"} onClick={() => setMethod("cash")} className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-bold ${method === "cash" ? "border-brand bg-brand/10" : "border-neutral-200"}`}>
                <Banknote size={20} /> {fulfilment === "delivery" ? "Cash on delivery" : "Pay cash on collection"}
              </button>
              <button type="button" role="radio" aria-checked={method === "card"} disabled={!cardEnabled} onClick={() => setMethod("card")} className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50 ${method === "card" ? "border-brand bg-brand/10" : "border-neutral-200"}`}>
                <CreditCard size={20} /> Pay by card {!cardEnabled && <span className="ml-auto text-xs font-semibold text-neutral-500">Coming soon</span>}
              </button>
            </div>

            {method === "card" && cardEnabled && (
              <div className="mt-4 space-y-4 rounded-lg bg-neutral-50 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-neutral-600"><Lock size={14} /> Your card is checked securely. We never store your card number.</p>
                <Field label="Name on card" required error={errors["card-name"]}>
                  <input className={inputClass(errors["card-name"])} value={card.name} onChange={setCardField("name")} autoComplete="cc-name" />
                </Field>
                <Field label="Card number" required error={errors["card-number"]}>
                  <input className={inputClass(errors["card-number"])} value={card.number} onChange={setCardField("number", (v) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim())} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry (MM/YY)" required error={errors["card-expiry"]}>
                    <input className={inputClass(errors["card-expiry"])} value={card.expiry} onChange={setCardField("expiry", (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; })} inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" />
                  </Field>
                  <Field label="Security code" required error={errors["card-cvc"]}>
                    <input className={inputClass(errors["card-cvc"])} value={card.cvc} onChange={setCardField("cvc", (v) => v.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
                  </Field>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-lg font-extrabold">Your order</h2>
          <ul className="mt-3 divide-y divide-neutral-100 text-sm">
            {items.map((line) => (
              <li key={line.key} className="flex justify-between gap-3 py-2">
                <span className="min-w-0">
                  <span className="font-semibold">{line.qty} x {line.name}</span>
                  {optionSummary(line.options).map((t) => <span key={t} className="block text-xs text-neutral-500">{t}</span>)}
                </span>
                <span className="shrink-0 font-semibold">{formatPence(line.unitPence * line.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t border-neutral-200 pt-3 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPence(subtotalPence)}</dd></div>
            {fulfilment === "delivery" && <div className="flex justify-between"><dt>Delivery</dt><dd>{deliveryFee ? formatPence(deliveryFee) : "Free"}</dd></div>}
            <div className="flex justify-between text-lg font-extrabold"><dt>Total</dt><dd>{formatPence(total)}</dd></div>
          </dl>

          {formError && <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{formError}</p>}
          {!open && <p className="mt-4 rounded-md bg-red-100 p-3 text-sm font-semibold">We&apos;re closed right now. Online ordering resumes {next}.</p>}

          <button type="submit" disabled={busy || !open} className="mt-4 w-full rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? "Placing your order..." : method === "card" ? `Pay ${formatPence(total)} and place order` : `Place order ${formatPence(total)}`}
          </button>
          <Link href="/cart" className="mt-3 block text-center text-sm font-semibold underline">Back to cart</Link>
        </aside>
      </form>
    </>
  );
}
