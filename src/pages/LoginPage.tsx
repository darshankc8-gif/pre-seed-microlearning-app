import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'learner' | 'creator'>('learner');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('Please fill in all fields'); return; }
    const success = login(username, password, role);
    if (success) navigate(role === 'learner' ? '/dashboard' : '/creator');
    else setError('Login failed');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-background">
      <div className="w-full max-w-[380px] animate-fade-in-up">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-[22px] font-heading font-bold text-foreground tracking-tight">MicroLearn</h1>
          <p className="text-muted-foreground text-[13px] mt-1">Bite-sized learning, real results</p>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-xl bg-card border border-border p-1 mb-7">
          {(['learner', 'creator'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-200 ${
                role === r
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r === 'learner' ? 'Learner' : 'Creator'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input-field" placeholder="Enter your username" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="Enter your password" />
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
          <button type="submit" className="btn-primary mt-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground mt-8">
          Enter any username & password to explore the platform
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
