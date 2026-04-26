import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="app-canvas flex min-h-screen items-center justify-center px-6 py-12">
      <div className="soft-card w-full max-w-md rounded-3xl p-8">
        <h1 className="mb-2 text-3xl font-bold text-[#0d3b3a]">Forgot password</h1>
        <p className="mb-6 text-[#1a2e2c]/70">
          Password reset is only available for email/password accounts. Google/Facebook users should log in with the same provider.
        </p>

        {/* Minimal placeholder (no backend needed) */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm mb-6">
          This feature isn't implemented yet in this version.
        </div>

        <Link
          href="/auth/login"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#0d3b3a] px-4 py-3 font-bold text-[#faf6f0] hover:bg-[#0d3b3a]/90"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

