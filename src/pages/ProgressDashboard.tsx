import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ArrowLeft, Flame, Trophy, BookOpen, Clock, Target, TrendingUp, CheckCircle2, Lock, Zap } from 'lucide-react';

const colorLight: Record<string, string> = {
  purple: 'hsl(234, 62%, 50%)',
  green: 'hsl(160, 60%, 40%)',
  orange: 'hsl(32, 90%, 50%)',
  blue: 'hsl(200, 80%, 46%)',
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ProgressDashboard = () => {
  const { user } = useAuth();
  const { courses, modules } = useProgress();
  const navigate = useNavigate();

  const totalModules = courses.reduce((s, c) => s + c.modulesCount, 0);
  const completedModules = courses.reduce((s, c) => s + c.completedModules, 0);
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const totalTimeLeft = courses.reduce((s, c) => {
    const match = c.timeLeft.match(/(\d+)h\s*(\d+)?/);
    if (match) return s + parseInt(match[1]) * 60 + (parseInt(match[2]) || 0);
    const minMatch = c.timeLeft.match(/(\d+)min/);
    if (minMatch) return s + parseInt(minMatch[1]);
    return s;
  }, 0);
  const hoursLeft = Math.floor(totalTimeLeft / 60);
  const minsLeft = totalTimeLeft % 60;

  // Mock weekly activity (modules completed per day)
  const weeklyActivity = [3, 2, 4, 1, 5, 2, 3];
  const maxActivity = Math.max(...weeklyActivity);

  // Streak data mock
  const streakDays = Array.from({ length: 14 }, (_, i) => i < (user?.streak || 0));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="header-section rounded-b-[1.75rem]">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/15 transition-colors">
            <ArrowLeft className="w-[18px] h-[18px] text-primary-foreground/70" />
          </button>
          <div>
            <h1 className="text-[20px] font-heading font-bold text-primary-foreground">Progress Tracker</h1>
            <p className="text-primary-foreground/50 text-[12px]">Your learning journey at a glance</p>
          </div>
        </div>

        {/* Overall progress ring */}
        <div className="flex items-center gap-5 bg-primary-foreground/10 rounded-2xl p-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary-foreground) / 0.1)" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - overallProgress / 100)}`}
                strokeLinecap="round" className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[18px] font-heading font-bold text-primary-foreground">{overallProgress}%</span>
            </div>
          </div>
          <div>
            <p className="text-primary-foreground font-heading font-bold text-[15px]">Overall Progress</p>
            <p className="text-primary-foreground/50 text-[12px] mt-0.5">{completedModules} of {totalModules} modules completed</p>
            <p className="text-primary-foreground/50 text-[12px]">{completedCourses} of {courses.length} courses finished</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-8 space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-streak/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-streak" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-foreground leading-none">{user?.streak}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Day streak</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-foreground leading-none">{completedCourses}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Courses done</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-course-emerald/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-course-emerald" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-foreground leading-none">{completedModules}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Modules done</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-course-sky/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-course-sky" />
            </div>
            <div>
              <p className="text-[20px] font-heading font-bold text-foreground leading-none">{hoursLeft}h</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{minsLeft}m remaining</p>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-[14px] text-foreground">Weekly Activity</h3>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {weeklyActivity.reduce((a, b) => a + b, 0)} modules
            </span>
          </div>
          <div className="flex items-end justify-between gap-2 h-28">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                  <div
                    className="w-full rounded-lg transition-all duration-500"
                    style={{
                      height: `${maxActivity > 0 ? (weeklyActivity[i] / maxActivity) * 100 : 0}%`,
                      minHeight: weeklyActivity[i] > 0 ? '8px' : '4px',
                      background: weeklyActivity[i] > 0
                        ? `hsl(var(--primary) / ${0.4 + (weeklyActivity[i] / maxActivity) * 0.6})`
                        : 'hsl(var(--muted))',
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-[14px] text-foreground">Streak Calendar</h3>
            <span className="text-[11px] text-streak font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> {user?.streak} days
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {streakDays.map((active, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold transition-all ${
                  active
                    ? 'bg-streak/15 text-streak border border-streak/20'
                    : 'bg-muted/50 text-muted-foreground/40'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Course-wise Progress */}
        <div>
          <h3 className="font-heading font-bold text-[15px] text-foreground mb-3">Course Progress</h3>
          <div className="space-y-3">
            {courses.map((course, i) => {
              const courseModules = modules.filter(m => m.courseId === course.id);
              const completed = courseModules.filter(m => m.status === 'completed').length;
              const locked = courseModules.filter(m => m.status === 'locked').length;
              const quizzes = courseModules.filter(m => m.status === 'quiz' || m.title.includes('Quiz')).length;

              return (
                <button
                  key={course.id}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="w-full text-left card-elevated-hover p-4 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: colorLight[course.color] }}>
                        <span className="text-sm">
                          {course.color === 'purple' ? '⚛️' : course.color === 'green' ? '🐍' : course.color === 'orange' ? '🎨' : '🔧'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-[13px] text-foreground">{course.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{course.timeLeft} remaining</p>
                      </div>
                    </div>
                    <span className="text-[16px] font-heading font-bold" style={{ color: colorLight[course.color] }}>{course.progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="progress-track mb-3">
                    <div className="progress-fill" style={{ width: `${course.progress}%`, background: colorLight[course.color] }} />
                  </div>

                  {/* Module breakdown */}
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1 text-success">
                      <CheckCircle2 className="w-3 h-3" /> {completed} done
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Target className="w-3 h-3" /> {quizzes} quiz{quizzes !== 1 ? 'zes' : ''}
                    </span>
                    {locked > 0 && (
                      <span className="flex items-center gap-1 text-muted-foreground/60">
                        <Lock className="w-3 h-3" /> {locked} locked
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
