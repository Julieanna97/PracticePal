import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticeSession } from "@/models/PracticeSession";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

function startOfWeekMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmtDay(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getDayName(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export default async function StatsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) redirect("/auth/login");

  await connectToDB();

  // ✅ Fetch role from DB so we can hide Pro upsell for Pro users
  const dbUser = await User.findById(userId).select({ role: 1 }).lean();
  const isPro = dbUser?.role === "PRO";

  const sessions = await PracticeSession.find({ userId })
    .sort({ practicedAt: -1, createdAt: -1 })
    .lean();

  const now = new Date();
  const weekStart = startOfWeekMonday(now);

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce(
    (sum: number, s: any) => sum + (Number(s.durationMinutes) || 0),
    0
  );

  const thisWeekSessions = sessions.filter((s: any) => {
    const d = new Date(s.practicedAt ?? s.createdAt);
    return d >= weekStart;
  });

  const weekMinutes = thisWeekSessions.reduce(
    (sum: number, s: any) => sum + (Number(s.durationMinutes) || 0),
    0
  );

  const byPlan = new Map<string, { planTitle: string; minutes: number; count: number }>();
  for (const s of thisWeekSessions as any[]) {
    const key = String(s.planId);
    const existing = byPlan.get(key);
    const minutes = Number(s.durationMinutes) || 0;
    if (existing) {
      existing.minutes += minutes;
      existing.count += 1;
    } else {
      byPlan.set(key, {
        planTitle: String(s.planTitle ?? "Practice Plan"),
        minutes,
        count: 1,
      });
    }
  }

  const topPlans = Array.from(byPlan.values()).sort((a, b) => b.minutes - a.minutes);

  const last7Days: { day: string; dayName: string; minutes: number }[] = [];
  let maxMinutes = 0;

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStart = startOfDay(d);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const minutes = sessions
      .filter((s: any) => {
        const sd = new Date(s.practicedAt ?? s.createdAt);
        return sd >= dayStart && sd < dayEnd;
      })
      .reduce((sum: number, s: any) => sum + (Number(s.durationMinutes) || 0), 0);

    if (minutes > maxMinutes) maxMinutes = minutes;
    last7Days.push({ day: fmtDay(dayStart), dayName: getDayName(dayStart), minutes });
  }

  const recent = sessions.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-2">
            Your Stats 📊
          </h1>
          <p className="text-lg text-gray-600">Track your progress and celebrate your dedication</p>
        </div>

        {/* ✅ Pro teaser only if NOT Pro */}
        {!isPro && (
          <div className="mb-10 rounded-3xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-wide text-amber-700">
                  Pro feature
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                  Unlock deeper insights ✨
                </h2>
                <p className="mt-2 text-gray-700">
                  Get advanced charts, plan comparisons, monthly trends, and exportable reports.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-bold text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Upgrade to Pro
                </Link>

                <Link
                  href="/account"
                  className="inline-flex items-center justify-center rounded-full border-2 border-amber-300 bg-white px-6 py-3 font-bold text-amber-700 hover:bg-amber-50 transition-all"
                >
                  Manage Account
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Top Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">This Week</h3>
            <p className="text-4xl font-extrabold text-gray-900">{weekMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes • {thisWeekSessions.length} sessions</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">All Time</h3>
            <p className="text-4xl font-extrabold text-gray-900">{totalMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes • {totalSessions} sessions</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Top Plan</h3>
            {topPlans.length ? (
              <>
                <p className="text-lg font-bold text-gray-900 truncate">{topPlans[0].planTitle}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {topPlans[0].minutes} min • {topPlans[0].count} sessions
                </p>
              </>
            ) : (
              <p className="text-gray-600">No data yet</p>
            )}
          </div>
        </div>

        {/* Last 7 Days Chart */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Last 7 Days</h2>
          </div>
          <div className="space-y-4">
            {last7Days.map((d) => {
              const percentage = maxMinutes > 0 ? (d.minutes / maxMinutes) * 100 : 0;
              return (
                <div key={d.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{d.dayName}</span>
                    <span className="font-bold text-purple-700">{d.minutes} min</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-700 h-3 rounded-full transition-all duration-500 hover:shadow-lg"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Plan This Week */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">This Week by Plan</h2>
          </div>

          {topPlans.length ? (
            <div className="space-y-4">
              {topPlans.map((p, idx) => (
                <div
                  key={`${p.planTitle}-${idx}`}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{p.planTitle}</p>
                      <p className="text-sm text-gray-600">
                        {p.count} session{p.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-purple-700">{p.minutes}</p>
                    <p className="text-xs text-gray-500 font-medium">minutes</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-purple-50 rounded-2xl border-2 border-purple-100">
              <p className="text-gray-600">Log a session to see stats here.</p>
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Sessions</h2>
          </div>

          {recent.length ? (
            <div className="space-y-3">
              {recent.map((s: any) => {
                const when = new Date(s.practicedAt ?? s.createdAt);
                return (
                  <div
                    key={String(s._id)}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border-2 border-purple-100"
                  >
                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">
                          {String(s.planTitle ?? "Practice Plan")}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {when.toLocaleDateString()} • Difficulty {Number(s.difficulty)}/5
                        </p>
                        {s.notes && (
                          <p className="text-sm text-gray-500 mt-1 italic line-clamp-1">"{s.notes}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-extrabold text-purple-700">{Number(s.durationMinutes)}</p>
                      <p className="text-xs text-gray-500 font-medium">min</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
              <p className="text-gray-600 mb-4">No sessions yet. Log your first one!</p>
              <Link
                href="/sessions/new"
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Log First Session
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
