import SimplePageShell from "@/components/SimplePageShell";

export default function ContactPage() {
  return (
    <SimplePageShell
      title="Get In Touch"
      subtitle="Have questions, feedback, or need help? We'd love to hear from you!"
    >
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Contact Info Cards */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-4xl">✉️</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">Email Support</h3>
          <p className="text-purple-100 mb-4">
            Get in touch with our support team for any questions or issues.
          </p>
          <a 
            href="mailto:support@practicepal.com" 
            className="text-white font-bold text-lg hover:text-purple-200 transition-colors underline underline-offset-4"
          >
            support@practicepal.com
          </a>
          <p className="text-sm text-purple-200 mt-4">We typically respond within 24 hours</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-4xl">💬</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">Share Feedback</h3>
          <p className="text-purple-100 mb-4">
            Help us improve! Share your ideas, suggestions, or feature requests.
          </p>
          <a 
            href="mailto:feedback@practicepal.com" 
            className="text-white font-bold text-lg hover:text-purple-200 transition-colors underline underline-offset-4"
          >
            feedback@practicepal.com
          </a>
          <p className="text-sm text-purple-200 mt-4">Every voice matters!</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <a 
            href="/support/faq" 
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">FAQ</p>
              <p className="text-sm text-gray-600">Common questions answered</p>
            </div>
          </a>

          <a 
            href="/support/help-center" 
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Help Center</p>
              <p className="text-sm text-gray-600">Guides and tutorials</p>
            </div>
          </a>

          <a 
            href="/legal/privacy" 
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Privacy & Terms</p>
              <p className="text-sm text-gray-600">Legal information</p>
            </div>
          </a>
        </div>
      </div>

      {/* Contact Form Placeholder */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">📝</span>
          Contact Form (Coming Soon)
        </h3>
        <p className="text-gray-700 mb-6">
          We're building a contact form so you can reach us directly from this page. For now, please use the email addresses above or check out our FAQ.
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-purple-200">
            <p className="font-semibold text-gray-900 mb-2">Planned form fields:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-purple-600 mr-2">•</span>
                Your name and email
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-2">•</span>
                Subject/topic selection
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-2">•</span>
                Message details
              </li>
              <li className="flex items-center">
                <span className="text-purple-600 mr-2">•</span>
                Optional: Attach screenshots
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bug Reports */}
      <div className="mt-10 bg-white border-2 border-purple-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🐛</span>
          Found a Bug?
        </h3>
        <p className="text-gray-700 mb-6">
          If you've encountered a technical issue or bug, please let us know! Include as much detail as possible:
        </p>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2 mt-1">✓</span>
            <span>What you were trying to do</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2 mt-1">✓</span>
            <span>What happened instead</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2 mt-1">✓</span>
            <span>Your device and browser</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2 mt-1">✓</span>
            <span>Screenshots if possible</span>
          </li>
        </ul>
        <a 
          href="mailto:bugs@practicepal.com?subject=Bug%20Report" 
          className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Report a Bug
        </a>
      </div>

      {/* Social/Community (future) */}
      <div className="mt-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Join Our Community</h3>
        <p className="text-purple-100 mb-6">
          Connect with fellow musicians, share your progress, and get tips (coming soon!)
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="font-semibold">Twitter (soon)</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="font-semibold">Discord (soon)</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="font-semibold">Instagram (soon)</span>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}