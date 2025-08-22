import { useEffect, useState } from 'react';

interface EnhancedPortalTransitionProps {
  theme: 'anime' | 'cinema' | 'music';
  isActive: boolean;
  onComplete: () => void;
}

const EnhancedPortalTransition = ({ theme, isActive, onComplete }: EnhancedPortalTransitionProps) => {
  const [phase, setPhase] = useState<'intro' | 'peak' | 'outro'>('intro');

  useEffect(() => {
    if (isActive) {
      // Enhanced transition phases with smoother timing
      const introTimer = setTimeout(() => setPhase('peak'), 500);
      const peakTimer = setTimeout(() => setPhase('outro'), 900);
      const completeTimer = setTimeout(() => {
        onComplete();
        setPhase('intro');
      }, 1400);
      
      return () => {
        clearTimeout(introTimer);
        clearTimeout(peakTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const transitions = {
    anime: {
      intro: (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Enhanced Kanji explosion with smooth scaling */}
          <div className="text-anime text-9xl font-bold animate-scale-in">
            扉
          </div>
          {/* Improved sakura burst with staggered animation */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-anime-glow rounded-full animate-pulse-smooth"
                style={{
                  left: '50%',
                  top: '50%',
                  animationDelay: `${i * 0.02}s`,
                  transform: `rotate(${i * 7.2}deg) translateY(-${20 + i * 3}px) scale(${0.5 + Math.random() * 0.5})`,
                  opacity: 0.8 - (i * 0.015)
                }}
              />
            ))}
          </div>
        </div>
      ),
      peak: (
        <div className="absolute inset-0 bg-anime/20 animate-fade-in">
          <div className="absolute inset-0 manga-grid opacity-50 animate-fade-in" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-7xl font-bold animate-glow-pulse">
              アニメ世界へ
            </div>
          </div>
          {/* Floating kanji characters */}
          {['進', '入', '世', '界'].map((char, i) => (
            <div
              key={char}
              className="absolute text-anime-glow text-4xl font-bold floating-kanji"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ),
      outro: (
        <div className="absolute inset-0 bg-gradient-radial from-anime via-anime/60 to-transparent animate-scale-out" />
      )
    },
    cinema: {
      intro: (
        <div className="absolute inset-0 bg-black animate-fade-in">
          {/* Enhanced countdown with cinematic timing */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-cinema text-12xl font-bold cinema-flicker animate-scale-in">
              3
            </div>
          </div>
          {/* Improved film reel with smooth rotation */}
          <div className="absolute top-8 right-8 w-20 h-20 border-4 border-cinema rounded-full animate-spin-smooth">
            <div className="absolute inset-3 border-2 border-cinema rounded-full" />
            <div className="absolute inset-6 border border-cinema rounded-full" />
          </div>
          {/* Film strip animation */}
          <div className="absolute bottom-0 left-0 right-0 h-12 film-strip opacity-60" />
        </div>
      ),
      peak: (
        <div className="absolute inset-0 animate-fade-in">
          <div className="vintage-film-grain active" />
          <div className="absolute inset-0 lens-flare-sweep animate-slide-in-right" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-cinema text-8xl font-bold animate-glow-pulse cinema-flicker">
              ACTION!
            </div>
          </div>
          {/* Enhanced spotlight effect */}
          <div className="absolute inset-0 bg-gradient-radial from-cinema/30 via-transparent to-transparent animate-pulse-smooth" />
        </div>
      ),
      outro: (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema/70 to-transparent animate-slide-out-right" />
      )
    },
    music: {
      intro: (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Enhanced bass drop visualization */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="bg-music-glow rounded-full animate-smooth-bounce"
                style={{
                  width: '3px',
                  height: `${30 + Math.random() * 80}px`,
                  animationDelay: `${i * 0.015}s`
                }}
              />
            ))}
          </div>
          <div className="text-music text-8xl font-bold animate-scale-in">
            ♪
          </div>
          {/* Sound wave rings */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-music-glow rounded-full animate-ping"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      ),
      peak: (
        <div className="absolute inset-0 animate-fade-in">
          {/* Enhanced neon explosion */}
          <div className="absolute inset-0 bg-gradient-radial from-music/40 to-transparent animate-pulse-smooth" />
          {/* Improved sound waves */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-music rounded-full animate-ping"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.08}s`,
                animationDuration: '0.8s',
                opacity: 0.7 - (i * 0.05)
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-music text-7xl font-bold animate-glow-pulse">
              BEAT DROP
            </div>
          </div>
          {/* Enhanced spectrum visualizer */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-music-glow rounded-full animate-smooth-bounce"
                style={{
                  width: '2px',
                  height: `${15 + Math.random() * 60}px`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        </div>
      ),
      outro: (
        <div className="absolute inset-0 bg-gradient-radial from-music/60 to-transparent animate-scale-out" />
      )
    }
  };

  return (
    <div className="portal-transition fixed inset-0 z-1000 pointer-events-none">
      {transitions[theme][phase]}
      
      {/* Enhanced universal overlay effects */}
      <div className="absolute inset-0 bg-black/10 animate-pulse-smooth" />
      
      {/* Improved loading progress bar with glow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className={`h-full bg-${theme}-glow rounded-full transition-all duration-1400 ease-out shadow-lg animate-glow-pulse`}
          style={{ 
            width: phase === 'intro' ? '30%' : phase === 'peak' ? '70%' : '100%',
            boxShadow: `0 0 25px hsl(var(--${theme}-glow) / 0.8)`
          }}
        />
      </div>
      
      {/* Particle field overlay */}
      <div className="absolute inset-0 particle-field">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-${theme}-glow rounded-full animate-pulse-smooth`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedPortalTransition;