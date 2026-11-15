import { json } from "@/lib/http";
import { cardMode } from "@/lib/payments";
import { isOpenAt, nextOpeningText } from "@/lib/hours";
import { orderConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return json({
    cardEnabled: cardMode() !== "off",
    open: isOpenAt(),
    nextOpening: nextOpeningText(),
    deliveryFeePence: orderConfig.deliveryFeePence,
    minimumDeliveryPence: orderConfig.minimumDeliveryPence,
  });
}
