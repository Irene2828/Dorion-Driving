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
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 font-sans"
    >
      {/* Backdrop — Perfectly matched to Dashboard cancel modal */}
      <div className="absolute inset-0 bg-[#080F0E]/80 backdrop-blur-md" onClick={onDone} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm z-10"
      >
        <div className="relative w-full rounded-[32px] p-6 sm:p-8 bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[0_24px_60px_rgba(0,0,0,0.6)] text-center overflow-hidden flex flex-col items-center">
          {/* Liquid Bubbles Celebration */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-primary/10 blur-xl pointer-events-none"
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
          
          <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] relative z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <h1 className="text-[28px] font-bold text-on-surface mb-2 font-serif">
            Schedule <span className="text-primary">cleared</span>.
          </h1>
          <p className="text-[14px] text-white/70 mb-8 font-sans">
            This lesson has been removed. A receipt has been sent to your email.
          </p>

          <motion.div 
            className="w-full bg-surface-container border border-outline-variant rounded-[24px] p-5 mt-6 mb-8 flex flex-col gap-5 text-left relative z-10"
            initial={{ opacity: 0, scale: 1.05, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Date Row */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
                <span className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] mb-0.5">{pendingLesson?.month || 'MAY'}</span>
                <span className="text-[22px] font-serif text-white leading-none">{pendingLesson?.day || '26'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[12px] text-white/50 tracking-wide font-medium mb-0.5">Session date</p>
                <div className="flex items-center gap-2">
                  <p className="font-sans text-white text-[16px] font-semibold truncate">{pendingLesson?.title || 'Practice Lesson'}</p>
                </div>

              </div>
            </div>

            <div className="w-full h-px bg-white/[0.08]" />

            {/* Refund Status Row */}
            <div className="flex items-center justify-between">
              <p className="font-sans text-[12px] text-on-surface-variant font-medium">Refund status</p>
              <p className="text-primary font-sans font-bold text-[14px] tracking-wide">Processed</p>
            </div>
          </motion.div>

          <div className="flex flex-col relative z-10 w-full">
            <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onDone}
            className="w-full h-[56px] rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary text-[16px] font-semibold tracking-wide shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-center justify-center focus-visible:outline-none"
          >
              Back to Dashboard
            </motion.button>
            <p className="font-sans text-[12px] text-white/50 font-medium tracking-wide text-center mt-4 px-4">
              A cancellation receipt has been sent to your email.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
