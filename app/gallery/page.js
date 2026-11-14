import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/app/site";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery",
  description:
    "Photos of the Crave Peri Peri Pizza shop in Mansfield, our kitchen and our printed menus and deals.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-black px-4 py-16 text-center text-white">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">
          Take a Look
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
          Our shop, our kitchen and our printed menus. Tap a photo to see it bigger.
        </p>
      </section>

      <GalleryClient />

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-gold p-8 text-center">
          <h2 className="text-2xl font-extrabold">Hungry yet?</h2>
          <p className="mt-2 text-sm">Message us on WhatsApp to place your order.</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-black hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
