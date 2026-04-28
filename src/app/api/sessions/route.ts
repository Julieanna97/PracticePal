import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticeSession } from "@/models/PracticeSession";
import { PracticePlan } from "@/models/PracticePlan";

function toPublic(doc: any) {
  const obj = typeof doc?.toObject === "function" ? doc.toObject() : doc;
  return {
    ...obj,
    _id: obj?._id?.toString?.() ?? obj?._id,
  };
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "10"), 50);

    await connectToDB();

    const sessions = await PracticeSession.find({ userId })
      .sort({ practicedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(sessions.map(toPublic), { status: 200 });
  } catch (err) {
    console.error("GET /api/sessions error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);

    const planId = String(body?.planId ?? "").trim();
    const durationMinutes = Number(body?.durationMinutes);
    const difficulty = Number(body?.difficulty);
    const mood = String(body?.mood ?? "").trim();
    const notes = String(body?.notes ?? "").trim();
    const practicedAtRaw = body?.practicedAt;

    if (!planId) {
      return NextResponse.json({ error: "Please select a practice plan" }, { status: 400 });
    }

    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      return NextResponse.json({ error: "Duration must be a positive number" }, { status: 400 });
    }

    if (!Number.isFinite(difficulty) || difficulty < 1 || difficulty > 5) {
      return NextResponse.json({ error: "Difficulty must be between 1 and 5" }, { status: 400 });
    }

    // If user doesn’t pick a date, default = today
    const practicedAt = practicedAtRaw ? new Date(practicedAtRaw) : new Date();
    if (Number.isNaN(practicedAt.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    await connectToDB();

    // Verify plan belongs to user, and read title to store with session
    const plan = await PracticePlan.findOne({ _id: planId, userId }).lean();
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan (not found)" }, { status: 404 });
    }

    const created = await PracticeSession.create({
      userId,
      planId: String(plan._id),
      planTitle: String((plan as any).title ?? "Untitled plan"),
      durationMinutes,
      difficulty,
      mood,
      notes,
      practicedAt,
    });

    return NextResponse.json(toPublic(created), { status: 201 });
  } catch (err) {
    console.error("POST /api/sessions error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
