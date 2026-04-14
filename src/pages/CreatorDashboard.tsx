import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses, mockRevenueData } from '@/data/mockData';
import { LogOut, Users, IndianRupee, Plus, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const CreatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalLearners = mockCourses.reduce((a, c) => a + c.learners, 0);
  const totalRevenue = mockCourses.reduce((a, c) => a + c.revenue, 0);

  const colorLight: Record<string, string> = {
    purple: 'hsl(234, 62%, 50%)',
    green: 'hsl(160, 60%, 40%)',
    orange: 'hsl(32, 90%, 50%)',
    blue: 'hsl(200, 80%, 46%)',
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
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:text-primary/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Course
          </button>
        </div>

        <div className="space-y-2.5">
          {mockCourses.map((course, i) => (
            <div
              key={course.id}
              className="card-elevated p-4 flex items-center gap-3.5 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colorLight[course.color] }}>
                <span className="text-base">
                  {course.color === 'purple' ? '⚛️' : course.color === 'green' ? '🐍' : course.color === 'orange' ? '🎨' : '🔧'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-[13px] text-foreground truncate">{course.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{course.learners.toLocaleString()} learners · ₹{course.revenue.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="badge-live">{course.status}</span>
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
