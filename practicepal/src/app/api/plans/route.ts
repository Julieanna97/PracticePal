import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions"; // <-- IMPORTANT: match your real file name
import { connectToDB } from "@/lib/mongoose";    // <-- keep consistent with your connector file
import { PracticePlan } from "@/models/PracticePlan";

type PublicPlan = {
  _id: string;
  userId: string;
  title: string;
  instrumentOrSkill: string;
  goalDescription: string;
  weeklyTargetMinutes: number;
  createdAt?: string;
  updatedAt?: string;
};

function toPublicPlan(doc: any): PublicPlan {
  const obj = typeof doc?.toObject === "function" ? doc.toObject() : doc;

  return {
    _id: String(obj._id),
    userId: String(obj.userId),
    title: String(obj.title ?? ""),
    instrumentOrSkill: String(obj.instrumentOrSkill ?? ""),
    goalDescription: String(obj.goalDescription ?? ""),
    weeklyTargetMinutes: Number(obj.weeklyTargetMinutes ?? 0),
    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : undefined,
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : undefined,
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id; // works once next-auth.d.ts is included

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const plans = await PracticePlan.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(plans.map(toPublicPlan), { status: 200 });
  } catch (err) {
    console.error("GET /api/plans error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const instrumentOrSkill = String(body.instrumentOrSkill ?? "").trim();
    const goalDescription = String(body.goalDescription ?? "").trim();
    const weeklyTargetMinutesRaw = body.weeklyTargetMinutes;

    const weeklyTargetMinutes =
      typeof weeklyTargetMinutesRaw === "string"
        ? Number(weeklyTargetMinutesRaw)
        : Number(weeklyTargetMinutesRaw);

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

    return NextResponse.json(toPublicPlan(plan), { status: 201 });
  } catch (err) {
    console.error("POST /api/plans error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
