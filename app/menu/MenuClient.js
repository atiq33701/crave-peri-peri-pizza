"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { site, whatsappLink } from "@/app/site";
import { categories, slugify } from "./menuData";

function orderMessage(item, category) {
  return `Hello ${site.name}, I would like to order: ${item.name} (${category.title}). Please let me know the price and how long it will take.`;
}

/* ---------- Item popup ---------- */

function ItemModal({ selected, onClose }) {
  const { item, category } = selected;
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const images = item.images;

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
        const focusable = dialogRef.current.querySelectorAll(
          "a[href], button:not([disabled])"
        );
        if (focusable.length === 0) return;
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

  const go = (step) => setActive((current) => (current + step + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto">
          {images.length > 0 && (
            <div className="bg-neutral-100">
              <div className="relative flex h-60 items-center justify-center sm:h-72">
                <img
                  key={images[active]}
                  src={images[active]}
                  alt={`${item.name}, photo ${active + 1} of ${images.length}`}
                  className="h-full w-full object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous photo"
                      className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow hover:bg-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next photo"
                      className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow hover:bg-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 py-3">
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show photo ${index + 1}`}
                      aria-current={index === active}
                      className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 ${
                        index === active ? "border-brand" : "border-transparent opacity-70"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={`p-5 sm:p-6 ${images.length === 0 ? "pr-14" : ""}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              {category.title}
            </p>
            <h3 className="mt-1 text-2xl font-extrabold leading-tight">{item.name}</h3>
            {item.desc && <p className="mt-2 text-sm leading-6 text-neutral-600">{item.desc}</p>}

            <p className="mt-3 text-sm font-semibold">
              {item.price ? (
                <span className="text-lg font-extrabold text-brand">£{item.price}</span>
              ) : (
                <span className="text-neutral-700">Message us for today&apos;s price.</span>
              )}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Have an allergy? Please tell us when you order.
            </p>

            <a
              href={whatsappLink(orderMessage(item, category))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#1fb857]"
            >
              <MessageCircle size={18} />
              Order Now on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Menu with category tabs ---------- */

export default function MenuClient() {
  const [activeSlug, setActiveSlug] = useState(slugify(categories[0].title));
  const [selected, setSelected] = useState(null);
  const tabRefs = useRef({});

  const category = categories.find((c) => slugify(c.title) === activeSlug) || categories[0];
  const withPhotos = category.items.filter((item) => item.images.length > 0);
  const withoutPhotos = category.items.filter((item) => item.images.length === 0);

  // Open the right tab when someone arrives with e.g. /menu#drinks
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (fromHash && categories.some((c) => slugify(c.title) === fromHash)) {
      setActiveSlug(fromHash);
    }
  }, []);

  // Keep the active tab visible in the scrollable tab bar.
  useEffect(() => {
    tabRefs.current[activeSlug]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeSlug]);

  const selectTab = (slug) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  const onTabKeyDown = (event, index) => {
    let next = null;
    if (event.key === "ArrowRight") next = (index + 1) % categories.length;
    if (event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    if (next === null) return;
    event.preventDefault();
    const slug = slugify(categories[next].title);
    selectTab(slug);
    tabRefs.current[slug]?.focus();
  };

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-neutral-200 bg-white">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c, index) => {
            const slug = slugify(c.title);
            const isActive = slug === activeSlug;
            return (
              <button
                key={slug}
                ref={(node) => {
                  tabRefs.current[slug] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${slug}`}
                aria-selected={isActive}
                aria-controls="menu-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(slug)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand text-white"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="menu-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeSlug}`}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-brand sm:text-3xl">{category.title}</h2>
          {category.note && <p className="mt-1 text-sm text-neutral-600">{category.note}</p>}
          <p className="mt-1 text-xs text-neutral-500">Tap any item to see more and order.</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {withPhotos.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => setSelected({ item, category })}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="relative block aspect-square w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {item.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
                      {item.images.length} photos
                    </span>
                  )}
                </span>
                <span className="flex flex-1 flex-col justify-between gap-2 p-3 sm:p-4">
                  <span className="text-sm font-bold leading-snug sm:text-base">{item.name}</span>
                  <span className="flex items-center justify-between gap-2">
                    {item.price ? (
                      <span className="text-sm font-bold text-brand">£{item.price}</span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs font-bold text-brand">Order →</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {withoutPhotos.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
              Also available
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {withoutPhotos.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setSelected({ item, category })}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-gold"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selected && <ItemModal key={selected.item.name} selected={selected} onClose={closeModal} />}
    </>
  );
}
