import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { ArrowLeft, CheckCircle2, SkipForward } from 'lucide-react';

const VideoModule = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { modules, completeModule, getCourse } = useProgress();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [completed, setCompleted] = useState(false);

  const mod = modules.find(m => m.id === id);
  if (!mod) return <div className="p-8 text-center text-muted-foreground">Module not found</div>;
  const course = getCourse(mod.courseId);

  const handleComplete = () => { completeModule(mod.id); setCompleted(true); };

  const handleNext = () => {
    const courseModules = modules.filter(m => m.courseId === mod.courseId);
    const idx = courseModules.findIndex(m => m.id === mod.id);
    if (idx < courseModules.length - 1) {
      const next = courseModules[idx + 1];
      navigate(next.title.includes('Quiz') || next.status === 'quiz' ? `/quiz/${next.id}` : `/module/${next.id}`);
    } else {
      navigate(`/course/${mod.courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 bg-foreground">
        <button onClick={() => navigate(`/course/${mod.courseId}`)} className="w-9 h-9 rounded-xl bg-primary-foreground/8 flex items-center justify-center">
          <ArrowLeft className="w-[18px] h-[18px] text-primary-foreground/70" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-primary-foreground font-heading font-semibold text-[13px] truncate">{mod.title}</p>
          <p className="text-primary-foreground/40 text-[11px]">{course?.title}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <video ref={videoRef} src={mod.videoUrl} controls className="w-full max-h-[60vh] object-contain" onEnded={handleComplete} />
      </div>

      <div className="p-5 bg-background rounded-t-[1.75rem]">
        <h2 className="font-heading font-bold text-[17px] text-foreground mb-0.5">{mod.title}</h2>
        <p className="text-[13px] text-muted-foreground mb-5">{mod.duration} · {course?.title}</p>

        {completed ? (
          <div className="space-y-3 animate-scale-in">
            <div className="flex items-center gap-2 text-success font-semibold text-[13px]">
              <CheckCircle2 className="w-[18px] h-[18px]" /> Module completed
            </div>
            <button onClick={handleNext} className="btn-primary">
              <SkipForward className="w-4 h-4" /> Next Module
            </button>
          </div>
        ) : (
          <button onClick={handleComplete} className="btn-primary">Mark as Complete</button>
        )}
      </div>
    </div>
  );
};

export default VideoModule;
