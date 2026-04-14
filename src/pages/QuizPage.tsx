import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { mockQuizzes } from '@/data/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { modules, completeModule } = useProgress();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const mod = modules.find(m => m.id === id);
  const quizzes = mockQuizzes;
  if (!mod) return <div className="p-8 text-center text-muted-foreground">Quiz not found</div>;
  const quiz = quizzes[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === quiz.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < quizzes.length - 1) {
      setCurrentQ(q => q + 1); setSelected(null); setAnswered(false);
    } else {
      completeModule(mod.id); setShowResult(true);
    }
  };

  if (showResult) {
    const pct = Math.round((score / quizzes.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-[22px] font-heading font-bold text-foreground mb-1">Quiz Complete</h1>
          <p className="text-muted-foreground text-[14px] mb-6">
            You scored <span className="font-bold text-foreground">{score}/{quizzes.length}</span> ({pct}%)
          </p>
          <div className="progress-track h-2 mb-6">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <button onClick={() => navigate(`/course/${mod.courseId}`)} className="btn-primary">
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="header-section rounded-b-[1.75rem] pb-7">
        <button onClick={() => navigate(`/course/${mod.courseId}`)} className="mb-5 w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
          <ArrowLeft className="w-[18px] h-[18px] text-primary-foreground/80" />
        </button>
        <div className="flex items-center justify-between text-[12px] text-primary-foreground/60 mb-2">
          <span>Question {currentQ + 1} of {quizzes.length}</span>
          <span className="font-semibold text-primary-foreground">{Math.round(((currentQ + 1) / quizzes.length) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-primary-foreground/15 mb-5">
          <div className="progress-fill-light" style={{ width: `${((currentQ + 1) / quizzes.length) * 100}%` }} />
        </div>
        <h1 className="text-[17px] font-heading font-bold text-primary-foreground leading-snug">{quiz.question}</h1>
      </div>

      <div className="flex-1 px-5 py-5 space-y-2.5">
        {quiz.options.map((opt, i) => {
          let classes = 'card-elevated';
          if (answered) {
            if (i === quiz.answer) classes = 'bg-success/5 border border-success/30 rounded-xl';
            else if (i === selected && i !== quiz.answer) classes = 'bg-destructive/5 border border-destructive/30 rounded-xl';
          } else if (i === selected) {
            classes = 'card-elevated border-primary/40 ring-1 ring-primary/10';
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-3.5 text-left flex items-center gap-3 transition-all animate-fade-in-up ${classes}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[12px] font-bold text-foreground flex-shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-[13px] font-medium text-foreground">{opt}</span>
              {answered && i === quiz.answer && <CheckCircle2 className="w-[18px] h-[18px] text-success flex-shrink-0" />}
              {answered && i === selected && i !== quiz.answer && <XCircle className="w-[18px] h-[18px] text-destructive flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="px-5 pb-6 animate-scale-in">
          <button onClick={handleNext} className="btn-primary">
            {currentQ < quizzes.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
