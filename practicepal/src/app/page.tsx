// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-white relative overflow-hidden">
      {/* Background Musical Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple-200 text-4xl opacity-30">♪</div>
        <div className="absolute top-40 right-20 text-purple-200 text-3xl opacity-25">♫</div>
        <div className="absolute bottom-40 left-20 text-purple-200 text-5xl opacity-20">♪</div>
        <div className="absolute bottom-20 right-40 text-purple-200 text-4xl opacity-30">♫</div>
        <div className="absolute top-60 left-1/3 text-purple-200 text-3xl opacity-20">♪</div>
        <div className="absolute bottom-60 right-1/3 text-purple-200 text-4xl opacity-25">♫</div>
      </div>

      {/* Navigation */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">PracticePal</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600">About Us</a>
            <Link href="/auth/login" className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50">Login</Link>
            <Link href="/auth/register" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="text-center py-20 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-800 mb-6">
            Track Your Musical Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Effortlessly plan your practice sessions, monitor your progress with insightful
            analytics, and stay motivated on path to musical mastery
          </p>
          <Link 
            href="/auth/signup"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Get Started Free
          </Link>
        </section>

        {/* Device Mockups Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-10">
            {/* Desktop Mockup */}
            <div className="bg-gray-800 p-6 rounded-t-2xl">
              <div className="bg-white rounded-lg p-8 w-96 h-64">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Track Your Practicing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Detailed Progress Tracking</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Insightful Music Performance Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="bg-black rounded-3xl p-2">
              <div className="bg-white rounded-2xl p-4 w-48 h-80">
                <div className="text-center">
                  <h4 className="font-semibold text-purple-700 mb-6">Track Your Practicing</h4>
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      <span>Detailed Progress Tracking</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      <span>Insightful Music Performance Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-800 mb-2">
              Simple Pricing, Powerful Features
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
                <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-gray-600">/month</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Basic Practice Logger
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Quick practice entry
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Limited Session History
                </li>
              </ul>

              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-500">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                <div className="text-3xl font-bold">$9<span className="text-lg font-normal text-gray-600">/month</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Advanced Performance Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Custom Practice Routines
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                  Unlimited Session History
                </li>
              </ul>

              <button className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}