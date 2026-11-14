// Menu content lives here so it is easy to edit.
//
// Every item has:
//   name    - shown on the card and in the popup
//   desc    - one or two lines shown in the popup
//   images  - list of photos (first one is the card photo, all of them show in the popup).
//             Leave the list empty for items we do not have a photo for yet:
//             they are listed under "Also available" and still get the popup + Order Now button.
//   price   - optional, e.g. price: "5.39" (shown as £5.39)
//
// Photos live in /public/images (original ones) and /public/images/menu (new ones).

export const categories = [
  {
    title: "Pizza",
    note: "Hand stretched and baked fresh.",
    items: [
      {
        name: "Crave Special Pizza",
        desc: "Our house special, topped generously and baked fresh.",
        images: [
          "/images/kebab-pizza.jpg",
          "/images/special-pizza.jpg",
          "/images/menu/crave-special-pizza-2.jpg",
        ],
      },
      {
        name: "Chicken Tikka Pizza",
        desc: "Spiced chicken tikka pieces on a cheesy base.",
        images: [
          "/images/chicken-pizza.jpg",
          "/images/menu/chicken-tikka-pizza-2.jpg",
          "/images/menu/chicken-tikka-pizza-3.jpg",
          "/images/menu/chicken-tikka-pizza-4.jpg",
          "/images/menu/chicken-tikka-pizza-5.jpg",
        ],
      },
      {
        name: "Pepperoni",
        desc: "Classic pepperoni on melted cheese. A favourite for a reason.",
        images: [
          "/images/meat-pizza.jpg",
          "/images/menu/pepperoni-1.jpg",
          "/images/menu/pepperoni-2.jpg",
          "/images/menu/pepperoni-3.jpg",
          "/images/menu/pepperoni-4.png",
          "/images/menu/pepperoni-5.jpg",
        ],
      },
      {
        name: "Meat Feast",
        desc: "Loaded with meat toppings for the big appetites.",
        images: [
          "/images/menu/meat-feast-1.jpg",
          "/images/menu/meat-feast-2.jpg",
          "/images/menu/meat-feast-3.jpg",
          "/images/menu/meat-feast-4.jpg",
          "/images/menu/meat-feast-5.jpg",
        ],
      },
      {
        name: "Supreme",
        desc: "Pepperoni, peppers, olives and more on a cheesy base.",
        images: ["/images/menu/supreme-1.jpg", "/images/menu/supreme-2.jpg"],
      },
      {
        name: "Vegetarian Pizza",
        desc: "Peppers, mushrooms, olives and onion on a cheesy base.",
        images: [
          "/images/menu/veggie-pizza-1.jpg",
          "/images/menu/veggie-pizza-2.jpg",
          "/images/menu/veggie-pizza-3.jpg",
          "/images/menu/veggie-pizza-4.jpg",
        ],
      },
      {
        name: "Mushroom Pizza",
        desc: "Creamy base topped with mushrooms and herbs.",
        images: ["/images/menu/mushroom-pizza-1.jpg", "/images/menu/mushroom-pizza-2.jpg"],
      },
      {
        name: "Hawaiian",
        desc: "Sweet pineapple and savoury toppings on melted cheese.",
        images: ["/images/menu/hawaiian-1.jpg", "/images/menu/hawaiian-2.jpg"],
      },
      {
        name: "Cheese Pizza",
        desc: "Stretchy melted cheese on a freshly baked base.",
        images: ["/images/menu/cheese-pizza-1.jpg", "/images/menu/cheese-pizza-2.jpg"],
      },
      {
        name: "Margherita",
        desc: "Tomato, mozzarella and basil. Simple and classic.",
        images: ["/images/margherita.jpg", "/images/menu/margherita-2.jpg"],
      },
      {
        name: "Calzone",
        desc: "Folded pizza baked golden and filled with hot toppings.",
        images: ["/images/calzone.jpg"],
      },
      {
        name: "Pizza & Chips Meal",
        desc: "A whole pizza served with chips and a drink.",
        images: ["/images/menu/pizza-meal-1.jpg", "/images/menu/pizza-meal-2.jpg"],
      },
    ],
  },
  {
    title: "Burgers",
    note: "Served with choice of salad and sauce.",
    items: [
      {
        name: "Beef Burger",
        desc: "Juicy beef burger in a toasted sesame bun. Available in 1/4lb and 1/2lb.",
        images: ["/images/beef-burger.jpg", "/images/menu/beef-burger-2.jpg"],
      },
      {
        name: "Cheese Burger",
        desc: "Beef burger with melted cheese, salad and sauce. Available in 1/4lb and 1/2lb.",
        images: ["/images/menu/cheese-burger-1.jpg"],
      },
      {
        name: "Chicken Burger",
        desc: "Crispy chicken fillet with salad and sauce. Available in 1/4lb and 1/2lb.",
        images: ["/images/chicken-burger.jpg"],
      },
      {
        name: "Burger & Chips Meal",
        desc: "Your choice of burger served with a portion of hot chips.",
        images: ["/images/burger-chips.jpg", "/images/menu/burger-meal-2.jpg"],
      },
      { name: "Veggie Burger", desc: "Available in 1/4lb and 1/2lb.", images: [] },
      { name: "Donner Burger", desc: "Available in 1/4lb and 1/2lb.", images: [] },
    ],
  },
  {
    title: "Peri Peri & Fried Chicken",
    note: "Crispy fried chicken and flame grilled peri peri.",
    items: [
      {
        name: "Peri Peri Chicken",
        desc: "Flame grilled chicken with our peri peri flavour.",
        images: ["/images/menu/peri-peri-chicken-1.jpg"],
      },
      {
        name: "Chicken Wings",
        desc: "Saucy, glazed chicken wings.",
        images: ["/images/menu/chicken-wings-1.jpg"],
      },
      {
        name: "Fried Chicken Pieces & Chips",
        desc: "Crispy fried chicken pieces served with hot chips.",
        images: [
          "/images/chicken-chips.jpg",
          "/images/menu/fried-chicken-chips-2.jpg",
          "/images/menu/fried-chicken-chips-3.jpg",
        ],
      },
      {
        name: "Fried Chicken Drumsticks",
        desc: "Golden, crunchy fried chicken drumsticks.",
        images: ["/images/fried-chicken.jpg"],
      },
      {
        name: "Chicken Strips",
        desc: "Crispy chicken strips with a dip.",
        images: ["/images/chicken-strips.jpg", "/images/menu/chicken-strips-2.jpg"],
      },
      {
        name: "Chicken Nuggets",
        desc: "Golden chicken nuggets, served with a dip.",
        images: [
          "/images/nuggets-dip.jpg",
          "/images/chicken-nuggets.jpg",
          "/images/menu/chicken-nuggets-2.jpg",
          "/images/menu/chicken-nuggets-3.jpg",
          "/images/menu/chicken-nuggets-4.jpg",
          "/images/menu/chicken-nuggets-5.jpg",
        ],
      },
    ],
  },
  {
    title: "Wraps",
    items: [
      {
        name: "Chicken Wrap",
        desc: "Chicken, salad and sauce in a toasted tortilla wrap.",
        images: ["/images/chicken-wrap.jpg", "/images/menu/chicken-wrap-2.jpg", "/images/wrap.jpg"],
      },
      {
        name: "Donner Wrap",
        desc: "Donner meat, salad and sauce wrapped up warm.",
        images: ["/images/menu/donner-wrap-1.jpg"],
      },
      { name: "Veggie Wrap", desc: "Fresh salad and sauce in a tortilla wrap.", images: [] },
    ],
  },
  {
    title: "Kebabs",
    note: "Charcoal grill, shawarma, falafel and halloumi.",
    items: [
      {
        name: "Donner Kebab",
        desc: "Sliced donner meat on naan with salad and sauces.",
        images: ["/images/doner-naan.jpg", "/images/menu/donner-kebab-2.jpg"],
      },
      {
        name: "Donner Meat & Chips",
        desc: "Donner meat served on chips, with salad or sauces on the side.",
        images: [
          "/images/menu/donner-chips-1.jpg",
          "/images/menu/donner-chips-2.jpg",
          "/images/menu/donner-chips-3.jpg",
          "/images/menu/donner-chips-4.jpg",
          "/images/menu/donner-chips-5.jpg",
        ],
      },
      {
        name: "Chicken Shish Kebab",
        desc: "Marinated chicken pieces with fresh salad on warm naan.",
        images: ["/images/menu/chicken-shish-kebab-1.jpg"],
      },
      {
        name: "Mixed Kebab",
        desc: "A mix of kebab meats with salad and sauces.",
        images: ["/images/mixed-kebab.jpg", "/images/menu/mixed-kebab-2.jpg"],
      },
      {
        name: "Seekh Kebab",
        desc: "Spiced minced meat seekh kebabs with salad and naan.",
        images: ["/images/menu/seekh-kebab-1.jpg", "/images/menu/seekh-kebab-2.jpg"],
      },
      { name: "Shawarma", desc: "Ask us on WhatsApp what we have today.", images: [] },
      { name: "Falafel", desc: "Ask us on WhatsApp what we have today.", images: [] },
      { name: "Halloumi", desc: "Ask us on WhatsApp what we have today.", images: [] },
    ],
  },
  {
    title: "Sides",
    items: [
      {
        name: "Chips",
        desc: "Hot, crispy chips.",
        images: ["/images/chips.jpg", "/images/menu/chips-2.jpg"],
      },
      {
        name: "Cheesy Fries",
        desc: "Chips loaded with melted cheese.",
        images: ["/images/cheesy-fries.jpg", "/images/menu/cheesy-chips-2.jpg"],
      },
      { name: "Curly Fries", desc: "Seasoned curly fries.", images: ["/images/curly-fries.jpg"] },
      { name: "Potato Wedges", desc: "Seasoned potato wedges.", images: ["/images/wedges.jpg"] },
      {
        name: "Cheese Bites",
        desc: "Crispy bites with a cheesy centre.",
        images: ["/images/cheese-bites.jpg"],
      },
      {
        name: "Garlic Bread",
        desc: "Baked garlic bread topped with cheese.",
        images: ["/images/garlic-bread.jpg"],
      },
      {
        name: "Mozzarella Sticks",
        desc: "Crispy coated sticks with a stretchy mozzarella centre.",
        images: ["/images/mozzarella-bites.jpg", "/images/menu/mozzarella-sticks-2.jpg"],
      },
      { name: "Salad", desc: "Fresh salad with cucumber, sweetcorn and olives.", images: ["/images/menu/salad-1.jpg"] },
      { name: "Onion Rings", desc: "Crispy battered onion rings.", images: [] },
    ],
  },
  {
    title: "Sauces & Dips",
    note: "Add a dip to any order.",
    items: [
      { name: "Chilli Sauce", desc: "A little heat for your meal.", images: ["/images/chilli-sauce.jpg"] },
      { name: "Mayo", desc: "Smooth mayonnaise dip.", images: ["/images/menu/mayo-sauce.jpg"] },
      { name: "BBQ Sauce", desc: "Sweet and smoky BBQ dip.", images: ["/images/menu/bbq-sauce.jpg"] },
      { name: "Garlic Mayo", desc: "Creamy garlic and herb dip.", images: ["/images/menu/garlic-mayo.jpg"] },
      { name: "Brown Sauce", desc: "Rich and tangy brown sauce.", images: ["/images/menu/brown-sauce.jpg"] },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Ice Cream",
        desc: "Tubs of ice cream, ask us which flavours are in today.",
        images: ["/images/icecream.jpg", "/images/menu/ice-cream-2.jpg"],
      },
      {
        name: "Strawberry Cheesecake",
        desc: "A slice of strawberry cheesecake.",
        images: ["/images/menu/strawberry-cheesecake.jpg"],
      },
      { name: "Chocolate Cake", desc: "Ask us on WhatsApp what we have today.", images: [] },
    ],
  },
  {
    title: "Drinks",
    items: [
      {
        name: "Coca-Cola",
        desc: "Ice cold Coca-Cola. Cans and bottles.",
        images: ["/images/menu/coca-cola-1.jpg", "/images/menu/coca-cola-2.jpg"],
      },
      { name: "Diet Coke", desc: "Ice cold Diet Coke.", images: ["/images/menu/diet-coke.jpg"] },
      {
        name: "Pepsi",
        desc: "Pepsi and Pepsi Max Cherry, cans and bottles.",
        images: ["/images/pepsi.jpg", "/images/menu/pepsi-max-cherry.jpg"],
      },
      { name: "Dr Pepper", desc: "Ice cold Dr Pepper.", images: ["/images/dr-pepper.jpg"] },
      { name: "Fanta Orange", desc: "Ice cold Fanta Orange.", images: ["/images/menu/fanta.jpg"] },
      { name: "7UP Zero", desc: "Ice cold 7UP Zero Sugar.", images: ["/images/menu/7up-zero.jpg"] },
      { name: "Fruit Shoot", desc: "Fruity juice drink.", images: ["/images/menu/fruit-shoot.jpg"] },
      { name: "Water", desc: "Still bottled water.", images: ["/images/water.jpg"] },
      {
        name: "Soft Drinks",
        desc: "A full fridge of cold drinks to choose from.",
        images: ["/images/drinks-fridge.jpg"],
      },
    ],
  },
];

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
