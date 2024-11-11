import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <ScrollText className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-400">Last updated: March 15, 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <Section
            title="1. Acceptance of Terms"
            content="By accessing or using Skout's services, you agree to be bound by these Terms of Service and all applicable laws and regulations."
          />

          <Section
            title="2. Description of Service"
            content="Skout provides community management and moderation tools for online communities. We reserve the right to modify or discontinue the service at any time."
          />

          <Section
            title="3. User Responsibilities"
            content="You are responsible for maintaining the security of your account and for all activities that occur under your account."
          />

          <Section
            title="4. Prohibited Activities"
            content="Users may not engage in any activity that interferes with or disrupts the services or servers and networks connected to the services."
          />

          <Section
            title="5. Intellectual Property"
            content="The service and its original content, features, and functionality are owned by Skout and are protected by international copyright, trademark, and other intellectual property laws."
          />

          <Section
            title="6. Termination"
            content="We may terminate or suspend your account and access to the service immediately, without prior notice or liability, under our sole discretion, for any reason."
          />

          <Section
            title="7. Contact"
            content="For any questions about these Terms, please contact us at legal@skout.com"
          />
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, content }: { title: string, content: string }) => (
  <div className="bg-white/5 rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-400">{content}</p>
  </div>
);

export default Terms;