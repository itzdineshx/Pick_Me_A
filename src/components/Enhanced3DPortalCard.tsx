import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import Portal3D from './Portal3D';
import PortalCardIcon from './PortalCardIcon';

interface Enhanced3DPortalCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  theme: 'anime' | 'cinema' | 'music';
  hoverEffect: string;
  onPortalActivate: (theme: 'anime' | 'cinema' | 'music') => void;
  isMobile?: boolean;
}

const Enhanced3DPortalCard: React.FC<Enhanced3DPortalCardProps> = ({
  title,
  description,
  link,
  icon,
  theme,
  hoverEffect,
  onPortalActivate,
  isMobile = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [touchMoved, setTouchMoved] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced mobile touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scroll
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setTouchMoved(false);
    setIsHovered(true);
    
    // Long press detection for enhanced effects
    const timer = setTimeout(() => {
      setIsActive(true);
      navigator.vibrate?.(50); // Haptic feedback if available
    }, 500);
    setLongPressTimer(timer);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartPos) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);
    
    // If movement is significant, consider it a scroll/pan gesture
    if (deltaX > 10 || deltaY > 10) {
      setTouchMoved(true);
      setIsHovered(false);
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }
    }
  }, [touchStartPos, longPressTimer]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    // Only trigger action if it wasn't a scroll gesture
    if (!touchMoved && touchStartPos) {
      onPortalActivate(theme);
      
      // Add a small delay before navigation to show the activation effect
      setTimeout(() => {
        window.open(link, '_blank', 'noopener,noreferrer');
      }, 300);
    }
    
    setTouchStartPos(null);
    setTouchMoved(false);
    setIsActive(false);
    
    // Reset hover state after a delay
    setTimeout(() => setIsHovered(false), 300);
  }, [touchMoved, touchStartPos, theme, onPortalActivate, link, longPressTimer]);

  // Mouse handling for desktop
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMobile && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [isMobile]);

  const handleClick = useCallback(() => {
    if (!isMobile) {
      onPortalActivate(theme);
      setTimeout(() => {
        window.open(link, '_blank', 'noopener,noreferrer');
      }, 200);
    }
  }, [isMobile, theme, onPortalActivate, link]);

  // Prevent context menu on long press
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault();
    const element = cardRef.current;
    if (element && isMobile) {
      element.addEventListener('contextmenu', handleContextMenu);
      return () => element.removeEventListener('contextmenu', handleContextMenu);
    }
  }, [isMobile]);

  const themeStyles = {
    anime: 'bg-card/90 border-anime/20 hover:border-anime/40 hover:shadow-[0_0_30px_hsl(var(--anime-crimson)/0.3)]',
    cinema: 'bg-card/90 border-cinema/20 hover:border-cinema/40 hover:shadow-[0_0_30px_hsl(var(--cinema-gold)/0.3)]',
    music: 'bg-card/90 border-music/20 hover:border-music/40 hover:shadow-[0_0_30px_hsl(var(--music-neon)/0.3)]'
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative h-96 w-full max-w-sm mx-auto
        rounded-xl border-2 backdrop-blur-xl
        transform transition-all duration-500 ease-out
        ${themeStyles[theme]}
        ${isHovered ? 'scale-105 translate-y-2' : 'scale-100'}
        ${isActive ? 'scale-110' : ''}
        cursor-pointer overflow-hidden
        ${isMobile ? 'touch-manipulation' : ''}
      `}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation'
      }}
    >
      {/* 3D Portal Background */}
      <Portal3D 
        theme={theme} 
        isHovered={isHovered} 
        isActive={isActive}
        cursorPosition={!isMobile ? cursorPosition : undefined}
      />
      
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/10 to-card/30 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Icon Section */}
        <div className="flex justify-center">
          <div className={`
            transform transition-all duration-300
            ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}
            ${isActive ? 'scale-125 rotate-6' : ''}
          `}>
            <PortalCardIcon 
              icon={icon} 
              theme={theme} 
              isHovered={isHovered}
            />
          </div>
        </div>
        
        {/* Text Content */}
        <div className="text-center space-y-4">
          <h3 className={`
            text-2xl font-bold transition-colors duration-300
            ${theme === 'anime' ? 'text-anime' : ''}
            ${theme === 'cinema' ? 'text-cinema' : ''}
            ${theme === 'music' ? 'text-music' : ''}
            ${isHovered ? 'brightness-125' : ''}
          `}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          {/* CTA Button */}
          <div className={`
            inline-block px-6 py-2 rounded-full
            border transition-all duration-300
            ${theme === 'anime' ? 'border-anime/30 text-anime' : ''}
            ${theme === 'cinema' ? 'border-cinema/30 text-cinema' : ''}
            ${theme === 'music' ? 'border-music/30 text-music' : ''}
            ${isHovered ? 'shadow-lg scale-105' : ''}
            ${isActive ? 'scale-110' : ''}
          `}>
            {isMobile ? 'Tap to Explore' : 'Click to Enter'}
          </div>
        </div>
      </div>
      
      {/* Active state indicator for mobile */}
      {isMobile && isActive && (
        <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-xl" />
      )}
      
      {/* Touch ripple effect */}
      {isMobile && touchStartPos && !touchMoved && (
        <div 
          className={`
            absolute w-20 h-20 rounded-full pointer-events-none
            animate-ping opacity-30
            ${theme === 'anime' ? 'bg-anime' : ''}
            ${theme === 'cinema' ? 'bg-cinema' : ''}
            ${theme === 'music' ? 'bg-music' : ''}
          `}
          style={{
            left: touchStartPos.x - 40,
            top: touchStartPos.y - 40,
          }}
        />
      )}
    </div>
  );
};

export default Enhanced3DPortalCard;