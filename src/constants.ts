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
  { id: 1, month: 'MAY', day: '25', title: 'Highway Merging', 
    instructor: 'Marcus Chen', time: '09:00 AM', 
    accentColor: '#00E5CC', location: 'South Shore Route' },
  { id: 2, month: 'JUNE', day: '14', title: 'Night Driving', 
    instructor: 'Marcus Chen', time: '07:30 PM', 
    accentColor: '#00E5CC', location: 'Longueuil Center' },
  { id: 3, month: 'JULY', day: '08', title: 'Mock Driving Test', 
    instructor: 'Alex Reed', time: '11:00 AM', 
    accentColor: '#00E5CC', location: 'Brossard Pickup' },
  { id: 4, month: 'AUGUST', day: '26', title: 'City Parking', 
    instructor: 'Sarah Vance', time: '02:00 PM', 
    accentColor: '#00E5CC', location: 'Downtown Circuit' }, 
];
