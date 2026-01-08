"use client";

import { useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradePage() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/stripe/checkout-session", { method: "POST" });
    const data = await res.json();

    if (!res.ok) throw new Error(data?.error ?? "Failed to start checkout");
    return data.clientSecret as string;
  }, []);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Upgrade to Pro ✨</h1>
          <p className="mt-2 text-gray-600">
            Start a subscription to unlock Pro features.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-purple-100 bg-white p-4 shadow-xl">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </main>
    </div>
  );
}
