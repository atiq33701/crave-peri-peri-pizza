import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import OpeningHours from "@/components/OpeningHours";
import { site, whatsappLink } from "@/app/site";

const highlights = [
  { title: "Pizza", image: "/images/chicken-pizza.jpg" },
  { title: "Burgers", image: "/images/chicken-burger.jpg" },
  { title: "Peri Peri Chicken", image: "/images/chicken-chips.jpg" },
  { title: "Wraps", image: "/images/wrap.jpg" },
];

const menuPreview = [
  { title: "Kebabs", image: "/images/doner-naan.jpg" },
  { title: "Sides", image: "/images/wedges.jpg" },
  { title: "Desserts", image: "/images/icecream.jpg" },
  { title: "Drinks", image: "/images/dr-pepper.jpg" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-6 md:grid-cols-2 md:py-10">
          <div className="space-y-5">
            <p className="font-semibold italic text-brand">Totally Saucy!</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Savour The Moment With Every Bite
            </h1>
            <p className="max-w-md text-neutral-300">
              Halal peri peri chicken, pizza, charcoal grill, shawarma, kebabs and burgers from{" "}
              {site.name} in Mansfield.
            </p>
            <p className="text-sm font-semibold text-gold">
              ★ {site.rating} on Google ({site.reviewCount} reviews) · Delivery · Pickup · Dine-in
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-md bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-[#d93204]"
              >
                View Our Menu
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-black hover:bg-[#1fb857]"
              >
                <MessageCircle size={18} />
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/kebab-pizza.jpg"
              alt="Freshly baked kebab pizza with sauce"
              className="w-64 rounded-3xl object-cover sm:w-80 md:w-full md:max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold text-brand">
          What We Serve
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href="/menu"
              className="flex flex-col items-center rounded-3xl bg-white p-4 text-center shadow-sm transition hover:shadow-md"
            >
              <img src={item.image} alt={item.title} className="h-28 w-28 rounded-2xl object-cover sm:h-36 sm:w-36" />
              <span className="mt-3 text-base font-bold">{item.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-gold">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <div className="rounded-[2rem] bg-brand p-8 text-center text-white sm:p-10">
            <h2 className="text-3xl font-extrabold">About Us</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Welcome to {site.name} in Mansfield. We are a local halal takeaway
              that loves good food. From our pizzas and charcoal grill to our
              peri peri chicken, shawarma, kebabs, burgers and wraps, every dish
              is made fresh with care.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block rounded-md bg-white px-6 py-2.5 text-sm font-bold text-brand"
            >
              Read More
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/wrap.jpg"
              alt="Toasted chicken wrap with cheese"
              className="w-56 rounded-3xl object-cover sm:w-72"
            />
          </div>
        </div>
      </section>

      {/* Menu preview */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold">Our Menu</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {menuPreview.map((item) => (
              <Link
                key={item.title}
                href="/menu"
                className="flex flex-col items-center rounded-3xl border-b-4 border-gold bg-neutral-700 p-5 text-center"
              >
                <img src={item.image} alt={item.title} className={`h-24 w-24 sm:h-32 sm:w-32 ${item.image.endsWith(".jpg") ? "rounded-2xl object-cover" : ""}`} />
                <span className="mt-3 font-bold">{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/menu"
              className="inline-block rounded-md bg-brand px-6 py-3 text-sm font-bold"
            >
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Hours and contact */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-extrabold">
            <Clock className="text-brand" /> Opening Hours
          </h2>
          <OpeningHours />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold">Find Us</h2>
          <p className="flex gap-2 text-sm">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
            {site.address}
          </p>
          <p className="flex gap-2 text-sm">
            <Phone size={18} className="shrink-0 text-brand" />
            <a href={`tel:${site.phoneLink}`}>{site.phoneDisplay}</a>
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-black hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
