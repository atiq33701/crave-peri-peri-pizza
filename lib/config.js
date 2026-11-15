// Ordering settings. Everything the shop may want to change lives here.

export const orderConfig = {
  currencySymbol: "£",
  timeZone: "Europe/London",

  // Delivery. Set to 0 until the shop confirms its delivery charge and minimum order.
  deliveryFeePence: 0,
  minimumDeliveryPence: 0,

  // Opening hours for online orders (pickup and delivery share the same hours).
  // Keys are weekdays: 0 = Sunday ... 6 = Saturday. null = closed that day.
  // A closing time earlier than the opening time means "after midnight"
  // (for example "16:00" to "03:00" is 4 PM until 3 AM the next morning).
  hours: {
    0: { open: "16:00", close: "03:00" }, // Sunday
    1: { open: "16:00", close: "03:00" }, // Monday
    2: { open: "17:00", close: "03:00" }, // Tuesday
    3: { open: "16:00", close: "03:00" }, // Wednesday
    4: { open: "16:00", close: "03:00" }, // Thursday
    5: { open: "16:00", close: "04:00" }, // Friday
    6: null, // Saturday: closed
  },
};
