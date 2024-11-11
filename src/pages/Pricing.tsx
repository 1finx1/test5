import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for small communities',
    features: [
      'Basic moderation tools',
      'Up to 1,000 members',
      'Community insights',
      'Email support',
      '1 admin account',
    ],
  },
  {
    name: 'Pro',
    price: '99',
    description: 'For growing communities',
    features: [
      'Advanced AI moderation',
      'Up to 10,000 members',
      'Advanced analytics',
      'Priority support',
      'Custom workflows',
      '5 admin accounts',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large communities',
    features: [
      'Custom AI models',
      'Unlimited members',
      'Advanced security',
      'Dedicated support',
      'Custom integrations',
      'Unlimited admins',
    ],
  },
];

const Pricing = () => {
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
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your community size and needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-lg ${
                plan.popular ? 'gradient-border relative' : 'border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">
                    {plan.price === 'Custom' ? '' : '$'}
                  </span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="text-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`block text-center ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                } w-full`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;