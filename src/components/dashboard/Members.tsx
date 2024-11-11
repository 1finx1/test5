import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Mail, Ban } from 'lucide-react';

const Members = () => {
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', status: 'Inactive' },
  ];

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {members.map((member) => (
            <motion.tr
              key={member.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{member.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{member.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{member.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {member.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                <div className="flex space-x-2">
                  <button className="p-1 hover:text-secondary rounded-full hover:bg-white/10">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-red-400 rounded-full hover:bg-white/10">
                    <Ban className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-secondary rounded-full hover:bg-white/10">
                    <MoreVertical className="w-4 h-4" />
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

export default Members;