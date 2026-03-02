import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Eye, Zap, MapPin, Terminal, Gamepad2, Gauge, Fingerprint, Wifi } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  xp: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'boot', title: 'System Boot', desc: 'Entered the digital realm', icon: <Terminal size={16} />, xp: 50 },
  { id: 'scroll', title: 'Explorer', desc: 'Scrolled past the hero section', icon: <MapPin size={16} />, xp: 100 },
  { id: 'flip', title: 'Double Agent', desc: 'Flipped the player card', icon: <Eye size={16} />, xp: 150 },
  { id: 'skill_tree', title: 'Skill Scanner', desc: 'Discovered the skill tree', icon: <Zap size={16} />, xp: 200 },
  { id: 'declassify', title: 'Code Breaker', desc: 'Declassified a mission log', icon: <Eye size={16} />, xp: 250 },
  { id: 'terminal', title: 'Hacker', desc: 'Used the contact terminal', icon: <Terminal size={16} />, xp: 300 },
  { id: 'konami', title: 'Cheat Code', desc: 'Found the secret key combo', icon: <Gamepad2 size={16} />, xp: 500 },
  { id: 'speed_typer', title: 'Speed Demon', desc: 'Typed 3 commands blazing fast', icon: <Gauge size={16} />, xp: 300 },
  { id: 'avatar_secret', title: 'Identity Breach', desc: 'Clicked the avatar 7 times', icon: <Fingerprint size={16} />, xp: 400 },
  { id: 'glitch_witness', title: 'Glitch in the Matrix', desc: 'Witnessed the mid-scroll glitch', icon: <Wifi size={16} />, xp: 200 },
];

// Singleton event system
const achievementListeners: Set<(id: string) => void> = new Set();
export function triggerAchievement(id: string) {
  achievementListeners.forEach(fn => fn(id));
}

export default function AchievementSystem() {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [displaying, setDisplaying] = useState<Achievement | null>(null);
  const [queue, setQueue] = useState<Achievement[]>([]);

  const unlock = useCallback((id: string) => {
    if (unlockedIds.has(id)) return;
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    setUnlockedIds(prev => new Set(prev).add(id));
    setQueue(prev => [...prev, ach]);
  }, [unlockedIds]);

  // Register listener
  useEffect(() => {
    achievementListeners.add(unlock);
    return () => { achievementListeners.delete(unlock); };
  }, [unlock]);

  // Process queue
  useEffect(() => {
    if (displaying || queue.length === 0) return;
    const [next, ...rest] = queue;
    setDisplaying(next);
    setQueue(rest);
    setTimeout(() => setDisplaying(null), 4000);
  }, [queue, displaying]);

  // Auto-trigger boot achievement
  useEffect(() => {
    setTimeout(() => triggerAchievement('boot'), 3000);
  }, []);

  // Auto-trigger scroll achievement
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        triggerAchievement('scroll');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-20 right-6 z-[95] pointer-events-none">
      <AnimatePresence>
        {displaying && (
          <motion.div
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 300, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <div className="glass-panel border border-yellow-500/20 p-4 w-72 relative overflow-hidden">
              {/* Gold shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent animate-pulse" />
              
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
                  <Trophy size={18} />
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.3em] text-yellow-500/60 uppercase mb-0.5">
                    Achievement Unlocked
                  </div>
                  <div className="font-heading text-sm text-white tracking-wider">{displaying.title}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1">{displaying.desc}</div>
                  <div className="text-[10px] text-yellow-500 font-mono font-bold mt-1">+{displaying.xp} XP</div>
                </div>
              </div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-yellow-500"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                style={{ boxShadow: '0 0 8px rgba(234,179,8,0.5)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
