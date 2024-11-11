import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MessageSquare, Ban, Flag } from 'lucide-react';

const History = () => {
  const actions = [
    {
      id: 1,
      type: 'warning',
      user: 'John Doe',
      action: 'Post Warning',
      reason: 'Inappropriate content in post',
      timestamp: '5 mins ago',
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: 'ban',
      user: 'Mike Johnson',
      action: 'User Banned',
      reason: 'Multiple violations of community guidelines',
      timestamp: '1 hour ago',
      icon: Ban,
    },
    {
      id: 3,
      type: 'flag',
      user: 'Jane Smith',
      action: 'Comment Flagged',
      reason: 'Potential spam content',
      timestamp: '2 hours ago',
      icon: Flag,
    },
  ];

  return (
    <div className="space-y-4">
      {actions.map((action) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 rounded-lg p-4 flex items-center space-x-4"
        >
          <div className={`p-2 rounded-full ${
            action.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
            action.type === 'ban' ? 'bg-red-500/10 text-red-400' :
            'bg-blue-500/10 text-blue-400'
          }`}>
            <action.icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{action.action}</h3>
              <span className="text-sm text-gray-400">- {action.user}</span>
            </div>
            <p className="text-sm text-gray-400">{action.reason}</p>
          </div>
          <span className="text-sm text-gray-400">{action.timestamp}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default History;