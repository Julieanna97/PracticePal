// src/app/stats/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticeSession } from "@/models/PracticeSession";
import { User } from "@/models/User";
import StatsCharts from "@/components/StatsCharts";

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

  const avgSessionMinutes = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

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

  // Last 7 days data
  const last7Days: { day: string; dayName: string; minutes: number }[] = [];
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

    last7Days.push({ day: fmtDay(dayStart), dayName: getDayName(dayStart), minutes });
  }

  // Last 30 days data
  const last30Days: { date: string; minutes: number }[] = [];
  for (let i = 29; i >= 0; i--) {
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

    last30Days.push({ 
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), 
      minutes 
    });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_8%,#ede9fe_0%,transparent_34%),radial-gradient(circle_at_90%_0%,#dbeafe_0%,transparent_34%),#f8fafc]">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Your Stats 📊
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">Track your progress and celebrate your dedication</p>
        </div>

        {/* Pro teaser */}
        {!isPro && (
          <div className="mb-8 sm:mb-10 rounded-3xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-700">
                  Pro feature
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-gray-900">
                  Unlock deeper insights ✨
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-700">
                  Get advanced charts, plan comparisons, monthly trends, and exportable reports.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/upgrade"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-fuchsia-100 p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-fuchsia-500 to-violet-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">This Week</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{weekMinutes}</p>
            <p className="text-xs text-gray-500 mt-1">minutes</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-indigo-100 p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">All Time</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{totalMinutes}</p>
            <p className="text-xs text-gray-500 mt-1">minutes</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-sky-100 p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Avg/Session</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{avgSessionMinutes}</p>
            <p className="text-xs text-gray-500 mt-1">minutes</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-rose-100 p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Sessions</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{totalSessions}</p>
            <p className="text-xs text-gray-500 mt-1">total</p>
          </div>
        </div>

        {/* Client-side Charts Component */}
        <StatsCharts 
          last7Days={last7Days}
          last30Days={last30Days}
          topPlans={topPlans}
          totalSessions={totalSessions}
        />

        {/* Empty State */}
        {totalSessions === 0 && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">No practice data yet</p>
            <p className="text-gray-600 mb-6">Start logging your practice sessions to see beautiful stats and insights!</p>
            <Link
              href="/sessions/new"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Log Your First Session
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

