"use client";

import { useEffect, useState } from "react";
import LandingFooter from "@/components/LandingFooter";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      requestAnimationFrame(() => setMenuShown(true));
      return;
    }
    setMenuShown(false);
    const t = setTimeout(() => setMenuMounted(false), 200);
    return () => clearTimeout(t);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMounted]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuMounted) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuMounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-white relative scroll-smooth overflow-x-hidden">
      {/* Animated background musical notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-purple-200 text-4xl opacity-30 animate-pulse">
          ♪
        </div>
        <div className="absolute top-40 right-20 text-purple-200 text-3xl opacity-25 animate-bounce">
          ♫
        </div>
        <div className="absolute bottom-40 left-20 text-purple-200 text-5xl opacity-20 animate-pulse">
          ♪
        </div>
        <div className="absolute bottom-20 right-40 text-purple-200 text-4xl opacity-30 animate-bounce">
          ♫
        </div>
        <div className="absolute top-60 left-1/3 text-purple-200 text-3xl opacity-20 animate-pulse">
          ♪
        </div>
        <div className="absolute bottom-60 right-1/3 text-purple-200 text-4xl opacity-25 animate-bounce">
          ♫
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">PracticePal</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              Success Stories
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="/auth/login"
              className="text-purple-600 border-2 border-purple-600 px-5 py-2 rounded-full hover:bg-purple-50 font-medium transition-all"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 font-medium transition-all"
            >
              Start Free
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-purple-200 bg-white/70 hover:bg-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="text-purple-700 text-xl font-bold">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuMounted && (
        <div className="md:hidden fixed inset-0 z-[9999]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className={[
              "absolute inset-0 bg-black/40 backdrop-blur-sm",
              "transition-opacity duration-200 ease-out",
              menuShown ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          <div
            className={[
              "relative h-full w-full bg-white flex flex-col items-center justify-center px-8",
              "transition-all duration-200 ease-out",
              menuShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <button
              type="button"
              className="absolute top-6 left-6 w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-2xl leading-none text-gray-900">×</span>
            </button>

            <nav className="w-full max-w-sm flex flex-col items-center text-center gap-8">
              <a
                href="#about"
                className="text-2xl font-semibold text-gray-900 hover:text-purple-700"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#benefits"
                className="text-2xl font-semibold text-gray-900 hover:text-purple-700"
                onClick={() => setMenuOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-2xl font-semibold text-gray-900 hover:text-purple-700"
                onClick={() => setMenuOpen(false)}
              >
                Success Stories
              </a>
              <a
                href="#pricing"
                className="text-2xl font-semibold text-gray-900 hover:text-purple-700"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </a>

              <div className="pt-6 w-full flex flex-col gap-3">
                <a
                  href="/auth/login"
                  className="w-full text-center border-2 border-purple-600 text-purple-700 px-5 py-3 rounded-full font-medium hover:bg-purple-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  className="w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 rounded-full font-medium hover:shadow-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Start Free
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <main className="relative z-10">
        {/* Hero Section - Enhanced */}
        <section id="top" className="text-center py-24 px-6">
          <div className="inline-block mb-4">
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              🎉 Join 10,000+ musicians improving daily
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-6 leading-tight">
            Turn Practice Into Progress
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
            The simple practice tracker that helps musicians stay consistent, build streaks,
            and actually see improvement—so you know what to do next.
          </p>

          <div className="max-w-2xl mx-auto mb-10">
            <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl py-4 px-4 hover:shadow-lg transition-shadow">
                <span className="text-2xl mb-2 block">⚡</span>
                <span className="font-semibold">10-second logging</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl py-4 px-4 hover:shadow-lg transition-shadow">
                <span className="text-2xl mb-2 block">📈</span>
                <span className="font-semibold">Visual progress tracking</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl py-4 px-4 hover:shadow-lg transition-shadow">
                <span className="text-2xl mb-2 block">🔥</span>
                <span className="font-semibold">Motivation boost</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/auth/register"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Start Free Today
            </a>
            <a
              href="#how-it-works"
              className="inline-block border-2 border-purple-600 text-purple-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-purple-50 transition-all"
            >
              See How It Works
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            ✨ No credit card • Free forever plan • Cancel anytime
          </p>
        </section>

        {/* Trusted by Musicians Strip */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Trusted by Musicians Like You
                </h3>
                <p className="text-purple-100">From bedroom practice to world stages</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all">
                  <div className="text-4xl mb-2">🎤</div>
                  <p className="text-white font-semibold text-sm">Vocalists</p>
                  <p className="text-purple-100 text-xs mt-1">Like Ariana Grande</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all">
                  <div className="text-4xl mb-2">🎸</div>
                  <p className="text-white font-semibold text-sm">Guitarists</p>
                  <p className="text-purple-100 text-xs mt-1">Like John Mayer</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all">
                  <div className="text-4xl mb-2">🎹</div>
                  <p className="text-white font-semibold text-sm">Pianists</p>
                  <p className="text-purple-100 text-xs mt-1">Like Alicia Keys</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all">
                  <div className="text-4xl mb-2">🥁</div>
                  <p className="text-white font-semibold text-sm">Drummers</p>
                  <p className="text-purple-100 text-xs mt-1">Like Travis Barker</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-purple-100 text-sm italic">
                  "Practice tracking tools like these are game-changers for consistency"
                </p>
                <p className="text-white font-semibold text-sm mt-2">
                  — Music education experts worldwide
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is PracticePal Section */}
        <section id="about" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What is PracticePal?
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Most musicians struggle with consistency—not talent. PracticePal gives you a
                simple system to log sessions, track streaks, and see real progress over time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Set simple goals</h3>
                    <p className="text-gray-600">
                      Pick a weekly target and build a routine you can actually keep—no overwhelm,
                      just progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-3xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Log sessions fast</h3>
                    <p className="text-gray-600">
                      Track time, mood, difficulty, and notes in seconds. No friction, no excuses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">See real progress</h3>
                    <p className="text-gray-600">
                      Get streaks, totals, and insights that prove your dedication is paying off.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    See Plans & Pricing →
                  </a>
                </div>
              </div>

              {/* Enhanced stats card */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-xl">Your Dashboard Preview</h4>
                  <span className="text-xs bg-yellow-400 text-purple-900 px-3 py-1 rounded-full font-bold">
                    LIVE DATA
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all border border-white/20">
                    <div className="text-4xl font-bold mb-2">156 min</div>
                    <div className="text-purple-100 font-medium">Practiced this week</div>
                    <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "78%" }} />
                    </div>
                    <p className="text-xs text-purple-200 mt-1">78% of weekly goal</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-4xl font-bold mb-2">23-day streak</div>
                        <div className="text-purple-100 font-medium">You're on fire! 🔥</div>
                      </div>
                      <div className="text-5xl">🏆</div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all border border-white/20">
                    <div className="text-4xl font-bold mb-2">87%</div>
                    <div className="text-purple-100 font-medium">Weekly goal hit rate</div>
                    <p className="text-xs text-green-300 mt-2">↑ 12% from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Enhanced */}
        <section id="benefits" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Musicians Choose PracticePal
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Clear goals, easy logging, and progress you can actually see—all in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-4xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Track every detail</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Log time, mood, difficulty, and notes. Spot patterns and understand what actually
                  helps you improve faster.
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Session-by-session insights
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Personal notes & reflections
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Lightning-fast input
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Understand your habits</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Weekly totals, streaks, and trends keep you on track—adjust your routine based
                  on real data.
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Weekly & monthly analytics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Smart goal tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Actionable insights
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay motivated</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Streaks and milestones make practice feel rewarding. Small daily wins compound
                  into major skill gains.
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Daily practice streaks
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Achievement celebrations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Built-in motivation boosts
                  </li>
                </ul>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-20 text-center">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl px-12 py-8 shadow-2xl">
                <div className="flex flex-wrap items-center justify-center gap-12">
                  <div>
                    <div className="text-5xl font-bold text-white">10,000+</div>
                    <div className="text-purple-100 font-medium mt-1">Active musicians</div>
                  </div>
                  <div className="w-px h-16 bg-purple-300 hidden sm:block"></div>
                  <div>
                    <div className="text-5xl font-bold text-white">2M+</div>
                    <div className="text-purple-100 font-medium mt-1">Practice sessions logged</div>
                  </div>
                  <div className="w-px h-16 bg-purple-300 hidden sm:block"></div>
                  <div>
                    <div className="text-5xl font-bold text-yellow-400">4.9★</div>
                    <div className="text-purple-100 font-medium mt-1">Average rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real Musicians, Real Results
              </h2>
              <p className="text-xl text-gray-700">
                See how PracticePal helped musicians reach their goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Sarah M.</h4>
                    <p className="text-sm text-gray-600">Vocalist • 2 years</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-2xl mb-3">★★★★★</div>
                <p className="text-gray-700 leading-relaxed italic">
                  "I went from practicing randomly to hitting my goals 90% of the time. Seeing my
                  streak grow is so addictive—I actually look forward to practice now!"
                </p>
                <p className="text-purple-600 font-semibold mt-4 text-sm">156-day streak 🔥</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Marcus T.</h4>
                    <p className="text-sm text-gray-600">Guitarist • 5 months</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-2xl mb-3">★★★★★</div>
                <p className="text-gray-700 leading-relaxed italic">
                  "The analytics helped me realize I practiced better in the mornings. Adjusted my
                  schedule and my improvement went through the roof. Game changer."
                </p>
                <p className="text-purple-600 font-semibold mt-4 text-sm">300+ sessions logged</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    L
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Lily K.</h4>
                    <p className="text-sm text-gray-600">Pianist • 1 year</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-2xl mb-3">★★★★★</div>
                <p className="text-gray-700 leading-relaxed italic">
                  "As a self-taught player, I had no structure. PracticePal gave me accountability
                  without the pressure. My progress is finally visible and measurable!"
                </p>
                <p className="text-purple-600 font-semibold mt-4 text-sm">500+ hours practiced</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="/auth/register"
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                Join 10,000+ Musicians
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-700">Three simple steps to transform your practice routine</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-purple-100 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Your Plan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Set your instrument and weekly target. Start with something achievable—you can always level up later.
                </p>
                <div className="mt-6 bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-700 font-semibold">Example: 150 min/week</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-purple-100 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Log Your Sessions</h3>
                <p className="text-gray-600 leading-relaxed">
                  After practice, quickly log time, mood, difficulty, and notes. Takes 10 seconds—no excuses.
                </p>
                <div className="mt-6 bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-700 font-semibold">⚡ Super fast entry</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-purple-100 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Progress Grow</h3>
                <p className="text-gray-600 leading-relaxed">
                  See your streaks build, totals climb, and skills improve. Your dedication becomes undeniable proof.
                </p>
                <div className="mt-6 bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-700 font-semibold">📊 Visual analytics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Enhanced */}
        <section id="pricing" className="py-20 px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-700">Start free, upgrade when you're ready for more power</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all">
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-sm font-semibold text-gray-700 mb-4">
                  STARTER
                </div>
                <h3 className="text-3xl font-bold mb-3">Free Forever</h3>
                <div className="text-5xl font-extrabold text-gray-900">
                  $0<span className="text-xl font-normal text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-3">Perfect for casual practice</p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Basic practice logging",
                  "30-day session history",
                  "Basic streak tracking",
                  "Weekly goal tracking",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                    </svg>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/register"
                className="block w-full text-center bg-gray-100 text-gray-800 py-4 rounded-full font-bold hover:bg-gray-200 transition-all text-lg"
              >
                Start Free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-3xl p-10 shadow-2xl border-4 border-yellow-400 relative transform scale-105">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 px-6 py-2 rounded-full text-sm font-black shadow-lg">
                ⭐ MOST POPULAR
              </div>

              <div className="text-center mb-8 text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  PRO
                </div>
                <h3 className="text-3xl font-bold mb-3">Serious Musicians</h3>
                <div className="text-5xl font-extrabold">
                  $9<span className="text-xl font-normal text-purple-200">/month</span>
                </div>
                <p className="text-purple-100 mt-3 font-medium">For those who want real results</p>
              </div>

              <ul className="space-y-4 mb-10 text-white">
                {[
                  "Everything in Free, plus:",
                  "📊 Advanced performance analytics",
                  "♾️ Unlimited session history",
                  "🎯 Custom practice routines",
                  "🏆 Goal achievement insights",
                  "⚡ Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/register"
                className="block w-full text-center bg-white text-purple-700 py-4 rounded-full font-bold hover:bg-gray-50 transition-all text-lg shadow-xl"
              >
                Upgrade to Pro
              </a>

              <p className="text-center text-purple-100 text-sm mt-4">
                ⚡ Most users upgrade within 2 weeks
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-green-50 border-2 border-green-200 rounded-2xl px-8 py-4">
              <p className="text-green-800 font-semibold">
                ✅ 30-Day Money-Back Guarantee • Cancel anytime • No hidden fees
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Ready to Make Practice Stick?</h2>
            <p className="text-2xl text-purple-100 mb-10 leading-relaxed">
              Start small, stay consistent, and watch your progress grow week by week. Join 10,000+ musicians already improving daily.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="/auth/register"
                className="inline-block bg-white text-purple-700 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-2xl transform hover:-translate-y-1"
              >
                Start Free Today
              </a>
              <a
                href="#pricing"
                className="inline-block border-2 border-white text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all"
              >
                View Plans
              </a>
            </div>

            <p className="text-purple-200 text-lg">
              ✨ No credit card required • Free forever plan • Upgrade anytime
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />

    </div>
  );
}
