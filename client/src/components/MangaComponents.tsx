import React from 'react';

// ==========================================
// MANGA LAYOUT COMPONENTS
// ==========================================

export const MangaPage = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`
      manga-page-wrapper
      w-full max-w-[210mm] sm:aspect-[210/297] mx-auto 
      bg-white manga-border-thick p-4 sm:p-6 md:p-8
      mb-12 manga-shadow-lg flex flex-col gap-4
      relative overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
};

export const MangaPanel = ({ 
  children, 
  className = '',
  screentone = 'none',
  angled = false
}: { 
  children: React.ReactNode, 
  className?: string,
  screentone?: 'none' | 'light' | 'dense' | 'red' | 'burst',
  angled?: boolean
}) => {
  const getScreentoneClass = () => {
    switch(screentone) {
      case 'light': return 'screentone-dots-light';
      case 'dense': return 'screentone-dots-dense';
      case 'red': return 'screentone-dots-red';
      case 'burst': return 'speed-lines-burst opacity-10';
      default: return 'bg-white';
    }
  };

  return (
    <div className={`
      manga-border manga-shadow relative overflow-hidden flex flex-col
      ${getScreentoneClass()}
      ${angled ? '-rotate-1 hover:rotate-0 transition-transform duration-300' : ''}
      ${className}
    `}>
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// MANGA DECORATIONS & TYPOGRAPHY
// ==========================================

export const MangaHeader = ({ 
  text, 
  subtitle,
  className = '',
  align = 'center'
}: { 
  text: string, 
  subtitle?: string,
  className?: string,
  align?: 'left' | 'center' | 'right'
}) => {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'} ${className}`}>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-display text-stroke-black text-shadow-solid leading-none mb-2 transform -rotate-2">
        {text}
      </h1>
      {subtitle && (
        <h2 className="text-xl sm:text-2xl font-manga bg-black text-white px-4 py-1 transform rotate-1 inline-block">
          {subtitle}
        </h2>
      )}
    </div>
  );
};

export const SpeechBubble = ({ 
  text, 
  position = 'bottom-right',
  className = ''
}: { 
  text: string, 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  className?: string 
}) => {
  const positionClasses = {
    'top-left': '-top-4 -left-4',
    'top-right': '-top-4 -right-4',
    'bottom-left': '-bottom-4 -left-4',
    'bottom-right': '-bottom-4 -right-4',
  };

  return (
    <div className={`absolute z-20 ${positionClasses[position]} ${className}`}>
      <div className="relative">
        {/* SVG Speech Bubble Background */}
        <svg viewBox="0 0 200 150" className="w-32 h-auto drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <path 
            d="M20,75 C20,35 60,10 100,10 C140,10 180,35 180,75 C180,115 140,140 100,140 C80,140 40,150 20,150 C30,130 20,100 20,75 Z" 
            fill="white" 
            stroke="black" 
            strokeWidth="6" 
          />
        </svg>
        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="font-display text-xl leading-tight transform -rotate-3 text-black">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ActionText = ({ text, className = '' }: { text: string, className?: string }) => {
  return (
    <div className={`font-display text-4xl text-stroke-red text-shadow-solid transform -rotate-12 ${className}`}>
      {text}
    </div>
  );
};
