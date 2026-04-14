import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Search, Flame, Trophy, Crown, LogOut, ChevronRight, BarChart3 } from 'lucide-react';

const colorBg: Record<string, string> = {
  purple: 'bg-course-indigo',
  green: 'bg-course-emerald',
  orange: 'bg-course-amber',
  blue: 'bg-course-sky',
};

const colorLight: Record<string, string> = {
  purple: 'hsl(234, 62%, 50%)',
  green: 'hsl(160, 60%, 40%)',
  orange: 'hsl(32, 90%, 50%)',
  blue: 'hsl(200, 80%, 46%)',
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

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="header-section rounded-b-[1.75rem]">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-primary-foreground/60 text-[13px] font-medium">{greeting()}</p>
            <h1 className="text-[22px] font-heading font-bold text-primary-foreground mt-0.5">{user?.name}</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/15 transition-colors">
            <LogOut className="w-4 h-4 text-primary-foreground/70" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-primary-foreground/10 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="stat-icon bg-primary-foreground/10">
              <Flame className="w-[18px] h-[18px] text-streak" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-primary-foreground leading-none">{user?.streak}</p>
              <p className="text-[11px] text-primary-foreground/50 mt-0.5">Day streak</p>
            </div>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="stat-icon bg-primary-foreground/10">
              <Trophy className="w-[18px] h-[18px] text-primary-foreground/80" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-primary-foreground leading-none">{user?.coursesCompleted}</p>
              <p className="text-[11px] text-primary-foreground/50 mt-0.5">Completed</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => navigate('/progress')} className="btn-secondary-light text-[13px] flex-1">
            <BarChart3 className="w-4 h-4" /> Progress Tracker
          </button>
          {!user?.isPremium && (
            <button className="btn-secondary-light text-[13px] flex-1">
              <Crown className="w-4 h-4" /> Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Explore courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-heading font-bold text-foreground">My Courses</h2>
          <span className="text-[12px] text-muted-foreground">{filtered.length} courses</span>
        </div>

        <div className="space-y-3">
          {filtered.map((course, i) => (
            <button
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="w-full text-left card-elevated-hover p-0 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ background: colorLight[course.color] }}>
                  <span className="text-lg">
                    {course.color === 'purple' ? '⚛️' : course.color === 'green' ? '🐍' : course.color === 'orange' ? '🎨' : '🔧'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-[14px] text-foreground truncate">{course.title}</h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{course.modulesCount} modules · {course.completedModules} done</p>
                  <div className="mt-2">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${course.progress}%`, background: colorLight[course.color] }} />
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[15px] font-heading font-bold" style={{ color: colorLight[course.color] }}>{course.progress}%</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
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
