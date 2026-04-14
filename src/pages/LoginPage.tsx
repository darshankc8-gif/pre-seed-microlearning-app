import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'learner' | 'creator'>('learner');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const success = login(username, password, role);
    if (success) {
      navigate(role === 'learner' ? '/dashboard' : '/creator');
    } else {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-elevated">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">MicroLearn</h1>
          <p className="text-muted-foreground text-sm mt-1">Learn in bite-sized lessons</p>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-xl bg-secondary p-1 mb-6">
          <button
            onClick={() => setRole('learner')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'learner'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            🎓 Learner
          </button>
          <button
            onClick={() => setRole('creator')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'creator'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            ✨ Creator
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
            />
          </div>
          {error && <p className="text-destructive text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-elevated hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Sign In as {role === 'learner' ? 'Learner' : 'Creator'}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Enter any username & password to explore
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
