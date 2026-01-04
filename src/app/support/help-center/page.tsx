import SimplePageShell from "@/components/SimplePageShell";

export default function HelpCenterPage() {
  return (
    <SimplePageShell
      title="Help Center"
      subtitle="Everything you need to get the most out of PracticePal."
    >
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white mb-10">
        <h3 className="text-2xl font-bold mb-3">👋 Welcome to the Help Center!</h3>
        <p className="text-purple-100 text-lg">
          Find guides, tips, and answers to help you track your practice and reach your musical goals.
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <span className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
            🚀
          </span>
          Getting Started
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Account</h3>
            <p className="text-gray-700 leading-relaxed">
              Sign up with your email in under 30 seconds. No credit card required to start with our free plan.
            </p>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Set Your Goals</h3>
            <p className="text-gray-700 leading-relaxed">
              Choose your instrument and set a realistic weekly practice target. Start small—you can always increase it later!
            </p>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Start Logging</h3>
            <p className="text-gray-700 leading-relaxed">
              After each practice session, log your time and notes. Watch your streaks and progress grow!
            </p>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <span className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
            ⚡
          </span>
          Core Features
        </h2>

        <div className="space-y-6">
          <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Logging Practice Sessions</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  After practicing, click the "Log Session" button and enter:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span><span className="font-semibold">Time:</span> How long you practiced (minutes)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span><span className="font-semibold">Mood:</span> How you felt during practice (1-5 scale)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span><span className="font-semibold">Difficulty:</span> How challenging it was (1-5 scale)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span><span className="font-semibold">Notes:</span> What you worked on (optional but recommended!)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🔥</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Understanding Streaks</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Streaks count consecutive days you've practiced. They're incredibly motivating!
                </p>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-3">
                  <p className="text-purple-900 font-semibold mb-2">💡 Pro Tip:</p>
                  <p className="text-purple-800">
                    Even a 10-minute session counts! Consistency beats perfection. Short daily practice is better than occasional marathon sessions.
                  </p>
                </div>
                <p className="text-gray-700">
                  Your current streak is displayed on your dashboard. Keep it alive to build the habit!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📊</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Tracking Progress</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Your dashboard shows:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span><span className="font-semibold">Weekly totals:</span> Minutes practiced this week vs. your goal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span><span className="font-semibold">Current streak:</span> Days in a row you've practiced</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span><span className="font-semibold">Recent sessions:</span> Your practice history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span><span className="font-semibold">Pro users:</span> Advanced analytics, trends, and insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <span className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
            ⚙️
          </span>
          Account Management
        </h2>

        <div className="space-y-4">
          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Updating Your Profile</h3>
            <p className="text-gray-700">
              Go to Settings → Profile to update your name, email, or profile picture. Changes save automatically.
            </p>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Changing Your Weekly Goal</h3>
            <p className="text-gray-700">
              Visit Settings → Practice Goals to adjust your weekly target. It's okay to start small and increase as you build the habit!
            </p>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Managing Your Subscription</h3>
            <p className="text-gray-700 mb-3">
              Go to Settings → Billing to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Upgrade to Pro</li>
              <li>• Update payment method</li>
              <li>• View billing history</li>
              <li>• Cancel your subscription</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips & Best Practices */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <span className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
            💡
          </span>
          Tips & Best Practices
        </h2>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold mb-2">🎯 Set Realistic Goals</h4>
              <p className="text-purple-100">
                Start with 60-90 minutes per week if you're new. You can always increase it. Consistency matters more than volume!
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2">📝 Write Detailed Notes</h4>
              <p className="text-purple-100">
                Jot down what you worked on—scales, songs, techniques. Looking back at these notes reveals your progress and patterns.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2">🔥 Protect Your Streak</h4>
              <p className="text-purple-100">
                Even 5-10 minutes counts! On busy days, a short session keeps your streak alive and maintains the habit.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2">📊 Review Your Analytics</h4>
              <p className="text-purple-100">
                Check your dashboard weekly to see trends. Are you hitting your goals? When do you practice best? Adjust accordingly!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Still Need Help? */}
      <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h3>
        <p className="text-gray-700 mb-6">
          Can't find what you're looking for? Check our FAQ or get in touch!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/support/faq" 
            className="inline-block border-2 border-purple-600 text-purple-700 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-all"
          >
            View FAQ
          </a>
          <a 
            href="/support/contact" 
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </SimplePageShell>
  );
}