import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="app-canvas flex min-h-screen items-center justify-center px-6 py-12">
      <div className="soft-card w-full max-w-lg rounded-[2rem] p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
          Account recovery
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0d3b3a] md:text-5xl">
          Forgot password
        </h1>

        <p className="mt-4 max-w-md leading-relaxed text-[#1a2e2c]/70">
          Password reset is currently available only for email/password accounts. If you sign in
          with Google or Facebook, please continue with that same provider.
        </p>

        <div className="mt-7 rounded-2xl border border-[#f4a261]/35 bg-[#f4a261]/15 p-4 text-sm text-[#0d3b3a]">
          This reset flow is not implemented yet in this build.
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-full bg-[#0d3b3a] px-5 py-3 text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
          >
            Back to login
          </Link>

          <Link
            href="/support/help-center"
            className="inline-flex items-center justify-center rounded-full border border-[#0d3b3a]/15 bg-white/70 px-5 py-3 text-sm font-semibold text-[#0d3b3a] transition hover:bg-white"
          >
            Visit help center
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-[#1a2e2c]/55">
          Need account help? <Link href="/support/contact" className="font-semibold text-[#0d3b3a] hover:text-[#f4a261]">Contact support</Link>
        </div>
      </div>
    </div>
  );
}

