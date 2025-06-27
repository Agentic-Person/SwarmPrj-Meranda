import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { Layout } from './components/Layout/Layout';
import { useAuth } from './hooks/useAuth';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { OnboardingPage } from './pages/Onboarding/OnboardingPage';
import { MarketplacePage } from './pages/Marketplace/MarketplacePage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { CreateProjectPage } from './pages/Project/CreateProjectPage';
import { ProjectDetailPage } from './pages/Project/ProjectDetailPage';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user needs to complete onboarding
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Onboarding Route wrapper
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// App component that uses the auth context
const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={user ? <Navigate to={user.onboardingCompleted ? "/dashboard" : "/onboarding"} /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to={user.onboardingCompleted ? "/dashboard" : "/onboarding"} /> : <RegisterPage />} />
        <Route path="/marketplace" element={<Layout><MarketplacePage /></Layout>} />
        <Route path="/project/:id" element={<Layout><ProjectDetailPage /></Layout>} />
        
        {/* Onboarding route */}
        <Route path="/onboarding" element={
          <OnboardingRoute>
            <OnboardingPage />
          </OnboardingRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><DashboardPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/create-project" element={
          <ProtectedRoute>
            <Layout><CreateProjectPage /></Layout>
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Main App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;