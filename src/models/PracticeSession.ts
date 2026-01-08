import { Schema, models, model } from "mongoose";

const PracticeSessionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },

    planId: { type: Schema.Types.ObjectId, required: true, index: true, ref: "PracticePlan" },
    planTitle: { type: String, required: true },

    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: Number, required: true, min: 1, max: 5 },

    mood: { type: String, default: "" },
    notes: { type: String, default: "" },

    practicedAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

export const PracticeSession =
  models.PracticeSession || model("PracticeSession", PracticeSessionSchema);
