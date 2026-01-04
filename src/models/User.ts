import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String }, // only for email/password users
    role: { type: String, enum: ["FREE", "PRO"], default: "FREE" },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
