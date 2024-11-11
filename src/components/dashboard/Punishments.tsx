import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Ban, Eye } from 'lucide-react';

const Punishments = () => {
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'banned',
      postWarnings: 3,
      commentWarnings: 2,
      banReason: 'Multiple violations of community guidelines'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: null,
      postWarnings: 1,
      commentWarnings: 0,
      banReason: null
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      status: 'banned',
      postWarnings: 5,
      commentWarnings: 4,
      banReason: 'Repeated inappropriate content'
    },
  ];

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Post Warnings</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Comment Warnings</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {users.map((user) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === 'banned' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user.status || 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm ${user.postWarnings > 2 ? 'text-red-400' : 'text-gray-400'}`}>
                  {user.postWarnings}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm ${user.commentWarnings > 2 ? 'text-red-400' : 'text-gray-400'}`}>
                  {user.commentWarnings}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                <div className="flex space-x-2">
                  <button className="p-1 hover:text-secondary rounded-full hover:bg-white/10">
                    <Eye className="w-4 h-4" />
                  </button>
                  {!user.status && (
                    <button className="p-1 hover:text-red-400 rounded-full hover:bg-white/10">
                      <Ban className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1 hover:text-yellow-400 rounded-full hover:bg-white/10">
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Punishments;