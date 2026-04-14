import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { Trophy, Star, Award, Medal, Gift, Sparkles, ArrowLeft, Share2, Download } from 'lucide-react';

const rewards = [
  { type: 'certificate', icon: Award, label: 'Certificate of Completion', description: 'You earned an official certificate!', gradient: 'from-primary to-primary/70' },
  { type: 'gold-star', icon: Star, label: 'Gold Star', description: 'Outstanding achievement unlocked!', gradient: 'from-streak to-course-amber' },
  { type: 'medal', icon: Medal, label: 'Master Medal', description: 'You mastered this course!', gradient: 'from-course-emerald to-course-sky' },
  { type: 'trophy', icon: Trophy, label: 'Champion Trophy', description: 'You are a true champion!', gradient: 'from-course-indigo to-primary' },
];

const MysteryReward = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourse } = useProgress();
  const course = getCourse(courseId || '');

  const [phase, setPhase] = useState<'mystery' | 'reveal' | 'shown'>('mystery');
  const [reward, setReward] = useState(rewards[0]);

  useEffect(() => {
    // Deterministic reward based on courseId
    const idx = courseId ? courseId.charCodeAt(0) % rewards.length : 0;
    setReward(rewards[idx]);
  }, [courseId]);

  const handleReveal = () => {
    setPhase('reveal');
    setTimeout(() => setPhase('shown'), 800);
  };

  if (!course) return <div className="p-8 text-center text-muted-foreground">Course not found</div>;

  const RewardIcon = reward.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={() => navigate(`/course/${courseId}`)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-[18px] h-[18px] text-muted-foreground" />
        </button>
        <h1 className="font-heading font-bold text-[16px] text-foreground">Mystery Reward</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        {phase === 'mystery' && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-streak/20 flex items-center justify-center mb-6 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
              <Gift className="w-16 h-16 text-primary/60" />
            </div>
            <h2 className="font-heading font-bold text-[22px] text-foreground text-center mb-2">🎉 Course Completed!</h2>
            <p className="text-muted-foreground text-[14px] text-center mb-2">{course.title}</p>
            <p className="text-muted-foreground/70 text-[13px] text-center mb-8">You've unlocked a mystery reward. Tap to reveal!</p>
            <button onClick={handleReveal} className="btn-primary px-8 gap-2">
              <Sparkles className="w-4 h-4" /> Reveal My Reward
            </button>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-streak/30 to-primary/30 flex items-center justify-center animate-scale-in">
              <Sparkles className="w-20 h-20 text-streak animate-[pulse_0.4s_ease-in-out_3]" />
            </div>
            <p className="text-muted-foreground text-[14px] mt-6 animate-fade-in">Revealing...</p>
          </div>
        )}

        {phase === 'shown' && (
          <div className="flex flex-col items-center w-full max-w-sm animate-scale-in">
            {/* Reward Card */}
            <div className={`w-full rounded-3xl bg-gradient-to-br ${reward.gradient} p-[2px] mb-6`}>
              <div className="bg-background rounded-[22px] p-6 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${reward.gradient} flex items-center justify-center mb-4`}>
                  <RewardIcon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-[18px] text-foreground text-center">{reward.label}</h3>
                <p className="text-muted-foreground text-[13px] text-center mt-1 mb-4">{reward.description}</p>

                {/* Certificate Preview */}
                {reward.type === 'certificate' && (
                  <div className="w-full border border-border/60 rounded-2xl p-5 bg-muted/30 mb-4">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Certificate of Completion</p>
                      <div className="w-8 h-[2px] bg-primary mx-auto mb-3" />
                      <p className="text-[11px] text-muted-foreground">This certifies that</p>
                      <p className="font-heading font-bold text-[16px] text-foreground mt-1">Alex</p>
                      <p className="text-[11px] text-muted-foreground mt-1">has successfully completed</p>
                      <p className="font-heading font-semibold text-[13px] text-primary mt-1">{course.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-3">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <Award className="w-6 h-6 text-primary mx-auto mt-2" />
                    </div>
                  </div>
                )}

                {/* Stars display */}
                {reward.type === 'gold-star' && (
                  <div className="flex gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-streak fill-streak animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                )}

                {/* Medal display */}
                {reward.type === 'medal' && (
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-course-emerald to-course-sky rounded-full mb-1" />
                    <Medal className="w-14 h-14 text-course-emerald animate-scale-in" />
                    <p className="text-[11px] text-muted-foreground mt-2">Master Level Achieved</p>
                  </div>
                )}

                {/* Trophy display */}
                {reward.type === 'trophy' && (
                  <div className="flex flex-col items-center mb-4">
                    <Trophy className="w-14 h-14 text-primary animate-scale-in" />
                    <div className="flex gap-1 mt-2">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-streak fill-streak" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 w-full">
                  <button className="btn-primary flex-1 text-[13px]">
                    <Download className="w-4 h-4" /> Save
                  </button>
                  <button className="flex-1 h-11 rounded-xl border border-border text-foreground font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/progress')} className="text-[13px] text-primary font-semibold hover:underline">
              View Progress Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryReward;
