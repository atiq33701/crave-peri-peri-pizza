import { findItem, toPence } from "./menuData";
import { orderConfig } from "./config";

// Works out the price of one chosen item from the menu data (never from what the browser says).
// selections: { [groupId]: [optionId, ...] }
export function priceLine(itemId, selections = {}) {
  const item = findItem(itemId);
  if (!item) return { error: "An item in your cart is no longer on our menu." };

  const chosen = [];
  let unit = toPence(item.price);

  for (const group of item.groups) {
    const ids = Array.isArray(selections[group.id]) ? selections[group.id] : [];
    const unique = [...new Set(ids)];

    if (group.required && unique.length === 0) {
      return { error: `Please choose: ${group.title} (${item.name}).` };
    }
    if (group.type === "single" && unique.length > 1) {
      return { error: `Please choose only one: ${group.title} (${item.name}).` };
    }
    if (group.type === "multi" && group.max && unique.length > group.max) {
      return { error: `Too many choices for ${group.title} (${item.name}).` };
    }
    for (const id of unique) {
      const option = group.options.find((opt) => opt.id === id);
      if (!option) return { error: `Invalid choice for ${group.title} (${item.name}).` };
      unit += toPence(option.price);
      chosen.push({ group: group.title, groupId: group.id, optionId: option.id, label: option.label, pricePence: toPence(option.price) });
    }
  }

  return { item, unitPence: unit, chosen };
}

export function lineKey(itemId, selections = {}) {
  const parts = Object.keys(selections)
    .sort()
    .map((g) => `${g}:${[...selections[g]].sort().join(",")}`);
  return `${itemId}|${parts.join(";")}`;
}

// Validates a whole basket and returns trusted lines and totals.
export function priceBasket(lines, fulfilment) {
  if (!Array.isArray(lines) || lines.length === 0) return { error: "Your cart is empty." };
  if (lines.length > 60) return { error: "Too many items in one order." };

  const priced = [];
  let subtotal = 0;
  for (const line of lines) {
    const qty = Number(line.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) return { error: "Invalid quantity in your cart." };
    const result = priceLine(line.itemId, line.selections || {});
    if (result.error) return { error: result.error };
    const lineTotal = result.unitPence * qty;
    subtotal += lineTotal;
    priced.push({
      itemId: result.item.id,
      name: result.item.name,
      qty,
      unitPence: result.unitPence,
      lineTotalPence: lineTotal,
      options: result.chosen,
    });
  }

  const deliveryFee = fulfilment === "delivery" ? orderConfig.deliveryFeePence : 0;
  if (fulfilment === "delivery" && subtotal < orderConfig.minimumDeliveryPence) {
    return { error: `The minimum order for delivery is £${(orderConfig.minimumDeliveryPence / 100).toFixed(2)}.` };
  }
  return { lines: priced, subtotalPence: subtotal, deliveryFeePence: deliveryFee, totalPence: subtotal + deliveryFee };
}
