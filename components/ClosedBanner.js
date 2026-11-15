"use client";

import { useShopStatus } from "./useShopStatus";

export default function ClosedBanner({ className = "" }) {
  const { ready, open, next } = useShopStatus();
  if (!ready || open) return null;
  return (
    <div role="status" className={`bg-red-100 px-4 py-4 text-center text-sm font-semibold text-neutral-900 ${className}`}>
      <span className="mr-2 inline-block rounded bg-red-600 px-2 py-0.5 text-xs font-extrabold uppercase text-white">Closed</span>
      We&apos;re closed for online ordering at the moment. Online ordering resumes {next}.
    </div>
  );
}
