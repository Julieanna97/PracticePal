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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="app-canvas flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      {/* Animated background musical notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-[#0d3b3a]/10 text-4xl opacity-30 animate-pulse">♪</div>
        <div className="absolute top-40 right-20 text-[#f4a261]/20 text-3xl opacity-25 animate-bounce">♫</div>
        <div className="absolute bottom-40 left-20 text-[#0d3b3a]/10 text-5xl opacity-20 animate-pulse">♪</div>
        <div className="absolute bottom-20 right-40 text-[#f4a261]/20 text-4xl opacity-30 animate-bounce">♫</div>
        <div className="absolute top-60 left-1/3 text-[#0d3b3a]/10 text-3xl opacity-20 animate-pulse">♪</div>
        <div className="absolute bottom-60 right-1/3 text-[#f4a261]/20 text-4xl opacity-25 animate-bounce">♫</div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="soft-card rounded-3xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="relative flex h-16 w-16 rotate-12 items-center justify-center overflow-hidden rounded-2xl bg-[#0d3b3a] shadow-lg shadow-[#0d3b3a]/20">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
                    <circle cx="80" cy="80" r="20" fill="white" opacity="0.2"/>
                  </svg>
                </div>
                <svg className="w-10 h-10 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-[#0d3b3a] md:text-4xl">
              Welcome Back!
            </h1>
            <p className="text-[#1a2e2c]/70">Log in to continue your musical journey</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 rounded-xl border border-[#0d3b3a]/12 px-4 py-3 transition-all group hover:bg-[#0d3b3a]/5 hover:border-[#0d3b3a]/20"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-[#1a2e2c]/80 group-hover:text-[#0d3b3a] transition-colors">
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 rounded-xl border border-[#0d3b3a]/12 px-4 py-3 transition-all group hover:bg-[#0d3b3a]/5 hover:border-[#0d3b3a]/20"
              onClick={() => signIn("facebook", { callbackUrl })}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium text-[#1a2e2c]/80 group-hover:text-[#0d3b3a] transition-colors">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#0d3b3a]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 font-medium text-[#1a2e2c]/55">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#1a2e2c]/75">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl border border-[#0d3b3a]/12 px-4 py-3 transition-all focus:border-[#0d3b3a] focus:outline-none focus:ring-2 focus:ring-[#0d3b3a]/15"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#1a2e2c]/75">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-xl border border-[#0d3b3a]/12 px-4 py-3 transition-all focus:border-[#0d3b3a] focus:outline-none focus:ring-2 focus:ring-[#0d3b3a]/15"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 rounded-xl border border-red-200 bg-red-50 p-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#0d3b3a] px-4 py-3 font-bold text-[#faf6f0] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0d3b3a]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
              <Link href="/auth/forgot-password" className="text-sm font-medium text-[#0d3b3a] hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                  className="font-semibold text-[#0d3b3a] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center font-medium text-[#1a2e2c]/70 transition-colors group hover:text-[#0d3b3a]">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

