import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Flame, Zap, TrendingUp, Trophy, AlertTriangle, CheckCircle2, XCircle, Coins } from 'lucide-react';
import { StreakBet } from '@/types';
import { mockBets } from '@/data/mockData';

const betOptions = [
  { days: 3, multiplier: 1.5, risk: 'Low', color: 'text-course-emerald', bg: 'bg-course-emerald/10', border: 'border-course-emerald/20' },
  { days: 7, multiplier: 2, risk: 'Medium', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { days: 14, multiplier: 3, risk: 'High', color: 'text-course-amber', bg: 'bg-course-amber/10', border: 'border-course-amber/20' },
  { days: 30, multiplier: 5, risk: 'Extreme', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
];

const wagerAmounts = [50, 100, 200, 500];

const StreakBetting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [wager, setWager] = useState<number>(100);
  const [bets, setBets] = useState<StreakBet[]>(mockBets);
  const [showConfirm, setShowConfirm] = useState(false);
  const [justPlaced, setJustPlaced] = useState(false);

  const activeBet = bets.find(b => b.status === 'active');
  const pastBets = bets.filter(b => b.status !== 'active');
  const selected = betOptions.find(o => o.days === selectedDays);
  const potentialWin = selected ? Math.round(wager * selected.multiplier) : 0;

  const placeBet = () => {
    if (!selected) return;
    const newBet: StreakBet = {
      id: `b${Date.now()}`,
      targetDays: selected.days,
      pointsWagered: wager,
      multiplier: selected.multiplier,
      startDate: new Date().toISOString().split('T')[0],
      daysCompleted: 0,
      status: 'active',
    };
    setBets(prev => [newBet, ...prev]);
    setShowConfirm(false);
    setJustPlaced(true);
    setTimeout(() => setJustPlaced(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="header-section rounded-b-[1.75rem]">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/15 transition-colors">
            <ArrowLeft className="w-[18px] h-[18px] text-primary-foreground/70" />
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-heading font-bold text-primary-foreground">Streak Betting</h1>
            <p className="text-primary-foreground/50 text-[12px]">Bet on yourself. Stay consistent. Win big.</p>
          </div>
        </div>

        {/* Balance & Streak */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-foreground/10 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Coins className="w-[18px] h-[18px] text-streak" />
            </div>
            <div>
              <p className="text-[18px] font-heading font-bold text-primary-foreground leading-none">{user?.points?.toLocaleString()}</p>
              <p className="text-[11px] text-primary-foreground/50 mt-0.5">Points balance</p>
            </div>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Flame className="w-[18px] h-[18px] text-streak" />
            </div>
            <div>
              <p className="text-[18px] font-heading font-bold text-primary-foreground leading-none">{user?.streak}</p>
              <p className="text-[11px] text-primary-foreground/50 mt-0.5">Current streak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-8 space-y-6">
        {/* Active Bet */}
        {activeBet && (
          <div className="card-elevated p-5 border-l-4 border-primary animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-[14px] text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Active Bet
              </h3>
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">In Progress</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <p className="text-[18px] font-heading font-bold text-foreground">{activeBet.daysCompleted}/{activeBet.targetDays}</p>
                <p className="text-[10px] text-muted-foreground">Days done</p>
              </div>
              <div className="text-center">
                <p className="text-[18px] font-heading font-bold text-streak">{activeBet.pointsWagered}</p>
                <p className="text-[10px] text-muted-foreground">Wagered</p>
              </div>
              <div className="text-center">
                <p className="text-[18px] font-heading font-bold text-course-emerald">{Math.round(activeBet.pointsWagered * activeBet.multiplier)}</p>
                <p className="text-[10px] text-muted-foreground">To win</p>
              </div>
            </div>
            {/* Progress */}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(activeBet.daysCompleted / activeBet.targetDays) * 100}%`, background: 'hsl(var(--primary))' }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 text-center">{activeBet.targetDays - activeBet.daysCompleted} days to go · {activeBet.multiplier}x multiplier</p>
          </div>
        )}

        {/* Just placed confirmation */}
        {justPlaced && (
          <div className="card-elevated p-4 border-l-4 border-course-emerald flex items-center gap-3 animate-scale-in">
            <CheckCircle2 className="w-5 h-5 text-course-emerald flex-shrink-0" />
            <div>
              <p className="font-heading font-bold text-[13px] text-foreground">Bet placed! 🔥</p>
              <p className="text-[11px] text-muted-foreground">Keep your streak alive to win big.</p>
            </div>
          </div>
        )}

        {/* Place New Bet */}
        {!activeBet && (
          <>
            <div>
              <h3 className="font-heading font-bold text-[15px] text-foreground mb-1">Place a Bet</h3>
              <p className="text-[12px] text-muted-foreground mb-4">Choose how long you'll maintain your streak. Higher risk = higher reward!</p>

              {/* Duration Options */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {betOptions.map(opt => (
                  <button
                    key={opt.days}
                    onClick={() => setSelectedDays(opt.days)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedDays === opt.days
                        ? `${opt.bg} ${opt.border} ring-2 ring-offset-1 ring-offset-background`
                        : 'border-border bg-card hover:border-muted-foreground/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[20px] font-heading font-bold ${opt.color}`}>{opt.days}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${opt.bg} ${opt.color}`}>{opt.risk}</span>
                    </div>
                    <p className="text-[12px] text-foreground font-semibold">days streak</p>
                    <p className={`text-[13px] font-heading font-bold ${opt.color} mt-1`}>{opt.multiplier}x return</p>
                  </button>
                ))}
              </div>

              {/* Wager Amount */}
              {selectedDays && (
                <div className="animate-fade-in">
                  <h4 className="font-heading font-bold text-[13px] text-foreground mb-3">Wager Amount</h4>
                  <div className="flex gap-2 mb-4">
                    {wagerAmounts.map(amt => (
                      <button
                        key={amt}
                        onClick={() => setWager(amt)}
                        className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                          wager === amt
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="card-elevated p-4 mb-4">
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-muted-foreground">You wager</span>
                      <span className="font-bold text-foreground">{wager} pts</span>
                    </div>
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold text-foreground">{selectedDays} days</span>
                    </div>
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-muted-foreground">Multiplier</span>
                      <span className="font-bold text-foreground">{selected?.multiplier}x</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground font-medium">Potential win</span>
                      <span className="font-heading font-bold text-course-emerald">{potentialWin} pts 🏆</span>
                    </div>
                  </div>

                  {wager > (user?.points || 0) ? (
                    <div className="flex items-center gap-2 text-destructive text-[12px] mb-4">
                      <AlertTriangle className="w-4 h-4" /> Not enough points
                    </div>
                  ) : (
                    <button onClick={() => setShowConfirm(true)} className="btn-primary w-full">
                      <Flame className="w-4 h-4" /> Place Bet
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 px-6 animate-fade-in" onClick={() => setShowConfirm(false)}>
            <div className="bg-background rounded-3xl p-6 w-full max-w-sm animate-scale-in" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-2xl bg-streak/10 flex items-center justify-center mx-auto mb-3">
                  <Flame className="w-8 h-8 text-streak" />
                </div>
                <h3 className="font-heading font-bold text-[18px] text-foreground">Confirm Your Bet</h3>
                <p className="text-[12px] text-muted-foreground mt-1">Are you ready to commit?</p>
              </div>
              <div className="space-y-2 mb-5 text-[13px]">
                <div className="flex justify-between"><span className="text-muted-foreground">Wager</span><span className="font-bold">{wager} pts</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Streak goal</span><span className="font-bold">{selectedDays} days</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Win</span><span className="font-bold text-course-emerald">{potentialWin} pts</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Lose</span><span className="font-bold text-destructive">-{wager} pts</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)} className="flex-1 h-11 rounded-xl border border-border text-foreground font-semibold text-[13px] hover:bg-muted/50 transition-colors">Cancel</button>
                <button onClick={placeBet} className="flex-1 btn-primary text-[13px]">
                  <Zap className="w-4 h-4" /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Past Bets */}
        {pastBets.length > 0 && (
          <div>
            <h3 className="font-heading font-bold text-[15px] text-foreground mb-3">Bet History</h3>
            <div className="space-y-2.5">
              {pastBets.map((bet, i) => (
                <div key={bet.id} className="card-elevated p-4 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bet.status === 'won' ? 'bg-course-emerald/10' : 'bg-destructive/10'}`}>
                    {bet.status === 'won' ? <Trophy className="w-5 h-5 text-course-emerald" /> : <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-bold text-[13px] text-foreground">{bet.targetDays}-day challenge</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        bet.status === 'won' ? 'bg-course-emerald/10 text-course-emerald' : 'bg-destructive/10 text-destructive'
                      }`}>{bet.status === 'won' ? 'Won' : 'Lost'}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{bet.daysCompleted}/{bet.targetDays} days · {bet.multiplier}x</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-heading font-bold text-[14px] ${bet.status === 'won' ? 'text-course-emerald' : 'text-destructive'}`}>
                      {bet.status === 'won' ? '+' : '-'}{bet.status === 'won' ? Math.round(bet.pointsWagered * bet.multiplier) : bet.pointsWagered}
                    </p>
                    <p className="text-[10px] text-muted-foreground">pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="card-elevated p-5">
          <h3 className="font-heading font-bold text-[14px] text-foreground mb-3">How It Works</h3>
          <div className="space-y-3">
            {[
              { icon: '🎯', title: 'Choose your challenge', desc: 'Pick a streak duration and risk level' },
              { icon: '💰', title: 'Place your wager', desc: 'Bet your points — more risk, more reward' },
              { icon: '🔥', title: 'Maintain your streak', desc: 'Complete at least 1 module every day' },
              { icon: '🏆', title: 'Win big', desc: 'Hit your target and earn multiplied points' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[18px] mt-0.5">{step.icon}</span>
                <div>
                  <p className="font-semibold text-[12px] text-foreground">{step.title}</p>
                  <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakBetting;
