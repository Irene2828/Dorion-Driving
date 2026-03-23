import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Lock, Calendar as CalendarIcon, User } from 'lucide-react';
import { INSTRUCTORS } from '../constants';

interface SelectSessionProps {
  onConfirmBooking: (lesson: any) => void;
  onBack: () => void;
}

const DAYS = [
  { id: '25', day: 'Mon', date: '25', fullDate: 'Monday, May 25', available: true, month: 'MAY' },
  { id: '26', day: 'Tue', date: '26', fullDate: 'Tuesday, May 26', available: false, month: 'MAY' },
  { id: '27', day: 'Wed', date: '27', fullDate: 'Wednesday, May 27', available: true, month: 'MAY' },
  { id: '28', day: 'Thu', date: '28', fullDate: 'Thursday, May 28', available: false, month: 'MAY' },
  { id: '29', day: 'Fri', date: '29', fullDate: 'Friday, May 29', available: true, month: 'MAY' },
  { id: '02', day: 'Tue', date: '02', fullDate: 'Tuesday, June 02', available: true, month: 'JUNE' },
];

const SLOTS = [
  { id: '0900', time: '09:00 — 10:30', label: 'Morning Drift', color: '#00E5CC', period: 'MORNING', booked: false },
  { id: '1100', time: '11:00 — 12:30', label: 'Peak Performance', color: '#FF9F43', period: 'MIDDAY', booked: false },
  { id: '1400', time: '14:00 — 15:30', label: 'Midday Velocity', color: '#00E5CC', period: 'AFTERNOON', booked: false },
  { id: '1600', time: '16:00 — 17:30', label: 'Sunset Circuit', color: '#3D5553', period: 'EVENING', booked: true },
];

export default function SelectSession({ onConfirmBooking, onBack }: SelectSessionProps) {
  const [selectedInstructorId, setSelectedInstructor] = useState<string | number | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);

  const [shakeField, setShakeField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const shakeAnimation = {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 }
  };

  const onConfirm = () => {
    const instructor = INSTRUCTORS.find(i => i.id === selectedInstructorId);
    
    // Parse the start time (e.g., "14:00" from "14:00 — 15:30")
    const timeStr = selectedTime.time.split(' — ')[0];
    const hourNum = parseInt(timeStr.split(':')[0], 10);
    const minSuffix = timeStr.split(':')[1];
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    const finalFormattedTime = `${hour12 < 10 ? '0'+hour12 : hour12}:${minSuffix} ${ampm}`;

    onConfirmBooking({
      id: Date.now(),
      month: selectedDate.month,
      day: selectedDate.date,
      title: 'Practice Lesson',
      instructor: instructor?.name || 'Instructor',
      time: finalFormattedTime,
      accentColor: '#00E5CC',
      location: 'Main Route'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 pb-[160px] px-6 max-w-[480px] mx-auto relative"
    >
      <header className="fixed top-0 inset-x-0 z-50 px-6 pt-5 pb-4 flex justify-between items-center bg-white/[0.04] backdrop-blur-3xl border-b border-white/[0.08]">
        {/* Left: Back Button styled like avatar */}
        <button onClick={onBack} className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-white/5 text-[#7A9B97] hover:text-[#00E5CC] transition-colors">
          <ChevronLeft size={20} className="mr-0.5" />
        </button>

        {/* Center: Wordmark */}
        <div className="flex flex-col items-center justify-center text-center">
          <span style={{ color: '#00E5CC' }}
            className="text-[18px] font-bold tracking-widest uppercase leading-none font-sans">
            DORION
          </span>
        </div>

        {/* Right: Chat */}
        <button className="relative w-12 h-12 flex items-center justify-center active:opacity-60 transition-opacity text-[#7A9B97]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00E5CC]" />
        </button>
      </header>

      {/* Conversational Booking Header */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 relative overflow-hidden rounded-[32px] bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.3)] mb-12"
      >
        <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'rgba(0,229,204,0.05)', filter: 'blur(20px)' }} />
        <div className="relative z-10">
          <h2 className="text-[18px] font-semibold text-[#F0F4F3] leading-tight mb-1.5 font-sans">
            Let's get you on the road.
          </h2>
          <p className="text-[14px] text-[#7A9B97] leading-normal font-sans">
            Pick a date and time that works for you, Julian.
          </p>
        </div>
      </motion.div>

      <section className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A9B97] font-sans">SELECT DATE</h3>
          <span className="text-[#F0F4F3]/60 text-xs font-medium uppercase tracking-widest font-sans">May 2026</span>
        </div>
        <motion.div 
          animate={shakeField === 'date' ? shakeAnimation : {}}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6"
        >
          {DAYS.map((d, i) => {
            const isActive = selectedDate?.id === d.id;
            return (
              <motion.div 
                key={`${d.month}-${d.date}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => d.available && setSelectedDate(d)}
                className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative overflow-hidden active:scale-95 group 
                  ${isActive ? 'bg-white/[0.12] border border-[#00E5CC]/60 rounded-[16px]' : 
                    d.available ? 'bg-white/[0.03] border border-white/[0.08] rounded-[16px]' : 
                    'bg-white/[0.01] border border-white/[0.05] rounded-[16px] opacity-30 cursor-not-allowed'}`}
              >
                <div className="flex flex-col items-center justify-center relative z-10">
                  <span className={`text-[8px] uppercase tracking-[0.1em] font-bold mb-1 ${isActive ? 'text-[#00E5CC]' : 'text-white/40'}`}>{d.month}</span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-bold relative z-10 mb-1 pl-1 font-sans ${isActive ? 'text-[#00E5CC]' : 'text-white/60'}`}>{d.day}</span>
                  <span className={`text-[26px] font-bold relative z-10 pl-1 font-serif ${isActive ? 'text-[#F0F4F3]' : 'text-white'}`}>{d.date}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <div className="flex flex-col gap-8">
        <section>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A9B97] mb-4">AVAILABLE TIMES</h3>
          <motion.div 
            animate={shakeField === 'time' ? shakeAnimation : {}}
            className="space-y-3"
          >
            {SLOTS.filter(slot => !slot.booked).map((slot, i) => {
              const isSelected = selectedTime?.id === slot.id;
              return (
                <motion.button 
                  key={slot.time}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  onClick={() => setSelectedTime(slot)}
                  className={`w-full py-5 px-6 flex justify-between items-center transition-all relative overflow-hidden text-left active:scale-[0.98] hover:bg-white/5 ${isSelected ? 'bg-white/[0.12] border border-[#00E5CC]/60 rounded-[16px]' : 'bg-white/[0.03] border border-white/[0.08] rounded-[16px]'}`}
                >
                  <div className="flex-1 relative z-10 pl-2">
                    <span className="text-[20px] font-bold font-serif text-white">{slot.time}</span>
                    <p className="text-[10px] uppercase tracking-[0.2em] mt-1 font-bold font-sans text-white/70">
                      {slot.period}
                    </p>
                  </div>
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00E5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0 relative z-10">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A9B97] mb-4">INSTRUCTOR</h3>
          <motion.div 
            animate={shakeField === 'instructor' ? shakeAnimation : {}}
            className="grid grid-cols-3 gap-3"
          >
            {INSTRUCTORS.map((instructor, i) => (
              <motion.button 
                key={instructor.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => setSelectedInstructor(instructor.id)}
                className={`p-6 flex flex-col items-center text-center transition-all relative overflow-hidden hover:bg-white/5 active:scale-95 ${selectedInstructorId === instructor.id ? 'bg-white/[0.12] border border-[#00E5CC]/60 rounded-[16px]' : 'bg-white/[0.03] border border-white/[0.08] rounded-[16px]'}`}
              >
                <div className={`relative z-10 w-11 h-11 rounded-full p-[2px] mb-3 ml-1 border ${selectedInstructorId === instructor.id ? 'border-[#00E5CC]' : 'border-transparent'}`}>
                  <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h4 className={`relative z-10 text-[9px] uppercase tracking-widest font-bold pl-1 font-sans ${selectedInstructorId === instructor.id ? 'text-[#00E5CC]' : 'text-white/70'}`}>{instructor.name}</h4>
                
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mt-1">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </div>

      <div className="mt-12">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A9B97] mb-4">CONFIRM SELECTION</h3>
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Unified Premium Preview Card */}
          <motion.div layoutId="hero-card" className="w-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] rounded-[32px] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-4">
              
              {/* The Global Standard Glass Calendar Badge */}
              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
                <span className="text-[10px] uppercase font-bold text-[#00E5CC] tracking-[0.2em] mb-0.5">
                  {selectedDate?.month || 'MAY'}
                </span>
                <span className="text-[22px] font-serif text-white leading-none">
                  {selectedDate?.date || '--'}
                </span>
              </div>

              {/* The Text Stack: Hero Hierarchy */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <p className="font-sans text-[9px] text-[#7A9B97] tracking-[0.2em] uppercase">Scheduled Lesson</p>
                
                {/* Hero Title */}
                <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight truncate">
                  {selectedTime?.label || 'Practice Lesson'}
                </h3>
                
                {/* Supporting Instructor Detail */}
                <div className="flex items-center gap-1.5 text-white/50">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-sans text-[13px] font-medium leading-none">
                    {INSTRUCTORS.find(i => i.id === selectedInstructorId)?.name || 'Marcus Chen'}
                  </span>
                </div>
              </div>

              {/* The Time: Perfectly Centered Right-Aligned */}
              <div className="flex flex-col items-end justify-center h-full shrink-0 pl-2">
                <div className="flex items-center gap-1.5 text-white">
                  <span className="font-serif text-[20px] tracking-wide">
                    {selectedTime ? selectedTime.time.split(' — ')[0] : '--:--'}
                  </span>
                  <div className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-white/[0.12] font-sans text-[9px] font-bold tracking-[0.15em] text-white/70 uppercase">
                    {selectedTime ? (parseInt(selectedTime.time.split(':')[0]) >= 12 ? 'PM' : 'AM') : 'PM'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col w-full relative z-10 pt-8">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!selectedDate) {
                  setShakeField('date');
                  setToastMessage("Let's pick a date first, Julian.");
                  setTimeout(() => { setShakeField(null); setToastMessage(null); }, 3000);
                  return;
                }
                if (!selectedTime) {
                  setShakeField('time');
                  setToastMessage("What time works best for you?");
                  setTimeout(() => { setShakeField(null); setToastMessage(null); }, 3000);
                  return;
                }
                if (!selectedInstructorId) {
                  setShakeField('instructor');
                  setToastMessage("Don't forget to choose your instructor.");
                  setTimeout(() => { setShakeField(null); setToastMessage(null); }, 3000);
                  return;
                }
                
                onConfirm();
              }}
              className="relative w-full h-[56px] rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00B5A0] text-[#080F0E] font-bold tracking-[0.1em] text-[13px] shadow-[0_8px_20px_rgba(0,229,204,0.3)] transition-all flex items-center justify-center overflow-hidden"
            >
              {/* Haptic Ripple Glow */}
              <motion.div 
                className="absolute inset-0 bg-[#00E5CC]/20 rounded-full blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">Confirm Booking</span>
            </motion.button>
            <p className="font-sans text-[12px] text-white/50 font-medium tracking-wide text-center mt-4 px-4">
              Cancellations made 24+ hours before the session are free.
            </p>
          </div>
        </motion.div>
    </div>

      {/* Bottom Nav Footer */}
      <div className="fixed bottom-0 inset-x-0 z-[90]"
        style={{
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)'
        }}
      >
        <div className="flex items-center justify-around px-4 pt-3 pb-8">
          
          {/* Schedule */}
          <button 
            onClick={onBack}
            className="flex flex-col items-center gap-1 min-w-[64px] active:opacity-60 transition-opacity"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" 
              stroke="#3D5553" 
              strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-[11px] tracking-[0.1em] font-semibold text-[#3D5553]">
              Schedule
            </span>
          </button>

          {/* Study */}
          <button className="flex flex-col items-center gap-1 min-w-[64px] active:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#3D5553"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span className="text-[11px] tracking-[0.1em] font-semibold text-[#3D5553]">
              Study
            </span>
          </button>

          {/* New Lesson — active state for current view */}
          <button className="flex flex-col items-center gap-1 -mt-6">
            <div className="w-14 h-14 rounded-full bg-[#00E5CC] flex items-center justify-center shadow-[0_0_24px_rgba(0,229,204,0.4)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080F0E" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span className="text-[11px] tracking-[0.1em] font-semibold text-[#00E5CC]">
              RESCHEDULE
            </span>
          </button>

          {/* Payments */}
          <button className="flex flex-col items-center gap-1 min-w-[64px] active:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#3D5553"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span className="text-[11px] tracking-[0.1em] font-semibold text-[#3D5553]">
              Payments
            </span>
          </button>

          {/* Profile */}
          <button className="flex flex-col items-center gap-1 min-w-[64px] active:opacity-60 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D5553" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-[11px] tracking-[0.1em] font-semibold text-[#3D5553]">
              Profile
            </span>
          </button>

        </div>
      </div>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-white/[0.1] backdrop-blur-3xl border border-[#00E5CC]/30 shadow-[0_8px_32px_rgba(0,229,204,0.2)]"
          >
            <p className="text-[13px] font-medium text-white tracking-wide whitespace-nowrap">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
