import React from 'react';

const SocialBadges = () => {
  return (
    <section className="min-h-[40vh] flex items-center justify-center px-4 py-16">
      <div className="animate-smooth-bounce">
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          {/* Peerlist Badge */}
          <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a 
              href="https://peerlist.io/personal_dev/project/pick-me-a" 
              target="_blank" 
              rel="noreferrer"
              className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJHP6L86K6DDM88MIRR866DKOAJNP?showUpvote=true&theme=dark"
                alt="Pick Me A on Peerlist"
                className="w-auto h-[72px] block"
              />
            </a>
          </div>

          {/* Product Hunt Badge */}
          <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="https://www.producthunt.com/products/pick-me-a?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-pick%E2%80%91me%E2%80%91a" 
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1011161&theme=dark&t=1756707053692" 
                alt="Pick Me A - Discover your next favorite entertainment | Product Hunt" 
                className="w-[250px] h-[54px] block"
                width="250" 
                height="54" 
              />
            </a>
          </div>

          {/* Buy Me a Coffee Badge */}
          <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a 
              href="https://www.buymeacoffee.com/Dinesh_xo"
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Dinesh_xo&button_colour=000000&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" 
                alt="Buy me a coffee"
                className="block"
              />
            </a>
          </div>

          {/* Subtle scroll indicator */}
          <div className="mt-8 animate-pulse">
            <div className="w-1 h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialBadges;