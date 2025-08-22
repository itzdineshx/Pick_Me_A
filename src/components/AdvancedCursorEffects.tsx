import { useEffect, useState, useRef } from 'react';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  theme: string;
  timestamp: number;
}

interface AdvancedCursorEffectsProps {
  activeTheme?: 'anime' | 'cinema' | 'music' | null;
}

const AdvancedCursorEffects = ({ activeTheme }: AdvancedCursorEffectsProps) => {
  const [cursorTrails, setCursorTrails] = useState<CursorTrail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (activeTheme) {
        const newTrail: CursorTrail = {
          id: trailId.current++,
          x: e.clientX,
          y: e.clientY,
          theme: activeTheme,
          timestamp: Date.now()
        };

        setCursorTrails(prev => [...prev.slice(-8), newTrail]);
      }
    };

    // Clean up old trails
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setCursorTrails(prev => prev.filter(trail => now - trail.timestamp < 800));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [activeTheme]);

  // Generate theme-specific cursor particles
  const generateParticles = () => {
    if (!activeTheme) return null;

    switch (activeTheme) {
      case 'anime':
        return (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-anime rounded-full opacity-60 animate-ping"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${i * 120}deg) translateY(-${10 + i * 5}px)`
                }}
              />
            ))}
          </div>
        );

      case 'cinema':
        return (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-8 h-8 border border-cinema rounded-full opacity-40 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-radial from-cinema/30 to-transparent rounded-full animate-ping" />
          </div>
        );

      case 'music':
        return (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-music rounded-full opacity-30 animate-ping"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Cursor trails */}
      {cursorTrails.map((trail) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 800);
        
        return (
          <div
            key={trail.id}
            className={`fixed pointer-events-none z-40 w-3 h-3 bg-${trail.theme} rounded-full`}
            style={{
              left: trail.x,
              top: trail.y,
              transform: 'translate(-50%, -50%)',
              opacity,
              transition: 'opacity 0.1s ease-out'
            }}
          />
        );
      })}

      {/* Active cursor particles */}
      {generateParticles()}

      {/* Theme-specific ambient cursor effects */}
      {activeTheme === 'music' && (
        <div
          className="fixed pointer-events-none z-30"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-music opacity-20"
              style={{
                height: `${10 + Math.random() * 20}px`,
                transform: `rotate(${i * 30}deg) translateY(-20px)`,
                animation: `equalizer-bounce ${0.5 + Math.random() * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AdvancedCursorEffects;