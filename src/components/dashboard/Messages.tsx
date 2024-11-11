import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Flag } from 'lucide-react';

const Messages = () => {
  const messages = [
    {
      id: 1,
      user: 'John Doe',
      message: 'Hey everyone! Just joined the community.',
      timestamp: '5 mins ago',
      starred: true,
    },
    {
      id: 2,
      user: 'Jane Smith',
      message: 'Great resource on React hooks!',
      timestamp: '1 hour ago',
      starred: false,
    },
    {
      id: 3,
      user: 'Mike Johnson',
      message: 'Anyone interested in a study group?',
      timestamp: '2 hours ago',
      starred: false,
    },
  ];

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 rounded-lg p-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{message.user}</h3>
                  <span className="text-sm text-gray-400">{message.timestamp}</span>
                </div>
                <p className="mt-1 text-gray-300">{message.message}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className={`p-1 rounded-full hover:bg-white/10 ${message.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}>
                <Star className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-red-400">
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Messages;