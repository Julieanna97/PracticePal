import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";

function toPublicPlan(doc: any) {
  const obj = typeof doc?.toObject === "function" ? doc.toObject() : doc;
  return {
    ...obj,
    _id: obj?._id?.toString?.() ?? obj?._id,
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const plans = await PracticePlan.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(plans.map(toPublicPlan), { status: 200 });
  } catch (err) {
    console.error("GET /api/plans error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const role = (session?.user as any)?.role ?? "FREE";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    // ✅ FREE users can only have 1 plan
    if (role !== "PRO") {
      const count = await PracticePlan.countDocuments({ userId });
      if (count >= 1) {
        return NextResponse.json(
          { error: "Free users can only have 1 plan. Upgrade to Pro to create more." },
          { status: 403 }
        );
      }
    }

    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const instrumentOrSkill = String(body.instrumentOrSkill ?? "").trim();
    const goalDescription = String(body.goalDescription ?? "").trim();
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
