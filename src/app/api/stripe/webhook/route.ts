import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

// ✅ Fix TS: use the API version your installed Stripe types expect
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// ✅ TS helper types (because your Stripe typings don't expose current_period_end)
type SubscriptionWithPeriods = Stripe.Subscription & {
  current_period_end?: number | null;
  cancel_at_period_end?: boolean | null;
  metadata?: Record<string, string>;
  customer?: string | Stripe.Customer | Stripe.DeletedCustomer | null;
};

type CheckoutSessionWithMeta = Stripe.Checkout.Session & {
  metadata?: Record<string, string>;
  customer?: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  subscription?: string | Stripe.Subscription | null;
};

function isProStatus(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing";
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  await connectToDB();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as SubscriptionWithPeriods;

        const stripeCustomerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

        const status = sub.status;

        const currentPeriodEnd =
          sub.current_period_end != null
            ? new Date(Number(sub.current_period_end) * 1000)
            : null;

        const cancelAtPeriodEnd = Boolean(sub.cancel_at_period_end);

        // If you set subscription_data.metadata.userId, it will be here
        const userId = sub.metadata?.userId;

        const update = {
          role: isProStatus(status) ? "PRO" : "FREE",

          stripeCustomerId,
          stripeSubscriptionId: sub.id,
          stripeStatus: status,

          stripeCurrentPeriodEnd: currentPeriodEnd,
          stripeCancelAtPeriodEnd: cancelAtPeriodEnd,

          // legacy (optional)
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
        const sub = event.data.object as SubscriptionWithPeriods;

        const stripeCustomerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

        const userId = sub.metadata?.userId;

        const update = {
          role: "FREE",
          stripeStatus: "canceled",
          stripeCancelAtPeriodEnd: false,

          // if you want to keep the last known end date, keep this:
          stripeCurrentPeriodEnd:
            sub.current_period_end != null
              ? new Date(Number(sub.current_period_end) * 1000)
              : null,

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

      case "checkout.session.completed": {
        const session = event.data.object as CheckoutSessionWithMeta;

        const stripeCustomerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        const userId = session.metadata?.userId;

        if (userId) {
          await User.findByIdAndUpdate(userId, {
            stripeCustomerId,
            stripeSubscriptionId,
          });
        } else if (stripeCustomerId) {
          await User.findOneAndUpdate(
            { stripeCustomerId },
            { stripeSubscriptionId }
          );
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
