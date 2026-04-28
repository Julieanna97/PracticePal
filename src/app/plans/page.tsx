import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import { User } from "@/models/User";
import DeletePlanButton from "@/components/DeletePlanButton";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();

  const plans = await PracticePlan.find({ userId }).sort({ createdAt: -1 }).lean();

  const dbUser = await User.findById(userId)
    .select({ role: 1 })
    .lean();

  const isPro = dbUser?.role === "PRO";
  const userName = (session?.user as any)?.name || "there";
  const firstName = userName.split(" ")[0];

  const totalWeeklyTarget = plans.reduce(
    (sum: number, plan: any) => sum + Number(plan.weeklyTargetMinutes || 0),
    0,
  );

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
        <section className="mb-10">
          <p className="font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
            Practice structure
          </p>

          <div className="mt-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-[#0d3b3a] md:text-6xl">
                Your practice plans.
              </h1>
              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
                Create focused goals, set weekly targets, and keep your practice routine clear.
              </p>
            </div>

            <Link
              href="/plans/new"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              New plan
            </Link>
          </div>
        </section>

        {/* SUMMARY STRIP */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 transition hover:border-[#0d3b3a]/20">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/55">
              Active plans
            </p>
            <p className="mt-3 font-display text-5xl font-medium leading-none tracking-tight text-[#0d3b3a]">
              {plans.length}
            </p>
            <p className="mt-3 font-body text-sm text-[#1a2e2c]/55">
              {plans.length === 1 ? "One focused plan." : "Goals you are working toward."}
            </p>
          </article>

          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 transition hover:border-[#0d3b3a]/20">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/55">
              Weekly target
            </p>
            <p className="mt-3 font-display text-5xl font-medium leading-none tracking-tight text-[#0d3b3a]">
              {totalWeeklyTarget}
              <span className="ml-1 font-body text-base font-medium text-[#1a2e2c]/45">min</span>
            </p>
            <p className="mt-3 font-body text-sm text-[#1a2e2c]/55">
              Across all current plans.
            </p>
          </article>

          <article className="rounded-2xl border border-[#0d3b3a]/8 bg-white/60 p-6 transition hover:border-[#0d3b3a]/20">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/55">
              Next step
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-[#0d3b3a]">
              Log
            </p>
            <p className="mt-3 font-body text-sm text-[#1a2e2c]/55">
              Turn a plan into a session.
            </p>
          </article>
        </section>

        {/* PLANS */}
        {plans.length > 0 ? (
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-[#0d3b3a] md:text-3xl">
                  Plan library
                </h2>
                <p className="mt-1 font-body text-sm text-[#1a2e2c]/55">
                  Your saved practice goals and weekly targets.
                </p>
              </div>

              <Link
                href="/sessions/new"
                className="font-body text-sm font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
              >
                Log session →
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {plans.map((p: any) => {
                const id = String(p._id);

                return (
                  <article
                    key={id}
                    className="group rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 transition hover:-translate-y-1 hover:border-[#0d3b3a]/18 hover:bg-white/75"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d3b3a]/8">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 text-[#0d3b3a]"
                            fill="currentColor"
                          >
                            <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
                          </svg>
                        </div>

                        <div>
                          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                            Practice plan
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight text-[#0d3b3a]">
                            {p.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Link
                          href={`/plans/${id}/edit`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#0d3b3a]/65 transition hover:bg-[#0d3b3a]/8 hover:text-[#0d3b3a]"
                          title="Edit plan"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </Link>

                        <DeletePlanButton planId={id} />
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#0d3b3a]/8 px-3 py-1 font-body text-xs font-semibold text-[#0d3b3a]">
                        {p.instrumentOrSkill || "Practice"}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-[#f4a261]/15 px-3 py-1 font-body text-xs font-semibold text-[#0d3b3a]">
                        {p.weeklyTargetMinutes || 0} min / week
                      </span>
                    </div>

                    {p.goalDescription && (
                      <div className="mb-5 rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0]/70 p-4">
                        <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                          Goal
                        </p>
                        <p className="mt-2 font-body text-sm leading-relaxed text-[#1a2e2c]/70">
                          {p.goalDescription}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-[#0d3b3a]/8 pt-5 sm:flex-row">
                      <Link
                        href="/sessions/new"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0d3b3a] px-5 py-2.5 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Log session
                      </Link>

                      <Link
                        href={`/plans/${id}/edit`}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-[#0d3b3a]/20 px-5 py-2.5 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
                      >
                        Edit plan
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* TIP */}
            <div className="mt-8 rounded-3xl bg-[#0d3b3a] p-7 text-[#faf6f0]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#f4a261] text-[#0d3b3a]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div>
                  <h4 className="font-display text-2xl font-medium tracking-tight">
                    Keep it realistic.
                  </h4>
                  <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-[#faf6f0]/72">
                    A small daily target is easier to repeat than one huge weekly session.
                    Consistency builds progress faster than cramming.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-[#0d3b3a]/20 bg-white/45 p-10 text-center md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d3b3a]/8">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#0d3b3a]" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>

            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
              No plans yet
            </p>

            <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-medium leading-tight tracking-tight text-[#0d3b3a]">
              Create your first practice plan.
            </h2>

            <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#1a2e2c]/65">
              Set a clear goal, choose what you want to improve, and give yourself a weekly target.
            </p>

            <Link
              href="/plans/new"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0d3b3a] px-6 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create your first plan
            </Link>
          </section>
        )}
      </main>

      {/* FOOTER */}
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