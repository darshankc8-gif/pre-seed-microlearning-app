import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { mockQuizzes } from '@/data/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';

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
  const quizzes = mockQuizzes; // In real app, filter by moduleId

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
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      completeModule(mod.id);
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-elevated">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-6">
            You scored <span className="font-bold text-primary">{score}/{quizzes.length}</span>
          </p>
          <div className="w-full h-3 rounded-full bg-secondary mb-6">
            <div className="h-full rounded-full gradient-primary" style={{ width: `${(score / quizzes.length) * 100}%` }} />
          </div>
          <button
            onClick={() => navigate(`/course/${mod.courseId}`)}
            className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-6 rounded-b-[2rem]">
        <button onClick={() => navigate(`/course/${mod.courseId}`)} className="mb-4 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <p className="text-primary-foreground/70 text-sm mb-1">Question {currentQ + 1} of {quizzes.length}</p>
        <div className="w-full h-2 rounded-full bg-primary-foreground/20 mb-4">
          <div className="h-full rounded-full bg-primary-foreground transition-all" style={{ width: `${((currentQ + 1) / quizzes.length) * 100}%` }} />
        </div>
        <h1 className="text-lg font-bold text-primary-foreground">{quiz.question}</h1>
      </div>

      {/* Options */}
      <div className="flex-1 px-5 py-6 space-y-3">
        {quiz.options.map((opt, i) => {
          let style = 'bg-card shadow-card border-2 border-transparent';
          if (answered) {
            if (i === quiz.answer) style = 'bg-course-green/10 border-2 border-course-green';
            else if (i === selected && i !== quiz.answer) style = 'bg-destructive/10 border-2 border-destructive';
          } else if (i === selected) {
            style = 'bg-accent border-2 border-primary';
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full p-4 rounded-2xl text-left flex items-center gap-3 transition-all animate-fade-in-up ${style}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm font-medium text-foreground">{opt}</span>
              {answered && i === quiz.answer && <CheckCircle2 className="w-5 h-5 text-course-green" />}
              {answered && i === selected && i !== quiz.answer && <XCircle className="w-5 h-5 text-destructive" />}
            </button>
          );
        })}
      </div>

      {/* Next */}
      {answered && (
        <div className="px-5 pb-6 animate-scale-in">
          <button onClick={handleNext} className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm">
            {currentQ < quizzes.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
