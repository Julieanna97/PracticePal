// app/sessions/new/page.tsx
export default function NewSessionPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Log Practice Session</h1>
          <p className="mt-2 text-gray-600">
            Track your practice time and progress
          </p>
        </div>

        {/* Form placeholder */}
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Practice Plan</label>
                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500">
                  Select a plan...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Duration (minutes)</label>
                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500">
                  Enter duration...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Difficulty (1-5)</label>
                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500">
                  Rate difficulty...
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Mood</label>
                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500">
                  How did you feel?
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Notes</label>
                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500">
                  Practice notes...
                </div>
              </div>

              <button className="w-full rounded-lg bg-purple-600 py-2 text-white hover:bg-purple-700">
                Log Session
              </button>
            </div>
            
            <p className="mt-4 text-center text-xs text-gray-500">
              Coming soon: full form implementation
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}