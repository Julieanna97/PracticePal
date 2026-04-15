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
  const weeklyGoal = 150;
  const weeklyCompletion = Math.min(100, Math.round((weekMinutes / weeklyGoal) * 100));
  const remainingToGoal = Math.max(0, weeklyGoal - weekMinutes);
  const coachingMessage =
    weeklyCompletion >= 100
      ? "You hit your weekly target. Shift focus to quality reps and intentional practice notes."
      : weeklyCompletion >= 70
      ? `Great momentum. Just ${remainingToGoal} more minutes to close the week strong.`
      : "Start with one focused 20-minute block today. Consistency compounds faster than intensity.";
  const milestoneLabel =
    streak >= 14
      ? "Consistency Champion"
      : streak >= 7
      ? "Streak Builder"
      : streak >= 3
      ? "Momentum Mode"
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
      label: day.toLocaleDateString("en-US", { weekday: "short" }),
      minutes,
    };
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_8%,#ede9fe_0%,transparent_34%),radial-gradient(circle_at_90%_0%,#dbeafe_0%,transparent_34%),#f8fafc]">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 rounded-3xl border border-purple-200/70 bg-gradient-to-r from-white via-purple-50 to-indigo-50 p-6 shadow-xl md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-700">Dashboard</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Welcome back, {userName}! 🎵
              </h1>
              <p className="mt-2 text-lg text-slate-600">Here&apos;s your practice overview</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isPro ? (
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  PRO Member
                </div>
              ) : (
                <Link
                  href="/upgrade"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
                >
                  Upgrade to Pro
                </Link>
              )}
              <Link
                href="/sessions/new"
                className="inline-flex items-center rounded-full border-2 border-purple-200 bg-white px-4 py-2 text-sm font-bold text-purple-700"
              >
                Log Session
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border-2 border-violet-100 bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">Today&apos;s Practice</h3>
            <p className="mt-1 text-4xl font-extrabold text-gray-900">{todayMinutes}</p>
            <p className="mt-1 text-sm text-gray-500">minutes</p>
          </div>

          <div className="rounded-3xl border-2 border-indigo-100 bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow-md">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm1 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">Current Streak</h3>
            <p className="mt-1 text-4xl font-extrabold text-gray-900">{streak}</p>
            <p className="mt-1 text-sm text-gray-500">days {streak > 0 ? "🔥" : ""}</p>
          </div>

          <div className="rounded-3xl border-2 border-teal-100 bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">This Week</h3>
            <p className="mt-1 text-4xl font-extrabold text-gray-900">{weekMinutes}</p>
            <p className="mt-1 text-sm text-gray-500">minutes</p>
          </div>
        </div>

        {/* Focus Panel */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border-2 border-purple-100 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Weekly Goal Progress</h2>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                Target {weeklyGoal} min
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-purple-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600 transition-all"
                style={{ width: `${weeklyCompletion}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <p className="font-semibold text-slate-700">{weekMinutes} / {weeklyGoal} minutes</p>
              <p className="font-bold text-purple-700">{weeklyCompletion}% complete</p>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-indigo-100 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-black text-slate-900">7-Day Rhythm</h2>
            <p className="mt-1 text-sm text-slate-600">Small steps every day beat occasional marathons.</p>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {last7Days.map((d) => (
                <div key={d.key} className="text-center">
                  <div
                    className={`mx-auto h-9 w-9 rounded-lg border text-xs font-bold flex items-center justify-center ${
                      d.minutes > 0
                        ? "border-purple-300 bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {d.minutes > 0 ? Math.min(99, d.minutes) : "-"}
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{d.label.slice(0, 1)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Practice Sessions</h2>
            <Link href="/stats" className="text-sm font-bold text-purple-600 hover:text-purple-700">
              View stats →
            </Link>
          </div>

          {recentSessions.length === 0 ? (
            <div className="text-center py-10 bg-purple-50 rounded-2xl border-2 border-purple-100">
              <p className="text-gray-600 mb-4">No sessions yet. Log your first one!</p>
              <Link href="/sessions/new" className="inline-block bg-purple-700 text-white px-6 py-3 rounded-full font-bold">
                Log Your First Session
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((s: any) => (
                <div key={String(s._id)} className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-100">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">{s.planTitle || "Practice session"}</p>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(new Date(s.practicedAt))}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-extrabold text-purple-700">{s.durationMinutes}</p>
                    <p className="text-xs text-gray-500 font-medium">minutes</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-fuchsia-100 bg-gradient-to-br from-white via-fuchsia-50 to-purple-50 p-6 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-700">Milestone</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">{milestoneLabel}</h3>
            <p className="mt-2 text-slate-700">
              {streak > 0
                ? `You are on a ${streak}-day streak with ${todayMinutes} minutes practiced today.`
                : "Log one session today to kick off your next streak."}
            </p>
            <div className="mt-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-fuchsia-700 ring-1 ring-fuchsia-200">
              Keep showing up
            </div>
          </div>

          <div className="rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-sky-50 p-6 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-700">Coach Note</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">Your Next Best Move</h3>
            <p className="mt-2 text-slate-700">{coachingMessage}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
                style={{ width: `${weeklyCompletion}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-indigo-700">Weekly completion: {weeklyCompletion}%</p>
          </div>
        </section>

      </main>
    </div>
  );
}


