import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Code, Zap, Compass, BookOpen, Terminal, Shield, BarChart3, Puzzle, Lightbulb, Users, Workflow } from 'lucide-react';

const docsCategories = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    id: 'getting-started',
    items: [
      { title: 'Quick Start', path: '/docs/quick-start', description: 'Get up and running in minutes' },
      { title: 'Installation', path: '/docs/installation', description: 'Step-by-step installation guide' },
      { title: 'Configuration', path: '/docs/configuration', description: 'Configure Skout for your needs' },
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    id: 'api-reference',
    items: [
      { title: 'Authentication', path: '/docs/api/auth', description: 'Secure API authentication' },
      { title: 'Moderation', path: '/docs/api/moderation', description: 'Content moderation endpoints' },
      { title: 'Webhooks', path: '/docs/api/webhooks', description: 'Real-time event notifications' },
    ]
  },
  {
    title: 'Features',
    icon: Zap,
    id: 'features',
    items: [
      { title: 'Auto-Moderation', path: '/docs/features/auto-mod', description: 'AI-powered content moderation' },
      { title: 'Analytics', path: '/docs/features/analytics', description: 'Community insights and metrics' },
      { title: 'Integrations', path: '/docs/features/integrations', description: 'Third-party integrations' },
    ]
  },
  {
    title: 'Guides',
    icon: Compass,
    id: 'guides',
    items: [
      { title: 'Best Practices', path: '/docs/guides/best-practices', description: 'Recommended usage patterns' },
      { title: 'Community Management', path: '/docs/guides/community', description: 'Effective community management' },
      { title: 'Advanced Usage', path: '/docs/guides/advanced', description: 'Advanced features and customization' },
    ]
  }
];

const Docs = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Book className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about using Skout to enhance your Skool.com community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docsCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-6"
              id={category.id}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-semibold">{category.title}</h2>
              </div>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block p-4 rounded-lg border border-white/10 hover:border-secondary transition-colors"
                  >
                    <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;