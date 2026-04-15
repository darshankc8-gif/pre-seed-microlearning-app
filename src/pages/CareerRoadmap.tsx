import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle2, ChevronDown, ChevronRight, Clock, Award, Sparkles, MapPin } from 'lucide-react';
import { roadmapDomains, RoadmapDomain, RoadmapLevel, RoadmapTopic } from '@/data/roadmapData';

const CareerRoadmap = () => {
  const navigate = useNavigate();
  const [domains, setDomains] = useState(roadmapDomains);
  const [selectedDomain, setSelectedDomain] = useState<RoadmapDomain | null>(null);
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const getDomainProgress = (domain: RoadmapDomain) => {
    let total = 0, done = 0;
    domain.levels.forEach(l => l.topics.forEach(t => {
      total += t.lessons.length;
      done += t.lessons.filter(le => le.completed).length;
    }));
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const getLevelProgress = (level: RoadmapLevel) => {
    let total = 0, done = 0;
    level.topics.forEach(t => {
      total += t.lessons.length;
      done += t.lessons.filter(le => le.completed).length;
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const getTopicProgress = (topic: RoadmapTopic) => {
    const done = topic.lessons.filter(l => l.completed).length;
    return topic.lessons.length === 0 ? 0 : Math.round((done / topic.lessons.length) * 100);
  };

  const toggleLesson = (domainId: string, levelId: string, topicId: string, lessonId: string) => {
    setDomains(prev => prev.map(d => {
      if (d.id !== domainId) return d;
      const updated = {
        ...d,
        levels: d.levels.map(l => {
          if (l.id !== levelId) return l;
          return {
            ...l,
            topics: l.topics.map(t => {
              if (t.id !== topicId) return t;
              return {
                ...t,
                lessons: t.lessons.map(le =>
                  le.id === lessonId ? { ...le, completed: !le.completed } : le
                ),
              };
            }),
          };
        }),
      };
      // Auto-unlock next level if current is 100%
      for (let i = 0; i < updated.levels.length - 1; i++) {
        const prog = getLevelProgressFromLevel(updated.levels[i]);
        if (prog === 100 && updated.levels[i + 1].locked) {
          updated.levels[i + 1] = { ...updated.levels[i + 1], locked: false };
        }
      }
      return updated;
    }));
    // Sync selected domain
    setSelectedDomain(prev => {
      if (!prev || prev.id !== domainId) return prev;
      return domains.find(d => d.id === domainId) || prev;
    });
  };

  const getLevelProgressFromLevel = (level: RoadmapLevel) => {
    let total = 0, done = 0;
    level.topics.forEach(t => {
      total += t.lessons.length;
      done += t.lessons.filter(le => le.completed).length;
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const currentDomain = selectedDomain ? domains.find(d => d.id === selectedDomain.id) : null;

  const levelColors: Record<string, string> = {
    Beginner: 'hsl(160, 60%, 40%)',
    Intermediate: 'hsl(38, 92%, 50%)',
    Advanced: 'hsl(0, 72%, 51%)',
  };

  // Domain selection view
  if (!currentDomain) {
    return (
      <div className="min-h-screen bg-background">
        <div className="header-section rounded-b-[1.75rem]">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-primary-foreground" />
            </button>
            <div>
              <h1 className="text-[20px] font-heading font-bold text-primary-foreground">Career Roadmap</h1>
              <p className="text-primary-foreground/60 text-[12px]">Choose your learning path</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-xl px-4 py-3">
            <Sparkles className="w-4 h-4 text-primary-foreground/70" />
            <p className="text-[12px] text-primary-foreground/70">
              <span className="font-semibold text-primary-foreground">Recommended:</span> Start with a domain that excites you. Complete all levels to earn badges!
            </p>
          </div>
        </div>

        <div className="px-5 pt-6 pb-8 space-y-4">
          {domains.map((domain, i) => {
            const progress = getDomainProgress(domain);
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain)}
                className="w-full text-left card-elevated-hover overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: `${domain.color}15` }}>
                      {domain.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-[16px] text-foreground">{domain.title}</h3>
                        <ChevronRight className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                      </div>
                      <p className="text-[13px] text-muted-foreground mt-1">{domain.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex-1">
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${progress}%`, background: domain.color }} />
                          </div>
                        </div>
                        <span className="text-[13px] font-heading font-bold" style={{ color: domain.color }}>{progress}%</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2.5">
                        <span className="text-[11px] text-muted-foreground">{domain.levels.length} levels</span>
                        <span className="text-[11px] text-muted-foreground">
                          {domain.levels.reduce((a, l) => a + l.topics.reduce((b, t) => b + t.lessons.length, 0), 0)} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Domain detail view with levels
  const domainProgress = getDomainProgress(currentDomain);

  return (
    <div className="min-h-screen bg-background">
      <div className="rounded-b-[1.75rem] px-5 pt-14 pb-7" style={{ background: `linear-gradient(135deg, ${currentDomain.color}, ${currentDomain.color}dd)` }}>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => setSelectedDomain(null)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentDomain.icon}</span>
              <h1 className="text-[20px] font-heading font-bold text-white">{currentDomain.title}</h1>
            </div>
            <p className="text-white/60 text-[12px] mt-0.5">{currentDomain.description}</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-white/70 font-medium">Overall Progress</span>
            <span className="text-[15px] font-heading font-bold text-white">{domainProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white transition-all duration-700 ease-out" style={{ width: `${domainProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-8">
        {/* Vertical roadmap line */}
        <div className="relative">
          {/* The roadmap connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-0">
            {currentDomain.levels.map((level, li) => {
              const levelProg = getLevelProgress(level);
              const isExpanded = expandedLevel === level.id;
              const isCompleted = levelProg === 100;

              return (
                <div key={level.id} className="relative animate-fade-in-up" style={{ animationDelay: `${li * 0.12}s` }}>
                  {/* Node on the line */}
                  <div className="flex items-start gap-4 mb-1">
                    <div className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-all"
                      style={{
                        background: level.locked ? 'hsl(var(--muted))' : isCompleted ? levelColors[level.level] : 'hsl(var(--card))',
                        borderColor: level.locked ? 'hsl(var(--border))' : levelColors[level.level],
                      }}>
                      {level.locked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <MapPin className="w-5 h-5" style={{ color: levelColors[level.level] }} />
                      )}
                    </div>

                    <button
                      onClick={() => !level.locked && setExpandedLevel(isExpanded ? null : level.id)}
                      disabled={level.locked}
                      className={`flex-1 card-elevated p-4 transition-all ${level.locked ? 'opacity-50' : 'hover:shadow-md cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{level.badge}</span>
                            <h3 className="font-heading font-bold text-[15px] text-foreground">{level.level}</h3>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Clock className="w-3 h-3" />{level.estimatedTime}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {level.topics.reduce((a, t) => a + t.lessons.length, 0)} lessons
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!level.locked && (
                            <span className="text-[14px] font-heading font-bold" style={{ color: levelColors[level.level] }}>{levelProg}%</span>
                          )}
                          {!level.locked && (
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </div>
                      {!level.locked && (
                        <div className="mt-3">
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${levelProg}%`, background: levelColors[level.level] }} />
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Expanded topics */}
                  {isExpanded && !level.locked && (
                    <div className="ml-16 mt-2 mb-6 space-y-3 animate-fade-in-up">
                      {level.topics.map(topic => {
                        const topicProg = getTopicProgress(topic);
                        const topicExpanded = expandedTopic === topic.id;
                        const topicDone = topicProg === 100;

                        return (
                          <div key={topic.id} className="card-elevated overflow-hidden">
                            <button
                              onClick={() => setExpandedTopic(topicExpanded ? null : topic.id)}
                              className="w-full text-left p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${currentDomain.color}12` }}>
                                {topic.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-heading font-semibold text-[13px] text-foreground truncate">{topic.title}</h4>
                                  {topicDone && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--success))' }} />}
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {topic.lessons.filter(l => l.completed).length}/{topic.lessons.length} lessons · {topicProg}%
                                </p>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform ${topicExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            {topicExpanded && (
                              <div className="border-t border-border">
                                {topic.lessons.map((lesson, li) => (
                                  <button
                                    key={lesson.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLesson(currentDomain.id, level.id, topic.id, lesson.id);
                                    }}
                                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors border-b border-border/50 last:border-b-0"
                                  >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${lesson.completed
                                        ? 'bg-[hsl(160,60%,40%)]'
                                        : 'border-2 border-border'
                                      }`}>
                                      {lesson.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-[13px] truncate ${lesson.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground flex-shrink-0 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />{lesson.duration}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Badge reward indicator */}
                      {levelProg === 100 && (
                        <div className="flex items-center gap-3 p-4 rounded-2xl animate-scale-in" style={{ background: `${levelColors[level.level]}12` }}>
                          <Award className="w-6 h-6" style={{ color: levelColors[level.level] }} />
                          <div>
                            <p className="font-heading font-bold text-[13px] text-foreground">{level.level} Badge Earned! {level.badge}</p>
                            <p className="text-[11px] text-muted-foreground">You've mastered this level</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
