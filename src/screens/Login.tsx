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
    <div className="bg-[#080F0E] text-[#F0F4F3] min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Liquid Glass Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00E5CC]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5CC]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="text-[24px] font-bold tracking-[0.3em] uppercase text-[#00E5CC] mb-2 font-sans">
            DORION
          </h1>
          <p className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#A3B8B6] uppercase mt-3">
            PREMIUM DRIVING ACADEMY
          </p>
        </motion.div>

        {/* The Interactive Vault Block */}
        <div className="relative mt-16 w-full max-w-sm px-6" onClick={() => inputRef.current?.focus()}>
          
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
                    borderColor: isActive && !isAuthenticating ? 'rgba(0, 229, 204, 0.6)' : 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: isAuthenticating ? 'rgba(0, 229, 204, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                    scale: isAuthenticating ? [1, 1.1, 0.9, 1] : 1
                  }}
                  transition={{ duration: 0.3, delay: isAuthenticating ? index * 0.05 : 0 }}
                  className={`relative w-12 h-16 rounded-[16px] backdrop-blur-2xl border flex items-center justify-center overflow-hidden transition-colors ${isActive ? 'shadow-[0_0_20px_rgba(0,229,204,0.2)]' : 'shadow-lg'}`}
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
                      className="absolute bottom-3 w-4 h-[2px] bg-[#00E5CC] rounded-full"
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
