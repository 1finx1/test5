import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background/50 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Skout</h3>
            <p className="text-gray-400">
              Enhancing Skool.com communities with powerful automation and moderation tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-secondary">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-secondary">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-secondary">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-secondary">About</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-secondary">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>contact@skout.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Skout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;