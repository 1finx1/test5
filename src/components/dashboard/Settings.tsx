import React from 'react';
import { motion } from 'framer-motion';
import { Info, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from './hooks';

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative">
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-secondary cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap max-w-xs text-center">
      {text}
    </div>
  </div>
);

const Config = () => {
  const { user } = useAuth();
  const {
    loading,
    saving,
    error,
    success,
    config,
    setConfig,
    saveConfig
  } = useConfig(user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Please log in to access settings.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-lg p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-semibold">Info</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium">Skool Admin Email</label>
                <Tooltip text="The email address used to log into your Skool.com admin account" />
              </div>
              <input
                type="email"
                value={config.admin_email}
                onChange={(e) => setConfig({ ...config, admin_email: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                placeholder="admin@example.com"
                disabled={saving}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium">Skool Admin Password</label>
                <Tooltip text="Your Skool.com admin account password" />
              </div>
              <input
                type="password"
                value={config.admin_password}
                onChange={(e) => setConfig({ ...config, admin_password: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                placeholder="••••••••"
                disabled={saving}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium">Skool Community Link</label>
                <Tooltip text="The URL of your Skool.com community" />
              </div>
              <input
                type="url"
                value={config.community_url}
                onChange={(e) => setConfig({ ...config, community_url: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                placeholder="https://community.skool.com/yourcommunity"
                disabled={saving}
              />
            </div>
          </div>
        )}
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-end"
      >
        <button 
          className="btn-primary px-8"
          onClick={saveConfig}
          disabled={loading || saving}
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </motion.div>
    </div>
  );
};

export default Config;