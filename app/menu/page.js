import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/app/site";

export const metadata = {
  title: "Menu",
  description:
    "Browse the Crave Peri Peri Pizza menu: pizza, burgers, peri peri chicken, wraps, kebabs, sides, desserts and drinks.",
};

// Menu content lives here so it is easy to edit.
// Add a price to any item with { name, price: "x.xx" }.
const categories = [
  {
    title: "Pizza",
    fallback: "/images/pizza.svg",
    image: "/images/chicken-pizza.jpg",
    note: "Hand stretched and baked fresh.",
    items: [
      { name: "Crave Special Pizza", image: "/images/kebab-pizza.jpg" },
      { name: "Chicken Tikka Pizza", image: "/images/chicken-pizza.jpg" },
      { name: "Margherita", image: "/images/margherita.jpg" },
      { name: "Pepperoni", image: "/images/meat-pizza.jpg" },
      { name: "Vegetarian Pizza" },
      { name: "Calzone", image: "/images/calzone.jpg" },
    ],
  },
  {
    title: "Burgers",
    fallback: "/images/burger.svg",
    image: "/images/chicken-burger.jpg",
    note: "Served with choice of salad and sauce.",
    items: [
      { name: "1/4lb Beef Burger", image: "/images/beef-burger.jpg"
        // , price: "5.39" 
      },
      { name: "1/2lb Beef Burger", image: "/images/beef-burger.jpg" },
  
      { name: "1/2lb Cheese Burger", image: "/images/cheese-burger.jpg" },
      { name: "1/4lb Chicken Burger", image: "/images/chicken-burger.jpg" },
      { name: "1/2lb Chicken Burger" },
      { name: "1/4lb Veggie Burger" },
      { name: "1/2lb Veggie Burger" },
      { name: "1/4lb Donner Burger" },
      { name: "1/2lb Donner Burger" },
      { name: "Burger & Chips Meal", image: "/images/burger-chips.jpg" },
    ],
  },
  {
    title: "Peri Peri & Fried Chicken",
    fallback: "/images/chicken.svg",
    image: "/images/chicken-chips.jpg",
    note: "Crispy fried chicken and flame grilled peri peri.",
    items: [
      { name: "Peri Peri Chicken" },
      { name: "Fried Chicken Pieces & Chips", image: "/images/chicken-chips.jpg" },
      { name: "Fried Chicken Drumsticks", image: "/images/fried-chicken.jpg" },
      { name: "Chicken Strips", image: "/images/chicken-strips.jpg" },
      { name: "Chicken Wings" },
      { name: "Chicken Nuggets", image: "/images/nuggets-dip.jpg" },
    ],
  },
  {
    title: "Wraps",
    fallback: "/images/wrap.svg",
    image: "/images/wrap.jpg",
    items: [
      { name: "Chicken Wrap", image: "/images/chicken-wrap.jpg" },
      { name: "Donner Wrap" },
      { name: "Veggie Wrap" },
    ],
  },
  {
    title: "Kebabs",
    fallback: "/images/kebab.svg",
    image: "/images/doner-naan.jpg",
    note: "Charcoal grill, shawarma, falafel and halloumi.",
    items: [
      { name: "Chicken Shish Kebab" },
      { name: "Donner Kebab", image: "/images/doner-naan.jpg" },
      { name: "Mixed Kebab", image: "/images/mixed-kebab.jpg" },
      { name: "Shawarma" },
      { name: "Falafel" },
      { name: "Halloumi" },
    ],
  },
  {
    title: "Sides",
    fallback: "/images/sides.svg",
    image: "/images/wedges.jpg",
    items: [
      { name: "Chips", image: "/images/chips.jpg" },
      { name: "Cheesy Fries", image: "/images/cheesy-fries.jpg" },
      { name: "Curly Fries", image: "/images/curly-fries.jpg" },
      { name: "Potato Wedges", image: "/images/wedges.jpg" },
      { name: "Cheese Bites", image: "/images/cheese-bites.jpg" },
      { name: "Onion Rings" },
      { name: "Garlic Bread", image: "/images/garlic-bread.jpg" },
      { name: "Mozzarella Sticks", image: "/images/mozzarella-bites.jpg" },
      { name: "Chilli Sauce", image: "/images/chilli-sauce.jpg" },
    ],
  },
  {
    title: "Desserts",
    fallback: "/images/dessert.svg",
    image: "/images/icecream.jpg",
    items: [{ name: "Chocolate Cake" }, { name: "Ice Cream", image: "/images/icecream.jpg" }],
  },
  {
    title: "Drinks",
    fallback: "/images/drink.svg",
    image: "/images/dr-pepper.jpg",
    items: [
      { name: "Cola", image: "/images/pepsi.jpg" },
      { name: "Dr Pepper", image: "/images/dr-pepper.jpg" },
      { name: "Soft Drinks", image: "/images/drinks-fridge.jpg" },
      { name: "Water", image: "/images/water.jpg" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
   <section className="bg-black px-4 py-16 text-center text-white">
  <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">
    Explore Our Food
  </p>
  <h1 className="text-4xl font-extrabold sm:text-5xl">
    Our Menu
  </h1>
  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
         A look at what we serve. Prices are shown where available. Message us
          on WhatsApp for the full, up to date price list.
  </p>
</section>

      <div className="sticky top-16 z-30 overflow-x-auto border-b border-neutral-200 bg-white">
        <nav className="mx-auto flex max-w-6xl gap-2 px-4 py-3" aria-label="Menu categories">
          {categories.map((category) => (
            <a
              key={category.title}
              href={`#${category.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="whitespace-nowrap rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold hover:bg-brand hover:text-white"
            >
              {category.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        {categories.map((category) => (
          <section
            key={category.title}
            id={category.title.toLowerCase().replace(/[^a-z]+/g, "-")}
            className="scroll-mt-32"
          >
            <div className="flex items-center gap-4">
              <img src={category.image} alt={category.title} className={`h-16 w-16 ${category.image.endsWith(".jpg") ? "rounded-2xl object-cover" : ""}`} />
              <div>
                <h2 className="text-2xl font-extrabold text-brand">{category.title}</h2>
                {category.note && <p className="text-sm text-neutral-600">{category.note}</p>}
              </div>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm"
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <img
                      src={item.image || category.fallback}
                      alt={item.name}
                      className={`h-14 w-14 shrink-0 rounded-xl object-cover ${
                        item.image ? "" : "bg-neutral-100 p-1"
                      }`}
                    />
                    {item.name}
                  </span>
                  {item.price && (
                    <span className="font-bold text-brand">£{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

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
        </div>
      </div>
    </>
  );
}
