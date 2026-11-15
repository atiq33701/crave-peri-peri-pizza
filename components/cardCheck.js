// Checks that card details are typed correctly (right length, valid number, date not passed).
// This only catches typing mistakes. Whether the card really works is decided by the
// payment company when the order is paid. Card numbers are never sent to or stored by this website.

export function cardBrand(digits) {
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  return "Card";
}

export function luhn(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function checkCard({ name, number, expiry, cvc }, now = new Date()) {
  const errors = {};
  const digits = String(number || "").replace(/\s/g, "");
  if (!String(name || "").trim() || String(name).trim().length < 2) errors.name = "Enter the name on the card.";
  const brand = cardBrand(digits);
  const lengthOk = brand === "Amex" ? digits.length === 15 : digits.length >= 13 && digits.length <= 19;
  if (!/^\d+$/.test(digits) || !lengthOk || !luhn(digits)) errors.number = "That card number is not valid.";

  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(String(expiry || "").trim());
  if (!match) {
    errors.expiry = "Enter the expiry as MM/YY.";
  } else {
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    if (month < 1 || month > 12) errors.expiry = "That expiry month is not valid.";
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) errors.expiry = "That card has expired.";
  }

  const cvcLength = brand === "Amex" ? 4 : 3;
  if (!new RegExp(`^\\d{${cvcLength}}$`).test(String(cvc || ""))) errors.cvc = `Enter the ${cvcLength} digit security code.`;

  return { ok: Object.keys(errors).length === 0, errors, brand, last4: digits.slice(-4) };
}
