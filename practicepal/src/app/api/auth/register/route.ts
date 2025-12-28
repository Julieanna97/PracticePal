import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

const schema = z.object({
  name: z.string().min(1).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await connectToDB();

  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await User.create({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: "FREE",
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
