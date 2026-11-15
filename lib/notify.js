// Emails a receipt for each new order, using Resend (https://resend.com).
// Needs: RESEND_API_KEY, EMAIL_FROM (a sender address you have verified) and ORDER_NOTIFY_EMAIL (the shop's email).
// If those are not set, nothing is sent and orders still work normally.

import { formatPence } from "./menuData";

export function receiptText(order) {
  const lines = [];
  lines.push(`Crave - order ${order.number}`);
  lines.push(`${order.fulfilment === "delivery" ? "DELIVERY" : "COLLECTION"}   ${new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London" })}`);
  lines.push("");
  for (const line of order.lines) {
    lines.push(`${line.qty} x ${line.name}   ${formatPence(line.lineTotalPence)}`);
    const groups = {};
    for (const opt of line.options) (groups[opt.group] ||= []).push(opt.label);
    for (const [group, labels] of Object.entries(groups)) lines.push(`    ${group}: ${labels.join(", ")}`);
  }
  lines.push("");
  lines.push(`Subtotal: ${formatPence(order.subtotalPence)}`);
  if (order.deliveryFeePence) lines.push(`Delivery: ${formatPence(order.deliveryFeePence)}`);
  lines.push(`TOTAL: ${formatPence(order.totalPence)}`);
  lines.push(`Payment: ${order.payment.method === "card" ? `CARD (${order.payment.status})` : "CASH - collect payment"}`);
  lines.push("");
  lines.push(`Name: ${order.customer.name}`);
  lines.push(`Phone: ${order.customer.phone}`);
  if (order.fulfilment === "delivery") {
    lines.push(`Address: ${order.customer.address}, ${order.customer.town || ""} ${order.customer.postcode}`);
  }
  if (order.customer.notes) lines.push(`Notes: ${order.customer.notes}`);
  return lines.join("\n");
}

export async function sendReceiptEmail(order) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!key || !to || !from) return false;
  try {
    const recipients = [to];
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: `New order ${order.number} - ${formatPence(order.totalPence)} (${order.fulfilment})`,
        text: receiptText(order),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
