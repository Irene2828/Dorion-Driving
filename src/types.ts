export interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

export interface Lesson {
  id: string | number;
  title: string;
  instructor: string;
  month: string;
  day: string;
  time: string;
  accentColor: string;
  location?: string;
  duration?: string;
  status?: 'upcoming' | 'completed' | 'cancelled';
}
export type Screen = 'splash' | 'login' | 'dashboard' | 'select-session' | 'booking-confirmed' | 'lesson-cancelled';
