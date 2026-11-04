import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Clock,
  Navigation,
} from "lucide-react";
import OpeningHours from "@/components/OpeningHours";
import { site, whatsappLink, mapsLink } from "@/app/site";

export const metadata = {
  title: "Contact Us",
  description: `Contact ${site.name}: address, phone number, opening hours and WhatsApp.`,
};

export default function ContactPage() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address
  )}&output=embed`;

  return (
    <>
      {/* Page Header */}
      <section className="bg-black px-4 py-16 text-center text-white">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">
          We're Here to Help
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
          Have a question, need some information or want to get in touch?
          We'd love to hear from you. Find all our contact details and
          opening hours below.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand sm:text-4xl">
            We'd Love to Hear From You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
            Whether you have a question about our menu, need help with an
            order or simply want to contact us, we're happy to help.
            Choose your preferred way to reach us.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Address */}
          <div className="rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-brand">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-brand">
              Visit Us
            </h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-neutral-600">
              {site.address}
            </p>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand underline"
            >
              Get Directions <Navigation size={16} />
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-brand">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-brand">
              Call Us
            </h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-neutral-600">
              Prefer speaking directly? Give us a call using our contact number.
            </p>
              <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-bold text-brand underline"
            >
              {site.phoneDisplay}
            </a>
          </div>

          {/* Email */}
          <div className="rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-brand">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-brand">
              Email Us
            </h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-neutral-600">
              Have a detailed enquiry? Send us an email and get in touch with our team.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block break-all text-sm font-bold text-brand underline"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* WhatsApp Contact Banner */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand p-8 text-center text-white sm:flex-row sm:p-10 sm:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <MessageCircle size={22} className="text-gold" />
              <p className="text-sm font-bold uppercase tracking-widest text-gold">
                Quick Contact
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Chat With Us on WhatsApp
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              WhatsApp is a convenient way to reach us. Send us a message
              whenever you need assistance or have an enquiry.
            </p>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#25D366] px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#1fb857]"
          >
            <MessageCircle size={19} />
            Message Us
          </a>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="bg-neutral-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Plan Your Visit
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand sm:text-4xl">
              Our Opening Hours
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-600">
              Planning to visit us or place an order? Check our opening
              hours before getting in touch. We look forward to serving
              you and making your food experience enjoyable.
            </p>

            <div className="mt-6 flex items-start gap-3 text-sm text-neutral-700">
              <Clock size={21} className="mt-0.5 shrink-0 text-brand" />
              <p>
                Please check the schedule for our latest opening times.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-brand">
                <Clock size={22} />
              </div>
              <h3 className="text-xl font-extrabold text-brand">
                Opening Schedule
              </h3>
            </div>
            <OpeningHours />
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Find Our Location
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand sm:text-4xl">
            Find Us on the Map
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600">
            Looking for directions? Use the map below to find our
            takeaway in Mansfield and plan your visit.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
          <iframe
            title={`${site.name} Google Maps Location`}
            src={mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full sm:h-[400px]"
          />
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin size={18} className="shrink-0 text-brand" />
            <span>{site.address}</span>
          </div>

          <a
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            <Navigation size={17} />
            Open in Google Maps
          </a>
        </div>
      </section>

    </>
  );
}