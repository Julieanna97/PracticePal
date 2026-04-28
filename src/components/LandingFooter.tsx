import Link from "next/link";
import { PracticePalLogo } from "@/components/PracticePalLogo";

export default function LandingFooter() {
  return (
    <footer className="mt-16 border-t border-[#0d3b3a]/10 bg-[#0d3b3a] px-6 py-16 text-[#faf6f0]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center">
              <PracticePalLogo size="md" />
            </Link>

            <p className="max-w-sm leading-relaxed text-[#faf6f0]/72">
              Your practice companion for clear goals, steady progress, and calmer routines.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-[#faf6f0]/15 px-5 py-2 font-semibold text-[#faf6f0] transition hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-[#f4a261] px-5 py-2 font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/90"
              >
                Start Free
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-[#faf6f0]">Product</h4>
            <ul className="space-y-3 text-[#faf6f0]/72">
              <li><a href="/#features" className="hover:text-white">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-white">How it works</a></li>
              <li><a href="/#pricing" className="hover:text-white">Get started</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-[#faf6f0]">Support</h4>
            <ul className="space-y-3 text-[#faf6f0]/72">
              <li><Link href="/support/help-center" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/support/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/support/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-[#faf6f0]">Legal</h4>
            <ul className="space-y-3 text-[#faf6f0]/72">
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-[#faf6f0]/55">
          <p>&copy; 2026 PracticePal. Made for musicians who want a calmer way to stay consistent.</p>
        </div>
      </div>
    </footer>
  );
}

