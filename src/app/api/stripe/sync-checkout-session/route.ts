import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { sessionId } = (await req.json().catch(() => null)) ?? {};
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    // Fetch the Stripe checkout session and expand subscription + customer
    const cs = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    });

    const customerId =
      typeof cs.customer === "string" ? cs.customer : cs.customer?.id || null;

    const subscription =
      typeof cs.subscription === "string"
        ? await stripe.subscriptions.retrieve(cs.subscription)
        : cs.subscription;

    if (!customerId || !subscription) {
      return NextResponse.json(
        { error: "Missing Stripe customer/subscription on checkout session." },
        { status: 400 }
      );
    }

    const status = subscription.status; // active, trialing, past_due, canceled...
    const makePro = status === "active" || status === "trialing";

    const currentPeriodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null;

    const cancelAtPeriodEnd = !!subscription.cancel_at_period_end;

    await connectToDB();

    // Update the currently logged-in user ONLY
    await User.findByIdAndUpdate(userId, {
      role: makePro ? "PRO" : "FREE",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      stripeStatus: status,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripeCancelAtPeriodEnd: cancelAtPeriodEnd,

      // Optional "legacy" fields if you used them anywhere:
      subscriptionId: subscription.id,
      subscriptionStatus: status,
    });

    return NextResponse.json({
      ok: true,
      role: makePro ? "PRO" : "FREE",
      stripeStatus: status,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripeCancelAtPeriodEnd: cancelAtPeriodEnd,
    });
  } catch (err: any) {
    console.error("sync-checkout-session error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
