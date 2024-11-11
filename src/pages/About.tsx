import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, Shield, Zap } from 'lucide-react';

const About = () => {
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
            About <span className="gradient-text">Skout</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Empowering online communities with intelligent moderation and engagement tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400">
              At Skout, we believe in creating safer, more engaging online communities. Our mission is to provide course creators and community managers with powerful tools to automate moderation, boost engagement, and foster meaningful connections.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-400">
              We envision a future where online communities thrive through intelligent automation and proactive moderation, allowing creators to focus on what matters most - creating valuable content and building genuine connections.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard
            icon={<Bot className="w-8 h-8 text-secondary" />}
            title="Innovation"
            description="Pushing the boundaries of AI-powered community management"
          />
          <ValueCard
            icon={<Shield className="w-8 h-8 text-secondary" />}
            title="Trust"
            description="Building safer spaces for meaningful interactions"
          />
          <ValueCard
            icon={<Users className="w-8 h-8 text-secondary" />}
            title="Community"
            description="Fostering genuine connections and engagement"
          />
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="p-6 rounded-lg gradient-border text-center"
  >
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default About;