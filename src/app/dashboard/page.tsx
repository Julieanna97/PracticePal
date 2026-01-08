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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-2">
            Welcome back, {userName}! 🎵
          </h1>
          <p className="text-lg text-gray-600">Here's your practice overview</p>

          {isPro && (
            <div className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-white font-bold text-sm shadow-lg">
              PRO Member
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Today's Practice</h3>
            <p className="text-4xl font-extrabold text-gray-900">{todayMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Current Streak</h3>
            <p className="text-4xl font-extrabold text-gray-900">{streak}</p>
            <p className="text-sm text-gray-500 mt-1">days {streak > 0 ? "🔥" : ""}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">This Week</h3>
            <p className="text-4xl font-extrabold text-gray-900">{weekMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes</p>
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

        {/* Actions */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/plans/new" className="rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 text-center">
            Create Practice Plan
          </Link>

          <Link href="/sessions/new" className="rounded-2xl bg-purple-700 px-6 py-5 font-bold text-white text-center lg:col-span-2">
            Log Practice Session
          </Link>

          <Link href="/stats" className="rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 text-center">
            View Statistics
          </Link>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 mt-5">
          {/* Only show upgrade if NOT pro */}
          {!isPro ? (
            <Link href="/upgrade" className="rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-5 font-bold text-white text-center">
              Upgrade to Pro
            </Link>
          ) : (
            <Link href="/account" className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 font-bold text-white text-center">
              Manage membership
            </Link>
          )}

          <Link href="/account" className="rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 text-center">
            Account / Settings
          </Link>
        </div>
      </main>
    </div>
  );
}
