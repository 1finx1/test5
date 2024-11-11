import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Shield className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-400">Last updated: March 15, 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <Section
            title="Information We Collect"
            content="We collect information that you provide directly to us, including name, email address, and any other information you choose to provide. We also automatically collect certain information about your device when you use our services."
          />

          <Section
            title="How We Use Your Information"
            content="We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations."
          />

          <Section
            title="Information Sharing"
            content="We do not sell your personal information. We may share your information with third-party service providers who assist us in providing our services."
          />

          <Section
            title="Data Security"
            content="We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
          />

          <Section
            title="Your Rights"
            content="You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information."
          />

          <Section
            title="Contact Us"
            content="If you have any questions about this Privacy Policy, please contact us at privacy@skout.com"
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

export default Privacy;