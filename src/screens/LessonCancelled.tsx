import { motion } from 'motion/react';
import { CheckCircle2, Calendar, CreditCard } from 'lucide-react';

interface LessonCancelledProps {
  onDone: () => void;
}

export default function LessonCancelled({ onDone }: LessonCancelledProps) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass max-w-xl w-full rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 relative">
          <CheckCircle2 size={48} className="text-primary" />
          <div className="absolute inset-0 bg-primary blur-2xl opacity-10 rounded-full" />
        </div>

        <div className="space-y-6 mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
            Lesson Cancelled
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-md mx-auto">
            Your scheduled driving session has been successfully removed. A confirmation email has been sent.
          </p>
        </div>

        <div className="mb-12 p-8 rounded-2xl bg-surface-container-lowest/40 border border-outline-variant/5 text-left">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant/50 uppercase">Session Date</span>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-on-surface-variant" />
                <p className="font-medium text-on-surface">OCTOBER 24, 2024</p>
              </div>
            </div>
            <div className="w-px h-8 bg-outline-variant/20" />
            <div className="space-y-1 text-right">
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant/50 uppercase">Refund Status</span>
              <div className="flex items-center gap-2 justify-end">
                <CreditCard size={14} className="text-primary" />
                <p className="font-medium text-primary uppercase tracking-widest text-xs">Processed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onDone}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold tracking-widest text-xs py-5 px-10 rounded-[32px] hover:scale-[1.02] active:scale-95 transition-all shadow-lg uppercase"
          >
            Back to Dashboard
          </button>
          <button className="text-on-surface-variant/60 hover:text-on-surface text-[10px] font-bold tracking-widest transition-colors uppercase pt-4">
            Reschedule Lesson
          </button>
        </div>

        <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none select-none">
          <span className="font-serif text-[10rem] italic">Velocity</span>
        </div>
      </motion.div>
    </motion.main>
  );
}
