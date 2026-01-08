import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import { PracticeSession } from "@/models/PracticeSession";
import { User } from "@/models/User";
import { Account } from "@/models/Account";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    // Delete user data
    await PracticeSession.deleteMany({ userId });
    await PracticePlan.deleteMany({ userId });

    // If you store oauth links
    await Account.deleteMany({ userId });

    // Delete the user
    await User.deleteOne({ _id: userId });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/account error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
