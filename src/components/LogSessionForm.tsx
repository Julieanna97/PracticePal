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
  practicedAt: string; // ISO
};

type FieldErrors = Partial<Record<
  "planId" | "durationMinutes" | "difficulty" | "practicedAt",
  string
>>;

export default function LogSessionForm() {
  const router = useRouter();
  const moodPresets = ["Focused", "Motivated", "Tired", "Frustrated", "Flow state"];

  const [plans, setPlans] = useState<Plan[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);

  const [form, setForm] = useState({
    planId: "",
    durationMinutes: "",
    difficulty: "",
    practicedAt: "", // yyyy-mm-dd (from <input type="date">)
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
      // keep UI usable
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

      // Reset only inputs you want (keep plan selected if you prefer)
      setForm((p) => ({
        ...p,
        durationMinutes: "",
        difficulty: "",
        practicedAt: "",
        mood: "",
        notes: "",
      }));

      await loadAll();

      // If your stats page reads from DB, this helps it update if user navigates there
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
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100";

  return (
    <div className="space-y-10">
      <form onSubmit={onSubmit} className="space-y-7 rounded-2xl border border-purple-100 bg-gradient-to-b from-white to-purple-50/30 p-6 md:p-7">
        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {serverError}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-900">Practice plan</label>
          <select
            value={form.planId}
            onChange={(e) => setField("planId", e.target.value)}
            className={fieldClass}
            disabled={loading}
          >
            <option value="" disabled>
              Select a plan...
            </option>
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          {errors.planId && <p className="mt-2 text-sm text-red-600">{errors.planId}</p>}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900">Duration (minutes)</label>
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
              <p className="mt-2 text-sm text-red-600">{errors.durationMinutes}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Date <span className="font-medium text-gray-400">(optional)</span>
            </label>
            <input
              type="date"
              value={form.practicedAt}
              onChange={(e) => setField("practicedAt", e.target.value)}
              className={fieldClass}
            />
            {errors.practicedAt && <p className="mt-2 text-sm text-red-600">{errors.practicedAt}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Difficulty (1–5)</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((level) => {
              const active = Number(form.difficulty) === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setField("difficulty", String(level))}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-purple-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
          {errors.difficulty && <p className="mt-2 text-sm text-red-600">{errors.difficulty}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Mood <span className="text-gray-400 font-medium">(optional)</span>
          </label>
          <input
            value={form.mood}
            onChange={(e) => setField("mood", e.target.value)}
            className={fieldClass}
            placeholder="How did you feel?"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {moodPresets.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setField("mood", mood)}
                className="rounded-full border border-purple-200 bg-white px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-50"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Notes <span className="text-gray-400 font-medium">(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            className={`${fieldClass} min-h-[120px]`}
            placeholder="Practice notes..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-indigo-800 disabled:opacity-60"
        >
          {submitting ? "Logging..." : "Log session"}
        </button>
      </form>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent sessions</h2>
          <button
            type="button"
            onClick={loadAll}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="mt-4 text-gray-600">Loading...</p>
        ) : sessions.length === 0 ? (
          <p className="mt-4 text-gray-600">No sessions yet. Log your first one above 🙂</p>
        ) : (
          <div className="mt-4 space-y-3">
            {sessions.map((s) => (
              <div
                key={s._id}
                className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{s.planTitle}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-700">
                      <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-800">
                        {s.durationMinutes} min
                      </span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                        Difficulty {s.difficulty}
                      </span>
                      {s.practicedAt ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {new Date(s.practicedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      ) : null}
                    </div>
                    {(s.mood || s.notes) && (
                      <p className="mt-2 text-sm text-gray-600">
                        {s.mood ? <span className="font-medium">Mood:</span> : null}{" "}
                        {s.mood}
                        {s.mood && s.notes ? " • " : null}
                        {s.notes ? <span className="font-medium">Notes:</span> : null}{" "}
                        {s.notes}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteSession(s._id)}
                    className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

