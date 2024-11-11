import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Users, Shield } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      description: 'John Doe mentioned you in a comment',
      time: '5 mins ago',
      icon: MessageSquare,
    },
    {
      id: 2,
      type: 'member',
      title: 'New Member',
      description: 'Jane Smith joined the community',
      time: '1 hour ago',
      icon: Users,
    },
    {
      id: 3,
      type: 'moderation',
      title: 'Content Flagged',
      description: 'A post was flagged for review',
      time: '2 hours ago',
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 rounded-lg p-4 flex items-center space-x-4"
        >
          <div className={`p-2 rounded-full ${
            notification.type === 'message' ? 'bg-blue-500/10 text-blue-400' :
            notification.type === 'member' ? 'bg-green-500/10 text-green-400' :
            'bg-red-500/10 text-red-400'
          }`}>
            <notification.icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-400">{notification.description}</p>
          </div>
          <span className="text-sm text-gray-400">{notification.time}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default Notifications;