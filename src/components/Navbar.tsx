"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/plans", label: "Plans", protected: true },
  { href: "/sessions/new", label: "Log Session", protected: true },
  { href: "/stats", label: "Stats", protected: true },
  { href: "/account", label: "Account", protected: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keep the home portfolio and archived PracticePal demo clean (no shared navbar)
  if (pathname === "/" || pathname === "/projects/practicepal/landing") return null;

  const isAuthed = !!session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-700 shadow-md">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">PracticePal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {nav
              .filter((item) => (item.protected ? isAuthed : true))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === item.href
                        ? "text-purple-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              {status === "loading" ? (
                <div className="text-sm text-slate-500">Loading...</div>
              ) : isAuthed ? (
                <>
                  <span className="hidden text-sm text-slate-600 xl:inline">
                    {session.user?.name ?? session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2 text-sm text-white shadow-md transition hover:opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mt-4 border-t border-purple-100 pb-4 pt-4 lg:hidden">
            <div className="flex flex-col space-y-3">
              {nav
                .filter((item) => (item.protected ? isAuthed : true))
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === item.href
                        ? "bg-purple-50 text-purple-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 border-t border-slate-200 pt-4">
                {status === "loading" ? (
                  <div className="px-4 text-sm text-slate-500">Loading...</div>
                ) : isAuthed ? (
                  <>
                    <div className="px-4 py-2 text-sm text-slate-600">
                      {session.user?.name ?? session.user?.email}
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="mx-4 rounded-full border border-slate-300 px-4 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 rounded-full border border-slate-300 px-4 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-center text-sm text-white transition hover:opacity-90"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}


