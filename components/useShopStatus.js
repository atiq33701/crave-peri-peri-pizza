"use client";

import { useEffect, useState } from "react";
import { isOpenAt, nextOpeningText } from "@/lib/hours";

// Tells the page whether we are open for online orders (UK time), refreshed every 30 seconds.
export function useShopStatus() {
  const [status, setStatus] = useState({ ready: false, open: true, next: "" });
  useEffect(() => {
    const update = () => setStatus({ ready: true, open: isOpenAt(), next: nextOpeningText() });
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return status;
}
