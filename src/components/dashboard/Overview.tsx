import React from 'react';
import { motion } from 'framer-motion';

const Overview = () => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Bot Status"
          value="Offline"
          status="offline"
        />
        <StatCard
          title="Active Discussions"
          value="56"
          change="+8%"
          positive={true}
        />
        <StatCard
          title="Response Time"
          value="1.2m"
          change="-25%"
          positive={true}
        />
      </div>

      {/* Recent Activity */}
      <section className="bg-white/5 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ActivityItem key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  status?: 'online' | 'offline';
}

const StatCard = ({ title, value, change, positive, status }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="gradient-border p-6 rounded-lg"
  >
    <h3 className="text-gray-400 mb-2">{title}</h3>
    <div className="flex items-end justify-between">
      {status ? (
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={`text-2xl font-bold ${status === 'online' ? 'text-green-400' : 'text-red-400'}`}>{value}</span>
        </div>
      ) : (
        <>
          <span className="text-3xl font-bold">{value}</span>
          {change && (
            <span className={`text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
          )}
        </>
      )}
    </div>
  </motion.div>
);

const ActivityItem = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-between p-4 rounded-lg bg-white/5"
  >
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
      <div>
        <p className="font-medium">New member joined</p>
        <p className="text-sm text-gray-400">2 minutes ago</p>
      </div>
    </div>
    <button className="text-secondary hover:text-primary">View</button>
  </motion.div>
);

export default Overview;