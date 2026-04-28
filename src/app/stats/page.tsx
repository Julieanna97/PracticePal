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
  const userName = (session?.user as any)?.name || "there";
  const firstName = userName.split(" ")[0];

  const sessions = await PracticeSession.find({ userId })
    .sort({ practicedAt: -1, createdAt: -1 })
    .lean();

  const now = new Date();
  const weekStart = startOfWeekMonday(now);

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce(
    (sum: number, s: any) => sum + (Number(s.durationMinutes) || 0),
    0,
  );

  const thisWeekSessions = sessions.filter((s: any) => {
    const d = new Date(s.practicedAt ?? s.createdAt);
    return d >= weekStart;
  });

  const weekMinutes = thisWeekSessions.reduce(
    (sum: number, s: any) => sum + (Number(s.durationMinutes) || 0),
    0,
  );

  const avgSessionMinutes =
    totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

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

  for (let i = 6; i >= 0; i -= 1) {
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

    last7Days.push({
      day: fmtDay(dayStart),
      dayName: getDayName(dayStart),
      minutes,
    });
  }

  const last30Days: { date: string; minutes: number }[] = [];

  for (let i = 29; i >= 0; i -= 1) {
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
      minutes,
    });
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a2e2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* TOP NAV */}
      <header className="sticky top-0 z-40 border-b border-[#0d3b3a]/10 bg-[#faf6f0]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="group flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0d3b3a] transition group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#f4a261]"
                fill="currentColor"
              >
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-[#0d3b3a]">
              PracticePal
            </span>
          </Link>

          <nav className="hidden items-center gap-1 font-body text-sm md:flex">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Dashboard
            </Link>
            <Link
              href="/plans"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Plans
            </Link>
            <Link
              href="/sessions/new"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Log session
            </Link>
            <Link
              href="/stats"
              className="rounded-md bg-[#0d3b3a]/8 px-3 py-1.5 font-medium text-[#0d3b3a]"
            >
              Stats
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isPro && (
              <Link
                href="/upgrade"
                className="hidden items-center gap-1.5 rounded-full bg-[#f4a261] px-4 py-1.5 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/85 sm:inline-flex"
              >
                Go Pro
              </Link>
            )}

            <Link
              href="/account"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3b3a] font-body text-sm font-semibold text-[#faf6f0] transition hover:scale-105"
            >
              {firstName.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* PAGE HERO */}
        <section className="mb-10">
          <p className="font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
            Progress insights
          </p>

          <div className="mt-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-[#0d3b3a] md:text-6xl">
                Your stats.
              </h1>
              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
                Track your consistency, total practice time, weekly progress, and recent habits.
              </p>
            </div>

            <Link
              href="/sessions/new"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              Log session
            </Link>
          </div>
        </section>

        {/* PRO TEASER */}
        {!isPro && (
          <section className="mb-10 rounded-3xl bg-[#0d3b3a] p-6 text-[#faf6f0] md:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/75">
                  Pro feature
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                  Unlock deeper insights.
                </h2>
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-[#faf6f0]/72">
                  Get advanced charts, plan comparisons, monthly trends, and exportable reports.
                </p>
              </div>

              <Link
                href="/upgrade"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#f4a261] px-6 py-3 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/85"
              >
                Upgrade
              </Link>
            </div>
          </section>
        )}

        {/* SUMMARY CARDS */}
        <section className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "This week",
              value: weekMinutes,
              suffix: "min",
              note: "Since Monday",
              accent: "green",
            },
            {
              label: "All time",
              value: totalMinutes,
              suffix: "min",
              note: "Total practice",
              accent: "green",
            },
            {
              label: "Avg/session",
              value: avgSessionMinutes,
              suffix: "min",
              note: "Typical session",
              accent: "green",
            },
            {
              label: "Sessions",
              value: totalSessions,
              suffix: "total",
              note: "Logged entries",
              accent: "orange",
            },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:-translate-y-1 hover:border-[#0d3b3a]/18 sm:rounded-3xl sm:p-6"
            >
              <div
                className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${
                  item.accent === "orange" ? "bg-[#f4a261]" : "bg-[#0d3b3a]"
                }`}
              >
                <svg
                  className={`h-5 w-5 ${
                    item.accent === "orange" ? "text-[#0d3b3a]" : "text-[#faf6f0]"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>

              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                {item.label}
              </p>

              <p className="mt-3 font-display text-5xl font-medium leading-none tracking-tight text-[#0d3b3a]">
                {item.value}
              </p>

              <p className="mt-2 font-body text-xs text-[#1a2e2c]/50">
                {item.suffix} · {item.note}
              </p>
            </article>
          ))}
        </section>

        {/* CHARTS */}
        <section className="mb-10">
          <StatsCharts
            last7Days={last7Days}
            last30Days={last30Days}
            topPlans={topPlans}
            totalSessions={totalSessions}
          />
        </section>

        {/* EMPTY STATE */}
        {totalSessions === 0 && (
          <section className="rounded-3xl border border-dashed border-[#0d3b3a]/20 bg-white/45 p-10 text-center md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3b3a]/8">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-[#0d3b3a]"
                fill="currentColor"
              >
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>

            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
              No practice data yet
            </p>

            <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-medium leading-tight tracking-tight text-[#0d3b3a]">
              Log your first session to unlock your stats.
            </h2>

            <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#1a2e2c]/65">
              Once you add sessions, your charts and weekly summaries will appear here.
            </p>

            <Link
              href="/sessions/new"
              className="mt-7 inline-flex items-center rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              Log your first session
            </Link>
          </section>
        )}
      </main>

      <footer className="mt-12 border-t border-[#0d3b3a]/10 bg-[#faf6f0]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-[#1a2e2c]/50">
            PracticePal · Built by Julie Anne Cantillep · 2026
          </p>

          <div className="flex gap-5 font-body text-xs text-[#1a2e2c]/50">
            <Link href="/support/help-center" className="transition hover:text-[#0d3b3a]">
              Help
            </Link>
            <Link href="/legal/privacy" className="transition hover:text-[#0d3b3a]">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition hover:text-[#0d3b3a]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}