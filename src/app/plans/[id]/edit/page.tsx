import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import { User } from "@/models/User";
import EditPlanForm from "@/components/EditPlanForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPlanPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();

  const plan = await PracticePlan.findOne({ _id: id, userId }).lean();
  if (!plan) notFound();

  const dbUser = await User.findById(userId).select({ role: 1 }).lean();
  const isPro = dbUser?.role === "PRO";
  const userName = (session?.user as any)?.name || "there";
  const firstName = userName.split(" ")[0];

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
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f4a261]" fill="currentColor">
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
              className="rounded-md bg-[#0d3b3a]/8 px-3 py-1.5 font-medium text-[#0d3b3a]"
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
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
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
        <section className="mb-8">
          <Link
            href="/plans"
            className="font-body text-sm font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
          >
            ← Back to plans
          </Link>

          <p className="mt-8 font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
            Practice structure
          </p>

          <h1 className="mt-2 max-w-3xl font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-[#0d3b3a] md:text-6xl">
            Edit your plan.
          </h1>

          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
            Adjust your goal, weekly target, or focus area as your practice routine changes.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
          {/* FORM CARD */}
          <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 md:p-8">
            <div className="mb-7 border-b border-[#0d3b3a]/8 pb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                Update details
              </p>

              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                {String(plan.title || "Practice plan")}
              </h2>

              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-[#1a2e2c]/60">
                Keep your plan realistic and specific so every logged session has a clear purpose.
              </p>
            </div>

            <EditPlanForm
              planId={String(plan._id)}
              initial={{
                title: String(plan.title ?? ""),
                instrumentOrSkill: String(plan.instrumentOrSkill ?? ""),
                weeklyTargetMinutes: Number(plan.weeklyTargetMinutes ?? 150),
                goalDescription: String(plan.goalDescription ?? ""),
              }}
            />
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="rounded-3xl bg-[#0d3b3a] p-6 text-[#faf6f0]">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/80">
                Current plan
              </p>

              <div className="mt-5 space-y-4">
                <div className="border-b border-[#faf6f0]/10 pb-4">
                  <p className="font-body text-xs font-medium text-[#c9d8c5]/70">
                    Title
                  </p>
                  <p className="mt-1 font-display text-2xl font-medium tracking-tight">
                    {String(plan.title)}
                  </p>
                </div>

                <div className="border-b border-[#faf6f0]/10 pb-4">
                  <p className="font-body text-xs font-medium text-[#c9d8c5]/70">
                    Focus
                  </p>
                  <p className="mt-1 font-body text-sm font-semibold">
                    {String(plan.instrumentOrSkill || "Practice")}
                  </p>
                </div>

                <div>
                  <p className="font-body text-xs font-medium text-[#c9d8c5]/70">
                    Weekly target
                  </p>
                  <p className="mt-1 font-display text-4xl font-medium tracking-tight">
                    {Number(plan.weeklyTargetMinutes || 0)}
                    <span className="ml-1 font-body text-sm font-medium text-[#c9d8c5]/70">
                      min
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                Goal tips
              </p>

              <ul className="mt-5 space-y-3 font-body text-sm leading-relaxed text-[#1a2e2c]/68">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f4a261]" />
                  Start with a target you can repeat every week.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f4a261]" />
                  Make the goal specific, not vague.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f4a261]" />
                  Review your plan monthly and adjust based on progress.
                </li>
              </ul>
            </div>

            <div className="grid gap-3">
              <Link
                href="/dashboard"
                className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:-translate-y-1 hover:border-[#0d3b3a]/20"
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                  Go to
                </p>
                <p className="mt-2 font-display text-2xl font-medium text-[#0d3b3a]">
                  Dashboard
                </p>
              </Link>

              <Link
                href="/sessions/new"
                className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:-translate-y-1 hover:border-[#0d3b3a]/20"
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                  Quick action
                </p>
                <p className="mt-2 font-display text-2xl font-medium text-[#0d3b3a]">
                  Log session
                </p>
              </Link>

              <Link
                href="/stats"
                className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:-translate-y-1 hover:border-[#0d3b3a]/20"
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                  View
                </p>
                <p className="mt-2 font-display text-2xl font-medium text-[#0d3b3a]">
                  Stats
                </p>
              </Link>
            </div>
          </aside>
        </section>
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