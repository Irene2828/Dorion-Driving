import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the hidden input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Trigger login logic when 6 digits are hit
  useEffect(() => {
    if (code.length === 6 && !isAuthenticating) {
      setIsAuthenticating(true);
      setTimeout(() => onLogin(), 1500); // 1.5s delay to play the success animation
    }
  }, [code, onLogin, isAuthenticating]);

  return (
    <div className="text-on-surface min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans">

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header Section — Unified with Splash Lock-up */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Visual Glass Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-20 h-20 rounded-[28px] bg-white/[0.01] border border-white/[0.06] backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center"
          >
            {/* The Slow Caustics Light Sweep */}
            <motion.div 
              initial={{ y: '-150%', skewY: -10 }}
              animate={{ y: '150%' }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute inset-x-0 h-[80%] bg-gradient-to-b from-transparent via-primary/20 via-secondary/20 to-transparent z-[0]"
            />
            
            {/* Steering Wheel Icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(232,213,163,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2a10 10 0 0 1 8.5 15" strokeOpacity="0" />
              <line x1="12" y1="9" x2="12" y2="5" />
              <line x1="9.4" y1="13.5" x2="5.8" y2="15.5" />
              <line x1="14.6" y1="13.5" x2="18.2" y2="15.5" />
            </svg>
          </motion.div>

          {/* Wordmark & Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-center"
          >
            <h1 className="text-[24px] font-bold tracking-[0.22em] uppercase text-white font-serif">
              DORION
            </h1>
            <p className="text-[10px] font-sans font-medium tracking-[0.3em] text-[var(--color-on-surface-variant)] uppercase mt-2.5">
              Premium Driving Academy
            </p>
          </motion.div>
        </div>
        
        {/* Instruction Microcopy */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center text-center px-4 sm:px-6"
        >
          <p className="font-sans text-[16px] text-on-surface-variant tracking-wide font-medium">
            Enter your 6-digit student ID to access your dashboard.
          </p>
        </motion.div>

        {/* The Interactive Vault Block */}
        <div className="relative mt-10 w-full max-w-[600px] mx-auto px-4 sm:px-6" onClick={() => inputRef.current?.focus()}>
          
          {/* The Hidden Native Input (For Mobile Keyboard) */}
          <input 
            ref={inputRef}
            type="number" 
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.slice(0, 6))}
            disabled={isAuthenticating}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            autoFocus
          />

          {/* The Visual Glass Slots */}
          <div className="flex justify-between items-center w-full gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const isActive = index === code.length;
              const digit = code[index];

              return (
                <motion.div 
                  key={index}
                  animate={{
                    borderColor: isActive && !isAuthenticating ? 'var(--color-primary)' : 'var(--color-outline-variant)',
                    backgroundColor: isAuthenticating ? 'oklch(100% 0 0 / 15%)' : 'oklch(100% 0 0 / 8%)',
                    scale: isAuthenticating ? [1, 1.1, 0.9, 1] : 1
                  }}
                  transition={{ duration: 0.3, delay: isAuthenticating ? index * 0.05 : 0 }}
                  className={`relative w-[60px] h-[80px] rounded-[20px] bg-surface-container backdrop-blur-2xl border border-outline-variant flex items-center justify-center overflow-hidden transition-all ${isActive ? 'shadow-[0_0_30px_var(--color-primary)/25%]' : 'shadow-lg'}`}


                >
                  <AnimatePresence mode="popLayout">
                    {digit && (
                      <motion.span
                        key={digit + index}
                        initial={{ scale: 0.5, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="text-[28px] font-sans font-medium text-white"
                      >
                        {digit}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Subtle cursor indicator for the active slot */}
                  {isActive && !isAuthenticating && (
                    <motion.div 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="absolute bottom-3 w-4 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
