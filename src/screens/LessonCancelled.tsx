import { motion } from 'motion/react';

interface LessonCancelledProps {
  pendingLesson: any;
  onDone: () => void;
}

export default function LessonCancelled({ pendingLesson, onDone }: LessonCancelledProps) {
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

        <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] relative z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <h1 className="text-[28px] font-bold text-white mb-2 font-serif">
          Schedule <span className="text-[#00E5CC]">cleared</span>.
        </h1>
        <p className="text-[14px] text-white/70 mb-8 font-sans">
          This lesson has been removed. A receipt has been sent to your email.
        </p>

        <motion.div 
          className="bg-white/[0.04] rounded-[16px] p-5 mb-8 flex flex-col gap-5 text-left border border-white/[0.08] relative z-10"
          initial={{ opacity: 0, scale: 1.05, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Date Row */}
          <div className="flex items-center gap-4">
            {/* Glass Calendar Badge */}
            <div className="flex flex-col items-center justify-center min-w-[48px] h-[52px] rounded-[12px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
              <span className="text-[8px] uppercase font-bold text-[#00E5CC] tracking-[0.2em] mb-0.5">{pendingLesson?.month || 'MAY'}</span>
              <span className="text-[18px] font-serif text-white leading-none">{pendingLesson?.day || '26'}</span>
            </div>
            <div>
              <p className="font-sans text-[9px] text-white/60 tracking-[0.2em] uppercase mb-1">Session Date</p>
              <p className="font-sans text-white text-[16px] font-semibold">{pendingLesson?.title || 'Practice Lesson'}</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/[0.08]" />

          {/* Refund Status Row */}
          <div className="flex items-center justify-between">
            <p className="font-sans text-[9px] text-white/60 tracking-[0.2em] uppercase">Refund Status</p>
            <p className="text-[#00E5CC] font-sans font-bold text-[10px] tracking-widest uppercase">Processed</p>
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
            A cancellation receipt has been sent to your email.
          </p>
        </div>
      </motion.div>
    </motion.main>
  );
}
