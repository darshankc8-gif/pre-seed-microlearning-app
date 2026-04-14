import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Search, Flame, Trophy, Crown, LogOut, BookOpen } from 'lucide-react';

const colorMap = {
  purple: 'gradient-primary',
  green: 'gradient-green',
  orange: 'gradient-orange',
  blue: 'gradient-blue',
};

const LearnerDashboard = () => {
  const { user, logout } = useAuth();
  const { courses } = useProgress();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">{greeting()}</p>
            <h1 className="text-2xl font-bold text-primary-foreground">{user?.name} 👋</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-streak" />
            </div>
            <div>
              <p className="text-xl font-bold text-primary-foreground">{user?.streak}</p>
              <p className="text-xs text-primary-foreground/70">Day Streak</p>
            </div>
          </div>
          <div className="flex-1 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold text-primary-foreground">{user?.coursesCompleted}</p>
              <p className="text-xs text-primary-foreground/70">Completed</p>
            </div>
          </div>
        </div>

        {/* Premium */}
        {!user?.isPremium && (
          <button className="w-full py-3 rounded-xl bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
            <Crown className="w-4 h-4" /> Upgrade to Premium
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-5 -mt-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Explore courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Courses */}
        <h2 className="text-lg font-bold text-foreground mb-4">My Courses</h2>
        <div className="space-y-4">
          {filtered.map((course, i) => (
            <button
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="w-full text-left animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <div className={`${colorMap[course.color]} p-4 flex items-center gap-3`}>
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary-foreground truncate">{course.title}</h3>
                    <p className="text-xs text-primary-foreground/70">{course.modulesCount} modules</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-foreground">{course.progress}%</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="px-4 py-3">
                  <div className="w-full h-2 rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${colorMap[course.color]} transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
