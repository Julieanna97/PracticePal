import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function SimplePageShell({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-white relative overflow-x-hidden">
      {/* Animated background musical notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-purple-200 text-4xl opacity-30 animate-pulse">♪</div>
        <div className="absolute top-40 right-20 text-purple-200 text-3xl opacity-25 animate-bounce">♫</div>
        <div className="absolute bottom-40 left-20 text-purple-200 text-5xl opacity-20 animate-pulse">♪</div>
        <div className="absolute bottom-20 right-40 text-purple-200 text-4xl opacity-30 animate-bounce">♫</div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">PracticePal</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-purple-600 border-2 border-purple-600 px-5 py-2 rounded-full hover:bg-purple-50 font-medium transition-all"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 font-medium transition-all"
            >
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-100 p-8 md:p-12">
          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mb-6"></div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900">
            {title}
          </h1>
          
          {subtitle && (
            <p className="mt-4 text-xl text-gray-600 leading-relaxed">{subtitle}</p>
          )}

          <div className="mt-10 text-gray-700 leading-relaxed prose prose-lg max-w-none">
            {children}
          </div>

          <div className="mt-12 pt-8 border-t-2 border-purple-100 flex items-center justify-between flex-wrap gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-purple-700 font-bold hover:text-purple-900 transition-colors group"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              Back to home
            </Link>
            
            <div className="flex gap-3">
              <Link
                href="/support/help-center"
                className="text-sm text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Help Center
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/support/contact"
                className="text-sm text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}