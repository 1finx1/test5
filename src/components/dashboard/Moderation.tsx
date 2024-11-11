import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, MessageSquare, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Tooltip } from './moderation/Tooltip';
import { useModeration } from './moderation/useModeration';

const Moderation = () => {
  const { user, loading: authLoading } = useAuth();
  const [newWord, setNewWord] = useState('');
  const {
    loading: configLoading,
    saving,
    error,
    success,
    config,
    setConfig,
    saveConfig
  } = useModeration(user);

  const handleAddWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newWord.trim()) {
      setConfig({
        ...config,
        bannedKeywords: [...config.bannedKeywords, newWord.trim().toLowerCase()]
      });
      setNewWord('');
    }
  };

  const handleRemoveWord = (word: string) => {
    setConfig({
      ...config,
      bannedKeywords: config.bannedKeywords.filter(w => w !== word)
    });
  };

  if (authLoading || configLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
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
          Configuration saved successfully
        </div>
      )}

      {/* Post Moderation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold">Post Moderation</h2>
            <Tooltip text="Enable or disable post moderation features" />
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.postModerationEnabled}
              onChange={(e) => setConfig({
                ...config,
                postModerationEnabled: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <AnimatePresence>
          {config.postModerationEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">Max Warnings</label>
                    <Tooltip text="Number of warnings before permanent ban" />
                  </div>
                  <input
                    type="number"
                    value={config.postMaxWarnings}
                    onChange={(e) => setConfig({
                      ...config,
                      postMaxWarnings: parseInt(e.target.value)
                    })}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">Punishment Type</label>
                    <Tooltip text="Type of punishment for violations" />
                  </div>
                  <select
                    value={config.postPunishmentType}
                    onChange={(e) => setConfig({
                      ...config,
                      postPunishmentType: e.target.value as 'mute' | 'ban'
                    })}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                  >
                    <option value="mute">Mute</option>
                    <option value="ban">Ban</option>
                  </select>
                </div>
                {config.postPunishmentType === 'mute' && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Mute Duration (seconds)</label>
                      <Tooltip text="Duration of the mute in seconds" />
                    </div>
                    <input
                      type="number"
                      value={config.postMuteDuration}
                      onChange={(e) => setConfig({
                        ...config,
                        postMuteDuration: parseInt(e.target.value)
                      })}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Comment Moderation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold">Comment Moderation</h2>
            <Tooltip text="Enable or disable comment moderation features" />
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.commentModerationEnabled}
              onChange={(e) => setConfig({
                ...config,
                commentModerationEnabled: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <AnimatePresence>
          {config.commentModerationEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">Max Warnings</label>
                    <Tooltip text="Number of warnings before permanent ban" />
                  </div>
                  <input
                    type="number"
                    value={config.commentMaxWarnings}
                    onChange={(e) => setConfig({
                      ...config,
                      commentMaxWarnings: parseInt(e.target.value)
                    })}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">Punishment Type</label>
                    <Tooltip text="Type of punishment for violations" />
                  </div>
                  <select
                    value={config.commentPunishmentType}
                    onChange={(e) => setConfig({
                      ...config,
                      commentPunishmentType: e.target.value as 'mute' | 'ban'
                    })}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                  >
                    <option value="mute">Mute</option>
                    <option value="ban">Ban</option>
                  </select>
                </div>
                {config.commentPunishmentType === 'mute' && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Mute Duration (seconds)</label>
                      <Tooltip text="Duration of the mute in seconds" />
                    </div>
                    <input
                      type="number"
                      value={config.commentMuteDuration}
                      onChange={(e) => setConfig({
                        ...config,
                        commentMuteDuration: parseInt(e.target.value)
                      })}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Banned Keywords */}
      <AnimatePresence>
        {(config.postModerationEnabled || config.commentModerationEnabled) && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/5 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-secondary" />
              <h2 className="text-xl font-semibold">Banned Keywords</h2>
              <Tooltip text="Words that will be automatically filtered from all messages and comments" />
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={handleAddWord}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:border-secondary focus:ring-secondary mb-2"
                  placeholder="Type a word and press Enter to add it"
                />
                <div className="flex flex-wrap gap-2">
                  {config.bannedKeywords.map((word) => (
                    <div
                      key={word}
                      className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{word}</span>
                      <button
                        onClick={() => handleRemoveWord(word)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Spam Protection */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold">Spam Protection</h2>
            <Tooltip text="Enable or disable spam protection features" />
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.spamProtectionEnabled}
              onChange={(e) => setConfig({
                ...config,
                spamProtectionEnabled: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <AnimatePresence>
          {config.spamProtectionEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium">Ignore Admins</label>
                  <Tooltip text="Skip spam checking for admin posts" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.ignoreAdmins}
                    onChange={(e) => setConfig({
                      ...config,
                      ignoreAdmins: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-end"
      >
        <button 
          className="btn-primary px-8"
          onClick={saveConfig}
          disabled={saving || authLoading}
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </motion.div>
    </div>
  );
};

export default Moderation;