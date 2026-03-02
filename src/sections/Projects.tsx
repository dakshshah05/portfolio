import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Lock, Unlock, Eye, Activity, Users, Clock } from 'lucide-react';
import { triggerAchievement } from '../components/AchievementSystem';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'Planigo',
    type: 'Startup Platform',
    status: 'IN PROGRESS',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    desc: 'Co-founded startup platform where I serve as COO. Leading team operations, product strategy, and full-stack development of scalable solutions.',
    color: '#00f5ff',
    metrics: { users: '500+', perf: 'Scalable', uptime: '99.5%' },
    progress: 65,
    links: { demo: '#', github: '#' },
  },
  {
    id: '02',
    title: 'SDG Registration System',
    type: 'Award-Winning App',
    status: 'MISSION COMPLETE',
    tech: ['Python', 'Flask', 'Streamlit', 'MySQL'],
    desc: 'Developed an SDG registration and ID card generation system. Received a Momento of Appreciation for impactful contribution to sustainability goals.',
    color: '#8a2be2',
    metrics: { users: '1K+', perf: 'Automated', uptime: '99.9%' },
    progress: 100,
    links: { demo: '#', github: '#' },
  },
  {
    id: '03',
    title: 'Gamified Portfolio',
    type: 'Creative Showcase',
    status: 'MISSION COMPLETE',
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    desc: 'This very portfolio — a fully gamified, interactive experience with RPG stats, achievements, easter eggs, and a cyberpunk terminal interface.',
    color: '#ff00ff',
    metrics: { users: '∞', perf: '60fps', uptime: '100%' },
    progress: 100,
    links: { demo: '#', github: 'https://github.com/dakshshah05' },
  }
];

function MissionCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 100, rotationX: 15 },
      {
        opacity: 1, y: 0, rotationX: 0,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: index * 0.2,
      }
    );
  }, [index]);

  const handleReveal = () => {
    if (isRevealed) return;
    triggerAchievement('declassify');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsRevealed(true);
      }
    }, 30);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  return (
    <div
      ref={cardRef}
      className="interactive relative group"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(800px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
        transition: 'transform 0.3s ease-out',
        opacity: 0,
      }}
      onMouseEnter={handleReveal}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      <div className="glass-panel overflow-hidden relative border border-white/[0.04]">
        {/* Scan line */}
        {!isRevealed && scanProgress > 0 && scanProgress < 100 && (
          <div
            className="absolute left-0 w-full h-[2px] z-40 pointer-events-none"
            style={{
              top: `${scanProgress}%`,
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              boxShadow: `0 0 20px ${project.color}`,
            }}
          />
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between p-3 border-b border-white/[0.03] bg-white/[0.01]">
          <div className="flex items-center gap-2">
            {isRevealed ? <Unlock size={10} className="text-[var(--color-green)]" /> : <Lock size={10} className="text-gray-700" />}
            <span className="font-mono text-[8px] tracking-[0.3em] text-gray-600">
              {isRevealed ? 'DECLASSIFIED' : 'CLASSIFIED'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${project.status.includes('COMPLETE') ? 'bg-[var(--color-green)]' : 'bg-yellow-500 animate-pulse'}`} />
            <span className={`font-mono text-[7px] tracking-wider ${project.status.includes('COMPLETE') ? 'text-[var(--color-green)]' : 'text-yellow-500'}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 relative">
          {/* Classified overlay */}
          {!isRevealed && (
            <div className="absolute inset-0 bg-[#0a0a0f]/70 backdrop-blur-[3px] z-20 flex items-center justify-center transition-all">
              {scanProgress > 0 ? (
                <div className="text-center">
                  <div className="font-mono text-xs mb-2" style={{ color: project.color }}>SCANNING {scanProgress}%</div>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                    <div className="h-full rounded-full transition-all" style={{ width: `${scanProgress}%`, backgroundColor: project.color }} />
                  </div>
                </div>
              ) : (
                <div className="text-center group-hover:scale-110 transition-transform">
                  <Eye size={16} className="text-gray-600 mx-auto mb-1" />
                  <div className="font-mono text-[8px] text-gray-700 tracking-widest">HOVER TO SCAN</div>
                </div>
              )}
            </div>
          )}

          {/* Project ID + Type */}
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-4xl font-bold opacity-10 group-hover:opacity-30 transition-opacity" style={{ color: project.color }}>
              {project.id}
            </span>
            <div className="px-2 py-0.5 border rounded text-[7px] tracking-widest uppercase" style={{ borderColor: `${project.color}30`, color: project.color }}>
              {project.type}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-heading text-white uppercase mb-2 tracking-wider" style={{ textShadow: `0 0 15px ${project.color}20` }}>
            {project.title}
          </h3>

          <p className="text-gray-500 text-xs leading-relaxed mb-4">{project.desc}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t, i) => (
              <span key={i} className="text-[8px] font-mono bg-white/[0.02] px-2 py-0.5 border border-white/[0.05] text-gray-500 tracking-wider rounded-sm">
                {t}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-white/[0.01] border border-white/[0.03] rounded-lg mb-4">
            {[
              { icon: <Users size={10} />, label: 'USERS', value: project.metrics.users },
              { icon: <Activity size={10} />, label: 'PERF', value: project.metrics.perf },
              { icon: <Clock size={10} />, label: 'UPTIME', value: project.metrics.uptime },
            ].map(m => (
              <div key={m.label} className="text-center">
                <div className="text-gray-700 mx-auto w-fit mb-1">{m.icon}</div>
                <div className="font-heading text-xs font-bold" style={{ color: project.color }}>{m.value}</div>
                <div className="text-[6px] font-mono text-gray-700 tracking-widest">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-[7px] font-mono text-gray-700 mb-1">
              <span>COMPLETION</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}40` }} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a href={project.links.demo} className="interactive flex-1 border bg-white/[0.02] hover:bg-white/[0.05] transition-all py-2.5 flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider font-mono rounded-sm" style={{ borderColor: `${project.color}20`, color: project.color }}>
              <ExternalLink size={12} /> Deploy
            </a>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="interactive w-10 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all py-2.5 flex items-center justify-center text-gray-500 hover:text-white rounded-sm">
              <Github size={14} />
            </a>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${project.color}30, transparent)` }} />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-16 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[var(--color-neon)]" />
            <span className="font-mono text-[9px] tracking-[0.5em] text-gray-600 uppercase">Mission Database</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider mb-2">
            Mission <span className="neon-text">Logs</span>
          </h2>
          <p className="font-mono text-[9px] text-gray-700 tracking-widest">{PROJECTS.length} ENTRIES FOUND • HOVER TO DECLASSIFY</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((p, i) => <MissionCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
