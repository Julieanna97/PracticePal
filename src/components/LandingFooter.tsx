import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="mt-16 border-t border-purple-100 bg-gradient-to-b from-white/95 to-purple-50/45 backdrop-blur-sm py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-indigo-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-800">PracticePal</span>
            </Link>

            <p className="text-gray-600 leading-relaxed">
              Your personal practice companion for musical progress and consistency.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-purple-600 text-purple-700 font-bold hover:bg-purple-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-700 text-white font-bold hover:shadow-lg transition-all"
              >
                Start Free
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Product</h4>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">About</a></li>
              <li><a href="/#benefits" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Benefits</a></li>
              <li><a href="/#testimonials" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Success Stories</a></li>
              <li><a href="/#pricing" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/support/help-center" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Help Center</Link></li>
              <li><Link href="/support/contact" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Contact</Link></li>
              <li><Link href="/support/faq" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/legal/privacy" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-gray-600 hover:text-purple-600 hover:underline underline-offset-4">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-100 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; 2024 PracticePal. All rights reserved. Made with heart for musicians everywhere.</p>
        </div>
      </div>
    </footer>
  );
}

