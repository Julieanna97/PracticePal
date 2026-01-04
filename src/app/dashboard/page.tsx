// app/dashboard/page.tsx
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's your practice overview
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Today's Practice</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">-- min</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Current Streak</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">-- days</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">This Week</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">-- min</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Practice Sessions</h2>
          <p className="text-sm text-gray-600">
            Coming soon: list of recent practice sessions with quick insights
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sessions/new"
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Log Practice Session
          </Link>
          <Link
            href="/plans"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            View Plans
          </Link>
        </div>
      </div>
    </main>
  );
}