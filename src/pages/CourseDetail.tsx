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
      {/* Header */}
      <div className="header-section rounded-b-[1.75rem]">
        <button onClick={() => navigate('/dashboard')} className="mb-5 w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/15 transition-colors">
          <ArrowLeft className="w-[18px] h-[18px] text-primary-foreground/80" />
        </button>
        <h1 className="text-[22px] font-heading font-bold text-primary-foreground mb-1">{course.title}</h1>
        <p className="text-[13px] text-primary-foreground/60 mb-5 leading-relaxed">{course.description}</p>

        <div className="flex gap-5 mb-5 text-[13px]">
          <div className="flex items-center gap-1.5 text-primary-foreground/70">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{course.completedModules}/{course.modulesCount} modules</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/70">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.timeLeft} left</span>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-[12px] text-primary-foreground/80 mb-1.5">
            <span>Progress</span>
            <span className="font-bold">{course.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-primary-foreground/15">
            <div className="progress-fill-light" style={{ width: `${course.progress}%` }} />
          </div>
        </div>

        {currentModule && (
          <button onClick={() => navigate(`/module/${currentModule.id}`)} className="w-full py-3.5 rounded-xl bg-primary-foreground text-primary font-heading font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-primary-foreground/95 transition-colors">
            <PlayCircle className="w-[18px] h-[18px]" /> Continue Learning
          </button>
        )}
      </div>

      {/* Module List */}
      <div className="px-5 pt-5">
        <h2 className="text-[15px] font-heading font-bold text-foreground mb-4">Modules</h2>
        <div className="space-y-2.5">
          {modules.map((mod, i) => {
            const isCurrent = mod.status === 'current';
            const isLocked = mod.status === 'locked';
            const isCompleted = mod.status === 'completed';
            const isQuiz = mod.status === 'quiz' || mod.title.includes('Quiz');

            return (
              <button
                key={mod.id}
                onClick={() => {
                  if (!isLocked) navigate(isQuiz ? `/quiz/${mod.id}` : `/module/${mod.id}`);
                }}
                disabled={isLocked}
                className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl transition-all animate-fade-in-up ${
                  isCurrent ? 'card-elevated border-primary/30 ring-1 ring-primary/10' :
                  isLocked ? 'bg-muted/50 opacity-50' :
                  'card-elevated'
                }`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-success/10' :
                  isCurrent ? 'bg-primary/10' :
                  isQuiz && !isLocked ? 'bg-course-amber/10' :
                  'bg-muted'
                }`}>
                  {isCompleted && <CheckCircle2 className="w-[18px] h-[18px] text-success" />}
                  {isCurrent && <PlayCircle className="w-[18px] h-[18px] text-primary" />}
                  {isQuiz && !isCompleted && !isCurrent && !isLocked && <HelpCircle className="w-[18px] h-[18px] text-course-amber" />}
                  {isLocked && (mod.isPremium ? <Crown className="w-[18px] h-[18px] text-muted-foreground/50" /> : <Lock className="w-[18px] h-[18px] text-muted-foreground/50" />)}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className={`font-medium text-[13px] truncate ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>{mod.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {mod.isPremium && isLocked ? 'Premium content' : mod.duration}
                  </p>
                </div>
                {isCurrent && (
                  <span className="text-[11px] font-semibold text-primary bg-accent px-2 py-0.5 rounded-md">Now</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
