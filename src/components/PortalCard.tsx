import { useState, useEffect, useRef } from 'react';
import { Eye, Film, Music } from 'lucide-react';

interface PortalCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  theme: 'anime' | 'cinema' | 'music';
  hoverEffect: string;
  onPortalActivate: (theme: 'anime' | 'cinema' | 'music') => void;
  isMobile?: boolean;
}

const PortalCard = ({ title, description, link, icon, theme, hoverEffect, onPortalActivate, isMobile = false }: PortalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [longHover, setLongHover] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [gyroTilt, setGyroTilt] = useState({ x: 0, y: 0 });
  const [isDay, setIsDay] = useState(true);
  const [mobileClicked, setMobileClicked] = useState(false);
  const [touchRipples, setTouchRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const themeClasses = {
    anime: 'border-anime hover:crimson-glow',
    cinema: 'border-cinema hover:gold-glow',
    music: 'border-music hover:neon-glow'
  };

  const iconClasses = {
    anime: 'text-anime',
    cinema: 'text-cinema',
    music: 'text-music'
  };

  const statusMessages = {
    anime: 'Finding Perfect Anime...',
    cinema: 'Your next favorite film is just a click away',
    music: 'Finding Perfect Song...'
  };

  useEffect(() => {
    // Time-based glow detection
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);

    // Mobile gyroscope support
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma && event.beta) {
        const maxTilt = 15; // degrees
        const x = Math.max(-maxTilt, Math.min(maxTilt, event.gamma)) / maxTilt;
        const y = Math.max(-maxTilt, Math.min(maxTilt, event.beta)) / maxTilt;
        setGyroTilt({ x: x * 10, y: y * 5 }); // Scale for subtle effect
      }
    };

    // Request permission for iOS 13+ devices
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        });
    } else {
      // For other devices
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        setLongHover(true);
      }, 10000); // 10 seconds for easter egg
    } else {
      setLongHover(false);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const handleClick = (event?: React.MouseEvent | React.TouchEvent) => {
    if (isMobile && event && 'touches' in event && event.touches.length > 0) {
      handleMobileTouch(event as React.TouchEvent);
    }
    onPortalActivate(theme);
    setTimeout(() => {
      window.open(link, '_blank', 'noopener,noreferrer');
    }, isMobile ? 800 : 1000);
  };

  const handleMobileTouch = (event: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const touch = event.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y
    };
    
    setTouchRipples(prev => [...prev, newRipple]);
    setMobileClicked(true);
    
    // Remove ripple after animation
    setTimeout(() => {
      setTouchRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    // Reset mobile click state
    setTimeout(() => {
      setMobileClicked(false);
    }, 300);
  };

  const handleDoubleClick = () => {
    if (theme === 'anime') {
      setDoubleClicked(true);
      setTimeout(() => setDoubleClicked(false), 2000);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`portal-card breathing-card realistic-reflection portal-3d time-aware-glow enhanced-depth ${
        isDay ? 'is-day' : 'is-night'
      } relative overflow-hidden rounded-2xl ${isMobile ? 'p-6' : 'p-8'} cursor-pointer group ${themeClasses[theme]} ${
        isHovered && !isMobile ? hoverEffect : ''
      } ${isMobile ? 'mobile-portal-card' : ''} ${mobileClicked ? 'mobile-portal-active' : ''}`}
      style={{
        '--tilt-x': `${gyroTilt.x}deg`,
        '--tilt-y': `${gyroTilt.y}deg`,
        '--primary-color': theme === 'anime' ? 'var(--anime-crimson)' : 
                          theme === 'cinema' ? 'var(--cinema-gold)' : 
                          'var(--music-neon)'
      } as React.CSSProperties}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={isMobile ? handleClick : undefined}
    >
      <div className="portal-inner">
        {/* Enhanced Particle Field */}
        <div className="particle-field">
          {/* Floating ambient particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`ambient-${i}`}
              className={`absolute w-1 h-1 bg-${theme} rounded-full opacity-30`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-up ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        {/* Live Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-3">
          <div className={`w-2 h-2 bg-${theme} rounded-full status-indicator`} />
        </div>

        {/* Advanced Peek-through Previews */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800 ${
          theme === 'anime' ? 'anime-silhouette' : 
          theme === 'cinema' ? 'cinema-preview' : 
          'music-waveform-bg'
        }`}>
          {/* Theme-specific holographic overlays */}
          {theme === 'anime' && (
            <div className="floating-kanji">
              {['ア', 'ニ', 'メ'].map((char, i) => (
                <span 
                  key={char}
                  style={{
                    position: 'absolute',
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                    animationDelay: `${i * 2}s`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          )}
          
          {theme === 'cinema' && (
            <div className={`vintage-film-grain ${isHovered ? 'active' : ''}`} />
          )}
          
          {theme === 'music' && (
            <div className={`spectrum-visualizer ${isHovered ? 'active' : ''}`}>
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

        {/* Background Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${theme}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Enhanced Icon with Loading Simulation */}
      <div className="relative mb-6 flex justify-center">
        <div className={`w-20 h-20 ${iconClasses[theme]} transition-all duration-500 group-hover:scale-110 ${theme === 'cinema' ? '' : 'group-hover:rotate-6'}`}>
          <img 
            src={icon} 
            alt={`${theme} portal`}
            className="w-full h-full object-contain filter drop-shadow-lg"
            onError={(e) => {
              console.log(`Failed to load icon: ${icon}`);
              e.currentTarget.style.display = 'none';
              // Show fallback icon
              const fallbackIcon = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallbackIcon) fallbackIcon.style.display = 'block';
            }}
          />
          {/* Fallback Lucide Icon */}
          <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
            {theme === 'anime' && <Eye size={48} className={iconClasses[theme]} />}
            {theme === 'cinema' && <Film size={48} className={iconClasses[theme]} />}
            {theme === 'music' && <Music size={48} className={iconClasses[theme]} />}
          </div>
          {isHovered && (
            <div className="absolute inset-0 border-2 border-current rounded-full animate-ping opacity-30" />
          )}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10">
        <h3 className={`text-2xl font-bold mb-3 text-${theme} transition-all duration-300 group-hover:scale-105 group-hover:text-${theme}-glow`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-lg group-hover:text-foreground transition-colors duration-300 mb-4">
          {description}
        </p>
        
        {/* Status Message Preview */}
        <div className={`text-sm text-${theme} opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0`}>
          {statusMessages[theme]}
        </div>
      </div>

      {/* Enhanced Cinematic Portal Transformations */}
      {theme === 'anime' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Kanji text overlays */}
          {['進', '入', '口', '世', '界'].map((kanji, i) => (
            <div
              key={kanji}
              className="kanji-overlay absolute text-4xl font-bold"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              {kanji}
            </div>
          ))}
          
          {/* Manga grid overlay */}
          <div className="manga-grid absolute inset-0 opacity-0 group-hover:opacity-100" />
          
          {/* Sakura particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="sakura-particle absolute w-2 h-2 bg-anime rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            />
          ))}
          
          {/* Enhanced corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-anime opacity-80 transition-all duration-300 group-hover:border-anime-glow" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-anime opacity-80 transition-all duration-300 group-hover:border-anime-glow" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-anime opacity-80 transition-all duration-300 group-hover:border-anime-glow" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-anime opacity-80 transition-all duration-300 group-hover:border-anime-glow" />
        </div>
      )}

      {/* Double-click Sakura Explosion */}
      {doubleClicked && (
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

      {theme === 'cinema' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Film reel unrolling effect */}
          <div className="film-strip absolute top-1/2 left-0 right-0 h-8 transform -translate-y-1/2" />
          
          {/* Enhanced lens flare sweep */}
          <div className="lens-flare-sweep absolute inset-0" />
          
          {/* Film strip borders */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-cinema opacity-40">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-4 bg-background opacity-60"
                style={{ top: `${i * 12.5}%` }}
              />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-cinema opacity-40">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-4 bg-background opacity-60"
                style={{ top: `${i * 12.5}%` }}
              />
            ))}
          </div>
          
          {/* Projected light effect */}
          <div className="absolute inset-0 bg-gradient-radial from-cinema/15 via-transparent to-transparent opacity-80" />
        </div>
      )}

      {/* Long hover Easter Egg - Clapperboard */}
      {theme === 'cinema' && longHover && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="clapperboard-effect px-6 py-3 rounded-lg text-lg font-bold">
            DIRECTOR'S CUT
          </div>
        </div>
      )}

      {theme === 'music' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Equalizer explosion effect */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end space-x-1 p-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="equalizer-overflow w-1 bg-music rounded-full"
                style={{
                  height: `${15 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`
                }}
              />
            ))}
          </div>
          
          {/* Equalizer spelling effect */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {'MELOPICK'.split('').map((letter, i) => (
              <div
                key={i}
                className="w-1 bg-music rounded-full equalizer-bar"
                style={{
                  height: `${20 + (letter.charCodeAt(0) % 20)}px`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          
          {/* Enhanced sound wave rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-music rounded-full opacity-15 animate-ping"
                style={{
                  width: `${40 + i * 30}px`,
                  height: `${40 + i * 30}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2.5s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Hover Ripple Effect with 3D depth */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl border-2 border-${theme} animate-ping opacity-20`} />
          <div className={`absolute inset-0 rounded-2xl border border-${theme}-glow opacity-40 animate-pulse`} />
          {/* 3D depth shadow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-black/20 opacity-60" />
        </div>
      )}

      {/* Enhanced Depth shadow effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-black/30 opacity-0 ${isMobile ? 'group-active:opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500 pointer-events-none`} />
      
      {/* Mobile Touch Ripples */}
      {isMobile && touchRipples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none mobile-touch-ripple"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            '--theme-color': theme === 'anime' ? 'var(--anime-crimson)' : 
                            theme === 'cinema' ? 'var(--cinema-gold)' : 
                            'var(--music-neon)'
          } as React.CSSProperties}
        />
      ))}
      
      {/* Mobile Haptic Feedback Visual */}
      {isMobile && mobileClicked && (
        <div className={`absolute inset-0 rounded-2xl border-2 border-${theme} mobile-click-feedback pointer-events-none`} />
      )}
      </div>
    </div>
  );
};

export default PortalCard;