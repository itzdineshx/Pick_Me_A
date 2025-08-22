interface PortalCardEffectsProps {
  theme: 'anime' | 'cinema' | 'music';
  isHovered: boolean;
  longHover: boolean;
  doubleClicked: boolean;
}

const PortalCardEffects = ({ theme, isHovered, longHover, doubleClicked }: PortalCardEffectsProps) => {
  return (
    <>
      {/* Enhanced Particle Field */}
      <div className="particle-field absolute inset-0 pointer-events-none">
        {/* Floating ambient particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            className={`absolute w-1 h-1 bg-${theme} rounded-full opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-up ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Theme-specific effects overlay */}
      <div className={`absolute inset-0 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-800 ${
        theme === 'anime' ? 'anime-silhouette' : 
        theme === 'cinema' ? 'cinema-preview' : 
        'music-waveform-bg'
      }`}>
        {/* Anime effects */}
        {theme === 'anime' && isHovered && (
          <div className="floating-kanji">
            {['ア', 'ニ', 'メ'].map((char, i) => (
              <span 
                key={char}
                className="absolute text-2xl font-bold text-anime/60"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  animationDelay: `${i * 2}s`,
                  animation: 'kanji-drift 3s ease-out infinite'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}
        
        {/* Cinema effects */}
        {theme === 'cinema' && isHovered && (
          <>
            <div className="vintage-film-grain active" />
            <div className="film-strip absolute top-1/2 left-0 right-0 h-8 transform -translate-y-1/2" />
            <div className="lens-flare-sweep absolute inset-0" />
          </>
        )}
        
        {/* Music effects */}
        {theme === 'music' && isHovered && (
          <div className="spectrum-visualizer active">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="spectrum-bar"
                style={{
                  height: `${10 + Math.random() * 30}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Double-click Sakura Explosion for anime */}
      {theme === 'anime' && doubleClicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="sakura-explosion-particle absolute w-3 h-3 bg-anime rounded-full"
              style={{
                left: '50%',
                top: '50%',
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Long hover Easter Egg for cinema */}
      {theme === 'cinema' && longHover && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="clapperboard-effect px-6 py-3 rounded-lg text-lg font-bold">
            DIRECTOR'S CUT
          </div>
        </div>
      )}

      {/* Enhanced Hover Ripple Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl border-2 border-${theme} opacity-20 transition-opacity duration-300`} />
          <div className={`absolute inset-0 rounded-2xl border border-${theme}-glow opacity-40 transition-opacity duration-300`} />
        </div>
      )}
    </>
  );
};

export default PortalCardEffects;