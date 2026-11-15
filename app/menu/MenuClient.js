"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { categories, slug, formatPence, toPence } from "@/lib/menuData";
import { useCart } from "@/components/CartProvider";
import ItemModal from "@/components/ItemModal";
import ClosedBanner from "@/components/ClosedBanner";

export default function MenuClient() {
  const [activeSlug, setActiveSlug] = useState(slug(categories[0].title));
  const [selected, setSelected] = useState(null);
  const tabRefs = useRef({});
  const { count, subtotalPence, toast } = useCart();

  const category = categories.find((c) => slug(c.title) === activeSlug) || categories[0];

  // Open the right tab when someone arrives with e.g. /menu#drinks
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (fromHash && categories.some((c) => slug(c.title) === fromHash)) setActiveSlug(fromHash);
  }, []);

  // Keep the active tab visible in the scrollable tab bar.
  useEffect(() => {
    tabRefs.current[activeSlug]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeSlug]);

  const selectTab = (tabSlug) => {
    setActiveSlug(tabSlug);
    window.history.replaceState(null, "", `#${tabSlug}`);
  };

  const onTabKeyDown = (event, index) => {
    let next = null;
    if (event.key === "ArrowRight") next = (index + 1) % categories.length;
    if (event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    if (next === null) return;
    event.preventDefault();
    const tabSlug = slug(categories[next].title);
    selectTab(tabSlug);
    tabRefs.current[tabSlug]?.focus();
  };

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <ClosedBanner />

      <div className="sticky top-16 z-30 border-b border-neutral-200 bg-white">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c, index) => {
            const tabSlug = slug(c.title);
            const isActive = tabSlug === activeSlug;
            return (
              <button
                key={tabSlug}
                ref={(node) => {
                  tabRefs.current[tabSlug] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${tabSlug}`}
                aria-selected={isActive}
                aria-controls="menu-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(tabSlug)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-brand text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>
      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${activeSlug}`} className="mx-auto max-w-6xl px-4 pb-28 pt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-brand sm:text-3xl">{category.title}</h2>
          {category.note && <p className="mt-1 text-sm text-neutral-600">{category.note}</p>}
          <p className="mt-1 text-xs text-neutral-500">Tap any item to choose your options and add it to your cart.</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {category.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected({ item, categoryTitle: category.title })}
                className="flex h-full min-h-[7rem] w-full items-stretch overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-4">
                  <span>
                    <span className="block text-base font-bold leading-snug">{item.name}</span>
                    {item.desc && <span className="mt-1 line-clamp-3 block text-sm leading-5 text-neutral-500">{item.desc}</span>}
                  </span>
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <span>{formatPence(toPence(item.price))}</span>
                    {item.images.length > 1 && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">{item.images.length} photos</span>}
                  </span>
                </span>
                {item.images.length > 0 && (
                  <span className="relative block w-28 shrink-0 bg-neutral-100 sm:w-32">
                    <img src={item.images[0]} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {count > 0 && (
        <div className="fixed bottom-4 left-4 right-24 z-40 mx-auto max-w-md">
          <Link
            href="/cart"
            className="flex items-center justify-between gap-3 rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-neutral-800"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} />
              View cart ({count})
            </span>
            <span className="text-gold">{formatPence(subtotalPence)}</span>
          </Link>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed left-1/2 top-20 z-[80] -translate-x-1/2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}

      {selected && <ItemModal key={selected.item.id} item={selected.item} categoryTitle={selected.categoryTitle} onClose={closeModal} />}
    </>
  );
}
