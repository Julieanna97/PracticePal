import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/models/User";
import { connectToDB } from "@/lib/mongodb";
import NewPlanForm from "@/components/NewPlanForm";

export default async function NewPlanPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  await connectToDB();

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
            Create a focused plan.
          </h1>

          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
            Set a clear goal, choose what you want to improve, and define a weekly target
            that feels realistic enough to repeat.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 md:p-8">
            <div className="mb-7 border-b border-[#0d3b3a]/8 pb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                New plan
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                Plan details
              </h2>
            </div>

            <NewPlanForm />
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-[#0d3b3a] p-6 text-[#faf6f0]">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/80">
                Quick tip
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">
                Start smaller than you think.
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#faf6f0]/72">
                A plan you can repeat every week is more useful than a perfect plan that feels too heavy.
              </p>
            </div>

            <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                Good targets
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ["15 min/day", "Light consistency"],
                  ["150 min/week", "Balanced routine"],
                  ["300 min/week", "Intensive focus"],
                ].map(([target, label]) => (
                  <div key={target} className="flex items-center justify-between border-b border-[#0d3b3a]/8 pb-3 last:border-b-0 last:pb-0">
                    <span className="font-display text-xl font-medium text-[#0d3b3a]">
                      {target}
                    </span>
                    <span className="font-body text-xs font-medium text-[#1a2e2c]/50">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
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