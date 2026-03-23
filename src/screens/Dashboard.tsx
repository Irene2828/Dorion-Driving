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
      {/* Subtle background glow for the empty state */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00E5CC]/5 rounded-full blur-[40px]" />

      {/* Floating Premium Icon (Thin Stroke) */}
      <motion.div 
        animate={{ y: [0, -6, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-[#00E5CC]/60 mb-5 relative z-10"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="16" r="2" />
        </svg>
      </motion.div>

      {/* Title Case Typography */}
      <h3 className="font-serif text-[20px] text-white tracking-wide mb-2 relative z-10">
        Your Schedule is Clear
      </h3>
      <p className="font-sans text-[14px] text-white/50 text-center max-w-[240px] leading-relaxed relative z-10">
        You have no upcoming drives. Tap the new lesson button to get back behind the wheel.
      </p>

      {/* Animated Arrow pointing towards the FAB */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-8 text-[#00E5CC]/40 relative z-10"
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-32"
    >
      {/* Liquid Glass Header */}
      <header className="fixed top-0 inset-x-0 h-24 z-50 bg-[#080F0E]/40 backdrop-blur-2xl border-b border-white/[0.05] flex items-center justify-between px-6 pt-8">
        {/* Hamburger Icon */}
        <button className="p-3 -ml-3 text-white/70 hover:text-white transition-colors focus-visible:outline-none" aria-label="Open navigation menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="4" y1="8" x2="20" y2="8"/>
            <line x1="4" y1="16" x2="20" y2="16"/>
          </svg>
        </button>

        {/* Logo */}
        <h1 className="font-serif text-[20px] tracking-[0.2em] font-bold text-[#00E5CC] leading-none">
          DORION
        </h1>

        {/* Chat Button */}
        <button className="py-2 px-3 -mr-3 flex items-center gap-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none" aria-label="Open support chat">
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00E5CC] rounded-full border-2 border-[#080F0E]" />
          </div>
          <span className="text-[13px] font-sans tracking-wide font-medium">Chat</span>
        </button>
      </header>

      <main className="pt-[136px] px-6 max-w-2xl mx-auto pb-32">
        <AnimatePresence mode="wait">
        {activeTab === 'schedule' && (
          <motion.div 
            key="schedule"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
          >
            <section className="mb-9">
              {/* Progress card */}
              {!hasMissedLesson && (
                <div className="p-6 relative overflow-hidden rounded-[20px] bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] border-t-white/[0.25] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'rgba(0,229,204,0.08)', filter: 'blur(16px)' }} />
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex-1">
                      <p className="text-[17px] font-semibold text-[#F0F4F3] leading-tight">
                        Hi Julian!
                      </p>
                      <div className="flex items-baseline justify-between mt-1.5 w-full pr-2">
                        <p className="text-[15px] text-[#7A9B97] leading-normal max-w-[280px]">
                          Good news — you've <span className="text-[#F0F4F3]">completed</span> <br />
                          <span className="text-[#F0F4F3]">16 </span> 
                          out of <span className="text-[#F0F4F3]">25</span> required lessons!
                        </p>
                        <button className="flex items-center gap-1 text-[10px] text-[#00E5CC] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-opacity ml-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5CC]">
                          DETAILS
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative z-10 pt-4">
                    <div className="relative h-1.5 w-full flex items-center">
                      <div className="absolute inset-0 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #00E5CC, #00B5A0)' }}
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        />
                      </div>
                      <motion.div
                        className="absolute flex items-center justify-center transform -translate-x-1/2 z-20 pointer-events-none"
                        initial={{ left: 0, opacity: 0 }}
                        animate={{ left: '65%', opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      >
                        <div className="absolute w-5 h-5 rounded-full bg-[#00E5CC]/40 blur-[4px]" />
                        <motion.svg 
                          width="18" height="18" viewBox="0 0 24 24" fill="#F0F4F3" stroke="#F0F4F3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"
                          animate={{ y: [0, -0.5, 0], rotate: [0, 0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <path d="M3 10l3-4h8l4 4h4v4h-2a2 2 0 1 1-4 0H8a2 2 0 1 1-4 0H2v-4h1z"/>
                          <path d="M8 9h4" stroke="#080F0E" strokeWidth="2" strokeLinecap="round" />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-2 relative z-10">
                    <p className="text-[12px] text-white/60 font-medium tracking-wide">
                      Est. completion — August 26
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-6 mt-12">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A9B97]">MANAGE YOUR SCHEDULE</h3>
                <button className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-[#00E5CC] hover:text-white transition-colors active:scale-95" aria-label="More options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {lessons.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="relative rounded-[32px] mb-3 overflow-hidden">
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: -160, right: 0 }}
                        dragElastic={0.05}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="relative flex w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5CC]"
                        role="button"
                        aria-label={`View details for ${lesson.title} on ${lesson.month} ${lesson.day}`}
                        tabIndex={0}
                      >
                        <div className="relative z-10 w-full shrink-0 rounded-[32px] bg-white/[0.06] backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing">
                          {/* Rebalanced Inner Card Layout */}
                          <div className="flex items-center py-4 pr-6 relative z-10 pl-2">
                            
                            {/* Left: Glass Calendar Badge */}
                            <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md ml-3 mr-4 shrink-0">
                              <span className="text-[10px] uppercase font-bold text-[#00E5CC] tracking-[0.2em] mb-0.5">{lesson.month}</span>
                              <span className="text-[22px] font-serif text-white leading-none">{lesson.day}</span>
                            </div>

                            {/* Center: Title & Instructor (Vertically Centered Stack) */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 h-full py-1">
                              
                              {/* Title & Chevron Row */}
                              <div className="flex items-center gap-2">
                                <p className="text-[16px] font-semibold text-white leading-tight tracking-wide">
                                  {lesson.title}
                                </p>
                                <button className="opacity-40 group-hover:opacity-100 transition-opacity focus-visible:outline-none" aria-label="Expand details">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </button>
                              </div>

                              {/* Premium Instructor Row */}
                              <div className="flex items-center gap-1.5 text-white/50">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="font-sans text-[13px] font-medium tracking-wide">
                                  {lesson.instructor}
                                </span>
                              </div>
                            </div>

                            {/* Right: Status & Time (Perfectly Right-Aligned Stack) */}
                            <div className="flex flex-col items-end justify-center h-full gap-2 shrink-0">
                              {/* "Coming Soon" Badge or Spacer */}
                              {index === 0 ? (
                                <span className="text-[#00E5CC] px-2 py-[2px] rounded-full bg-[#00E5CC]/10 font-bold uppercase tracking-[0.15em] text-[7px] border border-[#00E5CC]/20 leading-none">COMING SOON</span>
                              ) : (
                                <span className="h-[10px]" /> 
                              )}

                              {/* Unified Time Block */}
                              <div className="flex items-center gap-1.5 text-white">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 mb-[1px]">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="font-serif text-[20px] tracking-wide">{lesson.time.split(' ')[0].replace(/^0/, '')}</span>
                                <span className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-white/[0.12] font-sans text-[8px] font-bold tracking-[0.15em] text-white/70 uppercase ml-0.5">
                                  {lesson.time.split(' ')[1] || 'AM'}
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Trailing Sweep Actions */}
                        <div className="absolute top-0 bottom-0 left-[100%] flex items-stretch w-[160px]">
                          
                          {/* Reschedule Button (Left - Silver Grey) */}
                          <button
                            className="flex flex-col items-center justify-center gap-1 w-[80px] bg-[#CFD8D7] active:opacity-80 transition-opacity focus-visible:outline-none"
                            onClick={() => onReschedule()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#080F0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                              <polyline points="8 14 12 18 16 14"/>
                            </svg>
                            <span className="text-[11px] font-bold tracking-wide text-[#080F0E]">Reschedule</span>
                          </button>

                          {/* Cancel Button (Right - Cyan) */}
                          <button
                            className="flex flex-col items-center justify-center gap-1 w-[80px] bg-[#00E5CC] active:opacity-80 transition-opacity focus-visible:outline-none"
                            onClick={() => {
                              setTargetLessonId(lesson.id);
                              setShowCancelConfirm(true);
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#080F0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            <span className="text-[11px] font-bold tracking-wide text-[#080F0E]">Cancel</span>
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyScheduleState />
              )}
            </section>
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* Cancel Confirmation Overlay */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-[#080F0E]/60 backdrop-blur-md" onClick={() => setShowCancelConfirm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm rounded-[32px] p-8 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.6)] text-center overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'rgba(0,229,204,0.05)', filter: 'blur(40px)' }} />

              {/* Premium X Close Button */}
              <button 
                onClick={() => setShowCancelConfirm(false)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-none z-20"
                aria-label="Close dialog"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <h2 className="text-[26px] font-bold text-[#F0F4F3] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Need to <span className="text-[#00E5CC]">change</span> plans?
              </h2>
              <p className="text-white/60 font-medium text-[14px] mb-6">
                No problem. Just review the policy below before we clear this from your schedule.
              </p>

              <div className="w-full bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-5 mb-8 text-left">
                <p className="font-sans text-[9px] text-white/60 tracking-[0.2em] uppercase mb-4">Cancellation Policy</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <p className="text-[13px] text-white/70 font-medium leading-snug">
                      Within 24h notice — a 50% late cancellation fee applies.
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/[0.08]" />
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p className="text-[13px] text-white/70 font-medium leading-snug">
                      24h+ notice — full lesson credit will be issued.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    if (targetLessonId) onCancelLesson(targetLessonId);
                    setShowCancelConfirm(false);
                  }}
                  className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00B5A0] text-[#080F0E] font-bold tracking-[0.1em] text-[13px] shadow-[0_8px_20px_rgba(0,229,204,0.3)] active:scale-[0.98] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5CC]"
                >
                  Cancel Lesson
                </button>
                <button 
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full h-[56px] rounded-full text-white font-semibold tracking-wide text-[13px] border border-white/20 bg-white/[0.02] hover:bg-white/[0.08] active:scale-[0.98] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5CC]"
                >
                  No, Keep It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liquid Glass Floating Footer Pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[624px] h-[72px] z-[90]">
        <div className="w-full h-full bg-white/[0.08] backdrop-blur-3xl border border-white/[0.15] border-t-white/[0.25] shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[36px] flex items-center justify-between px-4 relative" aria-label="Bottom navigation" role="navigation">
          
          <motion.button 
            onClick={() => setActiveTab('schedule')}
            whileTap={{ scale: 0.9 }}
            className="relative flex flex-col items-center justify-center min-w-[56px] h-full gap-1"
            aria-label="Navigate to Schedule"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'schedule' ? '#00E5CC' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'schedule' ? 'text-[#00E5CC]' : 'text-white/60'}`}>Schedule</span>
            {activeTab === 'schedule' && <motion.div layoutId="navDot" className="absolute bottom-2 w-1 h-1 rounded-full bg-[#00E5CC] shadow-[0_0_8px_#00E5CC]" />}
          </motion.button>

          <motion.div 
            className="relative flex flex-col items-center justify-center min-w-[56px] h-full gap-1 opacity-40 pointer-events-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span className="text-[11px] tracking-wide font-semibold text-white/60">Study</span>
          </motion.div>

          <motion.button 
            onClick={onAddLesson}
            whileTap={{ scale: 0.9 }}
            className="relative flex flex-col items-center justify-center -mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5CC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080F0E]"
            aria-label="Book a new lesson"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,229,204,0.3)] bg-gradient-to-r from-[#00E5CC] to-[#00B5A0]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080F0E" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
          </motion.button>

          <motion.div 
            className="relative flex flex-col items-center justify-center min-w-[56px] h-full gap-1 opacity-40 pointer-events-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span className="text-[11px] tracking-wide font-semibold text-white/60">Payments</span>
          </motion.div>

          <motion.div 
            className="relative flex flex-col items-center justify-center min-w-[56px] h-full gap-1 opacity-40 pointer-events-none"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-[11px] tracking-wide font-semibold text-white/60">Profile</span>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
