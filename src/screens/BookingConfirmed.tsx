import { motion } from 'motion/react';
import { CheckCircle2, Mail, Calendar, Clock, User } from 'lucide-react';

interface BookingConfirmedProps {
  onDone: () => void;
}

export default function BookingConfirmed({ onDone }: BookingConfirmedProps) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="mb-12 relative"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(71,234,237,0.2)]">
          <CheckCircle2 size={48} className="text-on-primary" />
        </div>
        <div className="absolute -inset-4 border border-primary/10 rounded-full animate-pulse" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-4xl font-black tracking-tight text-on-surface mb-6 text-center"
      >
        Booking Confirmed
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-on-surface-variant text-lg max-w-md mb-12 text-center"
      >
        Your high-performance driving session is locked in. Prepare for the cockpit.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl glass rounded-2xl p-8 md:p-10 relative overflow-hidden mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Date</span>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-primary" />
              <p className="font-semibold">Wed, Oct 23</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Time</span>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-primary" />
              <p className="font-semibold">11:00 AM</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Instructor</span>
            <div className="flex items-center gap-3">
              <User size={18} className="text-primary" />
              <p className="font-semibold">Marcus Chen</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4 w-full max-w-sm mb-12"
      >
        <button 
          onClick={onDone}
          className="w-full py-5 rounded-[32px] bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold tracking-widest uppercase text-xs shadow-[0_0_30px_rgba(71,234,237,0.15)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          Back to Dashboard
        </button>
        <button className="w-full py-5 rounded-[32px] bg-surface-container-high text-on-surface font-bold tracking-widest uppercase text-xs border border-outline-variant/20 hover:bg-surface-container-highest transition-all">
          View Lesson Details
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 text-on-surface-variant/60"
      >
        <Mail size={14} />
        <p className="text-[10px] uppercase tracking-widest font-bold">Confirmation email sent to your inbox.</p>
      </motion.div>
    </motion.main>
  );
}
