import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockModules, mockCourses } from '@/data/mockData';
import { Module, Course } from '@/types';

interface ProgressContextType {
  modules: Module[];
  courses: Course[];
  completeModule: (moduleId: string) => void;
  getCourseModules: (courseId: string) => Module[];
  getCourse: (courseId: string) => Course | undefined;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const completeModule = (moduleId: string) => {
    setModules(prev => {
      const updated = prev.map(m => {
        if (m.id === moduleId) return { ...m, status: 'completed' as const };
        return m;
      });
      // Set next module as current
      const idx = updated.findIndex(m => m.id === moduleId);
      if (idx < updated.length - 1 && updated[idx + 1].status === 'locked') {
        updated[idx + 1] = { ...updated[idx + 1], status: 'current' as const };
      } else if (idx < updated.length - 1 && updated[idx + 1].status === 'quiz') {
        updated[idx + 1] = { ...updated[idx + 1], status: 'current' as const };
      }
      // Update course progress
      const courseId = updated[idx]?.courseId;
      if (courseId) {
        const courseModules = updated.filter(m => m.courseId === courseId);
        const completed = courseModules.filter(m => m.status === 'completed').length;
        setCourses(prev => prev.map(c => c.id === courseId ? {
          ...c,
          completedModules: completed,
          progress: Math.round((completed / c.modulesCount) * 100),
        } : c));
      }
      return updated;
    });
  };

  const getCourseModules = (courseId: string) => modules.filter(m => m.courseId === courseId);
  const getCourse = (courseId: string) => courses.find(c => c.id === courseId);

  return (
    <ProgressContext.Provider value={{ modules, courses, completeModule, getCourseModules, getCourse }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
