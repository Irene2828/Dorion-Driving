import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-surface overflow-hidden"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-2"
      >
        <h1 className="font-serif text-7xl md:text-9xl font-black tracking-tighter text-on-surface lowercase leading-none">
          velocity
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-[0.6em] uppercase text-primary font-light opacity-80">
          Driving School
        </p>
      </motion.div>

      <div className="absolute bottom-0 flex flex-col items-center w-full">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '40vh' }}
          transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
          className="w-px bg-gradient-to-t from-transparent via-primary to-transparent opacity-40"
        />
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_20px_rgba(71,234,237,0.6)] mt-4 -translate-y-[18vh]"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0c0e0f_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
    </motion.main>
  );
}
