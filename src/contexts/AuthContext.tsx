import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { mockLearner, mockCreator } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'learner' | 'creator') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, _password: string, role: 'learner' | 'creator') => {
    if (username && _password) {
      setUser(role === 'learner' ? { ...mockLearner, name: username } : { ...mockCreator, name: username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
