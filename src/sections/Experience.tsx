import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    year: '2026',
    role: 'Chief Operating Officer (COO)',
    company: 'Planigo',
    desc: 'Leading operations and product strategy at this startup. Managing cross-functional teams, driving full-stack development, and scaling the platform architecture.',
    color: '#00f5ff',
    tags: ['Leadership', 'Operations', 'Full Stack'],
  },
  {
    year: '2025',
    role: 'Member, Board of Directors',
    company: 'Planigo',
    desc: 'Sitting on the board to shape company vision, strategic decisions, and growth direction from the earliest stages of the startup.',
    color: '#8a2be2',
    tags: ['Strategy', 'Governance', 'Startup'],
  },
  {
    year: '2025',
    role: 'Executive Board Member',
    company: 'SPOTON',
    desc: 'Contributing to executive-level decisions for SPOTON, a student organization. Driving initiatives and coordinating large-scale events.',
    color: '#ff00ff',
    tags: ['Leadership', 'Events', 'Community'],
  },
  {
    year: '2024',
    role: 'Software Developer',
    company: 'LaraPush',
    desc: 'Developed features and contributed to the codebase of LaraPush, gaining hands-on experience in professional software development workflows.',
    color: '#00ff88',
    tags: ['Development', 'Web', 'SaaS'],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>(new Array(EXPERIENCE.length).fill(null));

  useEffect(() => {
    // Animate the central energy line
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }

    // Animate each node
    nodesRef.current.forEach((node, i) => {
      if (!node) return;

      gsap.fromTo(node,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(8px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 px-6 md:px-16 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[var(--color-purple)]" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gray-500 uppercase">Warp History</span>
            <div className="w-8 h-[1px] bg-[var(--color-purple)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider">
            System <span className="purple-text-glow" style={{ textShadow: '0 0 10px var(--color-purple), 0 0 30px rgba(138,43,226,0.4)' }}>History</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Track background */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/5 left-6 md:left-1/2 md:-translate-x-1/2 rounded-full" />

          {/* Animated fill */}
          <div
            ref={lineRef}
            className="absolute top-0 w-[3px] left-6 md:left-1/2 md:-translate-x-[1.5px] rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--color-neon), var(--color-purple), var(--color-magenta))', boxShadow: '0 0 15px rgba(0,245,255,0.3)' }}
          />

          {/* Experience Entries */}
          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => { nodesRef.current[index] = el; }}
                  className={`relative flex items-start gap-8 md:gap-0 pl-16 md:pl-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ opacity: 0 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20">
                    {/* Outer pulse */}
                    <div className="absolute inset-0 w-6 h-6 rounded-full -translate-x-[3px] -translate-y-[3px]"
                      style={{ border: `2px solid ${exp.color}40`, animation: 'pulse-ring 3s infinite' }} />
                    {/* Core dot */}
                    <div className="w-4 h-4 rounded-full border-[3px]"
                      style={{ borderColor: exp.color, backgroundColor: '#0a0a0f', boxShadow: `0 0 15px ${exp.color}60` }}
                    />
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="glass-panel p-6 relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500">
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${exp.color}60, transparent)` }} />

                      {/* Year badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar size={12} style={{ color: exp.color }} />
                        <span className="font-mono text-xs font-bold tracking-wider" style={{ color: exp.color }}>{exp.year}</span>
                      </div>

                      {/* Role */}
                      <h3 className="text-lg font-heading text-white uppercase tracking-wider mb-1">
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-1 mb-4">
                        <MapPin size={10} className="text-gray-600" />
                        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{exp.company}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.desc}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono px-2 py-0.5 border rounded-full tracking-wider" style={{ borderColor: `${exp.color}30`, color: `${exp.color}90` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for opposite side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
