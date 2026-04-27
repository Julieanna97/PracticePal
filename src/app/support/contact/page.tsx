import SimplePageShell from "@/components/SimplePageShell";

export default function ContactPage() {
  return (
    <SimplePageShell
      title="Get In Touch"
      subtitle="Need help, want to share feedback, or found a bug? Use one of the options below."
    >
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Contact Info Cards */}
        <a
          href="https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <span className="text-4xl animate-bounce">💼</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">LinkedIn</h3>
            <p className="text-purple-100 mb-4">
              Connect directly for professional inquiries, collaborations, or portfolio feedback.
            </p>
            <p className="text-sm text-purple-200 mt-4">Best for general contact and networking.</p>
          </div>
        </a>

        <a
          href="https://github.com/Julieanna97/PracticePal/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-indigo-500 to-sky-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <span className="text-4xl animate-pulse">🐛</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">GitHub Issues</h3>
            <p className="text-sky-100 mb-4">
              Report bugs, request features, or track improvements in the repo.
            </p>
            <p className="text-sm text-sky-200 mt-4">Use this for product feedback and bug reports.</p>
          </div>
        </a>
      </div>

      {/* Quick Links */}
      <div className="bg-white border-2 border-purple-100 rounded-2xl p-8 mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <a 
            href="/support/faq" 
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-purple-200 group-hover:to-indigo-200 transition-colors">
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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-indigo-200 group-hover:to-sky-200 transition-colors">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Help Center</p>
              <p className="text-sm text-gray-600">Guides and tutorials</p>
            </div>
          </a>

          <a 
            href="/legal/privacy" 
            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-fuchsia-200 group-hover:to-purple-200 transition-colors">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-fuchsia-700 transition-colors">Privacy & Terms</p>
              <p className="text-sm text-gray-600">Legal information</p>
            </div>
          </a>
        </div>
      </div>

      {/* Contact Form Placeholder */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">📝</span>
          More Contact Options
        </h3>
        <p className="text-gray-700 mb-6">
          There is no email form on this page. Use LinkedIn for direct contact or GitHub Issues for bugs and product feedback.
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Recommended paths:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">•</span>
                LinkedIn for professional contact
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">•</span>
                GitHub Issues for bugs and feature requests
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">•</span>
                FAQ for common questions
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">•</span>
                Phone for urgent direct contact
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bug Reports */}
      <div className="mt-10 bg-white border-2 border-blue-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🐛</span>
          Found a Bug?
        </h3>
        <p className="text-gray-700 mb-6">
          If you've encountered a technical issue or bug, please let us know! Include as much detail as possible:
        </p>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">✓</span>
            <span>What you were trying to do</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">âœ“</span>
            <span>What happened instead</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">âœ“</span>
            <span>Your device and browser</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">âœ“</span>
            <span>Screenshots if possible</span>
          </li>
        </ul>
        <a 
          href="https://github.com/Julieanna97/PracticePal/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Open GitHub Issues
        </a>
      </div>

      {/* Social/Community (future) */}
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Join Our Community</h3>
        <p className="text-blue-100 mb-6">
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

