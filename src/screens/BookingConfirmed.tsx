import { motion } from 'motion/react';


interface BookingConfirmedProps {
  pendingLesson: any;
  onDone: () => void;
}

export default function BookingConfirmed({ pendingLesson, onDone }: BookingConfirmedProps) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 font-sans"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm rounded-[32px] p-8 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-center overflow-hidden"
      >
        {/* Liquid Bubbles Celebration */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-[#00E5CC]/10 blur-xl pointer-events-none"
            style={{
              width: 10 + i * 6,
              height: 10 + i * 6,
              left: `${15 + i * 14}%`,
              bottom: '10%',
            }}
            animate={{ y: [-20, -120], opacity: [0, 0.3, 0] }}
            transition={{
              duration: 3 + i * 0.4,
              delay: 0.8 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 1 + i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Premium X Close Button */}
        <button 
          onClick={onDone}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-none z-20"
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Success Animation */}
        <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center z-10">
          <motion.div 
            className="absolute inset-0 rounded-full border border-[#00E5CC]/30 bg-[#00E5CC]/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
          <motion.div 
            className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5 relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.path 
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              />
            </svg>
          </motion.div>
        </div>

        <h1 className="text-[28px] font-bold text-white mb-2 font-serif">
          You're <span className="text-[#00E5CC]">all set</span>, Julian.
        </h1>
        <p className="text-[14px] text-white/70 mb-8 font-sans">
          We've locked in your lesson and an email is on the way.
        </p>

        {/* The Inner Receipt */}
        <motion.div 
          layoutId="hero-card"
          className="bg-white/[0.04] rounded-[16px] p-5 mb-8 flex flex-col gap-5 text-left border border-white/[0.08] relative z-10"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-1">
              {/* Glass Calendar Badge - Unified Source of Truth Style */}
              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shrink-0 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
                <span className="text-[10px] uppercase font-bold text-[#00E5CC] tracking-[0.2em] mb-0.5">{pendingLesson?.month || 'MAY'}</span>
                <span className="text-[22px] font-serif text-white leading-none">{pendingLesson?.day || '27'}</span>
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <p className="font-sans text-[9px] text-white/60 tracking-[0.2em] uppercase">Scheduled Lesson</p>
                
                {/* The Hero: Lesson Title */}
                <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight truncate">
                  {pendingLesson?.title || 'Practice Lesson'}
                </h3>
                
                {/* The Supporting Detail: Refined Instructor Row */}
                <div className="flex items-center gap-1.5 text-white/50">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-sans text-[13px] font-medium leading-none">
                    {pendingLesson?.instructor || 'Marcus Chen'}
                  </span>
                </div>
              </div>
            </div>

            {/* Vertically aligned Time Stack */}
            <div className="shrink-0 text-right ml-4">
              <span className="text-[18px] font-bold text-white font-serif">{pendingLesson?.time || '11:00 AM'}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col relative z-10">
          <button 
            onClick={onDone}
            className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00B5A0] text-[#080F0E] font-bold tracking-[0.1em] text-[13px] shadow-[0_8px_20px_rgba(0,229,204,0.3)] active:scale-[0.98] transition-all flex items-center justify-center"
          >
            Back to Dashboard
          </button>
          <p className="font-sans text-[12px] text-white/50 font-medium tracking-wide text-center mt-4 px-4">
            A confirmation email is on its way with your full lesson details.
          </p>
        </div>
      </motion.div>
    </motion.main>
  );
}
