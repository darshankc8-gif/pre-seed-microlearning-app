export interface User {
  id: string;
  name: string;
  role: 'learner' | 'creator';
  streak: number;
  coursesCompleted: number;
  isPremium: boolean;
}

export interface Course {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  price: number;
  modulesCount: number;
  completedModules: number;
  progress: number;
  color: 'purple' | 'green' | 'orange' | 'blue';
  learners: number;
  revenue: number;
  status: 'Live' | 'Draft';
  timeLeft: string;
  description: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  duration: string;
  status: 'completed' | 'current' | 'locked' | 'quiz';
  isPremium: boolean;
}

export interface Quiz {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  answer: number;
}

export interface RevenueData {
  day: string;
  amount: number;
}
