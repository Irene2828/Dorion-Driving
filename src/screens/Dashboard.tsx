import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, TrendingUp, ChevronRight, Calendar, BookOpen, CreditCard, Settings, AlertTriangle, Plus, MessageCircle } from 'lucide-react';
import { UPCOMING_LESSONS } from '../constants';

interface DashboardProps {
  onAddLesson: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}

export default function Dashboard({ onAddLesson, onReschedule, onCancel }: DashboardProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-32"
    >
      <header className="fixed top-0 left-0 w-full z-50 glass px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20 group-hover:border-primary transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[8px] font-bold text-on-surface-variant group-hover:text-primary tracking-[0.2em] transition-colors">PROFILE</span>
          </button>
          <span className="font-serif italic text-xl text-on-surface">Velocity</span>
        </div>
        
        <button className="p-2.5 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all relative group">
          <MessageCircle size={22} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(71,234,237,0.6)] animate-pulse" />
          <div className="absolute -bottom-12 right-0 bg-surface-container-highest text-[8px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest border border-outline-variant/20">
            Message School
          </div>
        </button>
      </header>

      <main className="pt-28 px-6 max-w-2xl mx-auto">
        <section className="mb-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-serif text-2xl md:text-3xl tracking-tight mb-8"
          >
            Good morning, <span className="text-primary italic">Julian.</span>
          </motion.h1>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 flex flex-col items-center text-center w-full"
          >
            <div className="w-full mb-4 max-w-sm">
              <div className="flex justify-between items-end mb-2 px-1">
                <span className="font-serif text-xl font-bold">65%</span>
                <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Progress</span>
              </div>
              <div className="relative h-1.5 w-full bg-surface-container-highest rounded-full overflow-visible">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full" 
                />
                {/* Tiny Car Icon */}
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: '65%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                >
                  <div className="bg-primary p-1 rounded-full shadow-[0_0_10px_rgba(71,234,237,0.5)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-on-primary">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 13.1V16c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <path d="M9 17h6" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <TrendingUp size={12} className="text-primary" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Course Evolution</span>
              </div>
              <p className="text-[8px] text-on-surface-variant/60 font-medium italic">est course completion - August'26</p>
            </div>
          </motion.div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant ml-1">Upcoming Lessons</h3>
          
          <div className="space-y-4">
            {UPCOMING_LESSONS.map((lesson, index) => (
              <div key={lesson.id} className="relative group overflow-hidden rounded-2xl h-28">
                {/* Swipe Actions */}
                <div className="absolute inset-0 flex justify-end items-center pr-4 gap-3 bg-surface-container-low">
                  <button 
                    onClick={onReschedule}
                    className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-[32px] text-[10px] font-bold uppercase tracking-widest hover:bg-surface-bright transition-colors"
                  >
                    Reschedule
                  </button>
                  <button 
                    onClick={() => setShowCancelConfirm(true)}
                    className="bg-error-container text-on-error-container px-6 py-3 rounded-[32px] text-[10px] font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>

                {/* The Swipable Card */}
                <motion.div 
                  drag="x"
                  dragConstraints={{ left: -240, right: 0 }}
                  dragElastic={0.1}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative z-10 glass p-6 rounded-2xl flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-grab active:cursor-grabbing h-full"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center border-r border-outline-variant/20 pr-6">
                      <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant font-bold">Oct</p>
                      <p className="font-serif text-3xl text-on-surface">{lesson.date.split(' ')[1]}</p>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-on-surface">{lesson.title}</h3>
                      <p className="text-sm text-on-surface-variant mt-1">Instructor: {lesson.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end justify-center">
                    <p className="text-sm font-bold text-on-surface">{lesson.time}</p>
                    <ChevronRight size={18} className="text-on-surface-variant mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

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
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass p-8 rounded-[32px] w-full max-w-sm border border-outline-variant/20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-error" size={32} />
              </div>
              <h2 className="font-serif text-2xl text-on-surface mb-2">Are you sure?</h2>
              <p className="text-on-surface-variant text-sm mb-8">
                Do you really want to cancel this lesson? This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={onCancel}
                  className="w-full py-4 rounded-[32px] bg-error text-on-error font-bold text-xs uppercase tracking-widest hover:bg-error/90 transition-all"
                >
                  Yes, Cancel Lesson
                </button>
                <button 
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full py-4 rounded-[32px] bg-surface-container-high text-on-surface font-bold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-all"
                >
                  No, Keep It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-4 pb-8 pt-4 glass rounded-t-[32px] border-t border-white/5 h-24">
        <button className="flex flex-col items-center gap-1 text-primary pb-1">
          <Calendar size={18} />
          <span className="text-[9px] uppercase tracking-widest font-bold">Schedule</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface/40 hover:text-primary transition-colors pb-1">
          <BookOpen size={18} />
          <span className="text-[9px] uppercase tracking-widest font-bold">Resources</span>
        </button>
        
        {/* Inserted Add Button */}
        <div className="relative -top-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddLesson}
            className="w-16 h-16 rounded-full bg-primary text-on-primary shadow-[0_15px_30px_rgba(71,234,237,0.25)] flex items-center justify-center border-[0.5px] border-white/30"
          >
            <Plus size={36} strokeWidth={0.75} />
          </motion.button>
        </div>

        <button className="flex flex-col items-center gap-1 text-on-surface/40 hover:text-primary transition-colors pb-1">
          <CreditCard size={18} />
          <span className="text-[9px] uppercase tracking-widest font-bold">Payments</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface/40 hover:text-primary transition-colors pb-1">
          <Settings size={18} />
          <span className="text-[9px] uppercase tracking-widest font-bold">Settings</span>
        </button>
      </nav>
    </motion.div>
  );
}
