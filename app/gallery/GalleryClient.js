"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Each section: title, optional text, and its photos. Edit freely.
const sections = [
  {
    title: "Our Shop",
    text: "Find us on Leeming Street in Mansfield. Look for the big CRAVE sign.",
    photos: [
      { src: "/images/shopfront.jpg", alt: "Crave Peri Peri Pizza shopfront on Leeming Street" },
      { src: "/images/gallery/shopfront-night.jpg", alt: "Crave shopfront lit up at night" },
      { src: "/images/shopfront-small.jpg", alt: "Crave shop entrance and window" },
      { src: "/images/gallery/shopfront-wide.jpg", alt: "Crave shop sign on Leeming Street" },
      { src: "/images/gallery/kitchen-counter.jpg", alt: "Inside the shop, counter and kitchen" },
      { src: "/images/gallery/shop-door-signs.jpg", alt: "Food hygiene rating 5 sign and online ordering signs at our door" },
    ],
  },
  {
    title: "From Our Kitchen",
    text: "A bit of everything: pizza, kebab, nuggets, onion rings, burgers and more.",
    photos: [
      { src: "/images/gallery/sharing-platter.jpg", alt: "Sharing platter with pizza, kebab, nuggets, onion rings and burgers" },
    ],
  },
  {
    title: "Menu Cards & Deals",
    contain: true,
    text: "Our printed menus and deals. Message us on WhatsApp for the latest prices.",
    photos: [
      { src: "/images/gallery/menu-card-deals.png", alt: "Crave deals menu card" },
      { src: "/images/gallery/menu-card-3.jpg", alt: "Crave menu card with deals and prices" },
      { src: "/images/gallery/menu-card-2.jpg", alt: "Crave menu card with burgers and pizzas" },
      { src: "/images/gallery/menu-card-1.png", alt: "Crave full menu card" },
      { src: "/images/gallery/menu-card-4.jpg", alt: "Crave full menu card, inside pages" },
    ],
  },
];

const allPhotos = sections.flatMap((section) => section.photos);

function Lightbox({ index, onClose, onMove }) {
  const photo = allPhotos[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onMove]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
      >
        <X size={22} />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:left-5"
      >
        <ChevronLeft size={24} />
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85dvh] max-w-full rounded-xl object-contain sm:max-w-[min(90vw,48rem)]"
        style={{ minWidth: "min(80vw, 22rem)" }}
      />
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(1);
        }}
        aria-label="Next photo"
        className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:right-5"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default function GalleryClient() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (step) => setOpen((current) => (current === null ? null : (current + step + allPhotos.length) % allPhotos.length)),
    []
  );

  let counter = -1;

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-extrabold text-brand sm:text-3xl">{section.title}</h2>
            <p className="mt-1 text-sm text-neutral-600">{section.text}</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {section.photos.map((photo) => {
                counter += 1;
                const index = counter;
                return (
                  <li key={photo.src}>
                    <button
                      type="button"
                      onClick={() => setOpen(index)}
                      className="block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      aria-label={`Enlarge photo: ${photo.alt}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className={`h-full w-full ${section.contain ? "bg-neutral-900 object-contain" : "object-cover"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </>
  );
}
