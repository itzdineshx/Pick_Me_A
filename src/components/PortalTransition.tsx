import { useEffect, useState } from 'react';

interface PortalTransitionProps {
  theme: 'anime' | 'cinema' | 'music';
  isActive: boolean;
  onComplete: () => void;
}

const PortalTransition = ({ theme, isActive, onComplete }: PortalTransitionProps) => {
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit'>('enter');

  useEffect(() => {
    if (isActive) {
      // Enhanced smooth transition phases
      const enterTimer = setTimeout(() => setPhase('active'), 400);
      const exitTimer = setTimeout(() => setPhase('exit'), 800);
      const completeTimer = setTimeout(() => {
        onComplete();
        setPhase('enter');
      }, 1200);
      
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const transitionClasses = {
    anime: 'anime-transition',
    cinema: 'cinema-transition', 
    music: 'music-transition'
  };

  const loadingElements = {
    anime: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-anime text-6xl font-bold transition-all duration-500 ${
          phase === 'enter' ? 'animate-scale-in' : 
          phase === 'active' ? 'animate-glow-pulse' : 
          'animate-scale-out'
        }`}>
          進入中...
        </div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 bg-anime rounded-full transition-all duration-700 ${
                phase === 'active' ? 'animate-pulse-smooth opacity-80' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                transform: phase === 'active' ? 'scale(1)' : 'scale(0)'
              }}
            />
          ))}
        </div>
      </div>
    ),
    cinema: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-cinema text-6xl font-bold transition-all duration-500 ${
          phase === 'enter' ? 'animate-fade-in cinema-flicker' : 
          phase === 'active' ? 'animate-glow-pulse' : 
          'animate-fade-out'
        }`}>
          LOADING...
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-cinema/30 to-transparent transform -skew-x-12 transition-all duration-800 ${
          phase === 'active' ? 'animate-slide-in-right' : 'opacity-0'
        }`} />
      </div>
    ),
    music: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-music text-6xl font-bold transition-all duration-500 ${
          phase === 'enter' ? 'animate-scale-in' : 
          phase === 'active' ? 'animate-smooth-bounce' : 
          'animate-scale-out'
        }`}>
          ♪ LOADING ♪
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`w-2 bg-music rounded-full transition-all duration-300 ${
                phase === 'active' ? 'animate-smooth-bounce' : 'scale-y-0'
              }`}
              style={{
                height: `${20 + Math.random() * 50}px`,
                animationDelay: `${i * 0.08}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className={`portal-transition fixed inset-0 z-1000 pointer-events-none ${
      phase === 'enter' ? 'animate-portal-enter' : 
      phase === 'exit' ? 'animate-portal-exit' : ''
    } ${transitionClasses[theme]}`}>
      {loadingElements[theme]}
      
      {/* Enhanced progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className={`h-full bg-${theme}-glow rounded-full transition-all duration-1200 ease-out shadow-lg ${
            phase === 'enter' ? 'w-1/3' : 
            phase === 'active' ? 'w-2/3' : 
            'w-full'
          }`}
          style={{
            boxShadow: `0 0 20px hsl(var(--${theme}-glow) / 0.6)`
          }}
        />
      </div>
    </div>
  );
};

export default PortalTransition;