// Edit this file to change the restaurant details used across the whole website.
// Details taken from the Google Business Profile. Email is still a placeholder: replace it when known.
  // Website: https://craveperiperipizza.co.uk/

export const site = {
  website: "https://craveperiperipizza.co.uk/",
  rating: "4.5",
  reviewCount: 127,
  name: "Crave Peri Peri Pizza",
  tagline: "Peri Peri • Pizza • Grill & Kebab",
  address: "45a Leeming St, Mansfield NG18 1NB, United Kingdom",
  phoneDisplay: "01623 761144",
  phoneLink: "+441623761144",
  // WhatsApp number: country code + number, digits only (no + or spaces)
  whatsappNumber: "441623761144",
  whatsappMessage: "Hello Crave Peri Peri Pizza, I have a question.",
  hours: [
    { day: "Monday", time: "Open 24 hours" },
    { day: "Tuesday", time: "Open 24 hours" },
    { day: "Wednesday", time: "Open 24 hours" },
    { day: "Thursday", time: "Open 24 hours" },
    { day: "Friday", time: "Open 24 hours" },
    { day: "Saturday", time: "Open 24 hours" },
    { day: "Sunday", time: "Open 24 hours" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function whatsappLink(message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
}
