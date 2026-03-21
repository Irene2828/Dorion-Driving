import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, Lock, Calendar as CalendarIcon, User } from 'lucide-react';
import { INSTRUCTORS } from '../constants';

interface SelectSessionProps {
  onConfirm: () => void;
  onBack: () => void;
}

const DAYS = [
  { day: 'Mon', date: '21' },
  { day: 'Tue', date: '22' },
  { day: 'Wed', date: '23', active: true },
  { day: 'Thu', date: '24' },
  { day: 'Fri', date: '25' },
];

const SLOTS = [
  { time: '09:00 — 10:30', label: 'Morning Drift' },
  { time: '11:00 — 12:30', label: 'Peak Performance', selected: true },
  { time: '14:00 — 15:30', label: 'Midday Velocity' },
  { time: '16:00 — 17:30', label: 'Sunset Circuit', booked: true },
];

export default function SelectSession({ onConfirm, onBack }: SelectSessionProps) {
  const [selectedInstructor, setSelectedInstructor] = useState(INSTRUCTORS[0].id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto"
    >
      <header className="fixed top-0 left-0 w-full z-50 glass px-8 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-on-surface/60 hover:text-primary transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-serif italic text-xl text-on-surface">Select Session</h1>
      </header>

      <section className="mb-12">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif text-5xl md:text-7xl font-black tracking-tighter mb-4"
        >
          Select Session
        </motion.h2>
        <p className="text-on-surface-variant text-lg max-w-md">
          Configure your cockpit. Choose your flight path and expert navigator.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Flight Date</h3>
          <span className="text-on-surface-variant text-xs font-medium">October 2024</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {DAYS.map((d, i) => (
            <motion.div 
              key={d.date}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex-shrink-0 w-24 h-32 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                d.active 
                  ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-[0_0_30px_rgba(71,234,237,0.3)]' 
                  : 'bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold ${d.active ? 'text-on-primary' : 'text-on-surface-variant'}`}>{d.day}</span>
              <span className="font-serif text-3xl font-black">{d.date}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Launch Window</h3>
          <div className="space-y-4">
            {SLOTS.map((slot, i) => (
              <motion.button 
                key={slot.time}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                disabled={slot.booked}
                className={`w-full p-6 rounded-2xl border flex justify-between items-center transition-all ${
                  slot.selected 
                    ? 'border-primary bg-surface-container-highest shadow-[0_0_30px_rgba(71,234,237,0.1)]' 
                    : 'border-outline-variant/10 glass hover:bg-surface-container-highest'
                } ${slot.booked ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="text-left">
                  <span className={`font-serif text-2xl font-bold ${slot.selected ? 'text-primary' : 'text-on-surface'}`}>{slot.time}</span>
                  <p className={`text-[10px] uppercase tracking-widest mt-1 font-bold ${slot.selected ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {slot.label} {slot.booked && '(Booked)'}
                  </p>
                </div>
                {slot.booked ? <Lock size={18} /> : (
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${slot.selected ? 'border-primary' : 'border-outline-variant/40'}`}>
                    {slot.selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Master Navigator</h3>
          <div className="grid grid-cols-3 gap-4">
            {INSTRUCTORS.map((instructor, i) => (
              <motion.button 
                key={instructor.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => setSelectedInstructor(instructor.id)}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${
                  selectedInstructor === instructor.id 
                    ? 'border-primary bg-surface-container-highest shadow-[0_0_20px_rgba(71,234,237,0.1)]' 
                    : 'border-outline-variant/10 glass hover:border-primary/40'
                }`}
              >
                <div className={`w-16 h-16 rounded-full p-0.5 mb-3 border-2 transition-colors ${selectedInstructor === instructor.id ? 'border-primary' : 'border-transparent'}`}>
                  <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h4 className={`font-serif text-sm font-bold ${selectedInstructor === instructor.id ? 'text-primary' : 'text-on-surface'}`}>{instructor.name.split(' ')[0]}</h4>
              </motion.button>
            ))}
          </div>
        </section>
      </div>

      <motion.section 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 glass p-8 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div className="space-y-6 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Scheduled Flight</p>
              <p className="font-serif text-xl font-bold">Wednesday, October 23 • 11:00 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Assigned Master</p>
              <p className="font-serif text-xl font-bold">Instructor Marcus Chen</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-4">
          <button 
            onClick={onConfirm}
            className="w-full md:w-80 h-16 rounded-[32px] bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(71,234,237,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            Confirm Booking
          </button>
          <p className="text-[10px] text-on-surface-variant italic text-center md:text-right">
            Cancellations made 48+ hours before the session are free.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
}
