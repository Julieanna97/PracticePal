import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function SimplePageShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen app-canvas">
      <main className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="glass-surface rounded-3xl p-8 md:p-12">
          <div className="mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600" />

          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600 md:text-xl">{subtitle}</p>
          )}

          <div className="prose prose-slate mt-10 max-w-none leading-relaxed text-slate-700">
            {children}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <Link
              href="/"
              className="group inline-flex items-center font-semibold text-slate-700 transition hover:text-slate-900"
            >
              <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
              Back to home
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/support/help-center"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Help Center
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/support/contact"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Contact
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/support/faq"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


