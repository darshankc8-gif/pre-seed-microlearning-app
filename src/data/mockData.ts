import { User, Course, Module, Quiz, RevenueData, StreakBet } from '@/types';

export const mockLearner: User = {
  id: '1',
  name: 'Alex',
  role: 'learner',
  streak: 12,
  coursesCompleted: 5,
  isPremium: false,
  points: 1250,
};

export const mockCreator: User = {
  id: '2',
  name: 'Sarah',
  role: 'creator',
  streak: 0,
  coursesCompleted: 0,
  isPremium: true,
  points: 0,
};

export const mockBets: StreakBet[] = [
  { id: 'b1', targetDays: 7, pointsWagered: 100, multiplier: 2, startDate: '2026-04-07', daysCompleted: 7, status: 'won' },
  { id: 'b2', targetDays: 14, pointsWagered: 200, multiplier: 3, startDate: '2026-04-01', daysCompleted: 10, status: 'lost' },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Masterclass',
    creatorId: '2',
    creatorName: 'Sarah',
    price: 499,
    modulesCount: 12,
    completedModules: 7,
    progress: 58,
    color: 'purple',
    learners: 1240,
    revenue: 61876,
    status: 'Live',
    timeLeft: '2h 30min',
    description: 'Master React from basics to advanced patterns',
  },
  {
    id: '2',
    title: 'Python for AI',
    creatorId: '2',
    creatorName: 'Sarah',
    price: 699,
    modulesCount: 18,
    completedModules: 3,
    progress: 17,
    color: 'green',
    learners: 890,
    revenue: 62211,
    status: 'Live',
    timeLeft: '5h 15min',
    description: 'Learn Python for machine learning and AI',
  },
  {
    id: '3',
    title: 'UI/UX Design',
    creatorId: '2',
    creatorName: 'Sarah',
    price: 399,
    modulesCount: 10,
    completedModules: 10,
    progress: 100,
    color: 'orange',
    learners: 650,
    revenue: 25935,
    status: 'Live',
    timeLeft: '0min',
    description: 'Design beautiful user interfaces',
  },
  {
    id: '4',
    title: 'Node.js Backend',
    creatorId: '2',
    creatorName: 'Sarah',
    price: 599,
    modulesCount: 15,
    completedModules: 0,
    progress: 0,
    color: 'blue',
    learners: 420,
    revenue: 25158,
    status: 'Live',
    timeLeft: '6h 45min',
    description: 'Build scalable backends with Node.js',
  },
];

export const mockModules: Module[] = [
  { id: 'm1', courseId: '1', title: 'Introduction to React', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '12:30', status: 'completed', isPremium: false },
  { id: 'm2', courseId: '1', title: 'JSX & Components', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:45', status: 'completed', isPremium: false },
  { id: 'm3', courseId: '1', title: 'State & Props', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '22:10', status: 'completed', isPremium: false },
  { id: 'm4', courseId: '1', title: 'Quiz: React Basics', videoUrl: '', duration: '5:00', status: 'completed', isPremium: false },
  { id: 'm5', courseId: '1', title: 'Hooks Deep Dive', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '25:00', status: 'completed', isPremium: false },
  { id: 'm6', courseId: '1', title: 'useEffect Patterns', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '20:15', status: 'completed', isPremium: false },
  { id: 'm7', courseId: '1', title: 'Context API', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '15:30', status: 'completed', isPremium: false },
  { id: 'm8', courseId: '1', title: 'React Router', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:00', status: 'current', isPremium: false },
  { id: 'm9', courseId: '1', title: 'Quiz: Advanced React', videoUrl: '', duration: '5:00', status: 'quiz', isPremium: false },
  { id: 'm10', courseId: '1', title: 'Performance Optimization', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '22:00', status: 'locked', isPremium: true },
  { id: 'm11', courseId: '1', title: 'Testing React Apps', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '20:00', status: 'locked', isPremium: true },
  { id: 'm12', courseId: '1', title: 'Deployment & CI/CD', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '16:00', status: 'locked', isPremium: false },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    moduleId: 'm9',
    question: 'What hook is used for side effects in React?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    answer: 1,
  },
  {
    id: 'q2',
    moduleId: 'm9',
    question: 'Which is NOT a valid React hook rule?',
    options: ['Call hooks at the top level', 'Call hooks inside loops', 'Only call hooks from React functions', 'Use hooks in custom hooks'],
    answer: 1,
  },
  {
    id: 'q3',
    moduleId: 'm9',
    question: 'What does React.memo do?',
    options: ['Memoizes state', 'Prevents unnecessary re-renders', 'Creates a memo component', 'Stores data in memory'],
    answer: 1,
  },
];

export const mockRevenueData: RevenueData[] = [
  { day: 'Mon', amount: 2400 },
  { day: 'Tue', amount: 1398 },
  { day: 'Wed', amount: 4800 },
  { day: 'Thu', amount: 3908 },
  { day: 'Fri', amount: 4200 },
  { day: 'Sat', amount: 3100 },
  { day: 'Sun', amount: 5200 },
];
