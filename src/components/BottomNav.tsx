import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'schedule' | 'study' | 'payments' | 'profile';
  onTabChange?: (tab: any) => void;
  onAddLesson?: () => void;
  disabledTabs?: string[];
}

export default function BottomNav({ 
  activeTab, 
  onTabChange, 
  onAddLesson, 
  disabledTabs = [] 
}: BottomNavProps) {
  
  const isTabDisabled = (tab: string) => disabledTabs.includes(tab);

  return (
    <div className="fixed bottom-6 inset-x-0 z-[90] pointer-events-none">
      <div className="w-full max-w-[600px] mx-auto px-4 sm:px-6 pointer-events-auto">
        <div 
          className="w-full h-[72px] bg-surface-container backdrop-blur-3xl border border-outline-variant border-t-white/[0.25] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.6)] rounded-[36px] grid grid-cols-5 items-center px-2 relative" 
          style={{ 
            paddingTop: '6px',
            paddingBottom: 'calc(6px + max(0px, env(safe-area-inset-bottom)))'
          }}
          aria-label="Bottom navigation" 
          role="navigation"
        >
            
            {/* Schedule */}
            <motion.button 
              onClick={() => !isTabDisabled('schedule') && onTabChange?.('schedule')}
              whileTap={{ scale: isTabDisabled('schedule') ? 1 : 0.9 }}
              className={`flex flex-col items-center gap-1 focus-visible:outline-none transition-opacity ${isTabDisabled('schedule') ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'schedule' ? 'var(--color-primary)' : '#F0EDE866'} strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'schedule' ? 'text-primary' : 'text-on-surface-variant'}`}>Schedule</span>
              {activeTab === 'schedule' && !isTabDisabled('schedule') && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
            </motion.button>

            {/* Study */}
            <motion.button 
              onClick={() => !isTabDisabled('study') && onTabChange?.('study')}
              whileTap={{ scale: isTabDisabled('study') ? 1 : 0.9 }}
              className={`flex flex-col items-center gap-1 focus-visible:outline-none transition-opacity ${isTabDisabled('study') ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'study' ? 'var(--color-primary)' : '#F0EDE866'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'study' ? 'text-primary' : 'text-on-surface-variant'}`}>Study</span>
              {activeTab === 'study' && !isTabDisabled('study') && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
            </motion.button>

            {/* Center: Add action */}
            {onAddLesson ? (
              <motion.button
                onClick={onAddLesson}
                whileTap={{ scale: 0.88 }}
                className="flex flex-col items-center gap-1 focus-visible:outline-none"
                aria-label="Add new lesson"
              >
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_14px_rgba(232,213,163,0.3)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </motion.button>
            ) : (
              <div className="flex flex-col items-center gap-1 opacity-100 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-primary/30 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="2" strokeLinecap="round" style={{opacity: 0.4}}>
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Bills */}
            <motion.button 
              onClick={() => !isTabDisabled('payments') && onTabChange?.('payments')}
              whileTap={{ scale: isTabDisabled('payments') ? 1 : 0.9 }}
              className={`flex flex-col items-center gap-1 focus-visible:outline-none transition-opacity ${isTabDisabled('payments') ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'payments' ? 'var(--color-primary)' : '#F0EDE866'} strokeWidth="1.5" strokeLinecap="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'payments' ? 'text-primary' : 'text-on-surface-variant'}`}>Bills</span>
              {activeTab === 'payments' && !isTabDisabled('payments') && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
            </motion.button>

            {/* Profile */}
            <motion.button 
              onClick={() => !isTabDisabled('profile') && onTabChange?.('profile')}
              whileTap={{ scale: isTabDisabled('profile') ? 1 : 0.9 }}
              className={`flex flex-col items-center gap-1 focus-visible:outline-none transition-opacity ${isTabDisabled('profile') ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <div className={`w-5 h-5 rounded-full border-[1.5px] ${activeTab === 'profile' ? 'border-primary' : 'border-on-surface-variant'} flex items-center justify-center bg-white/5`}>
                <div className={`w-3 h-3 rounded-full ${activeTab === 'profile' ? 'bg-primary' : 'bg-on-surface-variant/40'}`} />
              </div>
              <span className={`text-[11px] tracking-wide font-semibold ${activeTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`}>Profile</span>
              {activeTab === 'profile' && !isTabDisabled('profile') && <motion.div layoutId="navUnderline" className="absolute bottom-2 w-4 h-[2px] rounded-full bg-primary" />}
            </motion.button>
        </div>
      </div>
    </div>
  );
}
