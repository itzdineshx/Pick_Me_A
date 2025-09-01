import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import CinematicTitle from '../components/CinematicTitle';
import Enhanced3DPortalCard from '../components/Enhanced3DPortalCard';
import SimpleBackground from '../components/SimpleBackground';
import PortalTransition from '../components/PortalTransition';
import EnhancedPortalTransition from '../components/EnhancedPortalTransition';
import SimpleCursorEffects from '../components/SimpleCursorEffects';
import GitHubStarBadge from '../components/GitHubStarBadge';

import sugoiPickLogo from '../assets/sugoipick-logo1.png';
import cinePickLogo from '../assets/cinepick-logo2.png';
import meloPickLogo from '../assets/melopick-logo2.png';

const Index = () => {
  const isMobile = useIsMobile();
  const [showCards, setShowCards] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'anime' | 'cinema' | 'music' | null>(null);
  const [transitionTheme, setTransitionTheme] = useState<'anime' | 'cinema' | 'music' | null>(null);

  useEffect(() => {
    // Show cards after cinematic entrance
    const timer = setTimeout(() => setShowCards(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handlePortalActivate = (theme: 'anime' | 'cinema' | 'music') => {
    setTransitionTheme(theme);
  };

  const handleTransitionComplete = () => {
    setTransitionTheme(null);
  };

  const portals = [
    {
      title: "Pick an Anime",
      description: "Dive into the world of anime with personalized recommendations",
      link: "https://aniepick.netlify.app/",
      icon: sugoiPickLogo,
      theme: 'anime' as const,
      hoverEffect: "subtle-glow"
    },
    {
      title: "Pick a Movie",
      description: "Find your next cinematic adventure with curated film suggestions",
      link: "https://cinempick.netlify.app/",
      icon: cinePickLogo,
      theme: 'cinema' as const,
      hoverEffect: "static-glow"
    },
    {
      title: "Pick a Music",
      description: "Explore new sounds and artists tailored to your taste",
      link: "https://melopick.netlify.app/",
      icon: meloPickLogo,
      theme: 'music' as const,
      hoverEffect: "neon-pulse"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Clean Background */}
      <SimpleBackground activeTheme={activeTheme} />
      
      {/* Simple Cursor Effects */}
      <SimpleCursorEffects activeTheme={activeTheme} />
      
      {/* GitHub Star Badge - Top-right for desktop */}
      <div className="pointer-events-auto fixed right-4 top-4 z-40 hidden sm:block">
        <GitHubStarBadge repoFullName="itzdineshx/Pick_Me_A" />
      </div>
      
      {/* GitHub Star Badge - Mobile placement: floating bottom-right */}
      <div className="sm:hidden fixed right-3 bottom-3 z-40">
        <GitHubStarBadge repoFullName="itzdineshx/Pick_Me_A" compact />
      </div>
      
      {/* Enhanced Portal Transition Overlay */}
      {transitionTheme && (
        <EnhancedPortalTransition 
          theme={transitionTheme} 
          isActive={true} 
          onComplete={handleTransitionComplete}
        />
      )}
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Cinematic Title Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <CinematicTitle />
          
          {/* Scroll Encouraging Animation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
              <div className="text-white/50 text-xs font-light tracking-wider">SCROLL</div>
            </div>
          </div>
        </section>

        {/* Enhanced Portal Cards Section */}
        <section className={`min-h-screen flex items-center justify-center px-4 py-20 ${isMobile ? 'py-12' : 'py-20'}`}>
          <div className={`transition-all duration-1000 ${
            showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div 
              className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'md:grid-cols-3 gap-12'} max-w-7xl mx-auto`}
              onMouseLeave={() => !isMobile && setActiveTheme(null)}
            >
              {portals.map((portal, index) => (
                <div
                  key={portal.title}
                  className={`fade-in-cinematic ${isMobile ? 'mobile-card-wrapper' : ''}`}
                  style={{ animationDelay: `${index * (isMobile ? 0.15 : 0.2)}s` }}
                  onMouseEnter={() => !isMobile && setActiveTheme(portal.theme)}
                  onTouchStart={() => isMobile && setActiveTheme(portal.theme)}
                  onTouchEnd={() => isMobile && setTimeout(() => setActiveTheme(null), 300)}
                >
                  <Enhanced3DPortalCard 
                    {...portal} 
                    onPortalActivate={handlePortalActivate}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
