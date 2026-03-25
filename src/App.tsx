import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import SelectSession from './screens/SelectSession';
import { UPCOMING_LESSONS as INITIAL_LESSONS } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [lessons, setLessons] = useState(INITIAL_LESSONS.slice(0, 3));
  const [pendingLesson, setPendingLesson] = useState<any>(null);

  const iosTransition = {
    initial: { opacity: 0, scale: 0.96, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.04, y: -15 },
    transition: { type: "spring", stiffness: 300, damping: 28, mass: 0.9 }
  };

  return (
    <main className="relative overflow-hidden w-full h-screen text-on-surface selection:bg-primary/30 bg-[#080F0E] pb-safe">
      
      {/* The Liquid Void — Organic Background Blobs (Global) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#080F0E]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#080F0E_70%)] z-[1]" />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[oklch(80%_0.12_80)]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[oklch(30%_0.08_60)]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[oklch(80%_0.12_80)]/[0.025] rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-10"
          >
            <SplashScreen onAnimationComplete={() => setCurrentScreen('login')} />
          </motion.div>
        )}
        {currentScreen === 'login' && (
          <motion.div
            key="login"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-10"
          >
            <Login onLogin={() => setCurrentScreen('dashboard')} />
          </motion.div>
        )}
        {currentScreen === 'dashboard' && (
          <motion.div
            key="dashboard"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-10"
          >
            <Dashboard 
              lessons={lessons}
              onAddLesson={() => setCurrentScreen('select-session')} 
              onReschedule={() => setCurrentScreen('select-session')}
              onCancelLesson={(id) => {
                setLessons(prev => prev.filter(l => l.id !== id));
              }}
            />
          </motion.div>
        )}
        {currentScreen === 'select-session' && (
          <motion.div
            key="select-session"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-50"
          >
            <SelectSession 
              lessons={lessons}
              onConfirmBooking={(newLesson) => {
                setLessons(prev => {
                  // If it's a reschedule, we might want to replace. But for now, just add.
                  return [...prev, newLesson];
                });
                setCurrentScreen('dashboard');
              }}
              onBack={() => setCurrentScreen('dashboard')}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
