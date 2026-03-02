import { useEffect, useState, useCallback } from 'react';
import { triggerAchievement } from './AchievementSystem';

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [showKonamiOverlay, setShowKonamiOverlay] = useState(false);

  const handleKonamiKey = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase() === KONAMI_SEQUENCE[konamiIndex].toLowerCase()
      ? konamiIndex + 1
      : e.key.toLowerCase() === KONAMI_SEQUENCE[0].toLowerCase()
        ? 1
        : 0;

    setKonamiIndex(key);

    if (key === KONAMI_SEQUENCE.length && !konamiActivated) {
      setKonamiActivated(true);
      setShowKonamiOverlay(true);
      triggerAchievement('konami');

      // Screen shake effect
      document.body.style.animation = 'screen-shake 0.5s ease-in-out';
      setTimeout(() => { document.body.style.animation = ''; }, 500);

      // Auto-hide after 4 seconds
      setTimeout(() => setShowKonamiOverlay(false), 4000);
    }
  }, [konamiIndex, konamiActivated]);

  useEffect(() => {
    window.addEventListener('keydown', handleKonamiKey);
    return () => window.removeEventListener('keydown', handleKonamiKey);
  }, [handleKonamiKey]);

  return (
    <>
      {/* Konami Code Overlay */}
      {showKonamiOverlay && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
          style={{ animation: 'color-invert 0.3s ease-out' }}
        >
          {/* Glitch background */}
          <div className="absolute inset-0 bg-black/80" />

          {/* CRT scan lines intense */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.3) 2px, rgba(0,255,0,0.3) 4px)',
            }}
          />

          {/* Main content */}
          <div className="relative text-center" style={{ animation: 'screen-shake 0.3s ease-out' }}>
            {/* Big glitch text */}
            <div
              className="text-6xl md:text-8xl font-heading font-black text-[#00ff00] uppercase tracking-wider mb-4"
              style={{
                textShadow: '3px 0 #ff0000, -3px 0 #0000ff, 0 0 40px #00ff00',
                animation: 'glitch 0.3s infinite',
              }}
            >
              CHEAT CODE
            </div>
            <div
              className="text-4xl md:text-6xl font-heading font-black text-[#00ff00] uppercase tracking-wider mb-8"
              style={{
                textShadow: '2px 0 #ff0000, -2px 0 #0000ff, 0 0 20px #00ff00',
                animation: 'glitch 0.5s infinite reverse',
              }}
            >
              ACTIVATED
            </div>

            {/* XP burst */}
            <div className="space-y-2">
              <div className="font-mono text-xl text-yellow-400 font-bold" style={{ textShadow: '0 0 10px rgba(234,179,8,0.8)' }}>
                +999 XP
              </div>
              <div className="font-mono text-sm text-[#00ff00]/60 tracking-widest">
                ↑↑↓↓←→←→BA
              </div>
              <div className="font-mono text-xs text-gray-400 mt-4">
                You found the ultimate secret!
              </div>
            </div>
          </div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff00] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${1 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 0.5}s`,
                boxShadow: '0 0 6px #00ff00',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
