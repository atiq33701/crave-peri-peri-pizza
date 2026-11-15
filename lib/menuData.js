// The full ordering menu. Prices are in pounds, exactly as on the shop's price list.
// Both the website and the order server use this file, so a customer can never
// change a price: the server works out every total from the numbers below.
//
// Item fields:  id, name, desc, price, groups (choices), images (photos, optional)
// Choice group: id, title, type "single" (pick one) or "multi" (pick several),
//               required, max (multi only), exclusive (an option id that cancels the others)
// Option:       id, label, price (extra cost, optional)

const o = (label, price = 0, id) => ({ id: id || slug(label), label, price });

export function slug(text) {
  return String(text).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function toPence(pounds) {
  return Math.round(pounds * 100);
}

export function formatPence(pence) {
  return `£${(pence / 100).toFixed(2)}`;
}

/* ---------------- Choice groups ---------------- */

const single = (id, title, options, required = true) => ({ id, title, type: "single", required, options });
const multi = (id, title, options, extra = {}) => ({ id, title, type: "multi", required: false, options, ...extra });

const TOPPINGS = [
  "Salami", "Pepperoni", "Chicken Tikka", "Sausages", "Bacon", "Ham", "Spicy Beef", "Donner Meat",
  "Fresh Mushroom", "Black Olives", "Sweetcorn", "Pineapple", "Fresh Tomatoes", "Jalapeno", "Onions", "Peppers",
];

const salad = multi(
  "salad",
  "Salad",
  [o("All Salad"), o("Lettuce"), o("Onion"), o("Cucumber"), o("No Salad")],
  { exclusive: "no-salad" }
);

const burgerSauce = single("sauce", "Sauce", [
  o("Burger Sauce"), o("Mayo"), o("Garlic Mayo"), o("Ketchup"),
  o("BBQ Sauce"), o("Sweet Chilli Sauce"), o("Hot Chilli Sauce"), o("No Sauce"),
]);

const sauces = multi(
  "sauces",
  "Sauces",
  [
    o("Garlic Mayo"), o("Mayo"), o("Ketchup"), o("Burger Sauce"),
    o("BBQ Sauce"), o("Hot Chilli Sauce"), o("Sweet Chilli Sauce"), o("Mint Yogurt"), o("No Sauce"),
  ],
  { max: 3, exclusive: "no-sauce" }
);

const servedWith3 = single("served-with", "Served with", [o("Naan"), o("Wrap"), o("Chips")]);
const servedWith2 = single("served-with", "Served with", [o("Naan"), o("Chips")]);

const kidsDrink = single("drink", "Drink", [o("Fruit Shoot"), o("Capri Sun")]);

const canDrink = (id = "drink", title = "Can of drink") =>
  single(id, title, [o("Coke"), o("Zero Coke"), o("Pepsi"), o("Fanta"), o("7up"), o("Dr Pepper")]);

const bottleDrink = single("bottle", "1.5ltr bottle of drink", [o("Pepsi"), o("Coke")]);

const pizzaBase = single("base", "Pizza base", [
  o("Classic Base"), o("Tomato Base"), o("BBQ Base"), o("Garlic Base"), o("Hot Chilli Base"),
]);

const pizzaCrust = single("crust", "Crust", [o("Thin Crust"), o("Regular Crust"), o("Stuffed Crust", 4)]);

const extraCheese = multi("extra-cheese", "Extra cheese", [o("Extra Cheese", 3.5)]);

const extraToppings = multi(
  "extra-toppings",
  "Extra toppings (£3.00 each)",
  TOPPINGS.map((t) => o(t, 3))
);

const standardPizzaGroups = [pizzaBase, pizzaCrust, extraCheese, extraToppings];

const pizzaSize = single("size", "Size", [o('10"'), o('12"', 2.4), o('16"', 9.6)]);

const pickTopping = (n) =>
  single(`topping-${n}`, `Topping ${n}`, [...TOPPINGS.map((t) => o(t)), o("No Extra Topping", 0, "none")]);

// Names used by the "choose your pizza" lists inside meal deals.
const PIZZA_NAMES = [
  "Margherita Pizza", "Hawaiian Pizza", "Double Pepperoni Pizza", "Donner Pizza", "Tikka Special Pizza",
  "Tandoori Special Pizza", "Al Fungi Pizza", "Sweet Delight Pizza", "Smokey Joe Pizza", "Mexican Hot Pizza",
  "Vegetarian Pizza", "Meaty Feast Pizza", "Double Meaty Feast Pizza", "Chicken Special Pizza",
  "Texas BBQ Chicken Pizza", "Hot Spicy Pizza", "Chicken Feast Pizza", "Double Salami Pizza",
];
const pizzaPick = (id, title) => single(id, title, PIZZA_NAMES.map((n) => o(n)));
const burgerPick = (id, title) =>
  single(id, title, [
    o("1/4lb Beef Burger"), o("1/4lb Cheese Burger"), o("1/4lb Chicken Burger"),
    o("1/4lb Veggie Burger"), o("1/4lb Donner Burger"),
  ]);

/* ---------------- Photos ---------------- */

const M = (name) => `/images/menu/${name}`;
const I = (name) => `/images/${name}`;

/* ---------------- Items ---------------- */

// Ids come from the name, so a saved cart keeps working when the menu order changes.
// Two items with the same name need an explicit id (see the second donner list under Kebabs).
function item(name, price, { desc = "", groups = [], images = [], id } = {}) {
  return { id: id || slug(name), name, desc, price, groups, images };
}

export const categories = [
  {
    title: "Pizzas",
    note: "Freshly made with our secret sauce and Italian mozzarella cheese. Choose your base and crust.",
    items: [
      item("Margherita Pizza", 8.39, { groups: standardPizzaGroups, images: [I("margherita.jpg"), M("margherita-2.jpg"), M("cheese-pizza-1.jpg"), M("cheese-pizza-2.jpg")] }),
      item("Hawaiian Pizza", 10.79, { desc: "Ham & pineapple", groups: standardPizzaGroups, images: [M("hawaiian-1.jpg"), M("hawaiian-2.jpg")] }),
      item("Double Pepperoni Pizza", 10.79, { desc: "Double cheese and double pepperoni", groups: standardPizzaGroups, images: [I("meat-pizza.jpg"), M("pepperoni-1.jpg"), M("pepperoni-2.jpg"), M("pepperoni-3.jpg"), M("pepperoni-4.png"), M("pepperoni-5.jpg")] }),
      item("Donner Pizza", 10.79, { desc: "Donner meat and red onions", groups: standardPizzaGroups, images: [I("kebab-pizza.jpg")] }),
      item("Tikka Special Pizza", 10.79, { desc: "Chicken tikka, peppers, red onion and sweetcorn", groups: standardPizzaGroups, images: [I("chicken-pizza.jpg"), M("chicken-tikka-pizza-2.jpg"), M("chicken-tikka-pizza-3.jpg")] }),
      item("Tandoori Special Pizza", 10.79, { desc: "Tandoori chicken, chicken peppers, mushrooms, and onions", groups: standardPizzaGroups }),
      item("Al Fungi Pizza", 10.79, { desc: "Tomato sauce mozzarella, mushrooms, and black olives", groups: standardPizzaGroups, images: [M("mushroom-pizza-1.jpg"), M("mushroom-pizza-2.jpg")] }),
      item("Sweet Delight Pizza", 10.79, { desc: "Ham, sweetcorn, pineapple, mushroom and peppers", groups: standardPizzaGroups }),
      item("Smokey Joe Pizza", 10.79, { desc: "Pepperoni, chicken, mixed pepper, onions and jalapeno", groups: standardPizzaGroups }),
      item("Mexican Hot Pizza", 10.79, { desc: "Spicy beef, jalapenos, peppers and onions", groups: standardPizzaGroups }),
      item("Vegetarian Pizza", 10.79, { desc: "Fresh tomato, mushrooms, black olives, sweetcorn, red onions and peppers", groups: standardPizzaGroups, images: [M("veggie-pizza-1.jpg"), M("veggie-pizza-2.jpg"), M("veggie-pizza-3.jpg"), M("veggie-pizza-4.jpg")] }),
      item("Meaty Feast Pizza", 10.79, { desc: "Salami, pepperoni, ham chicken and spicy beef", groups: standardPizzaGroups, images: [M("meat-feast-1.jpg"), M("meat-feast-2.jpg"), M("meat-feast-3.jpg"), M("meat-feast-4.jpg"), M("meat-feast-5.jpg")] }),
      item("Double Meaty Feast Pizza", 10.79, { desc: "Sausage, pepperoni, bacon, ham and salami", groups: standardPizzaGroups }),
      item("Chicken Special Pizza", 10.79, { desc: "Chicken tikka, sweetcorn, mushrooms, & peppers", groups: standardPizzaGroups, images: [M("chicken-tikka-pizza-4.jpg"), M("chicken-tikka-pizza-5.jpg")] }),
      item("Texas BBQ Chicken Pizza", 10.79, { desc: "BBQ chicken, pepperoni, peppers and onions", groups: standardPizzaGroups }),
      item("Hot Spicy Pizza", 10.79, { desc: "Pepperoni, beef, ham, jalapeno and onions", groups: standardPizzaGroups }),
      item("Chicken Feast Pizza", 10.79, { desc: "Chicken tikka, onions, peppers", groups: standardPizzaGroups }),
      item("Double Salami Pizza", 10.79, { desc: "Double cheese and double salami", groups: standardPizzaGroups }),
      item("Create Your Own Pizza", 12.0, {
        desc: "Any 4 toppings of your choice",
        groups: [pizzaSize, pizzaBase, pizzaCrust, extraCheese, pickTopping(1), pickTopping(2), pickTopping(3), pickTopping(4), extraToppings],
        images: [M("supreme-1.jpg"), M("supreme-2.jpg")],
      }),
      item("Crave Special Pizza", 12.0, { desc: "Chicken tikka, ham, pepperoni and donner meat", groups: standardPizzaGroups, images: [I("special-pizza.jpg"), M("crave-special-pizza-2.jpg")] }),
      item("Half & Half Pizza", 12.0, {
        desc: "Maximum 3 toppings on each side",
        groups: [
          pizzaSize,
          pizzaBase,
          pizzaCrust,
          extraCheese,
          multi("half-1", "First half toppings (max 3)", TOPPINGS.map((t) => o(t)), { max: 3 }),
          multi("half-2", "Second half toppings (max 3)", TOPPINGS.map((t) => o(t)), { max: 3 }),
        ],
      }),
    ],
  },
  {
    title: "Calzones",
    items: [
      item("Donner Calzone", 11.99, { desc: "Donner meat, mushroom, onion, mozzarella" }),
      item("Meaty Feast Calzone", 11.99, { desc: "Pepperoni, donner, ham and chicken" }),
      item("Barbeque Chicken Calzone", 11.99, { desc: "Ham, onion, chicken, peppers and BBQ sauce" }),
      item("Vegetable Calzone", 11.99, { desc: "Fresh tomato, mix green pepper, mushroom, olives and onion" }),
    ],
  },
  {
    title: "Garlic Breads",
    items: [
      item('10" Garlic Bread With Cheese', 8.39, { images: [I("garlic-bread.jpg")] }),
      item('12" Garlic Bread With Cheese', 10.79),
      item('16" Garlic Bread With Cheese', 17.99),
      item('10" Garlic Bread With Cheese And Mushroom', 10.79),
      item('12" Garlic Bread With Cheese And Mushroom', 13.19),
      item('16" Garlic Bread With Cheese And Mushroom', 20.39),
    ],
  },
  {
    title: "Burgers",
    note: "Choose your salad and sauce.",
    items: [
      item("1/4lb Beef Burger", 5.39, { groups: [salad, burgerSauce], images: [I("beef-burger.jpg"), M("beef-burger-2.jpg")] }),
      item("1/2lb Beef Burger", 7.19, { groups: [salad, burgerSauce] }),
      item("1/4lb Cheese Burger", 6.59, { groups: [salad, burgerSauce], images: [M("cheese-burger-1.jpg")] }),
      item("1/2lb Cheese Burger", 7.79, { groups: [salad, burgerSauce] }),
      item("1/4lb Chicken Burger", 6.59, { groups: [salad, burgerSauce], images: [I("chicken-burger.jpg")] }),
      item("1/2lb Chicken Burger", 7.79, { groups: [salad, burgerSauce] }),
      item("1/4lb Veggie Burger", 5.39, { groups: [salad, burgerSauce] }),
      item("1/2lb Veggie Burger", 7.19, { groups: [salad, burgerSauce] }),
      item("1/4lb Donner Burger", 5.99, { groups: [salad, burgerSauce] }),
      item("1/2lb Donner Burger", 7.19, { groups: [salad, burgerSauce] }),
      item("1/4lb Supreme Fillet Burger", 7.79, { groups: [salad, burgerSauce] }),
      item("1/2lb Supreme Fillet Burger", 10.79, { groups: [salad, burgerSauce] }),
    ],
  },
  {
    title: "Wraps",
    note: "Choose your salad and sauces.",
    items: [
      item("Cheese & Chips Wrap", 8.39, { desc: "Tortilla wrap filled and wrapped with chips and mozzarella cheese", groups: [salad, sauces] }),
      item("Chicken Strip & Chip Wrap", 8.39, { desc: "Thin strips of boneless and skinless chicken breaded and fried wrapped with chips sauces and salad of your choice", groups: [salad, sauces] }),
      item("Lamb Donner Wrap", 8.39, { desc: "Tortilla wrap filled and wrapped with lamb donner, salad and sauces of your choices", groups: [salad, sauces], images: [M("donner-wrap-1.jpg")] }),
      item("Chicken Donner Wrap", 8.39, { desc: "Tortilla wrap filled and wrapped with chicken donner, salad and sauces of your choices", groups: [salad, sauces] }),
      item("Chicken Tikka Wrap", 8.39, { desc: "Tortilla wrap filled and wrapped with grilled chicken tikka, salad of your choices", groups: [salad, sauces], images: [I("chicken-wrap.jpg"), M("chicken-wrap-2.jpg"), I("wrap.jpg")] }),
      item("Mix Donner Wrap", 10.79, { desc: "Tortilla wrap filled and wrapped with grilled chicken tikka, chicken shish & lamb donner salad of your choice", groups: [salad, sauces] }),
    ],
  },
  {
    title: "Kebabs",
    note: "Served with choice of salad, sauce and bread.",
    items: [
      item("Regular Lamb Donner", 7.19, { desc: "Served with naan or wrap or chips", groups: [servedWith3, salad, sauces], images: [I("doner-naan.jpg"), M("donner-kebab-2.jpg")] }),
      item("Large Lamb Donner", 8.99, { desc: "Served with naan or wrap or chips", groups: [servedWith3, salad, sauces], images: [M("donner-chips-4.jpg"), M("donner-chips-5.jpg")] }),
      item("Regular Chicken Donner", 8.39, { desc: "Served with naan or wrap or chips", groups: [servedWith3, salad, sauces], images: [M("donner-chips-1.jpg"), M("donner-chips-2.jpg"), M("donner-chips-3.jpg")] }),
      item("Large Chicken Donner", 10.19, { desc: "Served with naan or wrap or chips", groups: [servedWith3, salad, sauces] }),
      item("Regular Chicken Tikka", 8.39, { desc: "Grilled chicken marinated in tikka spices, served with naan or wrap or chips", groups: [servedWith3, salad, sauces] }),
      item("Large Chicken Tikka", 10.19, { desc: "Grilled chicken marinated in tikka spices, served with naan or wrap or chips", groups: [servedWith3, salad, sauces] }),
      item("Regular Mix Kebab", 10.79, { desc: "Lamb donner, chicken tikka and chicken shish served with naan, wrap or chips", groups: [servedWith3, salad, sauces], images: [I("mixed-kebab.jpg"), M("mixed-kebab-2.jpg")] }),
      item("Large Mix Kebab", 13.19, { desc: "Lamb donner, chicken tikka and chicken shish served with naan, wrap or chips", groups: [servedWith3, salad, sauces] }),
      item("Crave Special", 17.99, { desc: "Served with garlic naan, cheese fries, lamb doner, chicken tikka, 2 pc chicken reshmi with salad and sauce", groups: [salad, sauces] }),
      item("Regular Chicken Reshmi Kebab", 9.59, { desc: "Served with naan or chips", groups: [servedWith2, salad, sauces] }),
      item("Large Chicken Reshmi Kebab", 11.99, { desc: "Served with naan or chips", groups: [servedWith2, salad, sauces] }),
      // The shop's price list shows a second set of donner prices with no description.
      item("Regular Lamb Donner", 9.59, { desc: "fresh lamb donner meat own its own.", groups: [salad, sauces], id: "regular-lamb-donner-b" }),
      item("Large Lamb Donner", 11.99, { desc: "fresh lamb donner meat own its own.", groups: [salad, sauces], id: "large-lamb-donner-b" }),
      item("Regular Chicken Donner", 9.59, { desc: "Fresh and juicy chicken meat owns its own.", groups: [salad, sauces], id: "regular-chicken-donner-b" }),
      item("Large Chicken Donner", 11.99, { desc: "fresh and juicy chicken meat own its own.", groups: [salad, sauces], id: "large-chicken-donner-b" }),
    ],
  },
  {
    title: "Fried Chicken",
    items: [
      item("3pcs Chicken Strips", 3.59, { images: [I("chicken-strips.jpg"), M("chicken-strips-2.jpg")] }),
      item("6pcs Chicken Strips", 6.59),
      item("3pcs Hot & Spicy Wings", 3.59, { images: [I("fried-chicken.jpg")] }),
      item("6pcs Hot & Spicy Wings", 6.59),
      item("3pcs BBQ Wings", 4.19, { images: [M("chicken-wings-1.jpg")] }),
      item("6pcs BBQ Wings", 7.79),
      item("6pcs Chicken Nuggets", 4.19, { images: [I("nuggets-dip.jpg"), I("chicken-nuggets.jpg"), M("chicken-nuggets-2.jpg"), M("chicken-nuggets-3.jpg"), M("chicken-nuggets-4.jpg"), M("chicken-nuggets-5.jpg")] }),
      item("12pcs Chicken Nuggets", 7.79),
    ],
  },
  {
    title: "Meal Deals",
    items: [
      item("Deal For 1", 13.19, { desc: 'Any 10" pizza with chips & can drink', groups: [pizzaPick("pizza-1", "Choose your pizza"), canDrink()], images: [M("pizza-meal-1.jpg"), M("pizza-meal-2.jpg")] }),
      item("Deal For 2", 26.39, { desc: 'Any 2 x 10" pizza with 2 chips & 2 cans drink', groups: [pizzaPick("pizza-1", "First pizza"), pizzaPick("pizza-2", "Second pizza"), canDrink("drink-1", "First can of drink"), canDrink("drink-2", "Second can of drink")] }),
      item("Burger Box For 1", 8.99, { desc: "Any 1/4lb burger with chips & can of drink", groups: [burgerPick("burger-1", "Choose your burger"), salad, burgerSauce, canDrink()], images: [I("burger-chips.jpg"), M("burger-meal-2.jpg")] }),
      item("Burger Box For 2", 16.79, { desc: "Any 2 x 1/4 burger with 2 x chips & 2 x can drinks", groups: [burgerPick("burger-1", "First burger"), burgerPick("burger-2", "Second burger"), salad, burgerSauce, canDrink("drink-1", "First can of drink"), canDrink("drink-2", "Second can of drink")] }),
      item("Pizza & Burger Box", 21.59, { desc: 'Any 10" pizza, 1 x burger with 2 x chips & 2x can drinks', groups: [pizzaPick("pizza-1", "Choose your pizza"), burgerPick("burger-1", "Choose your burger"), salad, burgerSauce, canDrink("drink-1", "First can of drink"), canDrink("drink-2", "Second can of drink")] }),
      item("Spicy Mix Box", 13.19, { desc: "4pcs spicy chicken wings, 4 pcs chilli cheese nuggets potato wedges & can drink", groups: [canDrink()], images: [M("fried-chicken-chips-3.jpg")] }),
      item("Boneless Box", 13.19, { desc: "4pcs chicken strips, 10pcs chicken popcorn 6pcs chicken nuggets & a can of drink", groups: [canDrink()], images: [M("fried-chicken-chips-2.jpg"), I("chicken-chips.jpg")] }),
      item("Family Meal", 31.19, { desc: '16" pizza, 1x large cheese fries, 6pcs wings & 1.5ltr bottle of drink', groups: [pizzaPick("pizza-1", "Choose your pizza"), single("wings", "Wings", [o("Hot & Spicy"), o("BBQ")]), bottleDrink] }),
      item("Burger Lover", 33.59, { desc: "Any 4x Quarter Pounder Burger, 4x Small Fries & 1.5l Bottle Of Drink", groups: [burgerPick("burger-1", "Burger 1"), burgerPick("burger-2", "Burger 2"), burgerPick("burger-3", "Burger 3"), burgerPick("burger-4", "Burger 4"), salad, burgerSauce, bottleDrink] }),
      item("Donner Kebab Deal", 10.79, { desc: "Choice Of Chicken Donner Or Lamb Donner Served With Naan, Wrap Or Chips & Can Of Drink", groups: [single("donner", "Choose your donner", [o("Chicken Donner"), o("Lamb Donner")]), servedWith3, salad, sauces, canDrink()] }),
      item('2 X 10" Pizzas', 19.19, { groups: [pizzaPick("pizza-1", "First pizza"), pizzaPick("pizza-2", "Second pizza")] }),
      item('2 X 12" Pizzas', 23.99, { groups: [pizzaPick("pizza-1", "First pizza"), pizzaPick("pizza-2", "Second pizza")] }),
      item('2 X 16" Pizzas', 37.19, { groups: [pizzaPick("pizza-1", "First pizza"), pizzaPick("pizza-2", "Second pizza")] }),
    ],
  },
  {
    title: "Kids Menu",
    note: "Served with regular fries, lollipop and drink, fruit shoot or capri sun.",
    items: [
      item("Kids Pizza Meal Deal", 10.79, { desc: '10" Margherita Pizza With Fries & Drink', groups: [kidsDrink] }),
      item("Kids 1/4 Cheese Burger", 8.99, { desc: "Cheese Burger With Chips And Drink", groups: [kidsDrink] }),
      item("Kebab & Chips Meal Deal", 8.99, { desc: "Lamb Donner With Chips And A Drink", groups: [single("meal", "Your meal", [o("Lamb Donner, Regular Fries, Lollipop")]), kidsDrink] }),
      item("Kids Nuggets Meal Deal", 8.99, { desc: "7 Chicken Nuggets With Chips And A Drink", groups: [kidsDrink] }),
    ],
  },
  {
    title: "Sides",
    items: [
      item("Regular Fries", 2.39, { images: [I("chips.jpg"), M("chips-2.jpg")] }),
      item("Large Fries", 3.59),
      item("Regular Cheese Fries", 4.19, { images: [I("cheesy-fries.jpg"), M("cheesy-chips-2.jpg")] }),
      item("Large Cheese Fries", 5.99),
      item("Regular Curly Fries", 4.19, { images: [I("curly-fries.jpg")] }),
      item("Large Curly Fries", 6.59),
      item("Regular Potato Wedges", 4.19, { images: [I("wedges.jpg")] }),
      item("Large Potato Wedges", 6.59),
      item("8pcs Regular Onion Rings", 3.59),
      item("16pcs Large Onion Rings", 4.79),
      item("15pcs Regular Popcorn Chicken", 4.79),
      item("30pcs Large Popcorn Chicken", 7.19),
      item("5pcs Regular Mozzarella Sticks", 4.19, { images: [I("mozzarella-bites.jpg"), M("mozzarella-sticks-2.jpg")] }),
      item("10pcs Large Mozzarella Sticks", 6.59),
      item("5pcs Regular Jalapeno Cheese Bites", 4.19, { images: [I("cheese-bites.jpg")] }),
      item("10pcs Large Jalapeno Cheese Bites", 6.59),
      item("5pcs Regular Chilli Cheese Nuggets", 4.19),
      item("10pcs Large Chilli Cheese Nuggets", 6.59),
    ],
  },
  {
    title: "Dips",
    items: [
      item("Garlic Mayo Dip", 0.95, { images: [M("garlic-mayo.jpg")] }),
      item("Ketchup Dip", 0.95),
      item("Mayo Dip", 0.95, { images: [M("mayo-sauce.jpg")] }),
      item("Burger Dip", 0.95),
      item("BBQ Dip", 0.95, { images: [M("bbq-sauce.jpg")] }),
      item("Hot Chilli Dip", 0.95, { images: [I("chilli-sauce.jpg")] }),
      item("Sweet Chilli Dip", 0.95),
      item("Mint Yogurt Dip", 0.95),
    ],
  },
  {
    title: "Desserts",
    items: [
      item("Chocolate Fudge Cake", 4.19, { desc: "Cakes Are Served 1 Per Slice" }),
      item("Strawberry Cheesecake", 4.19, { desc: "Cakes Are Served 1 Per Slice", images: [M("strawberry-cheesecake.jpg")] }),
      item("465ml Ben And Jerry Cookie Dough Ice Cream", 7.79, { images: [I("icecream.jpg")] }),
      item("465ml Ben And Jerry Chocolate Fudge Brownie Ice Cream", 7.79, { images: [M("ice-cream-2.jpg")] }),
    ],
  },
  {
    title: "Drinks",
    items: [
      item("330ml Coke Can", 1.79, { images: [M("coca-cola-1.jpg")] }),
      item("330ml Zero Coke Can", 1.79),
      item("330ml Pepsi Can", 1.79),
      item("330ml Fanta Can", 1.79, { images: [M("fanta.jpg")] }),
      item("330ml 7up Can", 1.79),
      item("330ml Dr Pepper Can", 1.79, { images: [I("dr-pepper.jpg")] }),
      item("1.5ltr Pepsi Bottle", 4.19, { images: [I("pepsi.jpg")] }),
      item("1.5ltr Coke Bottle", 4.19, { images: [M("coca-cola-2.jpg")] }),
    ],
  },
];

const seen = new Set();
for (const category of categories) {
  for (const entry of category.items) {
    if (seen.has(entry.id)) throw new Error(`Duplicate menu item id: ${entry.id}`);
    seen.add(entry.id);
  }
}

export const allItems = categories.flatMap((category) => category.items.map((it) => ({ ...it, category: category.title })));

export function findItem(id) {
  return allItems.find((it) => it.id === id);
}

// Food photos that are not shown on a specific menu item. They appear on the Gallery page,
// so every photo in the project is used somewhere.
export const galleryFoodPhotos = [
  { src: I("calzone.jpg"), alt: "Calzone" },
  { src: M("seekh-kebab-1.jpg"), alt: "Seekh kebab with salad and naan" },
  { src: M("seekh-kebab-2.jpg"), alt: "Seekh kebab wrap" },
  { src: M("peri-peri-chicken-1.jpg"), alt: "Grilled chicken with chips and salad" },
  { src: M("salad-1.jpg"), alt: "Fresh salad" },
  { src: M("brown-sauce.jpg"), alt: "Brown sauce dip" },
  { src: M("chicken-shish-kebab-1.jpg"), alt: "Chicken shish kebab" },
  { src: M("7up-zero.jpg"), alt: "7up Zero can" },
  { src: M("diet-coke.jpg"), alt: "Diet Coke can" },
  { src: M("pepsi-max-cherry.jpg"), alt: "Pepsi Max Cherry can" },
  { src: M("fruit-shoot.jpg"), alt: "Fruit Shoot" },
  { src: I("water.jpg"), alt: "Bottled water" },
  { src: I("drinks-fridge.jpg"), alt: "Our drinks fridge" },
];
