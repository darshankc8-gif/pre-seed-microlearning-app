import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { ArrowLeft, Clock, CheckCircle2, PlayCircle, Lock, HelpCircle, Crown } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourse, getCourseModules } = useProgress();

  const course = getCourse(id || '');
  const modules = getCourseModules(id || '');

  if (!course) return <div className="p-8 text-center text-muted-foreground">Course not found</div>;

  const currentModule = modules.find(m => m.status === 'current');

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Gradient Header */}
      <div className="gradient-hero px-5 pt-12 pb-10 rounded-b-[2rem]">
        <button onClick={() => navigate('/dashboard')} className="mb-4 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground mb-1">{course.title}</h1>
        <p className="text-sm text-primary-foreground/70 mb-4">{course.description}</p>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            {course.completedModules}/{course.modulesCount} modules
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
            <Clock className="w-4 h-4" />
            {course.timeLeft} left
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-primary-foreground mb-1">
            <span>Progress</span>
            <span className="font-bold">{course.progress}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-primary-foreground/20">
            <div className="h-full rounded-full bg-primary-foreground transition-all duration-500" style={{ width: `${course.progress}%` }} />
          </div>
        </div>

        {currentModule && (
          <button
            onClick={() => navigate(`/module/${currentModule.id}`)}
            className="w-full py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-elevated"
          >
            <PlayCircle className="w-5 h-5" /> Continue Learning
          </button>
        )}
      </div>

      {/* Module List */}
      <div className="px-5 -mt-4">
        <h2 className="text-lg font-bold text-foreground mb-4 mt-6">Modules</h2>
        <div className="space-y-3">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => {
                if (mod.status !== 'locked') {
                  if (mod.status === 'quiz' || mod.title.includes('Quiz')) {
                    navigate(`/quiz/${mod.id}`);
                  } else {
                    navigate(`/module/${mod.id}`);
                  }
                }
              }}
              disabled={mod.status === 'locked'}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all animate-fade-in-up ${
                mod.status === 'current'
                  ? 'bg-accent border-2 border-primary shadow-card'
                  : mod.status === 'locked'
                  ? 'bg-muted opacity-60'
                  : 'bg-card shadow-card'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                mod.status === 'completed' ? 'gradient-green' :
                mod.status === 'current' ? 'gradient-primary' :
                mod.status === 'quiz' ? 'gradient-orange' :
                'bg-muted'
              }`}>
                {mod.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-primary-foreground" />}
                {mod.status === 'current' && <PlayCircle className="w-5 h-5 text-primary-foreground" />}
                {mod.status === 'quiz' && <HelpCircle className="w-5 h-5 text-primary-foreground" />}
                {mod.status === 'locked' && (mod.isPremium ? <Crown className="w-5 h-5 text-muted-foreground" /> : <Lock className="w-5 h-5 text-muted-foreground" />)}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className={`font-semibold text-sm truncate ${mod.status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {mod.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mod.isPremium && mod.status === 'locked' ? '🔒 Premium' : mod.duration}
                </p>
              </div>
              {mod.status === 'current' && (
                <span className="text-xs font-semibold text-primary bg-accent px-2 py-1 rounded-lg">▶ Now</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
