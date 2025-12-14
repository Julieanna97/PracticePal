import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";

// GET /api/plans  -> list plans (for now: all)
export async function GET() {
  await connectToDB();
  const plans = await PracticePlan.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(plans);
}

// POST /api/plans -> create a plan
export async function POST(req: Request) {
  await connectToDB();

  const body = await req.json();

  // Beginner-friendly validation (simple)
  const plan = await PracticePlan.create({
    userId: body.userId ?? "demo-user", // replace later with real auth user id
    title: body.title,
    instrumentOrSkill: body.instrumentOrSkill,
    goalDescription: body.goalDescription,
    weeklyTargetMinutes: body.weeklyTargetMinutes,
  });

  return NextResponse.json(plan, { status: 201 });
}
