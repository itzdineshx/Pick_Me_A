import { useEffect, useState } from 'react';

interface SimpleCursorEffectsProps {
  activeTheme?: 'anime' | 'cinema' | 'music' | null;
}

const SimpleCursorEffects = ({ activeTheme }: SimpleCursorEffectsProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Only show subtle cursor effect when theme is active
  if (!activeTheme) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-opacity duration-300"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className={`w-4 h-4 border border-${activeTheme} rounded-full opacity-20 transition-all duration-300`}
        style={{
          background: `hsl(var(--${activeTheme === 'anime' ? 'anime-crimson' : activeTheme === 'cinema' ? 'cinema-gold' : 'music-neon'}) / 0.1)`
        }}
      />
    </div>
  );
};

export default SimpleCursorEffects;