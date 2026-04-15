import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses, mockRevenueData } from '@/data/mockData';
import { LogOut, Users, IndianRupee, Plus, TrendingUp, ChevronRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Course } from '@/types';

const colorOptions: Course['color'][] = ['purple', 'green', 'orange', 'blue'];

const CreatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', color: 'purple' as Course['color'] });

  const totalLearners = courses.reduce((a, c) => a + c.learners, 0);
  const totalRevenue = courses.reduce((a, c) => a + c.revenue, 0);

  const colorLight: Record<string, string> = {
    purple: 'hsl(234, 62%, 50%)',
    green: 'hsl(160, 60%, 40%)',
    orange: 'hsl(32, 90%, 50%)',
    blue: 'hsl(200, 80%, 46%)',
  };

  const emojiMap: Record<string, string> = {
    purple: '⚛️', green: '🐍', orange: '🎨', blue: '🔧',
  };

  const handleAddCourse = () => {
    if (!form.title.trim() || !form.price.trim()) return;
    const newCourse: Course = {
      id: `c${Date.now()}`,
      title: form.title,
      creatorId: user?.id || '2',
      creatorName: user?.name || 'Creator',
      price: Number(form.price),
      modulesCount: 0,
      completedModules: 0,
      progress: 0,
      color: form.color,
      learners: 0,
      revenue: 0,
      status: 'Draft',
      timeLeft: '0min',
      description: form.description,
    };
    setCourses([newCourse, ...courses]);
    setForm({ title: '', description: '', price: '', color: 'purple' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="header-section rounded-b-[1.75rem]">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-primary-foreground/60 text-[13px] font-medium">Creator Dashboard</p>
            <h1 className="text-[22px] font-heading font-bold text-primary-foreground mt-0.5">Hi, {user?.name}</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/15 transition-colors">
            <LogOut className="w-4 h-4 text-primary-foreground/70" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="stat-icon bg-primary-foreground/10 mb-3">
              <Users className="w-[18px] h-[18px] text-primary-foreground/80" />
            </div>
            <p className="text-[22px] font-heading font-bold text-primary-foreground leading-none">{totalLearners.toLocaleString()}</p>
            <p className="text-[11px] text-primary-foreground/50 mt-1">Total Learners</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="stat-icon bg-primary-foreground/10 mb-3">
              <IndianRupee className="w-[18px] h-[18px] text-primary-foreground/80" />
            </div>
            <p className="text-[22px] font-heading font-bold text-primary-foreground leading-none">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-primary-foreground/50 mt-1">Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Revenue Chart */}
        <div className="card-elevated p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-heading font-bold text-[14px] text-foreground">Revenue · Last 7 Days</h2>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRevenueData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '10px',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-[15px] text-foreground">Your Courses</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New Course
          </button>
        </div>

        {/* Add Course Form */}
        {showForm && (
          <div className="card-elevated p-5 mb-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-[14px] text-foreground">Create New Course</h3>
              <button onClick={() => setShowForm(false)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Course title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted text-foreground text-[13px] placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted text-foreground text-[13px] placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted text-foreground text-[13px] placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <div>
                <p className="text-[11px] text-muted-foreground mb-2">Theme Color</p>
                <div className="flex gap-2">
                  {colorOptions.map(c => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${form.color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'opacity-60 hover:opacity-100'}`}
                      style={{ background: colorLight[c] }}
                    >
                      {emojiMap[c]}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddCourse}
                disabled={!form.title.trim() || !form.price.trim()}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-[13px] hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="card-elevated p-4 flex items-center gap-3.5 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colorLight[course.color] }}>
                <span className="text-base">{emojiMap[course.color]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-[13px] text-foreground truncate">{course.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{course.learners.toLocaleString()} learners · ₹{course.revenue.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={course.status === 'Live' ? 'badge-live' : 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground'}>{course.status}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
