import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ClipboardList } from "lucide-react";
import { site, navLinks, whatsappLink, mapsLink } from "@/app/site";

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.svg"
              alt={`${site.name} logo`}
              className="h-12 w-12 rounded-lg"
            />
            <span className="text-lg font-extrabold text-white">{site.name}</span>
          </div>
          <p className="text-sm">{site.tagline}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
            Visit Us
          </h3>
        <p className="flex gap-2">
  <MapPin size={18} className="mt-0.5 shrink-0" />
  <a
    href={mapsLink()}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-gold"
  >
    {site.address}
  </a>
</p>
          <p className="flex gap-2">
            <Phone size={18} className="shrink-0" />
              <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer" className="hover:text-gold">
              {site.phoneDisplay}
            </a>
          </p>
        
          
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
         
          <ul className="space-y-2">
         
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-bold text-black hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-800 px-4 py-5 text-center text-xs text-neutral-500">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="mt-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 font-semibold text-neutral-300 hover:border-gold hover:text-gold"
          >
            <ClipboardList size={16} />
            Staff: See all orders
          </Link>
        </p>
        <p className="mt-1">
          If you have a food allergy, please tell us before you eat. Prices may change.
        </p>
      </div>
    </footer>
  );
}
