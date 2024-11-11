import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Docs', path: '/docs' },
    ...(isLoggedIn ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size={32} />
            <span className="text-xl font-bold gradient-text">Skout</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'nav-link',
                  location.pathname === item.path && 'text-secondary'
                )}
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <User className="w-5 h-5 text-secondary" />
                </button>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-white/10 shadow-lg py-1"
                  >
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-white/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        className="md:hidden overflow-hidden bg-background/95"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'block px-3 py-2 rounded-md text-base font-medium',
                location.pathname === item.path
                  ? 'text-secondary'
                  : 'text-white hover:text-secondary'
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="block w-full text-center btn-primary mt-4"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:text-secondary"
            >
              Sign Out
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;