import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If progress completes naturally
    if (progress === 100) {
      setTimeout(() => setLoading(false), 800);
    }
    
    // Fallback: If 3D assets load instantly or progress fails to update past 0
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="relative w-64 md:w-96">
            <h1 className="text-2xl md:text-4xl font-heading text-white tracking-[0.2em] mb-4 text-center">
              <span className="neon-text">SYS</span>TEM_INIT
            </h1>
            <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#00f5ff]"
                style={{ boxShadow: '0 0 10px #00f5ff' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[#8a2be2] font-mono text-xs uppercase tracking-wider">
              <span>Loading records...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
