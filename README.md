# Crave Peri Peri Pizza

Website for **Crave Peri Peri Pizza**, a halal takeaway in Mansfield serving peri peri chicken, pizza, charcoal grill, shawarma, kebabs, burgers and wraps.

- **Address:** 45a Leeming St, Mansfield NG18 1NB, United Kingdom
- **Phone:** 01623 761144
- **Google rating:** 4.5 (127 reviews)
- **Services:** Delivery, curbside pickup, dine-in

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons
- Montserrat font via `next/font/google`

## Getting started

You need [Node.js](https://nodejs.org/) 18.17 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |

> The first build needs an internet connection, because the Montserrat font is downloaded from Google Fonts.

## Pages

| Route | File | Content |
| --- | --- | --- |
| `/` | `app/page.js` | Hero, what we serve, about, menu preview, opening hours, find us |
| `/menu` | `app/menu/page.js` | Full menu by category with photos |
| `/about` | `app/about/page.js` | Our story, values, shopfront photo |
| `/contact` | `app/contact/page.js` | Address, phone, email, WhatsApp, hours, Google Map |

Shared parts are in `components/`: `Navbar`, `Footer`, `OpeningHours` and `WhatsAppButton`.

## Project structure

```
app/
  layout.js          Root layout, fonts, site-wide metadata
  site.js            Business details used across the whole site
  globals.css        Global styles
  page.js            Home page
  menu/page.js       Menu page
  about/page.js      About page
  contact/page.js    Contact page
components/          Navbar, Footer, OpeningHours, WhatsAppButton
public/images/       Food photos, shopfront photo, logo and fallback SVGs
tailwind.config.js   Brand colours and font
```

## Editing the website

### Business details

All shared details live in **`app/site.js`**. Change them there and every page updates:

```js
name, tagline, address,
phoneDisplay, phoneLink,      // shown number and tel: link
whatsappNumber,               // country code + number, digits only
whatsappMessage,              // pre-filled WhatsApp message
email,
hours                         // one entry per day
```

> **Note:** `email` is still the placeholder `info@example.com`. Replace it with the real address before going live.

### Menu items, photos and prices

Edit the `categories` list in **`app/menu/page.js`**. Each category has a title, a header image, a fallback SVG and a list of items:

```js
{ name: "Chicken Wrap", image: "/images/chicken-wrap.jpg", price: "6.50" }
```

- `image` is optional. If an item has no photo, the category's SVG from `fallback` is shown.
- `price` is optional and is displayed as `£6.50`. Items without a price show just the name.
- Put new photos in `public/images/` and reference them as `/images/your-file.jpg`.

### Colours and font

Brand colours are set in **`tailwind.config.js`**:

- `brand` `#f23a05` (red-orange)
- `gold` `#fdd70f` (yellow)

The font is Montserrat, set in `app/layout.js`.

### Logo and favicon

The logo and favicon are `public/images/logo.svg`. Replace the file, keeping the same name, to change it.

## Deploying

The easiest option is [Vercel](https://vercel.com/), which is free for small sites:

1. Push this project to GitHub.
2. On Vercel, choose **Add New → Project** and import the repository.
3. Keep the default settings and click **Deploy**.

Any host that supports Next.js (Netlify, a Node server, etc.) will also work.

## Checklist before launch

- [ ] Replace the placeholder email in `app/site.js`
- [ ] Confirm the opening hours in `app/site.js`
- [ ] Add real menu items and prices in `app/menu/page.js`
- [ ] Replace the sample logo in `public/images/logo.svg`
- [ ] Check that the WhatsApp and phone numbers work

## Credits

Food and shopfront photos were supplied by the business. Some photos are stock or illustrative images.
