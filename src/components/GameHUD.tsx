import { useEffect, useState } from 'react';
import { triggerAchievement } from './AchievementSystem';

const SECTIONS = ['BOOT', 'PROFILE', 'MATRIX', 'MISSIONS', 'HISTORY', 'TERMINAL'];

export default function GameHUD() {
  const [xp, setXp] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [fps] = useState(60);
  const [time, setTime] = useState('');
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.min(100, (scrollTop / docHeight) * 100);
      setScrollPercent(percent);
      setXp(Math.floor(percent * 42));

      const sections = document.querySelectorAll('section');
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          setActiveSection(i);
        }
      });

      // Glitch burst at 50% scroll
      if (percent >= 48 && percent <= 52 && !glitchTriggered) {
        setGlitchTriggered(true);
        setShowGlitch(true);
        triggerAchievement('glitch_witness');
        
        // Screen shake
        document.body.style.animation = 'screen-shake 0.4s ease-in-out';
        setTimeout(() => { document.body.style.animation = ''; }, 400);
        
        // Auto-hide
        setTimeout(() => setShowGlitch(false), 600);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [glitchTriggered]);

  return (
    <>
      {/* Glitch Burst Overlay */}
      {showGlitch && (
        <div className="fixed inset-0 z-[200] pointer-events-none" style={{ animation: 'color-invert 0.3s ease-out' }}>
          {/* Chromatic aberration layer */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 33%, rgba(0,255,0,0.1) 33% 66%, rgba(0,0,255,0.1) 66%)',
            mixBlendMode: 'screen',
          }} />
          {/* Screen tear lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[2px]"
              style={{
                top: `${20 + i * 15}%`,
                background: `linear-gradient(90deg, transparent, rgba(0,245,255,${0.3 + Math.random() * 0.4}), transparent)`,
                transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
              }}
            />
          ))}
          {/* Flash */}
          <div className="absolute inset-0 bg-white/5" style={{ animation: 'blink-caret 0.1s' }} />
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-[90] font-mono text-xs hidden md:block">
        {/* Top-Left: System Status + Time */}
        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse shadow-[0_0_8px_var(--color-green)]" />
            <span className="text-[var(--color-green)] tracking-[0.25em] text-[10px] uppercase" style={{ animation: 'flicker 4s infinite' }}>
              System Online
            </span>
          </div>
          <div className="text-gray-600 text-[9px] tracking-widest">{time}</div>
          <div className="text-gray-700 text-[8px] tracking-widest mt-0.5">FPS: {fps} | GPU: OK</div>
        </div>

        {/* Top-Right: XP + Level */}
        <div className="absolute top-5 right-5 text-right">
          <div className="text-gray-600 tracking-[0.3em] text-[8px] mb-1">VISITOR XP</div>
          <div className="text-[var(--color-neon)] font-bold text-base tabular-nums" style={{ textShadow: '0 0 10px rgba(0,245,255,0.4)' }}>
            {xp.toString().padStart(4, '0')}
          </div>
          <div className="flex items-center gap-1 justify-end mt-1">
            <span className="text-[8px] text-gray-600">LVL</span>
            <span className="text-[var(--color-neon)] text-xs font-bold">{Math.floor(xp / 500) + 1}</span>
            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden ml-1">
              <div className="h-full bg-[var(--color-neon)] rounded-full transition-all" style={{ width: `${(xp % 500) / 5}%`, boxShadow: '0 0 4px var(--color-neon)' }} />
            </div>
          </div>
        </div>

        {/* Bottom-Left: Section + Progress */}
        <div className="absolute bottom-5 left-5">
          <div className="text-gray-700 text-[8px] tracking-[0.3em] mb-1">SECTOR {activeSection + 1}/{SECTIONS.length}</div>
          <div className="text-[var(--color-neon)] tracking-[0.2em] text-xs mb-2">
            {SECTIONS[activeSection] || 'UNKNOWN'}
          </div>
          <div className="w-40 h-[3px] bg-white/5 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${scrollPercent}%`,
                background: 'linear-gradient(90deg, var(--color-neon), var(--color-purple))',
                boxShadow: '0 0 8px var(--color-neon)',
              }}
            />
          </div>
        </div>

        {/* Bottom-Right: Coordinates */}
        <div className="absolute bottom-5 right-5 text-right">
          <div className="text-gray-700 text-[8px] tracking-widest">
            X: {Math.floor(scrollPercent * 10)}.{Math.floor(Math.random() * 99).toString().padStart(2, '0')}
          </div>
          <div className="text-gray-700 text-[8px] tracking-widest">
            Y: {Math.floor(window.scrollY || 0)}
          </div>
          <div className="text-gray-700 text-[8px] tracking-widest">
            Z: 0.{Math.floor(activeSection * 15 + 10)}
          </div>
        </div>

        {/* Right: Vertical Nav */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {SECTIONS.map((name, i) => (
            <button
              key={name}
              className="pointer-events-auto group relative flex items-center justify-end"
              onClick={() => {
                const sections = document.querySelectorAll('section');
                sections[i]?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="absolute right-6 text-[8px] tracking-[0.2em] text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-gray-400 transition-all whitespace-nowrap translate-x-2 group-hover:translate-x-0">
                {name}
              </span>
              <div className={`transition-all duration-500 ${
                i === activeSection
                  ? 'w-6 h-[2px] bg-[var(--color-neon)] shadow-[0_0_8px_var(--color-neon)]'
                  : 'w-3 h-[2px] bg-gray-700 group-hover:bg-gray-400 group-hover:w-5'
              }`} />
            </button>
          ))}
        </div>

        {/* Left: Vertical text */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <div className="text-gray-800 text-[8px] tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
            Daksh.dev v4.2.0
          </div>
        </div>

        {/* Corner Brackets */}
        {/* Top-left */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-3 left-3 w-6 h-[1px] bg-[var(--color-neon)] opacity-20" />
          <div className="absolute top-3 left-3 w-[1px] h-6 bg-[var(--color-neon)] opacity-20" />
        </div>
        {/* Top-right */}
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-3 right-3 w-6 h-[1px] bg-[var(--color-neon)] opacity-20" />
          <div className="absolute top-3 right-3 w-[1px] h-6 bg-[var(--color-neon)] opacity-20" />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-0 left-0 w-16 h-16">
          <div className="absolute bottom-3 left-3 w-6 h-[1px] bg-[var(--color-purple)] opacity-20" />
          <div className="absolute bottom-3 left-3 w-[1px] h-6 bg-[var(--color-purple)] opacity-20" />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-0 right-0 w-16 h-16">
          <div className="absolute bottom-3 right-3 w-6 h-[1px] bg-[var(--color-purple)] opacity-20" />
          <div className="absolute bottom-3 right-3 w-[1px] h-6 bg-[var(--color-purple)] opacity-20" />
        </div>
      </div>
    </>
  );
}
