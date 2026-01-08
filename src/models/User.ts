// src/models/User.ts
import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },

    role: { type: String, enum: ["FREE", "PRO"], default: "FREE" },

    // Stripe fields
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    stripePriceId: { type: String, default: null },
    stripeStatus: { type: String, default: null },

    // ✅ Needed for “cancel at period end”
    stripeCancelAtPeriodEnd: { type: Boolean, default: false },
    stripeCurrentPeriodEnd: { type: Date, default: null },

    // (Optional) legacy fields if you still have old docs
    subscriptionId: { type: String, default: null },
    subscriptionStatus: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
