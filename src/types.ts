export interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

export interface Lesson {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  status?: 'upcoming' | 'completed' | 'cancelled';
}

export type Screen = 'splash' | 'dashboard' | 'select-session' | 'booking-confirmed' | 'lesson-cancelled';
