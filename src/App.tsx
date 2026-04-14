import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import LoginPage from "./pages/LoginPage";
import LearnerDashboard from "./pages/LearnerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import CourseDetail from "./pages/CourseDetail";
import VideoModule from "./pages/VideoModule";
import QuizPage from "./pages/QuizPage";
import ProgressDashboard from "./pages/ProgressDashboard";
import MysteryReward from "./pages/MysteryReward";
import StreakBetting from "./pages/StreakBetting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated
          ? <Navigate to={user?.role === 'creator' ? '/creator' : '/dashboard'} replace />
          : <LoginPage />
      } />
      <Route path="/dashboard" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
      <Route path="/creator" element={<ProtectedRoute role="creator"><CreatorDashboard /></ProtectedRoute>} />
      <Route path="/course/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
      <Route path="/module/:id" element={<ProtectedRoute><VideoModule /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressDashboard /></ProtectedRoute>} />
      <Route path="/reward/:courseId" element={<ProtectedRoute><MysteryReward /></ProtectedRoute>} />
      <Route path="/streak-bet" element={<ProtectedRoute><StreakBetting /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProgressProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
