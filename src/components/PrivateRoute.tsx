import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading, initialized } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<Error | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Add a small delay to prevent flash of loading state on fast connections
    if (!loading && initialized) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, initialized]);

  if (!initialized || loading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-lg font-semibold">An error occurred while authenticating.</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Wrap children in an error boundary
  try {
    return <>{children}</>;
  } catch (e) {
    setError(e as Error);
    return null;
  }
}