import { useEffect, useState, useRef } from 'react';

interface UniverseBackgroundProps {
  activeTheme?: 'anime' | 'cinema' | 'music' | null;
}

const UniverseBackground = ({ activeTheme }: UniverseBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrails, setCursorTrails] = useState<Array<{id: number, x: number, y: number, theme: string}>>([]);
  const trailId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth) * 100;
      const newY = (e.clientY / window.innerHeight) * 100;
      
      setMousePosition({ x: newX, y: newY });

      // Add cursor trail if there's an active theme
      if (activeTheme) {
        const newTrail = {
          id: trailId.current++,
          x: e.clientX,
          y: e.clientY,
          theme: activeTheme
        };
        
        setCursorTrails(prev => [...prev.slice(-5), newTrail]);
        
        // Remove trail after animation
        setTimeout(() => {
          setCursorTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
        }, 500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTheme]);

  // Enhanced color intensity based on active theme
  const getThemeIntensity = (theme: string) => {
    if (!activeTheme) return '20';
    if (activeTheme === theme) return '30';
    return '10';
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Universe Background with theme adaptation */}
      <div 
        className={`universe-bg absolute inset-0 transition-all duration-1000 ${
          activeTheme ? `opacity-80` : 'opacity-100'
        }`} 
        style={{
          filter: activeTheme ? `hue-rotate(${activeTheme === 'anime' ? '0deg' : activeTheme === 'cinema' ? '30deg' : '120deg'})` : 'none'
        }}
      />
      
      {/* Enhanced Parallax Layers */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
        }}
      >
        {/* Crimson Nebula (Left) - Enhanced for anime theme */}
        <div 
          className={`absolute left-0 top-0 w-1/3 h-full bg-gradient-radial transition-all duration-1000`}
          style={{
            background: `radial-gradient(circle at 30% 50%, hsl(var(--anime-crimson) / 0.${getThemeIntensity('anime')}), hsl(var(--anime-crimson) / 0.05), transparent)`
          }}
        />
        
        {/* Golden Cinema Beam (Center) - Enhanced for cinema theme */}
        <div className="absolute left-1/3 top-0 w-1/3 h-full">
          <div 
            className={`absolute inset-0 transition-all duration-1000 transform rotate-12`}
            style={{
              background: `linear-gradient(to bottom, transparent, hsl(var(--cinema-gold) / 0.${getThemeIntensity('cinema')}), transparent)`
            }}
          />
          {activeTheme === 'cinema' && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema/10 to-transparent transform rotate-6 animate-pulse" />
          )}
        </div>
        
        {/* Neon Music Waves (Right) - Enhanced for music theme */}
        <div 
          className={`absolute right-0 top-0 w-1/3 h-full transition-all duration-1000`}
          style={{
            background: `radial-gradient(circle at 70% 50%, hsl(var(--music-neon) / 0.${getThemeIntensity('music')}), hsl(var(--music-neon) / 0.05), transparent)`
          }}
        >
          {activeTheme === 'music' && (
            <>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-music/5 rounded-full animate-ping"
                  style={{
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    right: '20%',
                    top: '50%',
                    transform: 'translate(50%, -50%)',
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Enhanced Floating Particles */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
        }}
      >
        {/* Enhanced Anime Sakura Petals with faster swirl */}
        {[...Array(activeTheme === 'anime' ? 25 : 8)].map((_, i) => (
          <div
            key={`sakura-${i}`}
            className={`absolute bg-anime rounded-full transition-all duration-500 ${
              activeTheme === 'anime' ? 'w-3 h-3 opacity-90 sakura-particle' : 'w-1 h-1 opacity-40 sakura-particle'
            }`}
            style={{
              left: `${(i * 4 + 5)}%`,
              top: `${(i * 3 + 10)}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: activeTheme === 'anime' ? `${1.5 + (i % 2)}s` : `${3 + (i % 3)}s`
            }}
          />
        ))}

        {/* Manga grid overlay for anime theme */}
        {activeTheme === 'anime' && (
          <div className="manga-grid absolute inset-0 opacity-20" />
        )}

        {/* Enhanced Cinema Dust Specks with lens flare */}
        {[...Array(activeTheme === 'cinema' ? 40 : 15)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className={`absolute bg-cinema rounded-full transition-all duration-500 ${
              activeTheme === 'cinema' ? 'w-1.5 h-1.5 opacity-80' : 'w-0.5 h-0.5 opacity-40'
            }`}
            style={{
              left: `${25 + (i * 1.8)}%`,
              top: `${15 + (i * 2)}%`,
              animation: `float-up ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              boxShadow: activeTheme === 'cinema' ? `0 0 8px hsl(var(--cinema-gold-glow))` : 'none'
            }}
          />
        ))}

        {/* Golden lens flare sweep for cinema theme */}
        {activeTheme === 'cinema' && (
          <div className="lens-flare-sweep absolute inset-0 opacity-30" />
        )}

        {/* Enhanced Music Notes with neon glow */}
        {[...Array(activeTheme === 'music' ? 20 : 6)].map((_, i) => (
          <div
            key={`note-${i}`}
            className={`absolute text-music transition-all duration-500 ${
              activeTheme === 'music' ? 'text-xl opacity-90' : 'text-base opacity-50'
            }`}
            style={{
              left: `${55 + (i * 3.5)}%`,
              top: `${8 + (i * 5)}%`,
              animation: `wave-ripple ${2 + (i % 2)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              textShadow: activeTheme === 'music' ? `0 0 12px hsl(var(--music-neon-glow))` : 'none'
            }}
          >
            {['♪', '♫', '♬', '♩'][i % 4]}
          </div>
        ))}

        {/* Cursor-responsive neon waves for music theme */}
        {activeTheme === 'music' && (
          <div 
            className="absolute pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="cursor-wave-ring absolute"
                style={{
                  width: `${50 + i * 30}px`,
                  height: `${50 + i * 30}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Atmospheric Fog */}
      <div 
        className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${
          activeTheme ? 'h-96' : 'h-64'
        }`}
        style={{
          background: activeTheme 
            ? `linear-gradient(to top, hsl(var(--${activeTheme === 'anime' ? 'anime-crimson' : activeTheme === 'cinema' ? 'cinema-gold' : 'music-neon'}) / 0.1), transparent)`
            : `linear-gradient(to top, hsl(var(--fog-base) / 0.2), transparent)`
        }}
      />
      
      {/* Enhanced Reactive Starfield */}
      <div className="absolute inset-0">
        {[...Array(activeTheme ? 80 : 50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute rounded-full transition-all duration-1000 ${
              activeTheme ? 'w-0.5 h-0.5 opacity-60' : 'w-px h-px opacity-40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: activeTheme 
                ? `hsl(var(--${activeTheme === 'anime' ? 'anime-crimson' : activeTheme === 'cinema' ? 'cinema-gold' : 'music-neon'}))`
                : 'hsl(var(--particle-glow))',
              animation: `pulse ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Theme-specific ambient effects */}
      {activeTheme === 'anime' && (
        <div className="absolute inset-0 bg-gradient-radial from-anime/5 via-transparent to-transparent animate-pulse" />
      )}
      
      {activeTheme === 'cinema' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema/10 to-transparent transform -skew-x-12 animate-[slide-in-right_8s_ease-in-out_infinite]" />
        </div>
      )}
      
      {activeTheme === 'music' && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-music/15 rounded-full animate-ping"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                right: '20%',
                top: '50%',
                transform: 'translate(50%, -50%)',
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3.5s'
              }}
            />
          ))}
        </div>
      )}

      {/* Cursor trails */}
      {cursorTrails.map((trail) => (
        <div
          key={trail.id}
          className={`cursor-trail absolute w-3 h-3 bg-${trail.theme}`}
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

export default UniverseBackground;