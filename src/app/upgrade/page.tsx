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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-fuchsia-300 to-purple-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-300 to-sky-300 rounded-full blur-3xl opacity-20 animate-bounce"></div>
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        {/* Premium Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-100 to-purple-100 border border-fuchsia-200">
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
                Premium Pro Access
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 mb-4">
            Unlock Your Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Level up your practice routine with advanced analytics, unlimited history, and custom planning tools designed for serious musicians.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-100">
              <span className="text-lg">✨</span>
              <span className="text-sm font-semibold text-gray-700">Advanced Analytics</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-100">
              <span className="text-lg">📊</span>
              <span className="text-sm font-semibold text-gray-700">Unlimited History</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-100">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-semibold text-gray-700">Custom Routines</span>
            </div>
          </div>
        </div>

        {/* Pricing Card with Glass Effect */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="rounded-3xl border-2 border-purple-200 bg-white/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Pro Plan</h2>
                <p className="text-gray-600 mt-1">Everything you need to master your instrument</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  $9
                </div>
                <p className="text-sm text-gray-600">/month</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "📈", text: "Detailed analytics & insights" },
                { icon: "⏱️", text: "Practice breakdown by genre/skill" },
                { icon: "📚", text: "Unlimited practice history" },
                { icon: "🎯", text: "Custom practice routines" },
                { icon: "📱", text: "Export your data" },
                { icon: "⭐", text: "Priority support" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mb-6">
              Cancel anytime. 30-day money-back guarantee.
            </p>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="rounded-3xl border-2 border-purple-100 bg-white/90 backdrop-blur-md p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Your Upgrade</h3>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </main>
    </div>
  );
}

