import mongoose, { Schema, models, model } from "mongoose";

const PracticePlanSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    instrumentOrSkill: { type: String, required: true },
    goalDescription: { type: String, required: false, default: "" }, // ✅ changed
    weeklyTargetMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const PracticePlan =
  models.PracticePlan || model("PracticePlan", PracticePlanSchema);
