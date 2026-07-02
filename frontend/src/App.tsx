import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';

import DashboardLayout from './layouts/DashboardLayout';

// Lazy loading pages for performance optimization
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Resumes = lazy(() => import('./pages/Resumes'));
const InterviewsList = lazy(() => import('./pages/InterviewsList'));
const InterviewSetup = lazy(() => import('./pages/InterviewSetup'));
const MockInterview = lazy(() => import('./pages/MockInterview'));
const InterviewDetails = lazy(() => import('./pages/InterviewDetails'));
const CodingInterview = lazy(() => import('./pages/CodingInterview'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated && user?.role === 'admin' ? <>{children}</> : <Navigate to="/dashboard" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            <Route 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              } 
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/interviews" element={<InterviewsList />} />
              <Route path="/interviews/new" element={<InterviewSetup />} />
              <Route path="/interviews/:id/feedback" element={<InterviewDetails />} />
              <Route path="/coding" element={<CodingInterview />} />
              
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
            </Route>

            {/* Full Screen Interview Mode */}
            <Route 
              path="/interview/:id" 
              element={
                <ProtectedRoute>
                  <MockInterview />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
