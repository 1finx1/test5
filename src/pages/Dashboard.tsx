import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, BarChart3, History as HistoryIcon, AlertTriangle, Search } from 'lucide-react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  React.useEffect(() => {
    // Only update initial load state when loading is complete
    if (!loading) {
      setIsInitialLoad(false);
      // Redirect if no user after loading completes
      if (!user) {
        navigate('/login', { replace: true });
      }
    }
  }, [loading, user, navigate]);

  // Show loading spinner only during initial load
  if (loading && isInitialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // If not loading but no user, return null (redirect will happen in useEffect)
  if (!user) {
    return null;
  }

  const currentPath = location.pathname.split('/').pop() || 'overview';

  return (
    <div className="pt-16 min-h-screen">
      {/* Rest of your dashboard code remains the same */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-16 h-full w-64 bg-background border-r border-white/10 p-4"
      >
        <nav className="space-y-2">
          <NavItem 
            icon={<BarChart3 />} 
            text="Overview" 
            to="/dashboard/overview" 
            active={currentPath === 'overview'} 
          />
          <NavItem 
            icon={<AlertTriangle />} 
            text="Punishments" 
            to="/dashboard/punishments" 
            active={currentPath === 'punishments'} 
          />
          <NavItem 
            icon={<HistoryIcon />} 
            text="History" 
            to="/dashboard/history" 
            active={currentPath === 'history'} 
          />
          <NavItem 
            icon={<Shield />} 
            text="Moderation" 
            to="/dashboard/moderation" 
            active={currentPath === 'moderation'} 
          />
          <NavItem 
            icon={<Settings />} 
            text="Config" 
            to="/dashboard/config" 
            active={currentPath === 'config'} 
          />
        </nav>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-64 p-8"
      >
        <div className="mb-8 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-bold"
          >
            {currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}
          </motion.h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring-secondary"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, to, active = false }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer ${
        active ? 'bg-white/10 text-secondary' : 'text-gray-400 hover:text-white'
      }`}
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  </Link>
);

export default Dashboard;