import { Instructor, Lesson } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '2',
    name: 'Sarah Vance',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '3',
    name: 'Alex Reed',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
  },
];

export const UPCOMING_LESSONS: Lesson[] = [
  { id: 1, month: 'JAN', day: '18', title: 'Session 17', 
    instructor: 'Marcus Chen', time: '09:00 AM', 
    accentColor: 'var(--color-primary)', location: 'South Shore Route' },
  { id: 2, month: 'MAR', day: '06', title: 'Session 18', 
    instructor: 'Alex Reed', time: '11:00 AM', 
    accentColor: 'var(--color-primary)', location: 'Longueuil Center' },
  { id: 3, month: 'MAY', day: '14', title: 'Session 19', 
    instructor: 'Sarah Vance', time: '02:00 PM', 
    accentColor: 'var(--color-primary)', location: 'Brossard Pickup' },
];
