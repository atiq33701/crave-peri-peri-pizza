import { json } from "@/lib/http";
import { getOrder } from "@/lib/store";

export const dynamic = "force-dynamic";

// A customer can only see the one order whose private link they have.
export async function GET(request, { params }) {
  const order = await getOrder(params.id);
  if (!order) return json({ error: "Order not found." }, 404);
  return json({
    id: order.id,
    number: order.number,
    status: order.status,
    fulfilment: order.fulfilment,
    createdAt: order.createdAt,
    firstName: order.customer.name.split(" ")[0],
    lines: order.lines,
    subtotalPence: order.subtotalPence,
    deliveryFeePence: order.deliveryFeePence,
    totalPence: order.totalPence,
    payment: { method: order.payment.method, status: order.payment.status },
  });
}
