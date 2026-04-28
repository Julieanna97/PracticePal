// src/app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticeSession } from "@/models/PracticeSession";
import { User } from "@/models/User";

function startOfDayUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
function addDaysUTC(d: Date, days: number) {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}
function startOfWeekUTC(d: Date) {
  const day = d.getUTCDay();
  const diffToMonday = (day + 6) % 7;
  const start = startOfDayUTC(d);
  return addDaysUTC(start, -diffToMonday);
}
function keyUTC(d: Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) redirect("/auth/login");

  await connectToDB();

  const dbUser = await User.findById(userId)
    .select({ role: 1, stripeStatus: 1, stripeSubscriptionId: 1 })
    .lean();

  const isPro = dbUser?.role === "PRO";

  const now = new Date();
  const todayStart = startOfDayUTC(now);
  const tomorrowStart = addDaysUTC(todayStart, 1);
  const weekStart = startOfWeekUTC(now);
  const nextWeekStart = addDaysUTC(weekStart, 7);

  const recentSessions = await PracticeSession.find({ userId })
    .sort({ practicedAt: -1 })
    .limit(8)
    .lean();

  const streakLookbackStart = addDaysUTC(todayStart, -60);

  const sessionsForStats = await PracticeSession.find({
    userId,
    practicedAt: { $gte: streakLookbackStart, $lt: tomorrowStart },
  })
    .select({ practicedAt: 1, durationMinutes: 1 })
    .lean();

  const todayMinutes = sessionsForStats
    .filter((s: any) => {
      const t = new Date(s.practicedAt);
      return t >= todayStart && t < tomorrowStart;
    })
    .reduce((sum: number, s: any) => sum + Number(s.durationMinutes || 0), 0);

  const weekMinutes = sessionsForStats
    .filter((s: any) => {
      const t = new Date(s.practicedAt);
      return t >= weekStart && t < nextWeekStart;
    })
    .reduce((sum: number, s: any) => sum + Number(s.durationMinutes || 0), 0);

  const daysWithPractice = new Set<string>();
  for (const s of sessionsForStats) daysWithPractice.add(keyUTC(new Date(s.practicedAt)));

  let streak = 0;
  let cursor = todayStart;

  if (!daysWithPractice.has(keyUTC(cursor))) cursor = addDaysUTC(cursor, -1);
  while (daysWithPractice.has(keyUTC(cursor))) {
    streak += 1;
    cursor = addDaysUTC(cursor, -1);
  }

  const userName = (session?.user as any)?.name || "there";
  const firstName = userName.split(" ")[0];
  const weeklyGoal = 150;
  const weeklyCompletion = Math.min(100, Math.round((weekMinutes / weeklyGoal) * 100));
  const remainingToGoal = Math.max(0, weeklyGoal - weekMinutes);
  const coachingMessage =
    weeklyCompletion >= 100
      ? "You hit your weekly target. Now refine — quality reps over quantity."
      : weeklyCompletion >= 70
      ? `Strong week. ${remainingToGoal} more minutes closes it out.`
      : "Start with a focused 20-minute block. Consistency beats intensity.";
  const milestoneLabel =
    streak >= 14
      ? "Consistency"
      : streak >= 7
      ? "Streak Builder"
      : streak >= 3
      ? "Momentum"
      : "Fresh Start";

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const day = addDaysUTC(todayStart, -(6 - i));
    const nextDay = addDaysUTC(day, 1);
    const minutes = sessionsForStats
      .filter((s: any) => {
        const t = new Date(s.practicedAt);
        return t >= day && t < nextDay;
      })
      .reduce((sum: number, s: any) => sum + Number(s.durationMinutes || 0), 0);

    return {
      key: keyUTC(day),
      label: day.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1),
      fullLabel: day.toLocaleDateString("en-US", { weekday: "short" }),
      minutes,
    };
  });

  const maxDayMinutes = Math.max(...last7Days.map((d) => d.minutes), 60);
  const totalMinutes = sessionsForStats.reduce(
    (sum: number, s: any) => sum + Number(s.durationMinutes || 0),
    0,
  );
  const avgSessionMinutes =
    sessionsForStats.length > 0 ? Math.round(totalMinutes / sessionsForStats.length) : 0;

  const greeting = (() => {
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a2e2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes barRise {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>

      {/* TOP NAV */}
      <header className="border-b border-[#0d3b3a]/10 bg-[#faf6f0]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-md bg-[#0d3b3a] flex items-center justify-center transition group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f4a261]" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>
            <span className="font-display text-lg font-600 tracking-tight text-[#0d3b3a]">PracticePal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 font-body text-sm">
            <Link href="/dashboard" className="px-3 py-1.5 rounded-md font-500 text-[#0d3b3a] bg-[#0d3b3a]/8">Dashboard</Link>
            <Link href="/plans" className="px-3 py-1.5 rounded-md font-500 text-[#1a2e2c]/65 hover:text-[#0d3b3a] hover:bg-[#0d3b3a]/5 transition">Plans</Link>
            <Link href="/sessions/new" className="px-3 py-1.5 rounded-md font-500 text-[#1a2e2c]/65 hover:text-[#0d3b3a] hover:bg-[#0d3b3a]/5 transition">Log session</Link>
            <Link href="/stats" className="px-3 py-1.5 rounded-md font-500 text-[#1a2e2c]/65 hover:text-[#0d3b3a] hover:bg-[#0d3b3a]/5 transition">Stats</Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isPro && (
              <Link
                href="/upgrade"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#f4a261] px-4 py-1.5 text-sm font-body font-600 text-[#0d3b3a] hover:bg-[#f4a261]/85 transition"
              >
                Go Pro
              </Link>
            )}
            <Link
              href="/account"
              className="h-8 w-8 rounded-full bg-[#0d3b3a] text-[#faf6f0] flex items-center justify-center font-body text-sm font-600 hover:scale-105 transition"
            >
              {firstName.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* GREETING */}
        <section className="mb-12">
          <p className="font-body text-sm font-500 tracking-wide text-[#0d3b3a]/55">
            {greeting}, {firstName}.
          </p>
          <h1 className="mt-2 font-display text-[2.75rem] md:text-6xl font-500 leading-[0.95] tracking-tight text-[#0d3b3a]">
            {weeklyCompletion >= 100 ? "Week complete." : "Let's pick up where you left off."}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-400 leading-relaxed text-[#1a2e2c]/70">
            {coachingMessage}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/sessions/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-600 text-[#faf6f0] hover:bg-[#0d3b3a]/90 transition"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Log a session
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 rounded-full border border-[#0d3b3a]/20 px-6 py-3 font-body text-sm font-600 text-[#0d3b3a] hover:bg-[#0d3b3a]/5 transition"
            >
              View plans
            </Link>
          </div>
        </section>

        {/* WEEKLY GOAL HERO */}
        <section className="mb-10 rounded-3xl bg-[#0d3b3a] p-8 md:p-10 text-[#faf6f0] relative overflow-hidden">
          {/* Decorative ambient circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f4a261]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[#c9d8c5]/10 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="font-body text-xs font-600 tracking-[0.18em] uppercase text-[#c9d8c5]/80">
                This week · {formatDate(weekStart)} — {formatDate(addDaysUTC(weekStart, 6))}
              </p>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-7xl md:text-8xl font-500 leading-none tracking-tight">
                  {weekMinutes}
                </span>
                <span className="font-body text-sm font-500 tracking-wide text-[#c9d8c5]/70">
                  / {weeklyGoal} min
                </span>
              </div>
              <p className="mt-4 font-body text-sm font-400 text-[#faf6f0]/75 max-w-sm leading-relaxed">
                {weeklyCompletion >= 100
                  ? "Goal reached. Anything you log now is a bonus."
                  : `${weeklyCompletion}% of your weekly target — ${remainingToGoal} minutes left.`}
              </p>
            </div>

            {/* 7-day bar chart */}
            <div>
              <div className="flex items-end justify-between gap-2 h-32">
                {last7Days.map((d, i) => {
                  const heightPct = d.minutes > 0 ? Math.max(8, (d.minutes / maxDayMinutes) * 100) : 4;
                  const isToday = i === 6;
                  return (
                    <div key={d.key} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex items-end" style={{ height: "100%" }}>
                        <div
                          className={`w-full rounded-t-md origin-bottom ${
                            isToday ? "bg-[#f4a261]" : "bg-[#c9d8c5]/35"
                          }`}
                          style={{
                            height: `${heightPct}%`,
                            animation: `barRise 0.6s ease-out ${i * 0.06}s backwards`,
                          }}
                        />
                      </div>
                      <span
                        className={`font-body text-xs font-600 ${
                          isToday ? "text-[#f4a261]" : "text-[#c9d8c5]/55"
                        }`}
                      >
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 hover:border-[#0d3b3a]/20 transition">
            <p className="font-body text-xs font-600 tracking-[0.16em] uppercase text-[#0d3b3a]/55">Today</p>
            <p className="mt-3 font-display text-5xl font-500 leading-none tracking-tight text-[#0d3b3a]">
              {todayMinutes}
              <span className="ml-1 font-body text-base font-500 text-[#1a2e2c]/45">min</span>
            </p>
            <p className="mt-3 font-body text-sm font-400 text-[#1a2e2c]/55">
              {todayMinutes === 0
                ? "Nothing logged yet."
                : todayMinutes < 30
                ? "Warming up."
                : "Solid block."}
            </p>
          </article>

          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 hover:border-[#0d3b3a]/20 transition">
            <p className="font-body text-xs font-600 tracking-[0.16em] uppercase text-[#0d3b3a]/55">Streak</p>
            <p className="mt-3 font-display text-5xl font-500 leading-none tracking-tight text-[#0d3b3a]">
              {streak}
              <span className="ml-1 font-body text-base font-500 text-[#1a2e2c]/45">days</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f4a261]/15 px-2.5 py-1 font-body text-xs font-600 text-[#0d3b3a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f4a261]" />
              {milestoneLabel}
            </p>
          </article>

          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 hover:border-[#0d3b3a]/20 transition">
            <p className="font-body text-xs font-600 tracking-[0.16em] uppercase text-[#0d3b3a]/55">Avg session</p>
            <p className="mt-3 font-display text-5xl font-500 leading-none tracking-tight text-[#0d3b3a]">
              {avgSessionMinutes}
              <span className="ml-1 font-body text-base font-500 text-[#1a2e2c]/45">min</span>
            </p>
            <p className="mt-3 font-body text-sm font-400 text-[#1a2e2c]/55">
              Across the last 60 days.
            </p>
          </article>
        </section>

        {/* RECENT SESSIONS */}
        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-500 tracking-tight text-[#0d3b3a]">
                Recent sessions
              </h2>
              <p className="mt-1 font-body text-sm text-[#1a2e2c]/55">
                Your last {recentSessions.length} practice {recentSessions.length === 1 ? "session" : "sessions"}.
              </p>
            </div>
            <Link
              href="/sessions/new"
              className="font-body text-sm font-600 text-[#0d3b3a] hover:text-[#f4a261] transition"
            >
              Log new →
            </Link>
          </div>

          {recentSessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#0d3b3a]/20 bg-white/40 p-10 text-center">
              <p className="font-display text-xl font-500 text-[#0d3b3a]">No sessions logged yet.</p>
              <p className="mt-2 font-body text-sm text-[#1a2e2c]/60 max-w-sm mx-auto">
                Once you log your first practice session, it'll appear here.
              </p>
              <Link
                href="/sessions/new"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0d3b3a] px-5 py-2.5 font-body text-sm font-600 text-[#faf6f0] hover:bg-[#0d3b3a]/90 transition"
              >
                Log your first session
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 overflow-hidden">
              {recentSessions.map((s: any, idx: number) => {
                const date = new Date(s.practicedAt);
                const isToday = startOfDayUTC(date).getTime() === todayStart.getTime();
                const dateLabel = isToday
                  ? "Today"
                  : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                return (
                  <div
                    key={String(s._id)}
                    className={`flex items-center gap-4 px-6 py-4 transition hover:bg-[#0d3b3a]/3 ${
                      idx !== recentSessions.length - 1 ? "border-b border-[#0d3b3a]/6" : ""
                    }`}
                  >
                    <div className="h-9 w-9 rounded-lg bg-[#0d3b3a]/8 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0d3b3a]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-600 text-[#0d3b3a] truncate">
                        {s.title || s.focus || "Practice session"}
                      </p>
                      <p className="font-body text-xs text-[#1a2e2c]/55 mt-0.5">{dateLabel}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display text-lg font-500 text-[#0d3b3a] tabular-nums">
                        {s.durationMinutes}
                        <span className="ml-1 font-body text-xs font-500 text-[#1a2e2c]/45">m</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* PRO UPSELL — only if not pro */}
        {!isPro && (
          <section className="rounded-3xl bg-gradient-to-br from-[#f4a261] to-[#e8915a] p-8 md:p-10 text-[#0d3b3a] relative overflow-hidden">
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-[#0d3b3a]/8" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-lg">
                <p className="font-body text-xs font-700 tracking-[0.2em] uppercase text-[#0d3b3a]/70">
                  PracticePal Pro
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-500 leading-tight tracking-tight">
                  Take your practice further.
                </h2>
                <p className="mt-3 font-body text-sm font-400 leading-relaxed text-[#0d3b3a]/75">
                  Unlimited plans, full session history, and weekly progress reports — for less than a coffee a month.
                </p>
              </div>
              <Link
                href="/upgrade"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-600 text-[#faf6f0] hover:bg-[#0d3b3a]/90 transition flex-shrink-0"
              >
                See plans
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-[#0d3b3a]/10 bg-[#faf6f0]">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs text-[#1a2e2c]/50">
            PracticePal · Built by Julie Anne Cantillep · 2026
          </p>
          <div className="flex gap-5 font-body text-xs text-[#1a2e2c]/50">
            <Link href="/support/help-center" className="hover:text-[#0d3b3a] transition">Help</Link>
            <Link href="/legal/privacy" className="hover:text-[#0d3b3a] transition">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-[#0d3b3a] transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}