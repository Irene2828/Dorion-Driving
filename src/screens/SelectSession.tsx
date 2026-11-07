import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Calendar as CalendarIcon, User } from 'lucide-react';
import { INSTRUCTORS } from '../constants';
import { Lesson } from '../types';
import BottomNav from '../components/BottomNav';

interface SelectSessionProps {
  lessons: Lesson[];
  onConfirmBooking: (lesson: any) => void;
  onBack: () => void;
}

const DAYS = [
  { id: '25', day: 'Mon', date: '25', fullDate: 'Monday, May 25', available: true, month: 'MAY' },
  { id: '26', day: 'Tue', date: '26', fullDate: 'Tuesday, May 26', available: false, month: 'MAY' },
  { id: '27', day: 'Wed', date: '27', fullDate: 'Wednesday, May 27', available: true, month: 'MAY' },
  { id: '28', day: 'Thu', date: '28', available: false, month: 'MAY' },
  { id: '29', day: 'Fri', date: '29', available: true, month: 'MAY' },
  { id: '02', day: 'Tue', date: '02', available: true, month: 'JUN' },
];

const SLOTS = [
  { id: '0900', time: '09:00 — 10:30', label: 'Lesson Session', color: 'bg-primary', period: 'MORNING', booked: false },
  { id: '1100', time: '11:00 — 12:30', label: 'Lesson Session', color: 'bg-[#FF9F43]', period: 'MIDDAY', booked: false },
  { id: '1400', time: '14:00 — 15:30', label: 'Lesson Session', color: 'bg-primary', period: 'AFTERNOON', booked: false },
  { id: '1600', time: '16:00 — 17:30', label: 'Lesson Session', color: 'bg-on-surface-micro', period: 'EVENING', booked: true },
];

export default function SelectSession({ lessons, onConfirmBooking, onBack }: SelectSessionProps) {
  const [selectedInstructorId, setSelectedInstructor] = useState<string | number | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedLesson, setConfirmedLesson] = useState<any>(null);

  const [shakeField, setShakeField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const shakeAnimation = {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 }
  };

  // Compute next session number from existing lessons
  const sessionNumbers = lessons
    .map(l => {
      const match = l.title.match(/Session (\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => n > 0);
  const nextSessionNum = sessionNumbers.length > 0 ? Math.max(...sessionNumbers) + 1 : 20;

  const onConfirm = () => {
    const instructor = INSTRUCTORS.find(i => i.id === selectedInstructorId);
    const timeStr = selectedTime.time.split(' — ')[0];
    const hourNum = parseInt(timeStr.split(':')[0], 10);
    const minSuffix = timeStr.split(':')[1];
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    const finalFormattedTime = `${hour12 < 10 ? '0'+hour12 : hour12}:${minSuffix} ${ampm}`;

    const builtLesson = {
      id: Date.now(),
      month: selectedDate.month,
      day: selectedDate.date,
      title: `Session ${nextSessionNum}`,
      instructor: instructor?.name || 'Instructor',
      time: finalFormattedTime,
      accentColor: 'var(--color-primary)',
      location: 'Main Route'
    };

    setConfirmedLesson(builtLesson);
    setBookingConfirmed(true);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-48 w-full max-w-[600px] mx-auto px-4 sm:px-6">
      <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-5 pb-4 flex justify-center bg-white/[0.04] backdrop-blur-3xl border-b border-white/[0.08]">
        <div className="w-full max-w-[600px] flex justify-between items-center relative">
          <button onClick={onBack} className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-white/5 text-on-surface hover:text-[var(--color-primary)] transition-colors">
            <ChevronLeft size={20} className="mr-0.5" />
          </button>

          {/* Centered: Icon + Wordmark lockup */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            {/* Glass icon tile — identical to splash */}
            <div className="relative w-9 h-9 rounded-[12px] bg-white/[0.03] border border-white/[0.06] backdrop-blur-2xl flex items-center justify-center overflow-hidden">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(232,213,163,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="9" x2="12" y2="5" />
                <line x1="9.4" y1="13.5" x2="5.8" y2="15.5" />
                <line x1="14.6" y1="13.5" x2="18.2" y2="15.5" />
              </svg>
            </div>
            {/* Wordmark */}
            <h1 className="font-serif text-[18px] tracking-[0.22em] font-bold text-on-surface leading-none">
              DORION
            </h1>
          </div>

          <button className="relative w-12 h-12 flex items-center justify-center active:opacity-60 transition-opacity text-on-surface-variant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </header>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 sm:p-6 relative overflow-hidden rounded-[32px] bg-surface-container backdrop-blur-2xl border border-outline-variant shadow-[0_12px_40px_rgba(0,0,0,0.3)] mb-12"
      >
        <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'oklch(40% 0.1 80 / 10%)', filter: 'blur(20px)' }} />
        <div className="relative z-10">
          <h2 className="text-[18px] font-semibold text-on-surface leading-tight mb-1.5 font-sans">
            Let's get you on the road.
          </h2>
          <p className="text-[14px] text-on-surface-variant leading-normal font-sans">
            Pick a date and time that works for you, Julian.
          </p>
        </div>
      </motion.div>

      <section className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface font-sans">SELECT DATE</h3>
          <span className="text-on-surface text-[10px] font-medium uppercase tracking-[0.2em] font-sans">May 2026</span>
        </div>
        <motion.div 
          animate={shakeField === 'date' ? shakeAnimation : {}}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6"
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
                  ${isActive ? 'bg-white/[0.12] border border-primary/60 rounded-[16px]' : 
                    d.available ? 'bg-surface-container border border-outline-variant rounded-[16px]' : 
                    'bg-white/[0.01] border border-white/[0.05] rounded-[16px] opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex flex-col items-center justify-center relative z-10">
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ${isActive ? 'text-primary' : 'text-on-surface'}`}>{d.month}</span>
                  <span className={`text-[26px] font-bold relative z-10 font-serif ${isActive ? 'text-on-surface' : 'text-white'} ${d.available ? '' : 'line-through'}`}>{d.date}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <div className="flex flex-col gap-8">
        <section>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface mb-4">AVAILABLE TIMES</h3>
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
                  className={`w-full py-5 px-4 sm:px-6 flex justify-between items-center transition-all relative overflow-hidden text-left active:scale-[0.98] hover:bg-white/5 ${isSelected ? 'bg-white/[0.12] border border-primary/60 rounded-[16px]' : 'bg-surface-container border border-outline-variant rounded-[16px]'}`}
                >
                  <div className="flex-1 relative z-10 pl-2">
                    <span className="text-[18px] font-serif font-normal text-white tracking-wide">
                      {slot.time}
                    </span>
                    <p className="text-[13px] font-medium font-sans text-white/50 mt-1 uppercase tracking-wide">
                      90 min
                    </p>
                  </div>
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0 relative z-10 text-primary">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface mb-4">INSTRUCTOR</h3>
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
                className={`p-4 sm:p-6 flex flex-col items-center text-center transition-all relative overflow-hidden hover:bg-white/5 active:scale-95 ${selectedInstructorId === instructor.id ? 'bg-white/[0.12] border border-primary/60 rounded-[16px]' : 'bg-surface-container border border-outline-variant rounded-[16px]'}`}
              >
                <div className={`relative z-10 w-11 h-11 rounded-full p-[2px] mb-3 border ${selectedInstructorId === instructor.id ? 'border-primary' : 'border-transparent'}`}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/[0.1] to-transparent border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
                    <span className="font-serif text-[14px] text-white tracking-widest font-bold">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h4 className={`relative z-10 text-[14px] leading-tight tracking-wide font-semibold font-sans mt-1.5 ${selectedInstructorId === instructor.id ? 'text-primary' : 'text-on-surface'}`}>
                  {instructor.name.split(' ').map((part, i) => (
                    <span key={i} className="block">{part}</span>
                  ))}
                </h4>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </div>

      <div className="mt-12">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface mb-4">CONFIRM SELECTION</h3>
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.div layoutId="hero-card" className="w-full bg-surface-container backdrop-blur-2xl border border-outline-variant rounded-[32px] px-4 sm:px-6 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
                <span className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] mb-0.5">
                  {selectedDate?.month || 'MAY'}
                </span>
                <span className="text-[22px] font-serif text-on-surface leading-none">
                  {selectedDate?.date || '--'}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <p className="font-sans text-[9px] text-on-surface tracking-[0.2em] uppercase">Scheduled Lesson</p>
                <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight truncate">
                  Session {nextSessionNum}
                </h3>
                <div className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-sans text-[14px] font-medium leading-none text-on-surface-variant">
                    {INSTRUCTORS.find(i => i.id === selectedInstructorId)?.name || 'Marcus Chen'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-center h-full shrink-0 pl-2">
                <div className="flex items-center gap-1.5 text-white">
                  <span className="font-serif text-[20px] tracking-wide">
                    {selectedTime ? selectedTime.time.split(' — ')[0] : '--:--'}
                  </span>
                  <div className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-white/[0.12] font-sans text-[9px] font-bold tracking-[0.15em] text-primary uppercase">
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
              className="relative w-full h-[56px] rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary text-[16px] font-semibold tracking-wide shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all flex items-center justify-center overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
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

      <BottomNav 
        activeTab="schedule" 
        onTabChange={(tab) => tab === 'schedule' && onBack()} 
        disabledTabs={['study', 'payments', 'profile']}
      />

      <AnimatePresence>
        {bookingConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
          >
            <div
              className="absolute inset-0 bg-[#121316]/80 backdrop-blur-md"
              onClick={() => { setBookingConfirmed(false); onConfirmBooking(confirmedLesson); }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
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

                <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center z-10">
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5 relative z-10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <motion.path 
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-[28px] font-bold text-on-surface mb-2 font-serif">
                  You're <span className="text-primary">all set</span>, Julian.
                </h1>
                <p className="text-[14px] text-white/70 mb-2 font-sans">
                  We've locked in your lesson and an email is on the way.
                </p>

                {/* The Tightened Receipt Card */}
                <motion.div 
                  layoutId="hero-card"
                  className="w-full bg-surface-container border border-outline-variant rounded-[24px] p-5 mt-4 mb-6 flex flex-col gap-3 text-left relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center gap-4 border-b border-white/[0.08] pb-3 mb-1">
                    <div className="flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-[18px] bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] backdrop-blur-md shrink-0">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] mb-0.5">
                        {confirmedLesson?.month || 'MAY'}
                      </span>
                      <span className="text-[22px] font-serif text-on-surface leading-none">
                        {confirmedLesson?.day || '27'}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center gap-1 min-w-0">
                      <p className="font-sans text-[9px] text-on-surface-variant tracking-[0.2em] uppercase">Scheduled Lesson</p>
                      <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight truncate">
                        {confirmedLesson?.title || 'Session 20'}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="font-sans text-[13px] font-medium tracking-wide truncate">
                        {confirmedLesson?.instructor || 'Sarah Vance'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="font-serif text-[18px] tracking-wide">
                        {confirmedLesson?.time?.split(' ')[0] || '09:00'}
                      </span>
                      <span className="px-1.5 py-[2px] rounded-md bg-white/[0.08] border border-outline-variant font-sans text-[9px] font-bold tracking-[0.15em] text-primary uppercase">
                        {confirmedLesson?.time?.split(' ')[1] || 'AM'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col w-full relative z-10 pt-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onConfirmBooking(confirmedLesson)}
                    className="w-full h-[56px] rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary text-[16px] font-semibold tracking-wide shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-center justify-center focus-visible:outline-none"
                  >
                    Back to Dashboard
                  </motion.button>
                  <p className="font-sans text-[10px] text-white/70 font-medium tracking-wide text-center mt-3">
                    A confirmation email is on its way.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-white/[0.1] backdrop-blur-3xl border border-primary/30 shadow-[0_8px_32px_oklch(80%_0.12_80_/_20%)]"
          >
            <p className="text-[13px] font-medium text-white tracking-wide whitespace-nowrap">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
