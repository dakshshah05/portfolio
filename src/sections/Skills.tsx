import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { triggerAchievement } from '../components/AchievementSystem';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
  icon: string;
}

const SKILL_ROWS: Skill[][] = [
  [
    { id: 'python', name: 'Python', level: 90, color: '#00f5ff', icon: '🐍' },
    { id: 'java', name: 'Java', level: 85, color: '#00f5ff', icon: '☕' },
    { id: 'cpp', name: 'C++', level: 82, color: '#00f5ff', icon: '⚙️' },
    { id: 'js', name: 'JavaScript', level: 88, color: '#00f5ff', icon: '🟡' },
  ],
  [
    { id: 'react', name: 'React', level: 90, color: '#00ff88', icon: '⚛️' },
    { id: 'next', name: 'Next.js', level: 85, color: '#00ff88', icon: '▲' },
    { id: 'node', name: 'Node.js', level: 85, color: '#00ff88', icon: '🟢' },
    { id: 'express', name: 'Express.js', level: 82, color: '#00ff88', icon: '🚀' },
    { id: 'tailwind', name: 'Tailwind', level: 88, color: '#00ff88', icon: '🎨' },
  ],
  [
    { id: 'django', name: 'Django', level: 80, color: '#8a2be2', icon: '🎯' },
    { id: 'flask', name: 'Flask', level: 78, color: '#8a2be2', icon: '🧪' },
    { id: 'sql', name: 'MySQL', level: 82, color: '#8a2be2', icon: '💾' },
    { id: 'git', name: 'Git', level: 88, color: '#8a2be2', icon: '🔀' },
  ],
  [
    { id: 'numpy', name: 'NumPy', level: 75, color: '#ff00ff', icon: '📊' },
    { id: 'pandas', name: 'Pandas', level: 75, color: '#ff00ff', icon: '🐼' },
    { id: 'figma', name: 'Figma', level: 80, color: '#ff00ff', icon: '🖌️' },
    { id: 'vercel', name: 'Vercel', level: 85, color: '#ff00ff', icon: '▲' },
    { id: 'angular', name: 'Angular', level: 72, color: '#ff00ff', icon: '🅰️' },
  ],
];

function HexCell({ skill, index, rowIndex }: { skill: Skill; index: number; rowIndex: number }) {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cellRef.current) return;

    gsap.fromTo(cellRef.current,
      { opacity: 0, scale: 0, rotationY: 180 },
      {
        opacity: 1, scale: 1, rotationY: 0,
        duration: 0.7, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: cellRef.current, start: 'top 85%' },
        delay: rowIndex * 0.15 + index * 0.08,
      }
    );
  }, [index, rowIndex]);

  const circumference = 2 * Math.PI * 38;
  const fillLength = (skill.level / 100) * circumference;

  return (
    <div
      ref={cellRef}
      className="interactive group relative flex flex-col items-center"
      style={{ opacity: 0 }}
    >
      {/* Hex container */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        {/* Background hex shape */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {/* Background ring */}
          <circle
            cx="50" cy="50" r="38"
            fill="rgba(255,255,255,0.01)"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
          />
          {/* Progress ring */}
          <circle
            cx="50" cy="50" r="38"
            fill="none"
            stroke={skill.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${fillLength} ${circumference - fillLength}`}
            strokeDashoffset={circumference * 0.25}
            className="transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 0 4px ${skill.color})`,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>

        {/* Icon */}
        <span className="text-xl md:text-2xl relative z-10 group-hover:scale-125 transition-transform duration-300">
          {skill.icon}
        </span>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{ backgroundColor: skill.color }}
        />
      </div>

      {/* Label */}
      <div className="mt-2 text-center">
        <div className="font-mono text-[9px] tracking-wider text-gray-400 group-hover:text-white transition-colors">
          {skill.name}
        </div>
        <div className="font-mono text-[8px] mt-0.5 opacity-0 group-hover:opacity-100 transition-all" style={{ color: skill.color }}>
          LVL {skill.level}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 60%',
      onEnter: () => triggerAchievement('skill_tree'),
      once: true,
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center z-10 px-4">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-green)]" />
          <span className="font-mono text-[9px] tracking-[0.5em] text-gray-600 uppercase">Interactive Matrix</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-green)]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-heading text-white mb-2 uppercase tracking-wider">
          Skill <span className="neon-text">Tree</span>
        </h2>
        <p className="font-mono text-[9px] tracking-[0.3em] text-gray-700 uppercase">
          Hover nodes to inspect • {SKILL_ROWS.flat().length} skills loaded
        </p>
      </div>

      {/* Hex Grid - Honeycomb-style rows */}
      <div className="relative max-w-4xl w-full space-y-4">
        {/* SVG connection lines behind */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" style={{ overflow: 'visible' }}>
            <line x1="20%" y1="20%" x2="35%" y2="45%" stroke="rgba(0,245,255,0.06)" strokeWidth="1" />
            <line x1="50%" y1="20%" x2="50%" y2="45%" stroke="rgba(0,245,255,0.06)" strokeWidth="1" />
            <line x1="80%" y1="20%" x2="65%" y2="45%" stroke="rgba(0,245,255,0.06)" strokeWidth="1" />
            <line x1="30%" y1="55%" x2="30%" y2="75%" stroke="rgba(138,43,226,0.06)" strokeWidth="1" />
            <line x1="65%" y1="55%" x2="60%" y2="75%" stroke="rgba(138,43,226,0.06)" strokeWidth="1" />
          </svg>
        </div>

        {/* Rows */}
        {SKILL_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-4 md:gap-8 relative z-10"
            style={{ marginLeft: rowIndex % 2 === 1 ? '0' : '0' }}
          >
            {row.map((skill, i) => (
              <HexCell key={skill.id} skill={skill} index={i} rowIndex={rowIndex} />
            ))}
          </div>
        ))}

        {/* Bottom data line */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-6 font-mono text-[8px] text-gray-700">
            <span>■ LANGUAGES</span>
            <span>■ FRONTEND</span>
            <span>■ BACKEND</span>
            <span>■ DATA & TOOLS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
