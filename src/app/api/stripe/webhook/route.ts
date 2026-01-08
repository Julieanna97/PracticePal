import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

function isProStatus(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing";
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  await connectToDB();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // NOTE: for embedded checkout, subscription events are still the best source of truth,
        // but this helps link customer/subscription quickly.
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const stripeCustomerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id;

        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            stripeCustomerId,
            stripeSubscriptionId,
            // legacy fields
            subscriptionId: stripeSubscriptionId,
          });
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        const stripeCustomerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

        const userId = sub.metadata?.userId; // ✅ will exist if you set subscription_data.metadata
        const status = sub.status;
        const priceId = sub.items.data[0]?.price?.id;

        const currentPeriodEnd = new Date(sub.current_period_end * 1000);
        const cancelAtPeriodEnd = sub.cancel_at_period_end;

        const makePro = isProStatus(status);

        const update = {
          role: makePro ? "PRO" : "FREE",

          // preferred fields
          stripeCustomerId,
          stripeSubscriptionId: sub.id,
          stripePriceId: priceId,
          stripeStatus: status,
          stripeCurrentPeriodEnd: currentPeriodEnd,
          stripeCancelAtPeriodEnd: cancelAtPeriodEnd,

          // legacy fields (matches your DB screenshot)
          subscriptionId: sub.id,
          subscriptionStatus: status,
        };

        if (userId) {
          await User.findByIdAndUpdate(userId, update);
        } else if (stripeCustomerId) {
          await User.findOneAndUpdate({ stripeCustomerId }, update);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const stripeCustomerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

        const userId = sub.metadata?.userId;

        const update = {
          role: "FREE",
          stripeStatus: "canceled",
          stripeCancelAtPeriodEnd: false,

          // legacy
          subscriptionStatus: "canceled",
        };

        if (userId) {
          await User.findByIdAndUpdate(userId, update);
        } else if (stripeCustomerId) {
          await User.findOneAndUpdate({ stripeCustomerId }, update);
        }

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler failed:", err);
    return NextResponse.json(
      { error: err?.message ?? "Webhook handler failed" },
      { status: 500 }
    );
  }
}
