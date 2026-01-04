"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

export const INSTRUMENT_OPTIONS = [
  "Singing",
  "Piano",
  "Guitar",
  "Bass",
  "Violin",
  "Drums",
  "Saxophone",
  "Flute",
  "Trumpet",
  "Music Theory",
  "Ear Training",
  "Other",
] as const;

const planSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(80, "Title is too long"),

    // ✅ Compatible across Zod versions: no errorMap, use refine instead
    instrumentOrSkill: z
      .string()
      .min(1, "Please choose an instrument or skill")
      .refine((val) => (INSTRUMENT_OPTIONS as readonly string[]).includes(val), {
        message: "Please choose an instrument or skill",
      }),

    customInstrumentOrSkill: z
      .string()
      .max(80, "Custom instrument/skill is too long")
      .optional(),

    weeklyTargetMinutes: z
      .number({ invalid_type_error: "Weekly target must be a number" })
      .int("Weekly target must be a whole number")
      .min(10, "Weekly target must be at least 10 minutes")
      .max(20000, "Weekly target is too high"),

    goalDescription: z.string().max(500, "Description is too long").optional(),
  })
  .superRefine((val, ctx) => {
    if (val.instrumentOrSkill === "Other") {
      const custom = (val.customInstrumentOrSkill ?? "").trim();
      if (custom.length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["customInstrumentOrSkill"],
          message: "Please type your instrument/skill (at least 2 characters)",
        });
      }
    }
  });

type FormState = {
  title: string;
  instrumentOrSkill: (typeof INSTRUMENT_OPTIONS)[number] | "";
  customInstrumentOrSkill: string;
  weeklyTargetMinutes: string;
  goalDescription: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function NewPlanForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: "",
    instrumentOrSkill: "",
    customInstrumentOrSkill: "",
    weeklyTargetMinutes: "150",
    goalDescription: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const parsedWeeklyMinutes = useMemo(() => {
    const n = Number(form.weeklyTargetMinutes);
    return Number.isFinite(n) ? n : NaN;
  }, [form.weeklyTargetMinutes]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setServerError(null);
  }

  function validate(): boolean {
    const result = planSchema.safeParse({
      title: form.title.trim(),
      instrumentOrSkill: form.instrumentOrSkill, // string in schema (works)
      customInstrumentOrSkill: form.customInstrumentOrSkill.trim() || undefined,
      weeklyTargetMinutes: parsedWeeklyMinutes,
      goalDescription: form.goalDescription.trim() ? form.goalDescription.trim() : undefined,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const next: FieldErrors = {};
    for (const issue of result.error.issues) {
      const k = issue.path[0] as keyof FormState | undefined;
      if (!k) continue;

      if (k === "weeklyTargetMinutes") next.weeklyTargetMinutes = issue.message;
      else next[k] = issue.message;
    }

    setErrors(next);
    return false;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError(null);

    const finalInstrument =
      form.instrumentOrSkill === "Other"
        ? form.customInstrumentOrSkill.trim()
        : form.instrumentOrSkill;

    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          instrumentOrSkill: finalInstrument,
          weeklyTargetMinutes: Number(form.weeklyTargetMinutes),
          goalDescription: form.goalDescription.trim() ? form.goalDescription.trim() : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setServerError(data?.error ?? "Failed to create plan.");
        return;
      }

      router.push("/plans");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-900">Plan title</label>
        <input
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="e.g. Vocal Belting Routine"
          autoComplete="off"
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900">Instrument / skill</label>
        <select
          value={form.instrumentOrSkill}
          onChange={(e) => {
            const v = e.target.value as FormState["instrumentOrSkill"];
            setField("instrumentOrSkill", v);
            if (v !== "Other") setField("customInstrumentOrSkill", "");
          }}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="" disabled>
            Select one…
          </option>
          {INSTRUMENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.instrumentOrSkill && (
          <p className="mt-2 text-sm text-red-600">{errors.instrumentOrSkill}</p>
        )}
      </div>

      {form.instrumentOrSkill === "Other" && (
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Type your instrument/skill
          </label>
          <input
            value={form.customInstrumentOrSkill}
            onChange={(e) => setField("customInstrumentOrSkill", e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="e.g. Clarinet, Ukulele, Songwriting…"
            autoComplete="off"
          />
          {errors.customInstrumentOrSkill && (
            <p className="mt-2 text-sm text-red-600">{errors.customInstrumentOrSkill}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-900">Weekly target (minutes)</label>
        <input
          value={form.weeklyTargetMinutes}
          onChange={(e) => setField("weeklyTargetMinutes", e.target.value)}
          inputMode="numeric"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="150"
        />
        {errors.weeklyTargetMinutes && (
          <p className="mt-2 text-sm text-red-600">{errors.weeklyTargetMinutes}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900">
          Goal description <span className="text-gray-400 font-medium">(optional)</span>
        </label>
        <textarea
          value={form.goalDescription}
          onChange={(e) => setField("goalDescription", e.target.value)}
          className="mt-2 w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="What are you focusing on this week?"
        />
        {errors.goalDescription && (
          <p className="mt-2 text-sm text-red-600">{errors.goalDescription}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/plans"
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create plan"}
        </button>
      </div>
    </form>
  );
}
