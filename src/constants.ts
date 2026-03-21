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
  {
    id: 'l1',
    title: 'Highway Merging',
    instructor: 'Marcus Chen',
    date: 'Oct 12',
    time: '09:00 AM',
    duration: '90 Minutes',
  },
  {
    id: 'l2',
    title: 'Night Driving',
    instructor: 'Sarah Vance',
    date: 'Oct 15',
    time: '07:30 PM',
    duration: '60 Minutes',
  },
  {
    id: 'l3',
    title: 'Mock Driving Test',
    instructor: 'Alex Reed',
    date: 'Oct 20',
    time: '11:00 AM',
    duration: '120 Minutes',
  },
];
