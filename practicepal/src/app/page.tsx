import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            PracticePal
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Track practice sessions, set weekly targets, and build streaks—made for
            musicians and singers.
          </p>
        </header>

        <section className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/plans"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            View Plans
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10"
          >
            Go to Dashboard
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-black">
            <h2 className="font-medium">Create plans</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Set a weekly target and a clear goal for each skill or instrument.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-black">
            <h2 className="font-medium">Log sessions</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Track duration, mood, difficulty and notes after each practice.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-black">
            <h2 className="font-medium">See progress</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              View weekly totals and streaks (and more stats in Pro).
            </p>
          </div>
        </section>

        <footer className="pt-6 text-sm text-zinc-500 dark:text-zinc-500">
          Pro version will unlock multiple plans + extra statistics.
        </footer>
      </main>
    </div>
  );
}
