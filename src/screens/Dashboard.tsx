import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Lock, AlertTriangle, MoreHorizontal } from 'lucide-react';
import { Lesson } from '../types';

interface DashboardProps {
  lessons: Lesson[];
  onAddLesson: () => void;
  onReschedule: () => void;
  onCancelLesson: (id: string | number) => void;
}

const EmptyScheduleState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify-center p-10 rounded-[24px] bg-white/[0.02] border border-white/[0.05] border-dashed backdrop-blur-sm mt-4 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-[40px]" />

      <motion.div 
        animate={{ y: [0, -6, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-[var(--color-primary)]/60 mb-5 relative z-10"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="16" r="2" />
        </svg>
      </motion.div>

      <h3 className="font-serif text-[20px] text-white tracking-wide mb-2 relative z-10">
        Your Schedule is Clear
      </h3>
      <p className="font-sans text-[14px] text-white/50 text-center max-w-[240px] leading-relaxed relative z-10">
        You have no upcoming drives. Tap the new lesson button to get back behind the wheel.
      </p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-8 text-[var(--color-primary)]/40 relative z-10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default function Dashboard({ lessons, onAddLesson, onReschedule, onCancelLesson }: DashboardProps) {
  const [targetLessonId, setTargetLessonId] = useState<string | number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'study' | 'payments' | 'profile'>('schedule');
  const [hasMissedLesson] = useState(false);
  const [swipingCardId, setSwipingCardId] = useState<string | number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-[calc(72px+48px+env(safe-area-inset-bottom,0px))]"
    >
      <header className="fixed top-0 inset-x-0 h-24 z-50 bg-[#080F0E]/40 backdrop-blur-2xl border-b border-white/[0.05] flex justify-center pt-8 px-4 sm:px-6">
        <div className="w-full max-w-[600px] flex items-center justify-between relative">
          <button className="p-3 -ml-3 text-white/70 hover:text-white transition-colors focus-visible:outline-none" aria-label="Open navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8"/>
              <line x1="4" y1="16" x2="20" y2="16"/>
            </svg>
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 font-serif text-[20px] tracking-[0.22em] font-bold text-on-surface leading-none">
            DORION
          </h1>

          <button className="py-2 px-3 -mr-3 flex items-center gap-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none" aria-label="Open support chat">
            <div className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface" />
            </div>
            <span className="text-[13px] font-sans tracking-wide font-medium">Chat</span>
          </button>
        </div>
      </header>

      <main className="w-full max-w-[600px] mx-auto px-4 sm:px-6 pt-[136px] pb-32">
        <AnimatePresence mode="wait">
        {activeTab === 'schedule' && (
          <motion.div 
            key="schedule"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
          >
            <section className="mb-9">
              {!hasMissedLesson && (
                <div className="p-4 sm:p-6 relative overflow-hidden rounded-[32px] bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)]">
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'oklch(75% 0.08 205 / 8%)', filter: 'blur(16px)' }} />
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex-1">
                      <p className="text-[17px] font-semibold text-on-surface leading-tight">
                        Hi Julian!
                      </p>
                      <div className="flex items-baseline justify-between mt-1.5 w-full pr-2">
                        <p className="text-[16px] text-on-surface-variant leading-normal w-full">
                          Good news — you've <span className="text-on-surface">completed</span>
                          <br />
                          <span className="text-on-surface">16 </span> 
                          out of <span className="text-on-surface">25</span> required lessons!
                        </p>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors ml-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="View details">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden border border-white/[0.05] relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '64%' }}
                      transition={{ delay: 1, duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                      className="h-full bg-gradient-to-r from-primary to-secondary relative overflow-hidden"
                    >
                      <div 
                        className="absolute right-0 z-20"
                        style={{
                          top: '50%',
                          transform: 'translate(50%, -75%)', 
                        }}
                      >
                        <svg width="28" height="10" viewBox="0 0 28 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                          {/* Premium Modern Silhouette - Single Continuous Curve */}
                          <path 
                            d="M2 8.5 C2 8.5 3 8.5 4 8.5 C5.5 8.5 6.5 7.5 7.5 6.2 C8.8 4.5 11 3 14 3 C17 3 19.2 4.5 20.5 6.2 C21.5 7.5 22.5 8.5 24 8.5 C25 8.5 26 8.5 26 8.5" 
                            stroke="var(--color-primary)" 
                            strokeWidth="1.2" 
                            strokeLinecap="round"
                          />
                          <path d="M8 6.5 L20 6.5" stroke="var(--color-primary)" strokeWidth="0.8" opacity="0.3" />
                          {/* Minimal Wheels as Geometric Accents */}
                          <circle cx="7" cy="8.5" r="1.2" fill="var(--color-primary)" />
                          <circle cx="21" cy="8.5" r="1.2" fill="var(--color-primary)" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                  
                  <p className="text-[12px] mt-3 text-right text-on-surface-variant">
                    Est. completion — August 26
                  </p>
                </div>
              )}
            </section>

            <section className="space-y-6 mt-12">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">MANAGE YOUR SCHEDULE</h3>
                <button className="relative w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center bg-surface-container text-primary hover:text-on-surface transition-colors active:scale-95" aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {lessons.length > 0 ? (
                <div className="flex flex-col gap-3 w-full">
                  <AnimatePresence mode="popLayout">
                    {lessons.map((lesson, index) => (
                      <motion.div 
                        key={lesson.id} 
                        layout="position"
                        className="relative w-full rounded-[32px] overflow-hidden"
                      >
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: -160, right: 0 }}
                          dragElastic={0.05}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            x: index === 0 ? [0, -45, 0] : 0 
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ 
                            opacity: { duration: 0.4 },
                            y: { type: "spring", bounce: 0, duration: 0.4 },
                            x: { delay: 1.5, duration: 0.7, ease: "easeInOut" } 
                          }}
                          onDragStart={() => setSwipingCardId(lesson.id)}
                          onDragEnd={(e, info) => {
                            if (info.offset.x === 0) setSwipingCardId(null);
                          }}
                          className="relative flex w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary z-10"
                          role="button"
                          aria-label={`View details for ${lesson.title} on ${lesson.month} ${lesson.day}`}
                          tabIndex={0}
                        >
                          <div className="relative z-10 w-full shrink-0 rounded-[32px] bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing">
                            <div className="flex items-center py-4 pr-4 sm:pr-6 relative z-10 pl-2">
                              
                              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-outline-variant shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md ml-3 mr-4 shrink-0">
                                <span className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] mb-0.5">{lesson.month}</span>
                                <span className="text-[22px] font-serif text-on-surface leading-none">{lesson.day}</span>
                              </div>

                              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 h-full py-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-[16px] font-semibold text-on-surface leading-tight tracking-wide truncate">
                                    {lesson.title}
                                  </p>
                                  <button className="opacity-60 group-hover:opacity-100 transition-opacity focus-visible:outline-none shrink-0" aria-label="Expand details">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                                      <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                  </button>
                                </div>

                                 <div className="flex items-center gap-1.5 min-w-0">
                                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                     <circle cx="12" cy="7" r="4" />
                                   </svg>
                                   <span className="font-sans text-[14px] font-medium leading-none truncate max-w-[150px] text-on-surface-variant">
                                     {lesson.instructor}
                                   </span>
                                 </div>
                               </div>

                              <div className="flex flex-col items-end justify-center h-full gap-2 shrink-0">
                                {index === 0 ? (
                                  <span className="text-primary px-2 py-[2px] rounded-full bg-primary/10 font-bold uppercase tracking-[0.15em] text-[7px] border border-primary/20 leading-none">COMING SOON</span>
                                ) : (
                                  <span className="h-[10px]" /> 
                                )}

                                <div className="flex items-center gap-1.5 text-on-surface">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant mb-[1px]">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                  <span className="font-serif text-[20px] tracking-wide">{lesson.time.split(' ')[0].replace(/^0/, '')}</span>
                                  <span className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-outline-variant font-sans text-[8px] font-bold tracking-[0.15em] text-primary uppercase ml-0.5">
                                    {lesson.time.split(' ')[1] || 'AM'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <div className={`absolute right-0 top-0 bottom-0 w-[160px] flex overflow-hidden rounded-r-[32px] transition-opacity duration-300 z-0 ${swipingCardId === lesson.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button 
                            className="w-[80px] h-full flex flex-col items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] active:opacity-60 transition-all border-l border-outline-variant"
                            onClick={() => onReschedule()}
                          >
                            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center mb-0.5 border border-outline-variant">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                                <polyline points="8 14 12 18 16 14"/>
                              </svg>
                            </div>
                            <span className="text-[14px] font-semibold text-on-surface-variant tracking-wide">Reschedule</span>
                          </button>

                          <button 
                            className="w-[80px] h-full flex flex-col items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 active:opacity-60 transition-all border-l border-outline-variant"
                            onClick={() => {
                              setTargetLessonId(lesson.id);
                              setShowCancelConfirm(true);
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-0.5 border border-primary/40">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </div>
                            <span className="text-[14px] font-semibold text-primary">Cancel</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <EmptyScheduleState />
              )}
            </section>
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
          >
            <div className="absolute inset-0 bg-[#080F0E]/80 backdrop-blur-md" onClick={() => setShowCancelConfirm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm z-10"
            >
              <div className="relative w-full rounded-[32px] p-6 sm:p-8 bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[0_24px_60px_rgba(0,0,0,0.6)] text-center overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'oklch(65% 0.15 160 / 0.05)', filter: 'blur(40px)' }} />

                <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-outline-variant flex items-center justify-center mx-auto mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] relative z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>

                <h2 className="text-[26px] font-bold text-on-surface mb-1 font-serif">
                  Need to <span className="text-primary">change</span> plans?
                </h2>
                <p className="text-on-surface-variant font-medium text-[14px] mb-6 font-sans">
                  No problem. Just review the policy below before we clear this from your schedule.
                </p>

                <div className="w-full bg-surface-container border border-outline-variant rounded-[24px] p-5 mb-8 text-left relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <p className="font-sans text-[9px] text-on-surface-variant tracking-[0.2em] uppercase mb-4">Cancellation Policy</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <p className="text-[13px] text-on-surface-variant font-medium leading-snug">
                        Within 24h notice — a 50% late cancellation fee applies.
                      </p>
                    </div>
                    <div className="w-full h-px bg-transparent border-t border-dashed border-outline-variant" 
                      style={{ borderImage: 'repeating-linear-gradient(to right, #F0EDE826 0, #F0EDE826 8px, transparent 8px, transparent 16px) 1' }} 
                    />
                    <div className="flex items-start gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="text-[13px] text-on-surface-variant font-medium leading-snug">
                        24h+ notice — full lesson credit will be issued.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 relative z-10">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (targetLessonId) onCancelLesson(targetLessonId);
                      setShowCancelConfirm(false);
                    }}
                    className="w-full h-[56px] rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary text-[16px] font-semibold tracking-wide shadow-[0_8px_24px_rgba(0,215,255,0.2)] flex items-center justify-center focus-visible:outline-none"
                  >
                    Cancel Lesson
                  </motion.button>
                  <button 
                    onClick={() => setShowCancelConfirm(false)}
                    className="w-full h-[56px] rounded-full text-on-surface text-[16px] font-semibold tracking-wide border border-outline-variant bg-white/[0.02] hover:bg-white/[0.08] active:scale-[0.98] transition-all flex items-center justify-center focus-visible:outline-none"
                  >
                    No, Keep It
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 inset-x-0 z-[90] pointer-events-none">
        <div className="w-full max-w-[600px] mx-auto px-4 sm:px-6 pointer-events-auto h-[72px] overflow-visible">
          <div className="w-full h-full bg-surface-container backdrop-blur-3xl border border-outline-variant border-t-white/[0.25] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)] rounded-[36px] grid grid-cols-5 items-end px-2 pt-3 pb-8 relative overflow-visible" aria-label="Bottom navigation" role="navigation">
            
            <motion.button 
              onClick={() => setActiveTab('schedule')}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
              aria-label="Navigate to Schedule"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'schedule' ? 'var(--color-on-surface)' : '#F0EDE866'} strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'schedule' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Schedule</span>
              {activeTab === 'schedule' && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
            </motion.button>

            <motion.button 
              onClick={() => setActiveTab('study')}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
              aria-label="Navigate to Study Material"
            >
              <BookOpen size={20} className={activeTab === 'study' ? 'text-on-surface' : 'text-on-surface-variant'} />
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'study' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Study</span>
              {activeTab === 'study' && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
            </motion.button>

            {/* Centered FAB Overlay */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-20">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={onAddLesson}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,215,255,0.3)] bg-gradient-to-r from-primary to-secondary"
                aria-label="Add new lesson"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-primary">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </motion.button>
            </div>

            <div className="col-start-3" /> {/* Spacer for grid layout */}


            <motion.button 
              onClick={() => setActiveTab('payments')}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
              aria-label="Navigate to Payments"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'payments' ? 'var(--color-on-surface)' : '#F0EDE866'} strokeWidth="1.5" strokeLinecap="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'payments' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Bills</span>
              {activeTab === 'payments' && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
            </motion.button>

            <motion.button 
              onClick={() => setActiveTab('profile')}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
              aria-label="Navigate to Profile"
            >
              <div className={`w-5 h-5 rounded-full border-[1.5px] ${activeTab === 'profile' ? 'border-on-surface' : 'border-on-surface-variant'} flex items-center justify-center overflow-hidden bg-white/5`}>
                <div className={`w-3 h-3 rounded-full ${activeTab === 'profile' ? 'bg-on-surface' : 'bg-on-surface-micro'}`} />
              </div>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'profile' ? 'text-on-surface' : 'text-on-surface-variant'}`}>Profile</span>
              {activeTab === 'profile' && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
