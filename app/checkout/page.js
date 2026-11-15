import CheckoutClient from "./CheckoutClient";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <section className="bg-black px-4 py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Checkout</h1>
      </section>
      <CheckoutClient />
    </>
  );
}
