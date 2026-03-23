import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={onAnimationComplete}
    >
      {isVisible && (
        <motion.main
          key="splash-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-screen w-full flex flex-col items-center justify-center bg-[#080F0E] text-[#F0EDE8] overflow-hidden"
        >
          {/* The Liquid Void — Organic Background Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#080F0E_70%)]" />
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00E5CC]/[0.05] rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/[0.08] rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5CC]/[0.03] rounded-full blur-[120px]" />
          </div>

          {/* Central Content Stack */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6">

            {/* Phase 1: The Liquid Glass Icon with Caustics Light Sweep */}
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-20 h-20 rounded-[28px] bg-white/[0.01] border border-white/[0.06] backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center"
            >
              {/* The Slow Caustics Light Sweep */}
              <motion.div 
                initial={{ y: '-150%', skewY: -10 }}
                animate={{ y: '150%' }}
                transition={{ delay: 0.8, duration: 2.5, ease: "linear" }}
                className="absolute inset-x-0 h-[80%] bg-gradient-to-b from-transparent via-[#00E5CC]/20 to-transparent z-[0]"
              />
              
              {/* Steering Wheel Icon — Pure Geometric Strokes */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a10 10 0 0 1 8.5 15" strokeOpacity="0" />
                {/* Spokes */}
                <line x1="12" y1="9" x2="12" y2="5" />
                <line x1="9.4" y1="13.5" x2="5.8" y2="15.5" />
                <line x1="14.6" y1="13.5" x2="18.2" y2="15.5" />
              </svg>
            </motion.div>

            {/* Phase 2: The Kerning Collapse Text */}
            <div className="text-center mt-3">
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: '1em' }}
                animate={{ opacity: 1, letterSpacing: '0.22em' }}
                transition={{ delay: 1.5, duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
                className="font-serif text-[24px] text-white font-bold uppercase"
              >
                DORION
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="text-[10px] font-sans font-medium tracking-[0.3em] text-[#A3B8B6] uppercase mt-2.5"
              >
                Premium Driving Academy
              </motion.p>
            </div>
          </div>

          {/* Bottom Loading Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <div className="w-8 h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ delay: 3.2, duration: 1.2, repeat: 1, ease: "easeInOut" }}
                className="w-full h-full bg-[#00E5CC]/60 rounded-full"
              />
            </div>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
