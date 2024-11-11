import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Bot, MessageSquare, BarChart3, Settings, Lock } from 'lucide-react';

const Features = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">
            Powerful Features for Your <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create, manage, and grow your Skool.com community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bot />}
            title="AI Moderation"
            description="Automatically detect and filter inappropriate content, spam, and toxic behavior."
          />
          <FeatureCard
            icon={<Shield />}
            title="Advanced Security"
            description="Protect your community with customizable security rules and member verification."
          />
          <FeatureCard
            icon={<MessageSquare />}
            title="Smart Responses"
            description="Auto-respond to common questions and streamline community management."
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Analytics Dashboard"
            description="Track engagement, growth, and community health with detailed insights."
          />
          <FeatureCard
            icon={<Settings />}
            title="Custom Workflows"
            description="Create automated workflows for repetitive tasks and moderation."
          />
          <FeatureCard
            icon={<Lock />}
            title="Access Control"
            description="Fine-grained permissions and role management for your community."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="p-6 rounded-lg gradient-border"
  >
    <div className="mb-4 text-secondary">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Features;