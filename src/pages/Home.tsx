import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Enhance Your <span className="gradient-text">Skool.com</span> Community
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Automate moderation, boost engagement, and create a thriving learning environment with Skout's powerful community tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn-primary">
                Start Free Trial
              </Link>
              <Link to="/features" className="btn-secondary">
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-secondary" />}
              title="Smart Moderation"
              description="AI-powered content moderation that keeps your community safe and engaging."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-secondary" />}
              title="Automation Tools"
              description="Streamline repetitive tasks and focus on what matters most - your community."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-secondary" />}
              title="Community Insights"
              description="Deep analytics and engagement metrics to help you grow your community."
            />
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Trusted by Course Creators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
              {/* Replace with actual logos */}
              <div className="h-12 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              <div className="h-12 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              <div className="h-12 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              <div className="h-12 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-lg gradient-border"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Home;