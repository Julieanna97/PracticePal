"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function toInternalCallbackUrl(raw: string | null): string {
  if (!raw) return "/dashboard";

  const value = raw.trim();
  if (value.startsWith("/")) return value;

  try {
    const parsed = new URL(value);
    const relative = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return relative.startsWith("/") ? relative : "/dashboard";
  } catch {
    return "/dashboard";
  }
}

export default function LoginClient() {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = toInternalCallbackUrl(params.get("callbackUrl"));
  const oauthError = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    oauthError ? "Login failed. Please try again or use email and password." : null,
  );
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (!res?.ok) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a2e2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <main className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#0d3b3a] p-10 text-[#faf6f0] lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#f4a261]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-12 right-[-8rem] h-96 w-96 rounded-full bg-[#c9d8c5]/15 blur-3xl" />

          <Link href="/" className="relative z-10 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#faf6f0]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0d3b3a]" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              PracticePal
            </span>
          </Link>

          <div className="relative z-10 max-w-xl">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.22em] text-[#c9d8c5]/80">
              Build consistency
            </p>

            <h1 className="mt-5 font-display text-7xl font-medium leading-[0.92] tracking-tight">
              Practice better, not harder.
            </h1>

            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#faf6f0]/70">
              Plan your practice, log sessions, track progress, and keep your routine moving
              with a calmer dashboard built for musicians.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["Plan", "Set weekly goals"],
                ["Log", "Track every session"],
                ["Grow", "Review progress"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#faf6f0]/10 bg-[#faf6f0]/8 p-4"
                >
                  <p className="font-display text-2xl font-medium">{title}</p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-[#faf6f0]/60">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 font-body text-xs text-[#faf6f0]/45">
            PracticePal · Built by Julie Anne Cantillep · 2026
          </p>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0d3b3a]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f4a261]" fill="currentColor">
                    <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
                  </svg>
                </div>
                <span className="font-display text-xl font-semibold tracking-tight text-[#0d3b3a]">
                  PracticePal
                </span>
              </Link>

              <Link
                href="/"
                className="font-body text-sm font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
              >
                Home
              </Link>
            </div>

            <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <p className="font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
                  Welcome back
                </p>

                <h1 className="mt-2 font-display text-5xl font-medium leading-[0.95] tracking-tight text-[#0d3b3a]">
                  Log in.
                </h1>

                <p className="mt-4 font-body text-sm leading-relaxed text-[#1a2e2c]/65">
                  Continue to your dashboard and keep your practice routine moving.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* SOCIAL LOGIN */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#0d3b3a]/12 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm font-semibold text-[#1a2e2c] transition hover:border-[#0d3b3a]/25 hover:bg-[#0d3b3a]/5"
                  onClick={() => signIn("google", { callbackUrl })}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#0d3b3a]/12 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm font-semibold text-[#1a2e2c] transition hover:border-[#0d3b3a]/25 hover:bg-[#0d3b3a]/5"
                  onClick={() => signIn("facebook", { callbackUrl })}
                >
                  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              {/* DIVIDER */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#0d3b3a]/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                    Or use email
                  </span>
                </div>
              </div>

              {/* EMAIL/PASSWORD FORM */}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-body text-sm font-semibold text-[#0d3b3a]"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm text-[#1a2e2c] outline-none transition placeholder:text-[#1a2e2c]/35 focus:border-[#0d3b3a]/35 focus:bg-white focus:ring-4 focus:ring-[#0d3b3a]/8"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block font-body text-sm font-semibold text-[#0d3b3a]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm text-[#1a2e2c] outline-none transition placeholder:text-[#1a2e2c]/35 focus:border-[#0d3b3a]/35 focus:bg-white focus:ring-4 focus:ring-[#0d3b3a]/8"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#0d3b3a] px-5 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <div className="mt-6 space-y-3 text-center font-body text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
                >
                  Forgot your password?
                </Link>

                <p className="text-[#1a2e2c]/60">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center font-body text-sm font-semibold text-[#1a2e2c]/60 transition hover:text-[#0d3b3a]"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}