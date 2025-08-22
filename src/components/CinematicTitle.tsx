import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const CinematicTitle = () => {
  const isMobile = useIsMobile();
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showFlare, setShowFlare] = useState(false);

  useEffect(() => {
    // Cinematic entrance sequence
    const timer1 = setTimeout(() => setShowTitle(true), 500);
    const timer2 = setTimeout(() => setShowFlare(true), 2000);
    const timer3 = setTimeout(() => setShowSubtitle(true), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen text-center ${isMobile ? 'px-6' : 'px-4'}`}>
      {/* Main Title */}
      <div className={`relative ${isMobile ? 'mb-6' : 'mb-8'}`}>
        <h1 className={`${isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl md:text-8xl lg:text-9xl'} font-bold tracking-wider transition-all duration-1000 ${
          showTitle ? 'opacity-100 fade-in-cinematic' : 'opacity-0'
        } ${isMobile ? 'mobile-title-breathe' : ''}`}>
          <span className="title-pick">Pick</span>
          <span className="mx-4 title-me">Me</span>
          <span className="title-a">A</span>
        </h1>
        
        {/* Lens Flare Effect */}
        {showFlare && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="lens-flare-effect h-full w-2 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>
        )}
      </div>

      {/* Subtitle */}
      <div className={`transition-all duration-1000 delay-500 ${
        showSubtitle ? 'opacity-100 fade-in-cinematic' : 'opacity-0'
      }`}>
        <p className={`${isMobile ? 'text-lg sm:text-xl' : 'text-xl md:text-2xl lg:text-3xl'} text-muted-foreground ${isMobile ? 'max-w-sm' : 'max-w-4xl'} leading-relaxed ${isMobile ? 'mobile-subtitle-glow' : ''}`}>
          Discover your next favorite anime, movie, or song — all in one place.
        </p>
      </div>
    </div>
  );
};

export default CinematicTitle;