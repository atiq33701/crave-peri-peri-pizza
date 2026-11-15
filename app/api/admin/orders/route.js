import { json } from "@/lib/http";
import { isAdmin } from "@/lib/auth";
import { listOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAdmin(request)) return json({ error: "Not signed in." }, 401);
  return json({ orders: await listOrders(150) });
}
