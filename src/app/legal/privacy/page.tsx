import SimplePageShell from "@/components/SimplePageShell";

export default function PrivacyPolicyPage() {
  return (
    <SimplePageShell
      title="Privacy Policy"
      subtitle="How we protect and handle your personal information."
    >
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
        <p className="text-purple-900 font-semibold flex items-center">
          <span className="text-2xl mr-3">🔒</span>
          Your privacy matters. We're committed to transparency about how we collect and use your data.
        </p>
      </div>

      <p className="mb-8 text-lg">
        This privacy policy explains what information PracticePal collects, how we use it, and your rights regarding your personal data.
      </p>

      <div className="space-y-8">
        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              1
            </span>
            Information We Collect
          </h2>
          <div className="ml-13 space-y-3">
            <div>
              <p className="font-semibold text-gray-900">Account Information:</p>
              <p className="text-gray-700">Email address, name, and password (encrypted)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Practice Data:</p>
              <p className="text-gray-700">Session logs including time, notes, mood, difficulty ratings, and instruments</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Usage Information:</p>
              <p className="text-gray-700">How you interact with the app to improve our service</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              2
            </span>
            How We Use Your Information
          </h2>
          <div className="ml-13">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">?</span>
                <span className="text-gray-700">Provide core features like practice tracking, streaks, and analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">?</span>
                <span className="text-gray-700">Send important account notifications and updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">?</span>
                <span className="text-gray-700">Improve and personalize your experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">?</span>
                <span className="text-gray-700">Ensure security and prevent fraud</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white mr-3">
              3
            </span>
            Data Sharing & Security
          </h2>
          <div className="ml-13 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">We never sell your data.</span> Your practice information is private and only visible to you.
            </p>
            <p className="text-gray-700">
              We may share data with trusted service providers (like hosting services) who help us operate the platform, but they're bound by strict confidentiality agreements.
            </p>
            <p className="text-gray-700">
              All data is encrypted in transit and at rest using industry-standard security measures.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              4
            </span>
            Your Rights
          </h2>
          <div className="ml-13">
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">�</span>
                <span className="text-gray-700">Access your personal data at any time</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">�</span>
                <span className="text-gray-700">Request corrections to your information</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">�</span>
                <span className="text-gray-700">Delete your account and all associated data</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">�</span>
                <span className="text-gray-700">Export your practice data</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              5
            </span>
            Data Deletion
          </h2>
          <div className="ml-13">
            <p className="text-gray-700 mb-4">
              You can delete your account and all associated data at any time from your account settings, or by contacting us at privacy@practicepal.com.
            </p>
            <p className="text-gray-700">
              Upon deletion, your data will be permanently removed within 30 days, except where we're legally required to retain certain information.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">Questions?</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or how we handle your data, please contact us:
          </p>
          <a 
            href="/support/contact" 
            className="inline-block bg-white text-purple-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-8 italic">
        Last updated: January 2025
      </p>
    </SimplePageShell>
  );
}

