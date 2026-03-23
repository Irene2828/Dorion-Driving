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
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 font-sans"
    >
      {/* Backdrop — Perfectly matched to Dashboard cancel modal */}
      <div className="absolute inset-0 bg-surface/60 backdrop-blur-md" onClick={onDone} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm z-10"
      >
        <div className="relative w-full rounded-[32px] p-8 bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[0_24px_60px_rgba(0,0,0,0.6)] text-center overflow-hidden flex flex-col items-center">
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

          {/* Success Animation */}
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center z-10">
            <motion.div 
              className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10"
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <motion.path 
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                />
              </svg>
            </motion.div>
          </div>

          <h1 className="text-[28px] font-bold text-on-surface mb-2 font-serif">
            You're <span className="text-primary">all set</span>, Julian.
          </h1>
          <p className="text-[14px] text-white/70 mb-8 font-sans">
            We've locked in your lesson and an email is on the way.
          </p>

          {/* The Inner Receipt */}
          <motion.div 
            layoutId="hero-card"
            className="w-full bg-surface-container border border-outline-variant rounded-[24px] p-5 mt-6 mb-8 flex flex-col gap-5 text-left relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Tier: Date & Session Identity */}
            <div className="flex items-center gap-4 border-b border-white/[0.08] pb-4 mb-4">
              {/* The Global Standard Glass Calendar Badge */}
              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
                <span className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] mb-0.5">
                  {pendingLesson?.month || 'MAY'}
                </span>
                <span className="text-[22px] font-serif text-on-surface leading-none">
                  {pendingLesson?.day || '27'}
                </span>
              </div>

              {/* Title & Metadata Hierarchy */}
              <div className="flex flex-col justify-center gap-1.5 min-w-0">
                <p className="font-sans text-[9px] text-on-surface-variant tracking-[0.2em] uppercase">Scheduled Lesson</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight truncate">
                    {pendingLesson?.title || 'Practice Lesson'}
                  </h3>
                  {/* Universal Vehicle Chip */}
                  <div className="px-1.5 py-[2px] rounded-[4px] bg-white/[0.05] border border-outline-variant flex items-center gap-1 shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                      <circle cx="7" cy="17" r="2"/>
                      <circle cx="17" cy="17" r="2"/>
                    </svg>
                    <span className="text-[8.5px] font-bold tracking-widest uppercase text-on-surface-variant leading-none">Sedan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tier: Instructor & Temporal Detail */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-sans text-[13px] font-medium tracking-wide truncate">
                  {pendingLesson?.instructor || 'Sarah Vance'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <span className="font-serif text-[18px] tracking-wide">
                  {pendingLesson?.time?.split(' ')[0] || '09:00'}
                </span>
                <span className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-outline-variant font-sans text-[9px] font-bold tracking-[0.15em] text-primary uppercase">
                  {pendingLesson?.time?.split(' ')[1] || 'AM'}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col relative z-10 w-full">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onDone}
              className="w-full h-[56px] rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary text-[16px] font-semibold tracking-wide shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-center justify-center focus-visible:outline-none"
            >
              Back to Dashboard
            </motion.button>
            <p className="font-sans text-[12px] text-white/50 font-medium tracking-wide text-center mt-4 px-4">
              A confirmation email is on its way with your full lesson details.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
