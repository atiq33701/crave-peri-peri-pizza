import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/app/site";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Menu",
  description:
    "Order online from Crave Peri Peri Pizza: pizzas, calzones, burgers, wraps, kebabs, fried chicken, meal deals, sides and drinks for delivery or collection in Mansfield.",
};

// The menu items, prices, options and photos live in lib/menuData.js
export default function MenuPage() {
  return (
    <>
      <section className="bg-black px-4 py-16 text-center text-white">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">
          Explore Our Food
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">Our Menu</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
          Order online for delivery or collection. Pick your food, add it to your cart and
          check out.
        </p>
      </section>

      <MenuClient />

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-gold p-8 text-center">
          <h2 className="text-2xl font-extrabold">Questions about our food?</h2>
          <p className="mt-2 text-sm">
            Ask about prices, ingredients or allergens before you visit.
          </p>
          <a
            href={whatsappLink("Hello, I have a question about your menu.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-black hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            Contact Us on WhatsApp
          </a>
          <p className="mt-4 text-sm font-semibold">
            Want to see the shop and our printed menus?{" "}
            <Link href="/gallery" className="underline">
              Visit the gallery
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
