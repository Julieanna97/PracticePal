import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LogSessionForm from "@/components/LogSessionForm";

export default async function NewSessionPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) redirect("/auth/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 rounded-3xl shadow-lg flex items-center justify-center relative overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
                  <circle cx="80" cy="80" r="20" fill="white" opacity="0.2"/>
                </svg>
              </div>
              <svg className="w-12 h-12 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-3">
            Log Practice Session
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Record your practice time and track your progress toward musical mastery
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-100 p-8 md:p-10">
          {/* Quick Tips Banner */}
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-purple-900 mb-2">💡 Quick Tips</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Log your session right after practice while it's fresh</li>
                  <li>• Be honest about difficulty and mood for better insights</li>
                  <li>• Add notes about what you worked on for future reference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-6 border-b-2 border-purple-100">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
            </div>

            <LogSessionForm />
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl px-8 py-4 shadow-xl">
            <p className="text-white font-semibold flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Every session brings you closer to your goals!</span>
            </p>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">After logging</p>
            <p className="font-bold text-gray-900">Track your time</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">Keep it up</p>
            <p className="font-bold text-gray-900">Build streaks</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">See your</p>
            <p className="font-bold text-gray-900">Progress grow</p>
          </div>
        </div>
      </main>
    </div>
  );
}