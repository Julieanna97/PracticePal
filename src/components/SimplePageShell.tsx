import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function SimplePageShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen app-canvas">
      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="glass-surface rounded-[2rem] p-8 md:p-12">
          <div className="mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#0d3b3a] via-[#f4a261] to-[#c9d8c5]" />

          <h1 className="text-4xl font-semibold tracking-tight text-[#0d3b3a] md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#1a2e2c]/70 md:text-xl">
              {subtitle}
            </p>
          )}

          <div className="mt-10 space-y-6 leading-relaxed text-[#1a2e2c]/80">
            {children}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#0d3b3a]/10 pt-8">
            <Link
              href="/"
              className="group inline-flex items-center font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
            >
              <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
              Back to home
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/support/help-center"
                className="text-sm font-medium text-[#1a2e2c]/65 transition hover:text-[#0d3b3a]"
              >
                Help Center
              </Link>
              <span className="text-[#0d3b3a]/20">•</span>
              <Link
                href="/support/contact"
                className="text-sm font-medium text-[#1a2e2c]/65 transition hover:text-[#0d3b3a]"
              >
                Contact
              </Link>
              <span className="text-[#0d3b3a]/20">•</span>
              <Link
                href="/support/faq"
                className="text-sm font-medium text-[#1a2e2c]/65 transition hover:text-[#0d3b3a]"
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


