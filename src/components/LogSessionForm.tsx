"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Plan = {
  _id: string;
  title: string;
};

type SessionItem = {
  _id: string;
  planTitle: string;
  durationMinutes: number;
  difficulty: number;
  mood?: string;
  notes?: string;
  practicedAt: string;
};

type FieldErrors = Partial<
  Record<"planId" | "durationMinutes" | "difficulty" | "practicedAt", string>
>;

export default function LogSessionForm() {
  const router = useRouter();
  const moodPresets = ["Focused", "Motivated", "Tired", "Frustrated", "Flow state"];

  const [plans, setPlans] = useState<Plan[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);

  const [form, setForm] = useState({
    planId: "",
    durationMinutes: "",
    difficulty: "",
    practicedAt: "",
    mood: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const durationNum = useMemo(() => Number(form.durationMinutes), [form.durationMinutes]);
  const difficultyNum = useMemo(() => Number(form.difficulty), [form.difficulty]);

  async function loadAll() {
    setLoading(true);
    setServerError(null);

    try {
      const [plansRes, sessionsRes] = await Promise.all([
        fetch("/api/plans", { cache: "no-store" }),
        fetch("/api/sessions?limit=10", { cache: "no-store" }),
      ]);

      if (plansRes.ok) setPlans(await plansRes.json());
      if (sessionsRes.ok) setSessions(await sessionsRes.json());
    } catch {
      // Keep UI usable.
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
    setServerError(null);
  }

  function validate(): boolean {
    const next: FieldErrors = {};

    if (!form.planId) next.planId = "Please select a practice plan.";

    if (!Number.isFinite(durationNum) || durationNum <= 0) {
      next.durationMinutes = "Duration must be a positive number.";
    }

    if (!Number.isFinite(difficultyNum) || difficultyNum < 1 || difficultyNum > 5) {
      next.difficulty = "Difficulty must be between 1 and 5.";
    }

    if (form.practicedAt) {
      const d = new Date(form.practicedAt);
      if (Number.isNaN(d.getTime())) next.practicedAt = "Invalid date.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: form.planId,
          durationMinutes: durationNum,
          difficulty: difficultyNum,
          practicedAt: form.practicedAt ? new Date(form.practicedAt).toISOString() : undefined,
          mood: form.mood.trim(),
          notes: form.notes.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setServerError(data?.error ?? "Failed to log session.");
        return;
      }

      setForm((p) => ({
        ...p,
        durationMinutes: "",
        difficulty: "",
        practicedAt: "",
        mood: "",
        notes: "",
      }));

      await loadAll();
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteSession(id: string) {
    const ok = confirm("Delete this session?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Failed to delete.");
        return;
      }

      setSessions((prev) => prev.filter((s) => s._id !== id));
      router.refresh();
    } catch {
      alert("Network error. Please try again.");
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm text-[#1a2e2c] outline-none transition placeholder:text-[#1a2e2c]/35 focus:border-[#0d3b3a]/35 focus:bg-white focus:ring-4 focus:ring-[#0d3b3a]/8";

  const labelClass =
    "block font-body text-sm font-semibold text-[#0d3b3a]";

  const errorClass = "mt-2 font-body text-sm font-medium text-red-600";

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="space-y-7 rounded-3xl border border-[#0d3b3a]/8 bg-[#faf6f0]/45 p-5 md:p-6"
      >
        {serverError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm font-medium text-red-700">
            {serverError}
          </div>
        )}

        <div>
          <label className={labelClass}>Practice plan</label>
          <select
            value={form.planId}
            onChange={(e) => setField("planId", e.target.value)}
            className={fieldClass}
            disabled={loading}
          >
            <option value="" disabled>
              {loading ? "Loading plans..." : "Select a plan..."}
            </option>
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          {errors.planId && <p className={errorClass}>{errors.planId}</p>}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Duration in minutes</label>
            <input
              type="number"
              min={1}
              step={1}
              value={form.durationMinutes}
              onChange={(e) => setField("durationMinutes", e.target.value)}
              inputMode="numeric"
              className={fieldClass}
              placeholder="e.g. 25"
            />
            {errors.durationMinutes && (
              <p className={errorClass}>{errors.durationMinutes}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Date <span className="font-medium text-[#1a2e2c]/40">(optional)</span>
            </label>
            <input
              type="date"
              value={form.practicedAt}
              onChange={(e) => setField("practicedAt", e.target.value)}
              className={fieldClass}
            />
            {errors.practicedAt && <p className={errorClass}>{errors.practicedAt}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Difficulty</label>

          <div className="mt-3 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => {
              const active = Number(form.difficulty) === level;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setField("difficulty", String(level))}
                  className={`rounded-2xl px-4 py-3 font-body text-sm font-semibold transition ${
                    active
                      ? "bg-[#0d3b3a] text-[#faf6f0]"
                      : "border border-[#0d3b3a]/10 bg-white/60 text-[#0d3b3a] hover:border-[#0d3b3a]/25 hover:bg-[#0d3b3a]/5"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-between font-body text-xs text-[#1a2e2c]/45">
            <span>Easy</span>
            <span>Hard</span>
          </div>

          {errors.difficulty && <p className={errorClass}>{errors.difficulty}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Mood <span className="font-medium text-[#1a2e2c]/40">(optional)</span>
          </label>

          <input
            value={form.mood}
            onChange={(e) => setField("mood", e.target.value)}
            className={fieldClass}
            placeholder="How did you feel?"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {moodPresets.map((mood) => {
              const active = form.mood === mood;

              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setField("mood", mood)}
                  className={`rounded-full border px-3 py-1.5 font-body text-xs font-semibold transition ${
                    active
                      ? "border-[#0d3b3a] bg-[#0d3b3a] text-[#faf6f0]"
                      : "border-[#0d3b3a]/12 bg-white/60 text-[#0d3b3a] hover:bg-[#0d3b3a]/5"
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Notes <span className="font-medium text-[#1a2e2c]/40">(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            className={`${fieldClass} min-h-[120px] resize-none`}
            placeholder="What did you practice? What felt better? What should you repeat next time?"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-[#0d3b3a] px-6 py-3.5 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Logging session..." : "Log session"}
        </button>
      </form>

      <section className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/45">
              History
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-[#0d3b3a]">
              Recent sessions
            </h2>
          </div>

          <button
            type="button"
            onClick={loadAll}
            className="rounded-full border border-[#0d3b3a]/12 bg-[#faf6f0]/70 px-4 py-2 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="mt-5 font-body text-sm text-[#1a2e2c]/60">Loading...</p>
        ) : sessions.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-[#0d3b3a]/18 bg-[#faf6f0]/45 p-6 text-center">
            <p className="font-display text-2xl font-medium text-[#0d3b3a]">
              No sessions yet.
            </p>
            <p className="mt-2 font-body text-sm text-[#1a2e2c]/60">
              Log your first one above and your history will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {sessions.map((s) => (
              <article
                key={s._id}
                className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0]/50 p-4 transition hover:bg-[#faf6f0]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-display text-xl font-medium tracking-tight text-[#0d3b3a]">
                      {s.planTitle}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 font-body text-xs">
                      <span className="rounded-full bg-[#0d3b3a]/8 px-3 py-1 font-semibold text-[#0d3b3a]">
                        {s.durationMinutes} min
                      </span>

                      <span className="rounded-full bg-[#f4a261]/18 px-3 py-1 font-semibold text-[#0d3b3a]">
                        Difficulty {s.difficulty}
                      </span>

                      {s.practicedAt ? (
                        <span className="rounded-full bg-white/70 px-3 py-1 font-semibold text-[#1a2e2c]/60">
                          {new Date(s.practicedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      ) : null}
                    </div>

                    {(s.mood || s.notes) && (
                      <p className="mt-3 font-body text-sm leading-relaxed text-[#1a2e2c]/62">
                        {s.mood ? (
                          <>
                            <span className="font-semibold text-[#0d3b3a]">Mood:</span>{" "}
                            {s.mood}
                          </>
                        ) : null}
                        {s.mood && s.notes ? " · " : null}
                        {s.notes ? (
                          <>
                            <span className="font-semibold text-[#0d3b3a]">Notes:</span>{" "}
                            {s.notes}
                          </>
                        ) : null}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteSession(s._id)}
                    className="shrink-0 rounded-full px-3 py-2 font-body text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}