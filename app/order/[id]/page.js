import OrderClient from "./OrderClient";

export const metadata = { title: "Your Order", robots: { index: false } };

export default function OrderPage({ params }) {
  return (
    <>
      <section className="bg-black px-4 py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Your Order</h1>
      </section>
      <OrderClient id={params.id} />
    </>
  );
}
