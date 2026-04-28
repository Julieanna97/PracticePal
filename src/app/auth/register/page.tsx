"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not create account.");
      setIsLoading(false);
      return;
    }

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (login?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      router.push("/auth/login");
    }

    setIsLoading(false);
  }

  async function handleSocialSignUp(provider: string) {
    await signIn(provider, { callbackUrl: "/dashboard" });
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
              Start your routine
            </p>

            <h1 className="mt-5 font-display text-7xl font-medium leading-[0.92] tracking-tight">
              Build a practice habit that lasts.
            </h1>

            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#faf6f0]/70">
              Create plans, log your sessions, and see your progress over time
              with a calm dashboard made for musicians.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["Plan", "Set goals"],
                ["Track", "Log sessions"],
                ["Improve", "See trends"],
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
                  Create account
                </p>

                <h1 className="mt-2 font-display text-5xl font-medium leading-[0.95] tracking-tight text-[#0d3b3a]">
                  Sign up.
                </h1>

                <p className="mt-4 font-body text-sm leading-relaxed text-[#1a2e2c]/65">
                  Start tracking your practice and build a routine you can actually keep.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* SOCIAL SIGN UP */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#0d3b3a]/12 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm font-semibold text-[#1a2e2c] transition hover:border-[#0d3b3a]/25 hover:bg-[#0d3b3a]/5"
                  onClick={() => handleSocialSignUp("google")}
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
                  Sign up with Google
                </button>

                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-[#0d3b3a]/12 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm font-semibold text-[#1a2e2c] transition hover:border-[#0d3b3a]/25 hover:bg-[#0d3b3a]/5"
                  onClick={() => handleSocialSignUp("facebook")}
                >
                  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Sign up with Facebook
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

              {/* EMAIL FORM */}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-body text-sm font-semibold text-[#0d3b3a]"
                  >
                    Name <span className="font-normal text-[#1a2e2c]/45">(optional)</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/70 px-4 py-3 font-body text-sm text-[#1a2e2c] outline-none transition placeholder:text-[#1a2e2c]/35 focus:border-[#0d3b3a]/35 focus:bg-white focus:ring-4 focus:ring-[#0d3b3a]/8"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <p className="mt-2 font-body text-xs text-[#1a2e2c]/50">
                    Must be at least 8 characters long.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#0d3b3a] px-5 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-center font-body text-xs leading-relaxed text-[#1a2e2c]/50">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/legal/terms"
                    className="font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy"
                    className="font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>

              <div className="mt-6 text-center font-body text-sm">
                <p className="text-[#1a2e2c]/60">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
                  >
                    Log in
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