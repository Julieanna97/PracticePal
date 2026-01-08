import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

function effectiveRoleFromStripe(role: string | undefined, stripeStatus: string | undefined | null) {
  const status = (stripeStatus ?? "").toLowerCase();
  const proByStatus = status === "active" || status === "trialing";
  return role === "PRO" || proByStatus ? "PRO" : "FREE";
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();

  // Select extra fields if you add them to your schema:
  // - stripeCurrentPeriodEnd (Date)
  // - stripeCancelAtPeriodEnd (Boolean)
  const user = await User.findById(userId)
    .select({
      role: 1,
      stripeStatus: 1,
      stripeSubscriptionId: 1,
      stripeCustomerId: 1,
      stripeCurrentPeriodEnd: 1,
      stripeCancelAtPeriodEnd: 1,
    })
    .lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const role = (user as any).role ?? "FREE";
  const stripeStatus = (user as any).stripeStatus ?? null;

  const effectiveRole = effectiveRoleFromStripe(role, stripeStatus);

  const stripeCurrentPeriodEnd =
    (user as any).stripeCurrentPeriodEnd instanceof Date
      ? (user as any).stripeCurrentPeriodEnd.toISOString()
      : null;

  const stripeCancelAtPeriodEnd =
    typeof (user as any).stripeCancelAtPeriodEnd === "boolean"
      ? (user as any).stripeCancelAtPeriodEnd
      : null;

  return NextResponse.json({
    // keep your existing fields
    role,
    stripeStatus,
    stripeSubscriptionId: (user as any).stripeSubscriptionId ?? null,
    stripeCustomerId: (user as any).stripeCustomerId ?? null,

    // ✅ recommended: use this in UI for gating features/buttons
    effectiveRole,

    // optional extras for UI like "cancelled at period end"
    stripeCurrentPeriodEnd,
    stripeCancelAtPeriodEnd,
  });
}
