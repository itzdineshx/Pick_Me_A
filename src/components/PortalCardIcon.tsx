import { Eye, Film, Music } from 'lucide-react';

interface PortalCardIconProps {
  icon: string;
  theme: 'anime' | 'cinema' | 'music';
  isHovered: boolean;
}

const PortalCardIcon = ({ icon, theme, isHovered }: PortalCardIconProps) => {
  const iconClasses = {
    anime: 'text-anime',
    cinema: 'text-cinema',
    music: 'text-music'
  };

  return (
    <div className="relative mb-8 flex justify-center">
      <div className="relative group">
        {/* Glow effect background */}
        <div className={`absolute inset-0 rounded-full bg-${theme}/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700`} />
        
        {/* Icon container with enhanced styling */}
        <div className={`relative w-24 h-24 ${iconClasses[theme]} transition-all duration-500 
          ${isHovered ? 'scale-110 drop-shadow-2xl' : 'scale-100'} 
          ${theme === 'cinema' ? '' : isHovered ? 'rotate-6' : ''}`}>
          
          {/* Main icon */}
          <img 
            src={icon} 
            alt={`${theme} portal`}
            className="w-full h-full object-contain filter drop-shadow-lg transition-all duration-500"
            onError={(e) => {
              console.log(`Failed to load icon: ${icon}`);
              e.currentTarget.style.display = 'none';
              const fallbackIcon = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallbackIcon) fallbackIcon.style.display = 'flex';
            }}
          />
          
          {/* Fallback Lucide Icon */}
          <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
            {theme === 'anime' && <Eye size={64} className={iconClasses[theme]} />}
            {theme === 'cinema' && <Film size={64} className={iconClasses[theme]} />}
            {theme === 'music' && <Music size={64} className={iconClasses[theme]} />}
          </div>
          
          {/* Animated border ring */}
          {isHovered && (
            <>
              <div className={`absolute inset-0 border-2 border-${theme} rounded-full opacity-30 transition-opacity duration-300`} />
              <div className={`absolute inset-0 border border-${theme}/60 rounded-full opacity-60 transition-opacity duration-300`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalCardIcon;