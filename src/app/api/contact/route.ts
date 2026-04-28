import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Email contact has been removed. Please use LinkedIn or GitHub instead.",
    },
    { status: 410 }
  );
}
