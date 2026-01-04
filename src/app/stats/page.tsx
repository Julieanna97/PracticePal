// app/stats/page.tsx
export default function StatsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Statistics</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and analyze your practice patterns
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Time</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900">-- hours</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Sessions</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900">-- total</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Best Streak</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900">-- days</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Avg Session</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900">-- min</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Practice Time</h2>
            <div className="flex h-40 items-end justify-center text-gray-500">
              Chart coming soon...
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Practice by Plan</h2>
            <div className="flex h-40 items-end justify-center text-gray-500">
              Chart coming soon...
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Practice Streaks</h2>
            <div className="flex h-40 items-end justify-center text-gray-500">
              Streak visualization coming soon...
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Mood & Difficulty Trends</h2>
            <div className="flex h-40 items-end justify-center text-gray-500">
              Trends coming soon...
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}