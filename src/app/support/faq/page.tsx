import SimplePageShell from "@/components/SimplePageShell";

export default function FAQPage() {
  return (
    <SimplePageShell 
      title="Frequently Asked Questions" 
      subtitle="Quick answers to common questions about PracticePal."
    >
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white mb-10">
        <p className="text-xl font-semibold flex items-center">
          <span className="text-3xl mr-3">💡</span>
          Can't find what you're looking for? <a href="/support/contact" className="underline ml-2 hover:text-purple-200">Contact us</a>
        </p>
      </div>

      <div className="space-y-6">
        {/* General Questions */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg mr-3">
              🎵
            </span>
            General Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Is PracticePal really free?</p>
              <p className="text-gray-700 leading-relaxed">
                Yes! We offer a <span className="font-semibold text-purple-700">free forever plan</span> with basic practice logging, 30-day history, and streak tracking. Our Pro plan ($9/month) adds advanced analytics, unlimited history, and custom routines for serious musicians.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">What instruments does PracticePal support?</p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">All of them!</span> Whether you're a vocalist, guitarist, pianist, drummer, violinist, producer, or play any other instrument, PracticePal works for you. You can track multiple instruments in your account.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Is PracticePal for beginners or advanced musicians?</p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Both!</span> Whether you're just starting out or you've been playing for years, consistent practice tracking helps everyone improve. Our users range from complete beginners to professional musicians.
              </p>
            </div>
          </div>
        </div>

        {/* Account & Billing */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg mr-3">
              💳
            </span>
            Account & Billing
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Do I need a credit card to start?</p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Nope!</span> You can create a free account without entering any payment information. Only upgrade to Pro when you're ready for more features.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Can I cancel my Pro subscription anytime?</p>
              <p className="text-gray-700 leading-relaxed">
                Yes! Cancel anytime from your account settings with <span className="font-semibold">no questions asked</span>. Cancellation takes effect at the end of your current billing period, so you get what you paid for.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">What's your refund policy?</p>
              <p className="text-gray-700 leading-relaxed">
                We offer a <span className="font-semibold text-purple-700">30-day money-back guarantee</span>. If you're not satisfied with Pro within the first 30 days, just contact us for a full refund.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">What happens if I downgrade from Pro to Free?</p>
              <p className="text-gray-700 leading-relaxed">
                Your data stays safe! You'll keep access to your last 30 days of sessions on the free plan. Older history and Pro features become unavailable, but you can re-upgrade anytime to restore full access.
              </p>
            </div>
          </div>
        </div>

        {/* Features & Usage */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg mr-3">
              ⚡
            </span>
            Features & Usage
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">How do I log a practice session?</p>
              <p className="text-gray-700 leading-relaxed">
                Super simple! After practicing, click "Log Session," enter your time, rate your mood and difficulty, add optional notes, and save. Takes less than 10 seconds.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">What are streaks and how do they work?</p>
              <p className="text-gray-700 leading-relaxed">
                A streak counts consecutive days you've practiced. Practice at least once per day to keep your streak alive! It's a powerful motivator that helps you build consistency.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Can I track multiple instruments?</p>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! You can set up separate practice plans for multiple instruments and track them all independently with their own goals and statistics.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">What analytics do I get with Pro?</p>
              <p className="text-gray-700 leading-relaxed">
                Pro unlocks advanced charts showing practice trends over time, peak performance days/times, goal achievement rates, mood vs. progress correlations, and custom routine tracking.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Can I access PracticePal on mobile?</p>
              <p className="text-gray-700 leading-relaxed">
                Yes! PracticePal works great on any device—desktop, tablet, or mobile. Just log in through your browser for a fully responsive experience.
              </p>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg mr-3">
              🔒
            </span>
            Data & Privacy
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Is my practice data private?</p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">100% private.</span> Your practice logs are only visible to you. We never sell your data or share it with third parties for marketing purposes.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Can I delete my account and data?</p>
              <p className="text-gray-700 leading-relaxed">
                Yes. You can permanently delete your account and all associated data anytime from your settings, or by contacting support. Deletion is complete within 30 days.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-lg mb-3">Can I export my practice data?</p>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! You own your data. Export all your practice logs as a CSV file anytime from your account settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA at bottom */}
      <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
        <p className="mb-6 text-purple-100">We're here to help! Reach out and we'll get back to you quickly.</p>
        <a 
          href="/support/contact" 
          className="inline-block bg-white text-purple-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all"
        >
          Contact Support
        </a>
      </div>
    </SimplePageShell>
  );
}