"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle, ShoppingCart } from "lucide-react";
import { site, navLinks, whatsappLink } from "@/app/site";
import { useCart } from "@/components/CartProvider";

function CartLink({ className = "", onClick }) {
  const { count } = useCart();
  return (
    <Link href="/cart" onClick={onClick} aria-label={`Cart, ${count} items`} className={`relative flex items-center gap-2 ${className}`}>
      <ShoppingCart size={22} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-extrabold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/images/logo.svg"
            alt={`${site.name} logo`}
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-sm font-extrabold leading-tight sm:text-base">
            Crave <span className="text-gold">Peri Peri Pizza</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <CartLink className="transition hover:text-gold" />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-black transition hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <CartLink onClick={() => setIsOpen(false)} />
        <button
          type="button"
          className="rounded-md p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="border-t border-neutral-800 bg-black px-4 pb-4 md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block border-b border-neutral-800 py-3 text-base font-semibold hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-bold text-black"
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>
        </nav>
      )}
    </header>
  );
}
