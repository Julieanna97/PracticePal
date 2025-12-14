// components/Navbar.tsx (or src/components/Navbar.tsx)
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/plans", label: "Plans" },
  { href: "/sessions/new", label: "Log Session" },
  { href: "/stats", label: "Stats" },
  { href: "/account", label: "Account" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    // Landing page navbar (embedded in the page design)
    return null;
  }

  // App navbar for other pages - matching landing page style
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

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {nav.map((item) => (
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
          
          {/* User Actions */}
          <div className="flex items-center space-x-3 ml-4">
            <Link
              href="/auth/signin"
              className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-50"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}