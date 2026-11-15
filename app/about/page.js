import { MessageCircle, Heart, Utensils, Award, Check, Ban } from "lucide-react";
import { site, whatsappLink } from "@/app/site";

export const metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, a Mansfield takeaway serving pizza, burgers, kebabs, wraps and fried chicken.`,
};

// Taken from the Google Business Profile "About" section.
const goodToKnow = [
  { title: "Service options", items: [["Curbside pickup", true], ["Delivery", true], ["Takeout", true], ["Dine-in", false]] },
  { title: "Offerings", items: [["Late-night food", true], ["Quick bite", true]] },
  { title: "Atmosphere", items: [["Casual", true]] },
  { title: "Payments", items: [["Credit cards", true], ["Debit cards", true]] },
  { title: "Children", items: [["Kids' menu", true]] },
  { title: "Parking", items: [["Free street parking", true], ["Usually plenty of parking", true]] },
];

const values = [
  {
    title: "Fresh Ingredients",
    text: "We believe great food starts with great ingredients. That's why we focus on freshness and quality when preparing our pizzas, burgers, wraps and other favourites.",
  },
  {
    title: "Big Flavour",
    text: "From deliciously seasoned kebabs to peri peri chicken and crispy fried favourites, we bring together flavours that make every bite worth enjoying.",
  },
  {
    title: "Friendly Service",
    text: "We are proud to serve our local community. Every customer matters to us, and we always aim to make your experience welcoming and enjoyable.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-black px-4 py-16 text-center text-white">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">
          Get to Know Us
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">About Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
          Bringing great taste, fresh food and friendly service to Mansfield.
          Discover more about who we are and what makes us special.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-gold">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="rounded-[2rem] bg-brand p-8 text-white sm:p-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gold">
              Who We Are
            </p>
            <h2 className="text-3xl font-extrabold">Our Story</h2>

            <p className="mt-5 text-sm leading-7 text-white/90">
              Welcome to {site.name}, your local takeaway in Mansfield. We
              believe that good food brings people together, creates memorable
              moments and makes even an ordinary day a little more special.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/90">
              Our menu brings together a variety of much-loved takeaway
              favourites, including signature pizzas, juicy burgers, delicious
              kebabs, tasty wraps and crispy fried chicken. Whether you are
              looking for a quick bite, a satisfying meal or something to enjoy
              with family and friends, we have something to make your meal
              enjoyable.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/90">
              We aim to make every order count by focusing on flavour, food
              quality and friendly service. Our goal is simple: to give our
              customers a takeaway experience they will want to come back for.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/shopfront.jpg"
              alt="Crave Peri Peri Pizza shopfront on Leeming Street, Mansfield"
              className="w-72 rounded-3xl object-cover sm:w-96"
            />
            <p className="mt-5 max-w-sm text-center text-lg font-bold text-brand">
              Great food, bold flavours and a taste worth coming back for.
            </p>
          </div>
        </div>
      </section>


      {/* What We Stand For */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Our Promise
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
              The things that matter most to us are the same things we want
              our customers to experience with every order.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-brand">
                  <Heart size={23} />
                </div>
                <h3 className="text-xl font-extrabold text-brand">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Quality */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              What Makes Us Different
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand sm:text-4xl">
              Quality, Variety & Flavour
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-600">
              A great takeaway is about more than just choosing something
              from a menu. It's about enjoying the flavours, finding your
              favourites and having a meal that leaves you satisfied.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              At {site.name}, we bring together a variety of popular dishes
              under one roof. Our menu offers something for different
              appetites, making it easier for everyone to find something
              they love.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              We continue to focus on the things that make a local takeaway
              special: enjoyable food, a welcoming approach and service
              that puts customers first.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-brand p-7 text-white">
              <Utensils size={30} className="mb-5 text-gold" />
              <h3 className="text-lg font-extrabold">Menu Variety</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Plenty of takeaway favourites to satisfy different cravings.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-gold p-7 text-brand">
              <Heart size={30} className="mb-5" />
              <h3 className="text-lg font-extrabold">Made with Care</h3>
              <p className="mt-2 text-sm leading-6 text-brand/80">
                A customer-focused approach to every meal and order.
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-100 p-7 text-brand">
              <Award size={30} className="mb-5" />
              <h3 className="text-lg font-extrabold">Quality Focus</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                We always aim to deliver food our customers can enjoy.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-brand p-7 text-white">
              <MessageCircle size={30} className="mb-5 text-gold" />
              <h3 className="text-lg font-extrabold">Local Service</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Friendly service for our customers in Mansfield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="bg-neutral-100 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-brand">Good to Know</p>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-brand sm:text-4xl">Our Services & Facilities</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goodToKnow.map((group) => (
              <div key={group.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-base font-extrabold">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {group.items.map(([label, available]) => (
                    <li key={label} className={`flex items-center gap-2 ${available ? "" : "text-neutral-400"}`}>
                      {available ? <Check size={16} className="shrink-0 text-green-600" aria-label="Available" /> : <Ban size={16} className="shrink-0" aria-label="Not available" />}
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-black px-4 py-16 text-center text-white">
        <p className="text-sm font-bold uppercase tracking-widest text-gold">
          We'd Love to Hear From You
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          Good Food Is Better When Shared
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-300">
          Have a question or want to get in touch? We would be happy to hear
          from you. Contact our team and let us know how we can help.
        </p>

        <div className="mt-8">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#1fb857]"
          >
            <MessageCircle size={18} />
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}