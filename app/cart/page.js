import CartClient from "./CartClient";

export const metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <>
      <section className="bg-black px-4 py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Your Cart</h1>
      </section>
      <CartClient />
    </>
  );
}
