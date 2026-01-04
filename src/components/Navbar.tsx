// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

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

  // Keep landing page clean (no navbar on "/")
  if (pathname === "/") return null;

  const isAuthed = !!session?.user;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">PracticePal</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {/* Protected links only when logged in */}
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

          {/* Right-side buttons */}
          <div className="flex items-center space-x-3 ml-4">
            {status === "loading" ? (
              <div className="text-sm text-gray-500">Loading…</div>
            ) : isAuthed ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">
                  {session.user?.name ?? session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
