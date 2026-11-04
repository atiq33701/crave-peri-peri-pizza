import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/app/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.name} | Peri Peri, Pizza, Grill & Kebab in Mansfield`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} serves halal peri peri chicken, pizza, charcoal grill, shawarma, kebabs, burgers and wraps in Mansfield. See our menu, opening hours and how to contact us.`,
  icons: {
    icon: "/images/logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
