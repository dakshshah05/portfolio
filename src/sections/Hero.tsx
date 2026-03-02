import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTextScramble } from '../hooks/useTextScramble';

const BOOT_LINES = [
  { text: '> INITIALIZING DAKSH_OS v2.6...', delay: 0 },
  { text: '> LOADING PLANIGO CORE MODULES...', delay: 400 },
  { text: '> CONNECTING TO CHRIST UNIVERSITY NETWORK...', delay: 800 },
  { text: '> COMPILING FULL-STACK RUNTIME...', delay: 1200 },
  { text: '> SYSTEM READY. ALL MODULES ONLINE.', delay: 1600 },
];

const STATS = [
  { label: 'LEADERSHIP', value: 95, color: '#ff4500' },
  { label: 'ENGINEERING', value: 92, color: '#00f5ff' },
  { label: 'DESIGN', value: 88, color: '#ff00ff' },
  { label: 'INNOVATION', value: 97, color: '#00ff88' },
];

const FLOATING_DATA = [
  '0xDKS::INIT', 'PLANIGO: ACTIVE', 'FPS: 60/60', 'STACK: FULL',
  'AI/ML::LOADED', 'PING: 4ms', 'REPOS: 15+', 'STATUS: COO',
];

const ASCII_ART = `
 ██████╗  █████╗ ██╗  ██╗███████╗██╗  ██╗
 ██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██║  ██║
 ██║  ██║███████║█████╔╝ ███████╗███████║
 ██║  ██║██╔══██║██╔═██╗ ╚════██║██╔══██║
 ██████╔╝██║  ██║██║  ██╗███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`;

// Sound visualizer bars (purely visual, no audio)
function SoundBars() {
  return (
    <div className="flex items-end gap-[2px] h-8 opacity-40">
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="w-[2px] bg-[var(--color-neon)] rounded-full"
          style={{
            height: `${Math.random() * 100}%`,
            animation: `soundbar ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scramble } = useTextScramble();

  // Boot sequence
  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, text]);
        if (delay === BOOT_LINES[BOOT_LINES.length - 1].delay) {
          setTimeout(() => setBootDone(true), 600);
        }
      }, delay + 1500);
    });
  }, []);

  // Animate after boot
  useEffect(() => {
    if (!bootDone) return;

    // Scramble the name text
    if (nameRef.current) {
      scramble(nameRef.current, 'DAKSH KUMAR SHAH', { duration: 1800 });
    }

    const tl = gsap.timeline({ delay: 0.3 });

    if (nameRef.current) {
      tl.fromTo(nameRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out' }
      );
    }

    if (asciiRef.current) {
      tl.fromTo(asciiRef.current,
        { opacity: 0 },
        { opacity: 0.15, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (statsRef.current) {
      const bars = statsRef.current.querySelectorAll('.stat-fill');
      const values = statsRef.current.querySelectorAll('.stat-value');

      tl.fromTo(statsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      );

      bars.forEach((bar, i) => {
        tl.fromTo(bar,
          { width: '0%' },
          { width: `${STATS[i].value}%`, duration: 1.2, ease: 'power4.out' },
          '-=1'
        );
      });

      values.forEach((val, i) => {
        tl.fromTo(val,
          { innerText: '0' },
          { innerText: STATS[i].value, duration: 1.2, snap: { innerText: 1 }, ease: 'power4.out' },
          '-=1.2'
        );
      });
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.5'
      );
    }
  }, [bootDone, scramble]);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Animated perspective grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-neon) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: `perspective(400px) rotateX(60deg) translateY(${mousePos.y * -30}px)`,
          transformOrigin: 'center top',
        }}
      />

      {/* Floating data fragments - parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_DATA.map((text, i) => (
          <div
            key={i}
            className="absolute border border-white/[0.03] text-[7px] font-mono text-gray-800 px-2 py-1 backdrop-blur-[1px] rounded-sm"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              transform: `translate(${mousePos.x * (8 + i * 6)}px, ${mousePos.y * (8 + i * 6)}px)`,
              transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
              animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* ASCII Art Background */}
      <pre
        ref={asciiRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[6px] md:text-[8px] text-[var(--color-neon)] opacity-0 pointer-events-none leading-tight select-none whitespace-pre hidden md:block"
      >
        {ASCII_ART}
      </pre>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* Left Column */}
        <div>
          {/* Terminal boot lines */}
          <div className="mb-8 font-mono text-[10px] md:text-xs max-w-lg">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className={`leading-[1.8] transition-colors ${
                  line.includes('READY') ? 'text-[var(--color-green)]' : 'text-gray-600'
                }`}
                style={{ animation: 'decode 0.3s ease-out forwards', animationDelay: `${i * 0.1}s` }}
              >
                {line}
              </div>
            ))}
            {bootLines.length > 0 && !bootDone && (
              <span className="inline-block w-2.5 h-4 bg-[var(--color-neon)] ml-1" style={{ animation: 'blink-caret 0.7s infinite' }} />
            )}
          </div>

          {/* System Architect label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[var(--color-neon)]" />
            <span className="text-[var(--color-neon)] font-mono tracking-[0.5em] text-[9px] uppercase">Full.Stack.Developer</span>
          </div>

          {/* Name - glitch + scramble */}
          <h1
            ref={nameRef}
            className="relative text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-white uppercase leading-[0.85] tracking-tight mb-6 glitch-text"
            data-text="DAKSH KUMAR SHAH"
            style={{ opacity: 0 }}
          >
            DAKSH KUMAR SHAH
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 font-body text-sm md:text-base max-w-md leading-relaxed mb-4">
            BCA @ Christ University • COO @ Planigo • Building scalable full-stack solutions & exploring AI/ML frontiers.
          </p>

          {/* Sound Visualizer */}
          <div className="mb-8">
            <SoundBars />
          </div>

          {/* CTA + scroll indicator */}
          <div ref={ctaRef} className="flex items-center gap-8" style={{ opacity: 0 }}>
            <button
              onClick={() => document.querySelectorAll('section')[1]?.scrollIntoView({ behavior: 'smooth' })}
              className="interactive group relative px-10 py-4 font-heading text-[10px] uppercase tracking-[0.3em] font-bold border border-[var(--color-neon)]/20 overflow-hidden transition-all duration-500 hover:border-[var(--color-neon)] hover:shadow-[0_0_40px_rgba(0,245,255,0.15)]"
            >
              <span className="relative z-10 text-[var(--color-neon)] group-hover:text-[#0a0a0f] transition-colors duration-300">
                Initialize
              </span>
              <div className="absolute inset-0 bg-[var(--color-neon)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>

            <div className="hidden md:flex flex-col items-center gap-2 text-gray-700">
              <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-gray-700" />
              <span className="text-[8px] font-mono tracking-widest animate-pulse">SCROLL</span>
            </div>
          </div>
        </div>

        {/* Right Column - Stats Panel */}
        <div ref={statsRef} style={{ opacity: 0 }}>
          <div className="glass-panel p-8 relative overflow-hidden">
            {/* Gradient top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-neon)] via-[var(--color-purple)] to-[var(--color-magenta)]" />

            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <div className="text-[9px] font-mono tracking-[0.3em] text-gray-600 uppercase">Performance Matrix</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_4px_var(--color-green)]" />
                <span className="text-[8px] text-gray-600 font-mono">LIVE</span>
              </div>
            </div>

            {/* Stat Bars */}
            <div className="space-y-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: stat.color, boxShadow: `0 0 6px ${stat.color}` }} />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-gray-400">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="stat-value font-mono text-sm font-bold tabular-nums" style={{ color: stat.color }}>0</span>
                      <span className="text-gray-700 text-[9px] font-mono">/100</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[#0d0d14] rounded-sm overflow-hidden border border-white/[0.03]">
                    <div
                      className="stat-fill h-full rounded-sm relative"
                      style={{ backgroundColor: stat.color, boxShadow: `0 0 12px ${stat.color}40`, width: '0%' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      {/* Animated shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ animation: 'shimmer 2s infinite', transform: 'translateX(-100%)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom metadata */}
            <div className="mt-8 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
              <div>
                <div className="text-[7px] font-mono text-gray-700 tracking-widest">ID</div>
                <div className="text-[9px] font-mono text-gray-500">DKS-05</div>
              </div>
              <div>
                <div className="text-[7px] font-mono text-gray-700 tracking-widest">CLASS</div>
                <div className="text-[9px] font-mono text-gray-500">COO / DEV</div>
              </div>
              <div>
                <div className="text-[7px] font-mono text-gray-700 tracking-widest">STATUS</div>
                <div className="text-[9px] font-mono text-[var(--color-green)]">ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
