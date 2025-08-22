import enhancedPanoramicBackground from '../assets/pick3.png';

interface SimpleBackgroundProps {
  activeTheme?: 'anime' | 'cinema' | 'music' | null;
}

const SimpleBackground = ({ activeTheme }: SimpleBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced Panoramic Entertainment Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${enhancedPanoramicBackground})`,
          filter: activeTheme ? 'brightness(0.1)' : 'brightness(0.4)',
        }}
      />
      
      {/* Zone-specific ambient glows */}
      {activeTheme && (
        <>
          {/* Anime zone glow (left) */}
          {activeTheme === 'anime' && (
            <div className="absolute inset-0 transition-opacity duration-1000 opacity-25">
              <div 
                className="absolute left-0 top-0 w-1/3 h-full"
                style={{
                  background: `radial-gradient(ellipse at 20% 40%, 
                    hsl(var(--anime-crimson) / 0.15) 0%, 
                    transparent 70%)`
                }}
              />
            </div>
          )}
          
          {/* Cinema zone glow (center) */}
          {activeTheme === 'cinema' && (
            <div className="absolute inset-0 transition-opacity duration-1000 opacity-25">
              <div 
                className="absolute left-1/3 top-0 w-1/3 h-full"
                style={{
                  background: `radial-gradient(ellipse at 50% 60%, 
                    hsl(var(--cinema-gold) / 0.15) 0%, 
                    transparent 70%)`
                }}
              />
            </div>
          )}
          
          {/* Music zone glow (right) */}
          {activeTheme === 'music' && (
            <div className="absolute inset-0 transition-opacity duration-1000 opacity-25">
              <div 
                className="absolute right-0 top-0 w-1/3 h-full"
                style={{
                  background: `radial-gradient(ellipse at 80% 50%, 
                    hsl(var(--music-neon) / 0.15) 0%, 
                    transparent 70%)`
                }}
              />
            </div>
          )}
        </>
      )}
      
      {/* Subtle floating particles overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="sakura-particle absolute animate-sakura-drift" />
        <div className="sakura-particle absolute animate-sakura-drift" style={{ animationDelay: '2s' }} />
        <div className="sakura-particle absolute animate-sakura-drift" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Enhanced depth and atmosphere overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent via-transparent to-background/10" />
    </div>
  );
};

export default SimpleBackground;