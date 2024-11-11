import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Docs from './pages/Docs';
import QuickStart from './pages/docs/getting-started/QuickStart';
import Authentication from './pages/docs/api/Authentication';
import AutoModeration from './pages/docs/features/AutoModeration';
import BestPractices from './pages/docs/guides/BestPractices';
import Overview from './components/dashboard/Overview';
import Punishments from './components/dashboard/Punishments';
import ActionHistory from './components/dashboard/History';
import Config from './components/dashboard/Settings';
import Moderation from './components/dashboard/Moderation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      setIsLoggedIn(!!user);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1c1c1c] text-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Documentation Routes */}
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/quick-start" element={<QuickStart />} />
            <Route path="/docs/api/auth" element={<Authentication />} />
            <Route path="/docs/features/auto-mod" element={<AutoModeration />} />
            <Route path="/docs/guides/best-practices" element={<BestPractices />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/dashboard" replace /> : <Signup />
              }
            />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="punishments" element={<Punishments />} />
              <Route path="history" element={<ActionHistory />} />
              <Route path="moderation" element={<Moderation />} />
              <Route path="config" element={<Config />} />
            </Route>

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;