import { Schema, models, model } from "mongoose";

const AccountSchema = new Schema(
  {
    userId: { type: String, required: true, index: true }, // store as string id
    provider: { type: String, required: true },            // "google" | "facebook"
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account = models.Account || model("Account", AccountSchema);
