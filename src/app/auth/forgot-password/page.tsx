import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password</h1>
        <p className="text-gray-600 mb-6">
          Password reset is only available for email/password accounts. Google/Facebook users should log in with the same provider.
        </p>

        {/* Minimal placeholder (no backend needed) */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm mb-6">
          This feature isn't implemented yet in this version.
        </div>

        <Link
          href="/auth/login"
          className="inline-flex w-full items-center justify-center rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

