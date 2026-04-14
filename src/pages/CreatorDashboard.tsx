import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses, mockRevenueData } from '@/data/mockData';
import { LogOut, Users, IndianRupee, Plus, TrendingUp, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CreatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalLearners = mockCourses.reduce((a, c) => a + c.learners, 0);
  const totalRevenue = mockCourses.reduce((a, c) => a + c.revenue, 0);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Creator Dashboard</p>
            <h1 className="text-2xl font-bold text-primary-foreground">Hi, {user?.name} ✨</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">{totalLearners.toLocaleString()}</p>
            <p className="text-xs text-primary-foreground/70">Total Learners</p>
          </div>
          <div className="flex-1 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-2">
              <IndianRupee className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-primary-foreground/70">Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4">
        {/* Revenue Chart */}
        <div className="bg-card rounded-2xl shadow-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground">Revenue (Last 7 Days)</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRevenueData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-card)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₹${value}`, 'Revenue']}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-foreground">Your Courses</h2>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>

        <div className="space-y-3">
          {mockCourses.map((course, i) => (
            <div
              key={course.id}
              className="bg-card rounded-2xl shadow-card p-4 flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                course.color === 'purple' ? 'gradient-primary' :
                course.color === 'green' ? 'gradient-green' :
                course.color === 'orange' ? 'gradient-orange' : 'gradient-blue'
              }`}>
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.learners} learners • ₹{course.revenue.toLocaleString()}</p>
              </div>
              <span className="text-xs font-semibold text-course-green bg-course-green/10 px-2.5 py-1 rounded-lg">
                {course.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
