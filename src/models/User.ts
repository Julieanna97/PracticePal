import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String }, // only for email/password users

    // Keep ADMIN if you use it elsewhere (authOptions type had ADMIN)
    role: { type: String, enum: ["FREE", "PRO", "ADMIN"], default: "FREE" },

    // Stripe fields (preferred)
    stripeCustomerId: { type: String, index: true },
    stripeSubscriptionId: { type: String, index: true },
    stripePriceId: { type: String },
    stripeStatus: { type: String }, // active, trialing, past_due, canceled, etc.

    // Subscription lifecycle (helps UI decide what to show)
    stripeCurrentPeriodEnd: { type: Date },
    stripeCancelAtPeriodEnd: { type: Boolean, default: false },

    // Legacy fields (your DB screenshot shows these names)
    subscriptionId: { type: String },
    subscriptionStatus: { type: String }, // active, trialing, canceled, etc.
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
