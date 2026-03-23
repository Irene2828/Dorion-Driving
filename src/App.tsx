import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import SelectSession from './screens/SelectSession';
import BookingConfirmed from './screens/BookingConfirmed';
import LessonCancelled from './screens/LessonCancelled';
import { UPCOMING_LESSONS as INITIAL_LESSONS } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [pendingLesson, setPendingLesson] = useState<any>(null);

  const iosTransition = {
    initial: { opacity: 0, scale: 0.96, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.04, y: -15 },
    transition: { type: "spring", stiffness: 300, damping: 28, mass: 0.9 }
  };

  return (
    <main className="relative overflow-hidden w-full h-screen text-on-surface selection:bg-primary/30 bg-surface">
      
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full" />
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
                const lessonToCancel = lessons.find(l => l.id === id);
                if (lessonToCancel) {
                  setPendingLesson(lessonToCancel);
                  setLessons(prev => prev.filter(l => l.id !== id));
                  setCurrentScreen('lesson-cancelled');
                }
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
                setLessons(prev => [...prev, newLesson]);
                setPendingLesson(newLesson);
                setCurrentScreen('booking-confirmed');
              }}
              onBack={() => setCurrentScreen('dashboard')}
            />
          </motion.div>
        )}
        {currentScreen === 'booking-confirmed' && (
          <motion.div
            key="booking-confirmed"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-50"
          >
            <BookingConfirmed 
              pendingLesson={pendingLesson}
              onDone={() => setCurrentScreen('dashboard')} 
            />
          </motion.div>
        )}
        {currentScreen === 'lesson-cancelled' && (
          <motion.div
            key="lesson-cancelled"
            {...iosTransition}
            className="absolute inset-0 overflow-auto z-50"
          >
            <LessonCancelled 
              pendingLesson={pendingLesson}
              onDone={() => setCurrentScreen('dashboard')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
