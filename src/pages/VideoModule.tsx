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

  const handleComplete = () => {
    completeModule(mod.id);
    setCompleted(true);
  };

  const handleNext = () => {
    const courseModules = modules.filter(m => m.courseId === mod.courseId);
    const idx = courseModules.findIndex(m => m.id === mod.id);
    if (idx < courseModules.length - 1) {
      const next = courseModules[idx + 1];
      if (next.title.includes('Quiz') || next.status === 'quiz') {
        navigate(`/quiz/${next.id}`);
      } else {
        navigate(`/module/${next.id}`);
      }
    } else {
      navigate(`/course/${mod.courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate(`/course/${mod.courseId}`)} className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-primary-foreground font-semibold text-sm truncate">{mod.title}</p>
          <p className="text-primary-foreground/50 text-xs">{course?.title}</p>
        </div>
      </div>

      {/* Video */}
      <div className="flex-1 flex items-center justify-center bg-foreground">
        <video
          ref={videoRef}
          src={mod.videoUrl}
          controls
          className="w-full max-h-[60vh] object-contain"
          onEnded={handleComplete}
        />
      </div>

      {/* Bottom Actions */}
      <div className="p-5 bg-background rounded-t-[2rem]">
        <h2 className="font-bold text-lg text-foreground mb-1">{mod.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{mod.duration} • {course?.title}</p>

        {completed ? (
          <div className="space-y-3 animate-scale-in">
            <div className="flex items-center gap-2 text-course-green font-semibold">
              <CheckCircle2 className="w-5 h-5" /> Module Completed!
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" /> Next Module
            </button>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm"
          >
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoModule;
