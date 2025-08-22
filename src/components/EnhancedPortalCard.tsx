import { useState, useEffect, useRef } from 'react';
import PortalCardIcon from './PortalCardIcon';
import PortalCardEffects from './PortalCardEffects';

interface EnhancedPortalCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  theme: 'anime' | 'cinema' | 'music';
  hoverEffect: string;
  onPortalActivate: (theme: 'anime' | 'cinema' | 'music') => void;
  isMobile?: boolean;
}

const EnhancedPortalCard = ({ 
  title, 
  description, 
  link, 
  icon, 
  theme, 
  hoverEffect, 
  onPortalActivate, 
  isMobile = false 
}: EnhancedPortalCardProps) => {
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
    anime: 'border-anime hover:shadow-anime/30',
    cinema: 'border-cinema hover:shadow-cinema/30',
    music: 'border-music hover:shadow-music/30'
  };

  const statusMessages = {
    anime: 'Finding Perfect Anime...',
    cinema: 'Your next favorite film is just a click away',
    music: 'Finding Perfect Song...'
  };

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma && event.beta) {
        const maxTilt = 15;
        const x = Math.max(-maxTilt, Math.min(maxTilt, event.gamma)) / maxTilt;
        const y = Math.max(-maxTilt, Math.min(maxTilt, event.beta)) / maxTilt;
        setGyroTilt({ x: x * 10, y: y * 5 });
      }
    };

    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        });
    } else {
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
      }, 10000);
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
    
    setTimeout(() => {
      setTouchRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
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
      className={`group relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-700
        ${isMobile ? 'p-6' : 'p-8'} 
        ${themeClasses[theme]}
        ${isHovered && !isMobile ? 'scale-105 shadow-2xl' : 'shadow-lg'}
        ${isMobile ? 'mobile-portal-card' : ''} 
        ${mobileClicked ? 'mobile-portal-active' : ''}
        bg-gradient-to-br from-background/80 via-background/60 to-background/40
        backdrop-blur-xl border-2 
        hover:shadow-[0_20px_80px_rgba(0,0,0,0.3)]
        ${isDay ? 'is-day' : 'is-night'}`}
      style={{
        '--tilt-x': `${gyroTilt.x}deg`,
        '--tilt-y': `${gyroTilt.y}deg`,
        '--primary-color': theme === 'anime' ? 'var(--anime-crimson)' : 
                          theme === 'cinema' ? 'var(--cinema-gold)' : 
                          'var(--music-neon)',
        transform: isMobile ? 'none' : `perspective(1000px) rotateX(${gyroTilt.y * 0.5}deg) rotateY(${gyroTilt.x * 0.5}deg)`
      } as React.CSSProperties}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={isMobile ? handleClick : undefined}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${theme}/5 via-transparent to-${theme}/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Status indicator */}
      <div className="absolute top-6 right-6 flex items-center space-x-3">
        <div className={`w-3 h-3 bg-${theme} rounded-full shadow-lg shadow-${theme}/50 transition-all duration-300`} />
      </div>

      {/* All visual effects */}
      <PortalCardEffects 
        theme={theme}
        isHovered={isHovered}
        longHover={longHover}
        doubleClicked={doubleClicked}
      />

      {/* Icon */}
      <PortalCardIcon 
        icon={icon}
        theme={theme}
        isHovered={isHovered}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <h3 className={`text-3xl font-bold text-${theme} transition-all duration-300 
          group-hover:scale-105 group-hover:text-${theme}-glow
          bg-gradient-to-r from-${theme} to-${theme}-glow bg-clip-text text-transparent`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground 
          transition-colors duration-300">
          {description}
        </p>
        
        {/* Status Message Preview */}
        <div className={`text-sm text-${theme}/80 opacity-0 group-hover:opacity-100 
          transition-all duration-500 transform translate-y-2 group-hover:translate-y-0
          font-medium`}>
          {statusMessages[theme]}
        </div>

        {/* Call to action button */}
        <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 
          transform translate-y-4 group-hover:translate-y-0">
          <div className={`inline-flex items-center px-4 py-2 rounded-full 
            bg-${theme}/10 border border-${theme}/30 text-${theme} text-sm font-medium
            hover:bg-${theme}/20 transition-all duration-300`}>
            Explore Portal →
          </div>
        </div>
      </div>

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
        <div className={`absolute inset-0 rounded-3xl border-2 border-${theme} 
          mobile-click-feedback pointer-events-none`} />
      )}

      {/* Enhanced depth shadow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent to-black/20 
        opacity-0 ${isMobile ? 'group-active:opacity-60' : 'group-hover:opacity-60'} 
        transition-opacity duration-500 pointer-events-none`} />
    </div>
  );
};

export default EnhancedPortalCard;