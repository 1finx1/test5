import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validateForm = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim()) return 'Email is required';
    if (!email.includes('@')) return 'Please enter a valid email address';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return "Passwords don't match";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password, firstName, lastName);
      
      if (signUpError) {
        if (signUpError.message?.toLowerCase().includes('email')) {
          setError('An account with this email already exists');
        } else {
          setError(signUpError.message || 'Failed to create account');
        }
        return;
      }

      // Redirect to login page with success message
      navigate('/login', { 
        state: { 
          message: 'Account created! Please check your email to verify your account.' 
        }
      });
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Bot className="mx-auto h-12 w-12 text-secondary" />
          <h2 className="mt-6 text-3xl font-bold">Create Your Account</h2>
          <p className="mt-2 text-gray-400">Join us today</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
                required
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-secondary focus:ring-secondary disabled:opacity-50"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={loading}
                required
                className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-secondary focus:ring-secondary disabled:opacity-50"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-secondary focus:ring-secondary disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-secondary focus:ring-secondary disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-secondary focus:ring-secondary disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-secondary hover:text-secondary/90 focus:outline-none focus:underline transition"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;