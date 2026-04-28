// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();

  const user = await User.findById(userId)
    .select({
      role: 1,
      stripeStatus: 1,
      stripeSubscriptionId: 1,
      stripeCustomerId: 1,
      stripeCancelAtPeriodEnd: 1,
      stripeCurrentPeriodEnd: 1,
    })
    .lean();

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    role: user.role ?? "FREE",
    stripeStatus: user.stripeStatus ?? null,
    stripeSubscriptionId: user.stripeSubscriptionId ?? null,
    stripeCustomerId: user.stripeCustomerId ?? null,
    stripeCancelAtPeriodEnd: (user as any).stripeCancelAtPeriodEnd ?? false,
    stripeCurrentPeriodEnd: (user as any).stripeCurrentPeriodEnd ?? null,
  });
}
