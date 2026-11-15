import crypto from "crypto";
import { json, rateLimited, clientIp } from "@/lib/http";
import { priceBasket } from "@/lib/pricing";
import { isOpenAt, nextOpeningText } from "@/lib/hours";
import { saveOrder } from "@/lib/store";
import { takeCardPayment, cardMode } from "@/lib/payments";
import { sendReceiptEmail } from "@/lib/notify";

export const dynamic = "force-dynamic";

const clean = (value, max) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

function validateCustomer(input, fulfilment) {
  const customer = {
    name: clean(input?.name, 80),
    phone: clean(input?.phone, 20),
    email: clean(input?.email, 120),
    address: clean(input?.address, 160),
    town: clean(input?.town, 60),
    postcode: clean(input?.postcode, 10).toUpperCase(),
    notes: clean(input?.notes, 300),
  };
  const errors = {};
  if (customer.name.length < 2) errors.name = "Please enter your name.";
  const digits = customer.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13 || !/^[+\d][\d\s()+-]*$/.test(customer.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    errors.email = "That email address does not look right.";
  }
  if (fulfilment === "delivery") {
    if (customer.address.length < 5) errors.address = "Please enter your full address.";
    if (customer.town.length < 2) errors.town = "Please enter your town.";
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(customer.postcode)) errors.postcode = "Please enter a valid UK postcode.";
  }
  return { customer, errors };
}

export async function POST(request) {
  if (rateLimited(`order:${clientIp(request)}`, 10, 10 * 60 * 1000)) {
    return json({ error: "Too many orders from this device. Please try again in a few minutes." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (body?.website) return json({ error: "Invalid request." }, 400); // spam trap field

  if (!isOpenAt()) {
    return json({ error: `We're closed at the moment. Online ordering resumes ${nextOpeningText()}.`, closed: true }, 409);
  }

  const fulfilment = body?.fulfilment === "delivery" ? "delivery" : body?.fulfilment === "collection" ? "collection" : null;
  if (!fulfilment) return json({ error: "Please choose delivery or collection." }, 400);

  const { customer, errors } = validateCustomer(body.customer, fulfilment);
  if (Object.keys(errors).length) return json({ error: "Please check your details.", fields: errors }, 400);

  const basket = priceBasket(body.lines, fulfilment);
  if (basket.error) return json({ error: basket.error }, 400);

  const method = body?.payment?.method;
  if (method !== "cash" && method !== "card") return json({ error: "Please choose how you would like to pay." }, 400);
  if (body.payment?.card && ("number" in body.payment.card || "cvc" in body.payment.card)) {
    // Card numbers must never reach our server.
    return json({ error: "Card details must not be sent to the website." }, 400);
  }
  if (method === "card" && cardMode() === "off") {
    return json({ error: "Card payments are not available yet. Please choose cash.", field: "payment" }, 400);
  }

  const id = crypto.randomBytes(12).toString("hex");
  const number = `CR-${(parseInt(id.slice(0, 7), 16) % 90000) + 10000}`;

  let payment = { method: "cash", status: "cash-due" };
  if (method === "card") {
    const result = await takeCardPayment({ amountPence: basket.totalPence, orderId: id, card: body.payment.card });
    if (!result.ok) {
      // Payment failed: no order is created.
      return json({ error: result.error || "Your card payment was not accepted.", field: "payment" }, 402);
    }
    payment = {
      method: "card",
      status: result.demo ? "demo-paid" : "paid",
      reference: result.reference,
      last4: clean(body.payment.card?.last4, 4).replace(/\D/g, ""),
      brand: clean(body.payment.card?.brand, 20),
    };
  }

  const now = new Date().toISOString();
  const order = {
    id,
    number,
    status: "received",
    fulfilment,
    customer,
    lines: basket.lines,
    subtotalPence: basket.subtotalPence,
    deliveryFeePence: basket.deliveryFeePence,
    totalPence: basket.totalPence,
    payment,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await saveOrder(order);
  } catch (error) {
    console.error("Could not save order", error);
    return json({ error: "We could not save your order. Please try again or call us." }, 500);
  }

  sendReceiptEmail(order).catch(() => {});
  return json({ id, number }, 201);
}
