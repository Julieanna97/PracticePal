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
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();

  // ✅ Source of truth for plan
  const dbUser = await User.findById(userId).select({
    role: 1,
    stripeStatus: 1,
    stripeCancelAtPeriodEnd: 1,
    stripeCurrentPeriodEnd: 1,
    name: 1,
  }).lean();

  const isPro =
    dbUser?.role === "PRO" ||
    dbUser?.stripeStatus === "active" ||
    dbUser?.stripeStatus === "trialing";

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
    .select({ practicedAt: 1, durationMinutes: 1, planTitle: 1, difficulty: 1, mood: 1, notes: 1 })
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
  for (const s of sessionsForStats) {
    daysWithPractice.add(keyUTC(new Date(s.practicedAt)));
  }

  let streak = 0;
  let cursor = todayStart;

  if (!daysWithPractice.has(keyUTC(cursor))) {
    cursor = addDaysUTC(cursor, -1);
  }

  while (daysWithPractice.has(keyUTC(cursor))) {
    streak += 1;
    cursor = addDaysUTC(cursor, -1);
  }

  const userName = dbUser?.name || (session?.user as any)?.name || "there";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-2">
            Welcome back, {userName}! 🎵
          </h1>
          <p className="text-lg text-gray-600">Here's your practice overview</p>

          {isPro && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              ✅ Pro member
              {dbUser?.stripeCancelAtPeriodEnd && dbUser?.stripeCurrentPeriodEnd && (
                <span className="font-semibold text-emerald-700/80">
                  (Cancels on {new Date(dbUser.stripeCurrentPeriodEnd).toLocaleDateString()})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Today's Practice</h3>
            <p className="text-4xl font-extrabold text-gray-900">{todayMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Current Streak</h3>
            <p className="text-4xl font-extrabold text-gray-900">{streak}</p>
            <p className="text-sm text-gray-500 mt-1">days {streak > 0 ? "🔥" : ""}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">This Week</h3>
            <p className="text-4xl font-extrabold text-gray-900">{weekMinutes}</p>
            <p className="text-sm text-gray-500 mt-1">minutes</p>
          </div>
        </div>

        {/* Recent Practice Sessions */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Practice Sessions</h2>
            </div>
            <Link
              href="/stats"
              className="inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors group"
            >
              View stats
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>

          {recentSessions.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">No sessions yet</p>
              <p className="text-gray-600 mb-6">Start your musical journey by logging your first practice session!</p>
              <Link
                href="/sessions/new"
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Log Your First Session
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((s: any) => (
                <div
                  key={String(s._id)}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start space-x-4 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 truncate text-lg">
                        {s.planTitle || "Practice session"}
                      </p>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          {formatDate(new Date(s.practicedAt))}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          Difficulty {s.difficulty}/5
                        </span>
                        {s.mood && <span className="flex items-center">😊 {s.mood}</span>}
                      </div>
                      {s.notes && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2 italic">"{s.notes}"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right ml-4">
                    <p className="text-2xl font-extrabold text-purple-700">{s.durationMinutes}</p>
                    <p className="text-xs text-gray-500 font-medium">minutes</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/plans/new"
            className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-center">Create Practice Plan</span>
          </Link>

          <Link
            href="/sessions/new"
            className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 font-bold text-white hover:shadow-2xl transform hover:-translate-y-1 transition-all lg:col-span-2"
          >
            <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <span className="text-center text-lg">Log Practice Session</span>
          </Link>

          <Link
            href="/stats"
            className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className="text-center">View Statistics</span>
          </Link>
        </div>

        {/* Secondary Actions */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 mt-5">
          {/* ✅ Only show Upgrade if NOT pro */}
          {!isPro ? (
            <Link
              href="/upgrade"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-5 font-bold text-white hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-center">Upgrade to Pro</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-5 font-bold text-white hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              <span className="text-center">Manage Membership</span>
            </Link>
          )}

          <Link
            href="/account"
            className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-purple-200 bg-white px-6 py-5 font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a5 5 0 00-3.95 8.05A7 7 0 003 17a1 1 0 102 0 5 5 0 0110 0 1 1 0 102 0 7 7 0 00-3.05-6.95A5 5 0 0010 2zm-3 5a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-center">Account / Settings</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
