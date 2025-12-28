import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return unauthorized();

  await connectToDB();

  const plans = await PracticePlan.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(plans);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return unauthorized();

  const body = await req.json();

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const instrumentOrSkill =
    typeof body.instrumentOrSkill === "string" ? body.instrumentOrSkill.trim() : "";
  const goalDescription =
    typeof body.goalDescription === "string" ? body.goalDescription.trim() : "";
  const weeklyTargetMinutes = Number(body.weeklyTargetMinutes);

  if (!title || !instrumentOrSkill || !goalDescription) {
    return NextResponse.json(
      { error: "Missing required fields: title, instrumentOrSkill, goalDescription" },
      { status: 400 }
    );
  }

  if (!Number.isFinite(weeklyTargetMinutes) || weeklyTargetMinutes <= 0) {
    return NextResponse.json(
      { error: "weeklyTargetMinutes must be a positive number" },
      { status: 400 }
    );
  }

  await connectToDB();

  const plan = await PracticePlan.create({
    userId,
    title,
    instrumentOrSkill,
    goalDescription,
    weeklyTargetMinutes,
  });

  return NextResponse.json(plan, { status: 201 });
}
