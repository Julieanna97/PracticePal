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
    return NextResponse.json({ error: "No active subscription found." }, { status: 400 });
  }

  // Cancel at period end (keeps access until end of paid period)
  const sub = await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  // Optional: store status locally for UI
  user.stripeStatus = sub.status;
  await user.save();

  return NextResponse.json({
    ok: true,
    subscriptionStatus: sub.status,
    cancel_at_period_end: sub.cancel_at_period_end,
    current_period_end: sub.current_period_end,
  });
}
