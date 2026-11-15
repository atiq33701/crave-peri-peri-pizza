import { json } from "@/lib/http";
import { isAdmin } from "@/lib/auth";
import { updateOrder } from "@/lib/store";

export const dynamic = "force-dynamic";

const STATUSES = ["received", "preparing", "ready", "out-for-delivery", "completed", "cancelled"];

export async function PATCH(request, { params }) {
  if (!isAdmin(request)) return json({ error: "Not signed in." }, 401);
  let body = {};
  try {
    body = await request.json();
  } catch {}
  if (!STATUSES.includes(body.status)) return json({ error: "Invalid status." }, 400);
  const order = await updateOrder(params.id, { status: body.status });
  if (!order) return json({ error: "Order not found." }, 404);
  return json({ order });
}
