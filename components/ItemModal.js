"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { formatPence, toPence } from "@/lib/menuData";
import { priceLine } from "@/lib/pricing";
import { useCart } from "./CartProvider";
import { useShopStatus } from "./useShopStatus";

function missingGroups(item, selections) {
  return item.groups.filter((g) => g.required && !(selections[g.id] || []).length);
}

export default function ItemModal({ item, categoryTitle, onClose }) {
  const { addLine } = useCart();
  const { open } = useShopStatus();
  const [selections, setSelections] = useState({});
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const [closedAlert, setClosedAlert] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const groupRefs = useRef({});

  // Lock page scroll, close on Escape, keep keyboard focus inside the popup.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("a[href], button:not([disabled]), input:not([disabled])");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const priced = useMemo(() => priceLine(item.id, selections), [item.id, selections]);
  const unitPence = priced.error ? toPence(item.price) : priced.unitPence;
  const missing = missingGroups(item, selections);
  const images = item.images;

  function choose(group, optionId) {
    setShowMissing(false);
    setSelections((current) => {
      const chosen = current[group.id] || [];
      if (group.type === "single") return { ...current, [group.id]: [optionId] };

      let next;
      if (chosen.includes(optionId)) {
        next = chosen.filter((id) => id !== optionId);
      } else if (group.exclusive && optionId === group.exclusive) {
        next = [optionId];
      } else {
        next = [...chosen.filter((id) => id !== group.exclusive), optionId];
        if (group.max && next.length > group.max) return current;
      }
      return { ...current, [group.id]: next };
    });
  }

  function changeQty(step) {
    if (!open) {
      setClosedAlert(true);
      return;
    }
    setQty((q) => Math.min(20, Math.max(1, q + step)));
  }

  function add() {
    if (!open) {
      setClosedAlert(true);
      return;
    }
    if (missing.length) {
      setShowMissing(true);
      groupRefs.current[missing[0].id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (addLine(item.id, selections, qty)) onClose();
  }

  const go = (step) => setPhoto((p) => (p + step + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 sm:items-center sm:p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[94dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 shadow hover:bg-neutral-200"
        >
          <X size={20} />
        </button>

        <div className="relative overflow-y-auto">
          {closedAlert && (
            <div role="alert" className="sticky top-0 z-[5] mx-3 mt-3 flex items-start gap-2 rounded-lg border border-yellow-400 bg-yellow-50 p-3 pr-12 text-sm font-semibold text-neutral-900 shadow">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-yellow-600" />
              <span>Sorry! We&apos;re closed at the moment. Please try again during our business hours.</span>
            </div>
          )}

          {images.length > 0 && (
            <div className="bg-neutral-100">
              <div className="relative flex h-52 items-center justify-center sm:h-60">
                <img key={images[photo]} src={images[photo]} alt={`${item.name}, photo ${photo + 1} of ${images.length}`} className="h-full w-full object-contain" />
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow hover:bg-white">
                      <ChevronLeft size={20} />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow hover:bg-white">
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 py-3">
                  {images.map((src, index) => (
                    <button key={src} type="button" onClick={() => setPhoto(index)} aria-label={`Show photo ${index + 1}`} aria-current={index === photo} className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 ${index === photo ? "border-brand" : "border-transparent opacity-70"}`}>
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={`p-5 ${images.length === 0 && !closedAlert ? "pr-14" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-extrabold leading-tight">{item.name}</h3>
              <span className="shrink-0 text-lg font-extrabold">{formatPence(toPence(item.price))}</span>
            </div>
            {item.desc && <p className="mt-1 text-sm leading-6 text-neutral-600">{item.desc}</p>}
            <p className="mt-1 text-xs text-neutral-500">{categoryTitle}. Have an allergy? Please tell us when you order.</p>

            {item.groups.map((group) => {
              const chosen = selections[group.id] || [];
              const highlight = showMissing && group.required && chosen.length === 0;
              return (
                <fieldset
                  key={group.id}
                  ref={(node) => {
                    groupRefs.current[group.id] = node;
                  }}
                  className={`mt-6 rounded-lg ${highlight ? "bg-red-50 ring-2 ring-red-400" : ""}`}
                >
                  <legend className="flex w-full items-baseline justify-between gap-2 text-sm font-bold">
                    <span>Please select: {group.title}</span>
                    <span className={`text-xs font-semibold ${group.required ? "text-teal-600" : "text-neutral-500"}`}>
                      {group.required ? "Required" : "Optional"}
                    </span>
                  </legend>
                  <p className="mt-1 text-sm text-neutral-600">
                    {group.type === "single" ? "Choose 1" : group.max ? `Choose up to ${group.max}` : "Choose any"}
                  </p>
                  <div className="mt-1">
                    {group.options.map((option) => {
                      const checked = chosen.includes(option.id);
                      const atMax = group.type === "multi" && group.max && chosen.length >= group.max && !checked && option.id !== group.exclusive;
                      return (
                        <label key={option.id} className={`flex cursor-pointer items-center gap-3 py-2.5 text-sm ${atMax ? "cursor-not-allowed opacity-40" : ""}`}>
                          <input
                            type={group.type === "single" ? "radio" : "checkbox"}
                            name={`${item.id}-${group.id}`}
                            checked={checked}
                            disabled={Boolean(atMax)}
                            onChange={() => choose(group, option.id)}
                            className="h-5 w-5 shrink-0 accent-[#ef4f5f]"
                          />
                          <span className={`flex-1 ${checked ? "font-bold" : ""}`}>{option.label}</span>
                          {option.price > 0 && <span className="text-sm font-semibold">+{formatPence(toPence(option.price))}</span>}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>
        </div>

        <div className="border-t border-neutral-200 bg-white">
          {!open && (
            <p className="bg-red-100 px-4 py-1.5 text-center text-xs font-bold text-neutral-900">This menu is not available at this time</p>
          )}
          {open && showMissing && missing.length > 0 && (
            <p className="bg-red-50 px-4 py-1.5 text-center text-xs font-bold text-red-700">Please choose: {missing.map((g) => g.title).join(", ")}</p>
          )}
          <div className="flex items-center gap-3 p-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => changeQty(-1)} aria-label="Decrease quantity" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100">
                <Minus size={18} />
              </button>
              <span className="w-6 text-center font-bold" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => changeQty(1)} aria-label="Increase quantity" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100">
                <Plus size={18} />
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              aria-disabled={!open}
              className={`flex flex-1 items-center justify-between rounded-lg px-4 py-3 text-sm font-extrabold uppercase text-white ${open ? "bg-[#ef4f5f] hover:bg-[#dc3d4d]" : "bg-red-300"}`}
            >
              <span>Add</span>
              <span>{formatPence(unitPence * qty)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
