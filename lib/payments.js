// Card payments.
//
// IMPORTANT: this website never stores or logs card numbers. A real card payment
// needs a payment company (Stripe, Square, SumUp, Worldpay...). When the shop owner
// has chosen one and sent the API keys, connect it inside takeCardPayment() below.
//
// Modes:
//   "off"      no payment company connected: card option is disabled on the checkout
//   "demo"     development only (DEMO_CARD_PAYMENTS=true): pretends the payment worked, for testing the flow
//   "provider" PAYMENT_PROVIDER is set: real payments (needs the code below)

export function cardMode() {
  if (process.env.PAYMENT_PROVIDER) return "provider";
  if (process.env.NODE_ENV !== "production" && process.env.DEMO_CARD_PAYMENTS === "true") return "demo";
  return "off";
}

// Returns { ok: true, reference } or { ok: false, error }.
export async function takeCardPayment({ amountPence, orderId, card }) {
  const mode = cardMode();

  if (mode === "demo") {
    return { ok: true, reference: `demo_${orderId}`, demo: true };
  }

  if (mode === "provider") {
    // TODO: connect the payment company here, for example:
    //   - create a payment with PAYMENT_PROVIDER's server API using process.env.PAYMENT_SECRET_KEY
    //   - confirm the payment succeeded before returning ok: true
    //   - return { ok: false, error: "Your card was declined." } for any failed or declined card
    // Until then, no card payment is ever treated as paid.
    return { ok: false, error: "Card payments are not connected yet. Please choose cash." };
  }

  return { ok: false, error: "Card payments are not available yet. Please choose cash." };
}
