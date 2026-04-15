import SimplePageShell from "@/components/SimplePageShell";

export default function TermsPage() {
  return (
    <SimplePageShell
      title="Terms of Service"
      subtitle="The rules and guidelines for using PracticePal."
    >
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
        <p className="text-purple-900 font-semibold flex items-center">
          <span className="text-2xl mr-3">??</span>
          By using PracticePal, you agree to these terms. Please read them carefully.
        </p>
      </div>

      <p className="mb-8 text-lg">
        These Terms of Service govern your use of PracticePal. By creating an account or using our service, you accept these terms in full.
      </p>

      <div className="space-y-8">
        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              1
            </span>
            Acceptance of Terms
          </h2>
          <div className="ml-13">
            <p className="text-gray-700 mb-3">
              By accessing or using PracticePal, you agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
            <p className="text-gray-700">
              If you don't agree with any part of these terms, you may not use our service.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              2
            </span>
            Use of the Service
          </h2>
          <div className="ml-13 space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Acceptable Use:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">?</span>
                  <span className="text-gray-700">You agree to use PracticePal responsibly and lawfully</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">?</span>
                  <span className="text-gray-700">You must provide accurate account information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">?</span>
                  <span className="text-gray-700">You're responsible for maintaining account security</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Prohibited Activities:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">?</span>
                  <span className="text-gray-700">Attempting to hack, disrupt, or abuse the service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">?</span>
                  <span className="text-gray-700">Sharing your account credentials with others</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">?</span>
                  <span className="text-gray-700">Using the service for any illegal purpose</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              3
            </span>
            Subscriptions & Payment
          </h2>
          <div className="ml-13 space-y-3">
            <div>
              <p className="font-semibold text-gray-900">Free Plan:</p>
              <p className="text-gray-700">Access to basic features at no cost, forever.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Pro Plan:</p>
              <p className="text-gray-700">
                Billed monthly at $9/month. You can cancel anytime from your account settings. Cancellation takes effect at the end of your current billing period.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Refunds:</p>
              <p className="text-gray-700">
                We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, contact us for a full refund.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Price Changes:</p>
              <p className="text-gray-700">
                We may change subscription prices with 30 days notice. Existing subscribers will be grandfathered at their current rate for at least 3 months.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              4
            </span>
            Your Content & Data
          </h2>
          <div className="ml-13 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">You own your data.</span> All practice logs, notes, and information you enter remain yours.
            </p>
            <p className="text-gray-700">
              By using PracticePal, you grant us permission to store and process your data solely to provide the service to you.
            </p>
            <p className="text-gray-700">
              You can export or delete your data at any time from your account settings.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              5
            </span>
            Disclaimers & Limitations
          </h2>
          <div className="ml-13 space-y-3">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-900 font-semibold mb-2">Important Notice:</p>
              <p className="text-yellow-800">
                PracticePal is a practice tracking tool designed to help you stay consistent. We do not guarantee any specific musical results or skill improvements.
              </p>
            </div>
            <p className="text-gray-700">
              The service is provided "as is" without warranties of any kind. We're not liable for any damages arising from your use of PracticePal.
            </p>
            <p className="text-gray-700">
              We strive for 99.9% uptime but cannot guarantee uninterrupted service. We're not responsible for data loss due to technical issues, though we maintain regular backups.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              6
            </span>
            Account Termination
          </h2>
          <div className="ml-13 space-y-3">
            <p className="text-gray-700">
              You may terminate your account at any time by deleting it from your settings or contacting support.
            </p>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive behavior, or for any reason with notice.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white mr-3">
              7
            </span>
            Changes to Terms
          </h2>
          <div className="ml-13">
            <p className="text-gray-700">
              We may update these terms from time to time. We'll notify you of significant changes via email or through the app. Continued use of PracticePal after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">Questions About These Terms?</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please don't hesitate to reach out.
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

