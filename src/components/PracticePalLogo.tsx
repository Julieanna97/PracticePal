export function PracticePalLogo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg' | 'xl', showText?: boolean }) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-2xl' },
    lg: { icon: 'w-16 h-16', text: 'text-4xl' },
    xl: { icon: 'w-24 h-24', text: 'text-6xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center space-x-2">
      <div className={`${icon} relative`}>
        <div className="w-full h-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
              <circle cx="80" cy="80" r="20" fill="white" opacity="0.2"/>
            </svg>
          </div>
          <svg className="w-3/5 h-3/5 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`${text} font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent`}>
          PracticePal
        </span>
      )}
    </div>
  );
}