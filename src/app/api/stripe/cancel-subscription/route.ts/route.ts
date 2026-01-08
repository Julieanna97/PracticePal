// src/app/api/stripe/cancel-subscription/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!user.stripeSubscriptionId) {
    return NextResponse.json({ error: "No subscription found for this user." }, { status: 400 });
  }

  // Schedule cancel at period end
  const sub = await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  // Stripe typings can vary; read safely
  const status = (sub as any).status as string | undefined;
  const cancelAtPeriodEnd = !!(sub as any).cancel_at_period_end;
  const currentPeriodEndUnix = (sub as any).current_period_end as number | undefined;

  const currentPeriodEnd =
    typeof currentPeriodEndUnix === "number"
      ? new Date(currentPeriodEndUnix * 1000)
      : null;

  user.stripeStatus = status ?? user.stripeStatus ?? null;
  user.stripeCancelAtPeriodEnd = cancelAtPeriodEnd;
  user.stripeCurrentPeriodEnd = currentPeriodEnd;

  // legacy (optional)
  user.subscriptionId = sub.id;
  user.subscriptionStatus = status ?? user.subscriptionStatus ?? null;

  await user.save();

  return NextResponse.json({
    ok: true,
    stripeStatus: user.stripeStatus,
    stripeCancelAtPeriodEnd: user.stripeCancelAtPeriodEnd,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
  });
}
