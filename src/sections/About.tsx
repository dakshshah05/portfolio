import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Shield, Zap, Brain, Palette, Trophy, Star, Award, ChevronRight } from 'lucide-react';
import { triggerAchievement } from '../components/AchievementSystem';
import DakshImg from '../assets/Daksh.jpg';

gsap.registerPlugin(ScrollTrigger);

const RPG_STATS = [
  { label: 'STR', fullName: 'Strength', value: 88, desc: 'Full-Stack Development', color: '#ff4500', icon: '⚔️' },
  { label: 'INT', fullName: 'Intelligence', value: 95, desc: 'Problem Solving & AI/ML', color: '#00f5ff', icon: '🧠' },
  { label: 'DEX', fullName: 'Dexterity', value: 90, desc: 'React, Next.js & Frontend', color: '#00ff88', icon: '⚡' },
  { label: 'CHA', fullName: 'Charisma', value: 92, desc: 'Leadership & Team Management', color: '#ff00ff', icon: '✨' },
  { label: 'WIS', fullName: 'Wisdom', value: 85, desc: 'System Architecture & Design', color: '#8a2be2', icon: '🔮' },
];

const ACHIEVEMENTS = [
  { icon: <Trophy size={14} />, label: 'COO @ Planigo' },
  { icon: <Star size={14} />, label: 'SDG Award' },
  { icon: <Award size={14} />, label: 'Board Director' },
  { icon: <Shield size={14} />, label: 'Full Stack' },
  { icon: <Zap size={14} />, label: 'SPOTON Lead' },
  { icon: <Brain size={14} />, label: 'AI Pioneer' },
  { icon: <Palette size={14} />, label: 'UI Crafter' },
  { icon: <ChevronRight size={14} />, label: 'Ship Fast' },
];

// Radar/Sonar component
function RadarDisplay() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Circles */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,245,255,0.06)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,245,255,0.04)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0,245,255,0.03)" strokeWidth="0.5" />
        {/* Cross */}
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(0,245,255,0.04)" strokeWidth="0.3" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(0,245,255,0.04)" strokeWidth="0.3" />
        {/* Sweep line */}
        <line x1="50" y1="50" x2="95" y2="50" stroke="rgba(0,245,255,0.3)" strokeWidth="1"
          style={{ transformOrigin: '50px 50px', animation: 'spin 4s linear infinite' }} />
        {/* Dots representing skills */}
        <circle cx="35" cy="25" r="2" fill="#00f5ff" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="30" r="2" fill="#8a2be2" opacity="0.6">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="60" r="2" fill="#ff00ff" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="65" r="2" fill="#00ff88" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[7px] font-mono text-[var(--color-neon)] tracking-widest opacity-40">SCANNING</div>
      </div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, rotationY: -10 },
      {
        opacity: 1, y: 0, rotationY: 0,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      }
    );

    const fills = cardRef.current.querySelectorAll('.rpg-fill');
    fills.forEach((fill, i) => {
      gsap.fromTo(fill,
        { width: '0%' },
        {
          width: `${RPG_STATS[i].value}%`,
          duration: 1.5, ease: 'power4.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
          delay: i * 0.12 + 0.4,
        }
      );
    });
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) triggerAchievement('flip');
  };

  const handleAvatarClick = () => {
    const newClicks = avatarClicks + 1;
    setAvatarClicks(newClicks);
    if (newClicks >= 7 && !showSecret) {
      setShowSecret(true);
      triggerAchievement('avatar_secret');
      setTimeout(() => setShowSecret(false), 5000);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 flex items-center justify-center z-10 px-4 md:px-8">
      {/* Secret Developer Console Overlay */}
      {showSecret && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center animate-pulse" style={{ animation: 'none' }}>
          <div className="glass-panel p-8 max-w-lg w-full border border-[var(--color-green)]/30 font-mono text-xs text-[var(--color-green)]">
            <div className="mb-3 text-[var(--color-green)] text-sm font-bold tracking-widest">⚠ IDENTITY BREACH DETECTED</div>
            <div className="space-y-1 opacity-80">
              <div>{'>'} Accessing classified records...</div>
              <div>{'>'} Name: Daksh Kumar Shah</div>
              <div>{'>'} Codename: DKS-05</div>
              <div>{'>'} Affiliation: Planigo [COO]</div>
              <div>{'>'} Education: Christ University BCA</div>
              <div>{'>'} Location: Bengaluru, India</div>
              <div>{'>'} Threat Level: ████████████ MAX</div>
              <div>{'>'} Skills: FULL-STACK / AI-ML / LEADERSHIP</div>
              <div className="text-yellow-400 mt-3">{'>'} +400 XP ACHIEVEMENT UNLOCKED!</div>
              <div className="text-gray-600 mt-2">{'>'} Auto-closing in 5 seconds...</div>
            </div>
          </div>
        </div>
      )}

      {/* Section label */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-neon)]" />
          <span className="font-mono text-[9px] tracking-[0.5em] text-gray-600 uppercase">Daksh's Profile</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-neon)]" />
        </div>
      </div>

      <div ref={cardRef} className="relative w-full max-w-5xl" style={{ perspective: '1200px', opacity: 0 }}>
        <div
          className="relative transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          {/* FRONT FACE */}
          <div className="relative" style={{ backfaceVisibility: 'hidden' }}>
            <div className="glass-panel overflow-hidden relative">
              <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-neon)] via-[var(--color-purple)] to-[var(--color-magenta)]" />

              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                {/* Left: Avatar  */}
                <div className="flex flex-col items-center text-center">
                  {/* Radar */}
                  <RadarDisplay />

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-neon)]/20 to-[var(--color-purple)]/20 flex items-center justify-center border-2 border-[var(--color-neon)]/20 shadow-[0_0_30px_rgba(0,245,255,0.1)] overflow-hidden interactive"
                      onClick={handleAvatarClick}
                      title={avatarClicks > 0 && avatarClicks < 7 ? `${7 - avatarClicks} more...` : ''}
                    >
                      <img src={DakshImg} alt="Daksh Kumar Shah" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute inset-0 rounded-full border border-[var(--color-neon)]/10" style={{ animation: 'pulse-ring 3s infinite' }} />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--color-neon)] to-[var(--color-purple)] text-[#0a0a0f] text-[8px] font-mono font-bold px-3 py-0.5 rounded-full">
                      LVL 42
                    </div>
                  </div>

                  <h2 className="font-heading text-lg text-white uppercase tracking-wider mb-1">Daksh Kumar Shah</h2>
                  <div className="font-mono text-[8px] tracking-[0.3em] text-[var(--color-purple)] mb-4 uppercase">
                    Full-Stack Developer & COO
                  </div>

                  <div className="w-full h-[1px] bg-white/5 mb-4" />

                  <div className="grid grid-cols-3 gap-3 w-full">
                    {[{ v: '1+', l: 'YEARS' }, { v: '5+', l: 'PROJECTS' }, { v: '50+', l: 'COMMITS' }].map(s => (
                      <div key={s.l}>
                        <div className="text-white font-heading text-lg">{s.v}</div>
                        <div className="text-gray-700 text-[7px] font-mono tracking-widest">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleFlip}
                    className="interactive mt-5 font-mono text-[9px] text-[var(--color-neon)] tracking-widest border border-[var(--color-neon)]/15 px-4 py-2 hover:bg-[var(--color-neon)]/5 transition-all rounded group"
                  >
                    ↻ <span className="group-hover:tracking-[0.4em] transition-all">FLIP CARD</span>
                  </button>
                </div>

                {/* Right: Stats + Achievements */}
                <div>
                  {/* Stats Header */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-4 bg-[var(--color-neon)] rounded-full shadow-[0_0_6px_var(--color-neon)]" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">Attribute Matrix</span>
                  </div>

                  {/* RPG Bars with hex icons */}
                  <div className="space-y-3 mb-8">
                    {RPG_STATS.map((stat) => (
                      <div key={stat.label} className="group interactive">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-sm">{stat.icon}</span>
                          <span className="font-heading text-[10px] font-bold tracking-wider" style={{ color: stat.color }}>
                            {stat.label}
                          </span>
                          <span className="text-gray-700 text-[9px] font-mono hidden md:inline">{stat.fullName}</span>
                          <span className="ml-auto font-mono text-[10px] text-gray-500 tabular-nums">{stat.value}/100</span>
                        </div>
                        <div className="w-full h-2 bg-[#0d0d14] rounded-sm overflow-hidden border border-white/[0.03]">
                          <div
                            className="rpg-fill h-full rounded-sm relative"
                            style={{ backgroundColor: stat.color, boxShadow: `0 0 8px ${stat.color}30`, width: '0%' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          </div>
                        </div>
                        <div className="text-gray-700 text-[8px] font-mono mt-0.5 h-0 overflow-hidden group-hover:h-4 transition-all">
                          → {stat.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={12} className="text-yellow-500" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">Achievements</span>
                    <span className="font-mono text-[8px] text-yellow-500/50 ml-auto">{ACHIEVEMENTS.length}/{ACHIEVEMENTS.length}</span>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {ACHIEVEMENTS.map((ach, i) => (
                      <div
                        key={i}
                        className="interactive group/ach relative flex flex-col items-center gap-0.5 p-2 border border-white/[0.04] rounded-lg bg-white/[0.01] hover:border-yellow-500/20 hover:bg-yellow-500/[0.03] transition-all"
                      >
                        <div className="text-yellow-500/50 group-hover/ach:text-yellow-400 transition-colors">{ach.icon}</div>
                        <span className="text-[6px] font-mono text-gray-600 text-center leading-tight group-hover/ach:text-gray-400 transition-colors">
                          {ach.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE — Backstory */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="glass-panel h-full overflow-hidden">
              <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-magenta)] to-[var(--color-neon)]" />
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <Brain size={14} className="text-[var(--color-purple)]" />
                  <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">Origin Story</span>
                </div>

                <p className="text-gray-300 font-body leading-[1.9] text-sm md:text-base max-w-2xl mb-5">
                  A tech innovator pursuing BCA at Christ University, Bangalore. As the COO of Planigo, 
                  I lead teams to build scalable solutions that bridge creativity with engineering precision. 
                  My journey spans full-stack development, AI/ML exploration, and startup leadership.
                </p>
                <p className="text-gray-500 font-body leading-[1.9] text-sm max-w-2xl mb-8">
                  From developing award-winning SDG registration systems to serving on executive boards, 
                  I thrive at the intersection of technology and impact. Proficient in Python, Java, C++, React, 
                  Node.js, and Django — I don't just write code, I architect digital experiences that make a difference.
                </p>

                <button onClick={handleFlip} className="interactive font-mono text-[9px] text-[var(--color-purple)] tracking-widest border border-[var(--color-purple)]/15 px-4 py-2 hover:bg-[var(--color-purple)]/5 transition-all rounded">
                  ↻ FLIP BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
