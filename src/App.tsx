import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import SelectSession from './screens/SelectSession';
import BookingConfirmed from './screens/BookingConfirmed';
import LessonCancelled from './screens/LessonCancelled';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('dashboard'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <SplashScreen />
          </motion.div>
        )}
        {currentScreen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Dashboard 
              onAddLesson={() => setCurrentScreen('select-session')} 
              onReschedule={() => setCurrentScreen('select-session')}
              onCancel={() => setCurrentScreen('lesson-cancelled')}
            />
          </motion.div>
        )}
        {currentScreen === 'select-session' && (
          <motion.div
            key="select-session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <SelectSession 
              onConfirm={() => setCurrentScreen('booking-confirmed')}
              onBack={() => setCurrentScreen('dashboard')}
            />
          </motion.div>
        )}
        {currentScreen === 'booking-confirmed' && (
          <motion.div
            key="booking-confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <BookingConfirmed onDone={() => setCurrentScreen('dashboard')} />
          </motion.div>
        )}
        {currentScreen === 'lesson-cancelled' && (
          <motion.div
            key="lesson-cancelled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <LessonCancelled onDone={() => setCurrentScreen('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

