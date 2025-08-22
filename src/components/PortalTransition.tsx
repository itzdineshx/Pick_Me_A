import { useEffect, useState } from 'react';

interface PortalTransitionProps {
  theme: 'anime' | 'cinema' | 'music';
  isActive: boolean;
  onComplete: () => void;
}

const PortalTransition = ({ theme, isActive, onComplete }: PortalTransitionProps) => {
  const [phase, setPhase] = useState<'impact' | 'explosion' | 'warp'>('impact');

  useEffect(() => {
    if (isActive) {
      // Super fast sequence
      const explosionTimer = setTimeout(() => setPhase('explosion'), 200);
      const warpTimer = setTimeout(() => setPhase('warp'), 500);
      const completeTimer = setTimeout(() => {
        onComplete();
        setPhase('impact');
      }, 800);
      
      return () => {
        clearTimeout(explosionTimer);
        clearTimeout(warpTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const themeEffects = {
    anime: (
      <div className="absolute inset-0">
        {/* Lightning crack effect */}
        <div className={`absolute inset-0 transition-all duration-200 ${
          phase === 'impact' ? 'opacity-0 scale-0' :
          phase === 'explosion' ? 'opacity-100 scale-100' :
          'opacity-0 scale-150'
        }`}>
          {/* Electric bolts */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 bg-anime shadow-lg shadow-anime animate-lightning ${
                phase === 'explosion' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                height: '100vh',
                left: `${10 + i * 11}%`,
                transform: `rotate(${-15 + Math.random() * 30}deg)`,
                animationDelay: `${i * 30}ms`
              }}
            />
          ))}
          
          {/* Energy shockwave */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`border-4 border-anime rounded-full animate-shockwave ${
              phase === 'explosion' ? 'opacity-80' : 'opacity-0'
            }`} style={{ width: '50px', height: '50px' }} />
          </div>
        </div>

        {/* Anime symbols burst */}
        {['⚡', '💥', '✨', '🔥', '💫', '⭐'].map((symbol, i) => (
          <div
            key={i}
            className={`absolute text-6xl transition-all duration-300 ${
              phase === 'explosion' ? 'animate-symbol-blast opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 50}ms`
            }}
          >
            {symbol}
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-anime text-4xl font-black transition-all duration-250 ${
            phase === 'impact' ? 'opacity-0 scale-0' :
            phase === 'explosion' ? 'opacity-100 scale-100 animate-power-glow' :
            'opacity-0 scale-200'
          }`}>
            POWER UP!
          </div>
        </div>
      </div>
    ),

    cinema: (
      <div className="absolute inset-0 bg-black">
        {/* Camera flash burst */}
        <div className={`absolute inset-0 bg-white transition-opacity duration-100 ${
          phase === 'impact' ? 'opacity-0' :
          phase === 'explosion' ? 'opacity-90' :
          'opacity-0'
        }`} />

        {/* Film strip explosion */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          phase === 'explosion' ? 'animate-film-explode opacity-100' : 'opacity-0'
        }`}>
          {/* Diagonal film strips */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-16 bg-cinema opacity-80 animate-strip-fly"
              style={{
                top: `${i * 15}%`,
                transform: `rotate(${-20 + i * 8}deg)`,
                animationDelay: `${i * 40}ms`
              }}
            >
              {/* Film holes */}
              <div className="flex h-full items-center justify-around">
                {[...Array(20)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-black rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight burst */}
        <div className={`absolute inset-0 bg-gradient-radial from-cinema/60 to-transparent animate-spotlight-burst ${
          phase === 'explosion' ? 'opacity-100' : 'opacity-0'
        }`} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-cinema text-4xl font-black transition-all duration-200 ${
            phase === 'impact' ? 'opacity-0 rotate-12' :
            phase === 'explosion' ? 'opacity-100 rotate-0 animate-neon-flicker' :
            'opacity-0 -rotate-12'
          }`}>
            LIGHTS! CAMERA!
          </div>
        </div>
      </div>
    ),

    music: (
      <div className="absolute inset-0">
        {/* Sound boom visual */}
        <div className={`absolute inset-0 transition-all duration-200 ${
          phase === 'impact' ? 'scale-0 opacity-0' :
          phase === 'explosion' ? 'scale-100 opacity-100' :
          'scale-300 opacity-0'
        }`}>
          {/* Circular sound waves */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute border-4 border-music rounded-full animate-sound-boom ${
                phase === 'explosion' ? 'opacity-70' : 'opacity-0'
              }`}
              style={{
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${-50 - i * 40}px`,
                marginTop: `${-50 - i * 40}px`,
                animationDelay: `${i * 60}ms`
              }}
            />
          ))}
        </div>

        {/* Bass drop visualization */}
        <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center space-x-1">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`w-3 bg-music rounded-t transition-all duration-200 ${
                phase === 'explosion' ? 'animate-bass-drop opacity-100' : 'opacity-0 h-0'
              }`}
              style={{
                height: `${20 + Math.random() * 80}px`,
                animationDelay: `${i * 20}ms`
              }}
            />
          ))}
        </div>

        {/* Musical explosion */}
        {['🎵', '🎶', '🎤', '🎧', '🔊', '🎸', '🥁', '🎹'].map((note, i) => (
          <div
            key={i}
            className={`absolute text-5xl transition-all duration-300 ${
              phase === 'explosion' ? 'animate-note-explosion opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 40}ms`
            }}
          >
            {note}
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-music text-4xl font-black transition-all duration-200 ${
            phase === 'impact' ? 'opacity-0 scale-0' :
            phase === 'explosion' ? 'opacity-100 scale-100 animate-bass-pulse' :
            'opacity-0 scale-150'
          }`}>
            BASS DROP!
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      {/* Screen crack overlay */}
      <div className={`fixed inset-0 z-40 pointer-events-none ${
        phase === 'impact' ? 'animate-screen-crack' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent" />
        {/* Crack lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 animate-crack-spread"
            style={{
              width: '2px',
              height: '100vh',
              left: `${20 + i * 15}%`,
              transform: `rotate(${-10 + Math.random() * 20}deg)`,
              animationDelay: `${i * 30}ms`
            }}
          />
        ))}
      </div>

      {/* Main effect overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-200 ${
        theme === 'anime' ? 'bg-gradient-radial from-purple-500/80 via-indigo-600/60 to-black/90' :
        theme === 'cinema' ? 'bg-gradient-radial from-amber-500/80 via-red-600/60 to-black/90' :
        'bg-gradient-radial from-emerald-500/80 via-teal-600/60 to-black/90'
      } ${
        phase === 'impact' ? 'opacity-0' : 'opacity-100'
      }`}>
        {themeEffects[theme]}
      </div>

      {/* Warp exit effect */}
      <div className={`fixed inset-0 z-60 pointer-events-none ${
        phase === 'warp' ? 'animate-dimension-warp opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-white animate-warp-flash" />
        <div className="absolute inset-0 bg-gradient-conic from-transparent via-white/50 to-transparent animate-spin-warp" />
      </div>

      <style jsx>{`
        @keyframes lightning {
          0%, 100% { opacity: 0; transform: scaleY(0); }
          10% { opacity: 1; transform: scaleY(1); }
          20% { opacity: 0; transform: scaleY(0); }
          30% { opacity: 1; transform: scaleY(1); }
          40% { opacity: 0; transform: scaleY(0); }
        }
        @keyframes shockwave {
          0% { width: 50px; height: 50px; opacity: 1; }
          100% { width: 500px; height: 500px; opacity: 0; }
        }
        @keyframes symbol-blast {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.5) rotate(360deg); opacity: 0; }
        }
        @keyframes power-glow {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { text-shadow: 0 0 30px currentColor, 0 0 50px currentColor; }
        }
        @keyframes film-explode {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(2) rotate(10deg); }
        }
        @keyframes strip-fly {
          0% { transform: translateX(0) rotate(var(--rotation, 0deg)); }
          100% { transform: translateX(100vw) rotate(calc(var(--rotation, 0deg) + 180deg)); }
        }
        @keyframes spotlight-burst {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes neon-flicker {
          0%, 100% { text-shadow: 0 0 5px currentColor; }
          25% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
          50% { text-shadow: 0 0 5px currentColor; }
          75% { text-shadow: 0 0 25px currentColor, 0 0 35px currentColor; }
        }
        @keyframes sound-boom {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes bass-drop {
          0% { height: 0; transform: scaleY(0); }
          30% { height: 120px; transform: scaleY(1.5); }
           100% { height: var(--final-height); transform: scaleY(1); }
        }
        @keyframes note-explosion {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          30% { transform: scale(2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.3) rotate(360deg); opacity: 0; }
        }
        @keyframes bass-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.5); }
        }
        @keyframes screen-crack {
          0% { opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes crack-spread {
          0% { height: 0; opacity: 0; }
          50% { height: 100vh; opacity: 1; }
          100% { height: 100vh; opacity: 0; }
        }
        @keyframes dimension-warp {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(50); opacity: 0; }
        }
        @keyframes warp-flash {
          0%, 90% { opacity: 0; }
          95% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes spin-warp {
          from { transform: rotate(0deg); }
          to { transform: rotate(1440deg); }
        }

        .animate-lightning { animation: lightning 0.4s ease-out; }
        .animate-shockwave { animation: shockwave 0.6s ease-out; }
        .animate-symbol-blast { animation: symbol-blast 0.5s ease-out; }
        .animate-power-glow { animation: power-glow 0.3s infinite; }
        .animate-film-explode { animation: film-explode 0.4s ease-out; }
        .animate-strip-fly { animation: strip-fly 0.6s ease-out; }
        .animate-spotlight-burst { animation: spotlight-burst 0.5s ease-out; }
        .animate-neon-flicker { animation: neon-flicker 0.2s infinite; }
        .animate-sound-boom { animation: sound-boom 0.7s ease-out; }
        .animate-bass-drop { animation: bass-drop 0.4s ease-out; }
        .animate-note-explosion { animation: note-explosion 0.6s ease-out; }
        .animate-bass-pulse { animation: bass-pulse 0.25s infinite; }
        .animate-screen-crack { animation: screen-crack 0.2s ease-out; }
        .animate-crack-spread { animation: crack-spread 0.3s ease-out; }
        .animate-dimension-warp { animation: dimension-warp 0.3s ease-in; }
        .animate-warp-flash { animation: warp-flash 0.3s ease-out; }
        .animate-spin-warp { animation: spin-warp 0.3s ease-in; }

        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
        .bg-gradient-conic { background: conic-gradient(var(--tw-gradient-stops)); }
      `}</style>
    </>
  );
};

export default PortalTransition;