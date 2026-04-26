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
  const isProjectCaseStudyRoute = pathname.startsWith("/projects/");

  // Keep portfolio and case-study pages clean (no shared navbar)
  if (
    pathname === "/" ||
    isProjectCaseStudyRoute
  ) {
    return null;
  }

  const isAuthed = !!session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-[#0d3b3a]/10 bg-[#faf6f0]/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d3b3a] shadow-md shadow-[#0d3b3a]/20">
              <span className="text-sm font-bold text-[#f4a261]">P</span>
            </div>
            <span className="font-black tracking-tight text-[#0d3b3a] text-xl">PracticePal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 lg:flex">
            {nav
              .filter((item) => (item.protected ? isAuthed : true))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === item.href
                      ? "text-[#0d3b3a]"
                      : "text-[#1a2e2c]/70 hover:text-[#0d3b3a]"
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
                  <span className="hidden text-sm text-[#1a2e2c]/70 xl:inline">
                    {session.user?.name ?? session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-full border border-[#0d3b3a]/15 px-4 py-2 text-sm text-[#0d3b3a] transition hover:bg-[#0d3b3a] hover:text-[#faf6f0]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="rounded-full border border-[#0d3b3a]/15 px-4 py-2 text-sm text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-[#0d3b3a] px-4 py-2 text-sm text-[#faf6f0] shadow-md shadow-[#0d3b3a]/15 transition hover:bg-[#0d3b3a]/90"
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
            className="rounded-lg p-2 transition hover:bg-[#0d3b3a]/5 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-[#0d3b3a]"
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
          <nav className="mt-4 border-t border-[#0d3b3a]/10 pb-4 pt-4 lg:hidden">
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
                        ? "bg-[#0d3b3a]/8 text-[#0d3b3a]"
                        : "text-[#1a2e2c]/70 hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 border-t border-[#0d3b3a]/10 pt-4">
                {status === "loading" ? (
                  <div className="px-4 text-sm text-[#1a2e2c]/55">Loading...</div>
                ) : isAuthed ? (
                  <>
                    <div className="px-4 py-2 text-sm text-[#1a2e2c]/70">
                      {session.user?.name ?? session.user?.email}
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="mx-4 rounded-full border border-[#0d3b3a]/15 px-4 py-2 text-center text-sm text-[#0d3b3a] transition hover:bg-[#0d3b3a] hover:text-[#faf6f0]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 rounded-full border border-[#0d3b3a]/15 px-4 py-2 text-center text-sm text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 rounded-full bg-[#0d3b3a] px-4 py-2 text-center text-sm text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
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


