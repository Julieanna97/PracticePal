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
    title: z.string().min(2, "Title must be at least 2 characters").max(80, "Title is too long"),
    instrumentOrSkill: z.string().min(1, "Please choose an instrument or skill"),
    customInstrumentOrSkill: z.string().max(80, "Custom instrument/skill is too long").optional(),
    weeklyTargetMinutes: z
      .number()
      .int("Weekly target must be a whole number")
      .min(10, "Weekly target must be at least 10 minutes")
      .max(20000, "Weekly target is too high"),
    goalDescription: z.string().max(500, "Description is too long").optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.instrumentOrSkill) {
      ctx.addIssue({
        code: "custom",
        path: ["instrumentOrSkill"],
        message: "Please choose an instrument or skill",
      });
    }

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

type Props = {
  planId: string;
  initial: {
    title: string;
    instrumentOrSkill: string;
    weeklyTargetMinutes: number;
    goalDescription: string;
  };
};

type FormState = {
  title: string;
  instrumentOrSkill: string;
  selectInstrumentOrSkill: (typeof INSTRUMENT_OPTIONS)[number] | "";
  customInstrumentOrSkill: string;
  weeklyTargetMinutes: string;
  goalDescription: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function EditPlanForm({ planId, initial }: Props) {
  const router = useRouter();

  const initialSelect = (INSTRUMENT_OPTIONS as readonly string[]).includes(
    initial.instrumentOrSkill,
  )
    ? (initial.instrumentOrSkill as (typeof INSTRUMENT_OPTIONS)[number])
    : "Other";

  const [form, setForm] = useState<FormState>({
    title: initial.title,
    selectInstrumentOrSkill: initialSelect,
    customInstrumentOrSkill: initialSelect === "Other" ? initial.instrumentOrSkill : "",
    instrumentOrSkill: initial.instrumentOrSkill,
    weeklyTargetMinutes: String(initial.weeklyTargetMinutes ?? 150),
    goalDescription: initial.goalDescription ?? "",
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
    const dropdown = form.selectInstrumentOrSkill;
    const finalInstrument =
      dropdown === "Other" ? form.customInstrumentOrSkill.trim() : dropdown;

    const result = planSchema.safeParse({
      title: form.title.trim(),
      instrumentOrSkill: finalInstrument,
      customInstrumentOrSkill:
        dropdown === "Other" ? form.customInstrumentOrSkill.trim() : undefined,
      weeklyTargetMinutes: parsedWeeklyMinutes,
      goalDescription: form.goalDescription.trim()
        ? form.goalDescription.trim()
        : undefined,
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
      else if (k === "instrumentOrSkill") next.selectInstrumentOrSkill = issue.message;
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

    const dropdown = form.selectInstrumentOrSkill;
    const finalInstrument =
      dropdown === "Other" ? form.customInstrumentOrSkill.trim() : dropdown;

    try {
      const res = await fetch(`/api/plans/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          instrumentOrSkill: finalInstrument,
          weeklyTargetMinutes: Number(form.weeklyTargetMinutes),
          goalDescription: form.goalDescription.trim()
            ? form.goalDescription.trim()
            : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setServerError(data?.error ?? "Failed to update plan.");
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

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm text-[#1a2e2c] outline-none transition placeholder:text-[#1a2e2c]/35 focus:border-[#0d3b3a]/35 focus:bg-white focus:ring-4 focus:ring-[#0d3b3a]/8";

  const labelClass = "block font-body text-sm font-semibold text-[#0d3b3a]";
  const errorClass = "mt-2 font-body text-sm font-medium text-red-600";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-7 rounded-3xl border border-[#0d3b3a]/8 bg-[#faf6f0]/45 p-5 md:p-7"
    >
      {serverError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm font-semibold text-red-700">
          {serverError}
        </div>
      )}

      <div>
        <label className={labelClass}>Plan title</label>
        <input
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          className={fieldClass}
          placeholder="e.g. Vocal Belting Routine"
          autoComplete="off"
        />
        {errors.title && <p className={errorClass}>{errors.title}</p>}
      </div>

      <div>
        <label className={labelClass}>Instrument / skill</label>
        <select
          value={form.selectInstrumentOrSkill}
          onChange={(e) => {
            const v = e.target.value as FormState["selectInstrumentOrSkill"];
            setField("selectInstrumentOrSkill", v);

            if (v !== "Other") {
              setField("customInstrumentOrSkill", "");
              setField("instrumentOrSkill", v);
            }
          }}
          className={fieldClass}
        >
          <option value="" disabled>
            Select one...
          </option>
          {INSTRUMENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {errors.selectInstrumentOrSkill && (
          <p className={errorClass}>{errors.selectInstrumentOrSkill}</p>
        )}
      </div>

      {form.selectInstrumentOrSkill === "Other" && (
        <div>
          <label className={labelClass}>Type your instrument / skill</label>
          <input
            value={form.customInstrumentOrSkill}
            onChange={(e) => {
              setField("customInstrumentOrSkill", e.target.value);
              setField("instrumentOrSkill", e.target.value);
            }}
            className={fieldClass}
            placeholder="e.g. Clarinet, Ukulele, Songwriting..."
            autoComplete="off"
          />
          {errors.customInstrumentOrSkill && (
            <p className={errorClass}>{errors.customInstrumentOrSkill}</p>
          )}
        </div>
      )}

      <div>
        <label className={labelClass}>Weekly target in minutes</label>
        <input
          type="number"
          min={10}
          step={5}
          value={form.weeklyTargetMinutes}
          onChange={(e) => setField("weeklyTargetMinutes", e.target.value)}
          inputMode="numeric"
          className={fieldClass}
          placeholder="150"
        />
        {errors.weeklyTargetMinutes && (
          <p className={errorClass}>{errors.weeklyTargetMinutes}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Goal description{" "}
          <span className="font-normal text-[#1a2e2c]/45">(optional)</span>
        </label>
        <textarea
          value={form.goalDescription}
          onChange={(e) => setField("goalDescription", e.target.value)}
          className={`${fieldClass} min-h-[120px] resize-none`}
          placeholder="What are you focusing on this week?"
        />
        {errors.goalDescription && (
          <p className={errorClass}>{errors.goalDescription}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#0d3b3a]/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/plans"
          className="inline-flex items-center justify-center rounded-full border border-[#0d3b3a]/15 bg-white/60 px-6 py-3 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}