import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  category: string;
}

const DocLayout = ({ title, description, children, category }: DocLayoutProps) => {
  // Map categories to their respective paths
  const getCategoryPath = (category: string) => {
    const paths: { [key: string]: string } = {
      'Getting Started': '/docs#getting-started',
      'API Reference': '/docs#api-reference',
      'Features': '/docs#features',
      'Guides': '/docs#guides'
    };
    return paths[category] || '/docs';
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link 
            to="/docs" 
            className="hover:text-secondary transition-colors"
          >
            Docs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            to={getCategoryPath(category)}
            className="hover:text-secondary transition-colors"
          >
            {category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary">{title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-400 mb-12">{description}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DocLayout;