import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";

type Ctx = { params: Promise<{ id: string }> };

function toPublicPlan(doc: any) {
  const obj = typeof doc?.toObject === "function" ? doc.toObject() : doc;
  return { ...obj, _id: obj?._id?.toString?.() ?? obj?._id };
}

export async function PUT(req: Request, { params }: Ctx) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const instrumentOrSkill = String(body.instrumentOrSkill ?? "").trim();
    const goalDescription = String(body.goalDescription ?? "").trim();
    const weeklyTargetMinutes = Number(body.weeklyTargetMinutes);

    if (!title || !instrumentOrSkill) {
      return NextResponse.json(
        { error: "Missing required fields: title, instrumentOrSkill" },
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

    const updated = await PracticePlan.findOneAndUpdate(
      { _id: id, userId },
      {
        title,
        instrumentOrSkill,
        weeklyTargetMinutes,
        // If your schema requires goalDescription, keep it required:
        goalDescription: goalDescription || " ",
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(toPublicPlan(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/plans/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    await connectToDB();

    const deleted = await PracticePlan.findOneAndDelete({ _id: id, userId });
    if (!deleted) return NextResponse.json({ error: "Plan not found" }, { status: 404 });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/plans/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
