// src/app/api/stripe/checkout-session/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Create / reuse Stripe customer
    let customerId = user.stripeCustomerId as string | null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: String(user._id) },
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const origin =
      (await headers()).get("origin") ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      customer: customerId,

      // also store metadata on the session itself
      metadata: { userId: String(user._id) },

      // ensure subscription gets metadata too (used by subscription webhooks)
      subscription_data: {
        metadata: { userId: String(user._id) },
      },

      line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID!, quantity: 1 }],
      return_url: `${origin}/upgrade/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: checkoutSession.client_secret });
  } catch (err) {
    console.error("POST /api/stripe/checkout-session error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
