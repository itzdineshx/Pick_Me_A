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
    const timer2 = setTimeout(() => setShowFlare(true), 1000);
    const timer3 = setTimeout(() => setShowSubtitle(true), 1500);
    
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

      {/* Subtitle Section */}
      <div
        className={`transition-all duration-1000 delay-500 ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p
          className={`
            ${isMobile ? "text-lg sm:text-xl" : "text-2xl md:text-3xl lg:text-4xl"} 
            text-muted-foreground 
            text-center font-semibold 
            tracking-wider leading-snug 
            ${isMobile ? "mobile-subtitle-glow" : "drop-shadow-md"}
          `}
        >
          🎬 ANIME • 🎥 MOVIE • 🎵 SONG
        </p>
      </div>
      <br></br>
      <div
        className={`transition-all duration-1000 delay-700 ${
          showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p
          className={`
            ${isMobile ? "text-sm sm:text-base" : "text-lg md:text-xl lg:text-xl"} 
            text-muted-foreground 
            text-center mt-3 
            font-light tracking-normal leading-relaxed
            ${isMobile ? "mobile-subtitle-glow" : "drop-shadow"}
          `}
        >
          Developed by{" "}
          <a
            href="https://itzdineshx.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="signature-glow"
          >
            DINESH S
          </a>
          {" "}• No repeats in your session
        </p>
        
        {/* Social Badges */}
        <div className="flex items-center justify-center mt-6">
          {/* Desktop: All badges */}
          {!isMobile && (
            <div className="flex flex-wrap gap-4">
              {/* Peerlist Badge */}
              <div>
                <a 
                  href="https://peerlist.io/personal_dev/project/pick-me-a" 
                  target="_blank" 
                  rel="noreferrer"
                  className="transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-xl inline-block"
                >
                  <img
                    src="https://peerlist.io/api/v1/projects/embed/PRJHP6L86K6DDM88MIRR866DKOAJNP?showUpvote=true&theme=dark"
                    alt="Pick Me A on Peerlist"
                    className="h-16 w-auto block"
                  />
                </a>
              </div>

              {/* Product Hunt Badge */}
              <div>
                <a 
                  href="https://www.producthunt.com/products/pick-me-a?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-pick%E2%80%91me%E2%80%91a" 
                  target="_blank"
                  rel="noreferrer"
                  className="transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-xl inline-block"
                >
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1011161&theme=dark&t=1756707053692" 
                    alt="Pick Me A - Discover your next favorite entertainment | Product Hunt" 
                    className="h-16 w-auto block"
                  />
                </a>
              </div>

              {/* Buy Me a Coffee Badge */}
              <a 
                href="https://www.buymeacoffee.com/Dinesh_xo"
                target="_blank"
                rel="noreferrer"
                className="transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
              >
                <img 
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Dinesh_xo&button_colour=171717&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" 
                  alt="Buy me a coffee"
                  className="h-16 w-auto block"
                />
              </a>
            </div>
          )}

          {/* Mobile: Only Buy Me a Coffee Badge */}
          {isMobile && (
            <a 
              href="https://www.buymeacoffee.com/Dinesh_xo"
              target="_blank"
              rel="noreferrer"
              className="transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
            >
              <img 
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Dinesh_xo&button_colour=000000&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" 
                alt="Buy me a coffee"
                className="h-12 w-auto block"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinematicTitle;