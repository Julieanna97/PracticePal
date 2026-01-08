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

  // Keep landing page clean (no navbar on "/")
  if (pathname === "/") return null;

  const isAuthed = !!session?.user;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">PracticePal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {nav
              .filter((item) => (item.protected ? isAuthed : true))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              {status === "loading" ? (
                <div className="text-sm text-gray-500">Loading…</div>
              ) : isAuthed ? (
                <>
                  <span className="hidden xl:inline text-sm text-gray-600">
                    {session.user?.name ?? session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors"
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
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
          <nav className="lg:hidden mt-4 pb-4 border-t border-purple-100 pt-4">
            <div className="flex flex-col space-y-3">
              {nav
                .filter((item) => (item.protected ? isAuthed : true))
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-purple-100">
                {status === "loading" ? (
                  <div className="text-sm text-gray-500 px-4">Loading…</div>
                ) : isAuthed ? (
                  <>
                    <div className="text-sm text-gray-600 px-4 py-2">
                      {session.user?.name ?? session.user?.email}
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="mx-4 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50 transition-colors text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50 transition-colors text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mx-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors text-center"
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