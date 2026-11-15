import { orderConfig } from "./config";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_TO_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// While testing you can ignore the opening hours with NEXT_PUBLIC_IGNORE_HOURS=true (see .env.example).
export function hoursIgnored() {
  return process.env.NEXT_PUBLIC_IGNORE_HOURS === "true";
}

function toMinutes(text) {
  const [h, m] = text.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(text) {
  const [h, m] = text.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// Day of week and minutes since midnight in UK time.
function londonParts(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: orderConfig.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    day: SHORT_TO_INDEX[get("weekday")],
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function isOpenAt(date = new Date()) {
  if (hoursIgnored()) return true;
  const { day, minutes } = londonParts(date);
  const today = orderConfig.hours[day];
  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (close > open) {
      if (minutes >= open && minutes < close) return true;
    } else if (minutes >= open) {
      return true; // open until after midnight
    }
  }
  // Still open from yesterday's late session (e.g. Monday 4 PM to Tuesday 3 AM)?
  const yesterday = orderConfig.hours[(day + 6) % 7];
  if (yesterday) {
    const open = toMinutes(yesterday.open);
    const close = toMinutes(yesterday.close);
    if (close <= open && minutes < close) return true;
  }
  return false;
}

// Text such as "today at 4:00 PM" or "Sunday at 4:00 PM" for the next time we open.
export function nextOpeningText(date = new Date()) {
  const { day, minutes } = londonParts(date);
  for (let offset = 0; offset < 8; offset += 1) {
    const index = (day + offset) % 7;
    const hours = orderConfig.hours[index];
    if (!hours) continue;
    if (offset === 0 && toMinutes(hours.open) <= minutes) continue;
    const when = offset === 0 ? "today" : offset === 1 ? "tomorrow" : DAY_NAMES[index];
    return `${when} at ${formatTime(hours.open)}`;
  }
  return "soon";
}

// Rows for the opening hours table.
export function hoursRows() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return order.map((index) => {
    const hours = orderConfig.hours[index];
    return {
      day: DAY_NAMES[index],
      time: hours ? `${formatTime(hours.open)} – ${formatTime(hours.close)}` : "Closed",
    };
  });
}
