import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface ModerationConfig {
  postModerationEnabled: boolean;
  postMaxWarnings: number;
  postPunishmentType: 'mute' | 'ban';
  postMuteDuration: number;
  commentModerationEnabled: boolean;
  commentMaxWarnings: number;
  commentPunishmentType: 'mute' | 'ban';
  commentMuteDuration: number;
  bannedKeywords: string[];
  spamProtectionEnabled: boolean;
  ignoreAdmins: boolean;
}

export function useModeration(user: any) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [config, setConfig] = useState<ModerationConfig>({
    postModerationEnabled: false,
    postMaxWarnings: 3,
    postPunishmentType: 'mute',
    postMuteDuration: 3600,
    commentModerationEnabled: false,
    commentMaxWarnings: 3,
    commentPunishmentType: 'mute',
    commentMuteDuration: 3600,
    bannedKeywords: [],
    spamProtectionEnabled: true,
    ignoreAdmins: true,
  });

  useEffect(() => {
    let mounted = true;

    async function loadConfig() {
      console.log('Loading moderation config for user:', user?.id);

      if (!user?.id) {
        console.log('No user ID found');
        if (mounted) setLoading(false);
        return;
      }

      try {
        console.log('Fetching moderation config from Supabase...');
        
        const { data, error } = await supabase
          .from('monitor_config')
          .select('*')
          .eq('user_id', user.id)
          .single();

        console.log('Supabase response:', { data, error });

        if (error) throw error;

        if (data && mounted) {
          setConfig({
            postModerationEnabled: data.post_moderation_enabled ?? false,
            postMaxWarnings: data.post_max_warnings ?? 3,
            postPunishmentType: data.post_punishment_type ?? 'mute',
            postMuteDuration: data.post_mute_duration ?? 3600,
            commentModerationEnabled: data.comment_moderation_enabled ?? false,
            commentMaxWarnings: data.comment_max_warnings ?? 3,
            commentPunishmentType: data.comment_punishment_type ?? 'mute',
            commentMuteDuration: data.comment_mute_duration ?? 3600,
            bannedKeywords: data.banned_keywords ?? [],
            spamProtectionEnabled: data.spam_protection_enabled ?? true,
            ignoreAdmins: data.ignore_admins ?? true,
          });
        } else if (mounted) {
          console.log('No config found, creating new one...');
          // If no config exists, create one with default values
          const { error: insertError } = await supabase
            .from('monitor_config')
            .insert([{
              user_id: user.id,
              post_moderation_enabled: false,
              post_max_warnings: 3,
              post_punishment_type: 'mute',
              post_mute_duration: 3600,
              comment_moderation_enabled: false,
              comment_max_warnings: 3,
              comment_punishment_type: 'mute',
              comment_mute_duration: 3600,
              banned_keywords: [],
              spam_protection_enabled: true,
              ignore_admins: true,
            }])
            .single();

          if (insertError) {
            console.error('Error creating config:', insertError);
            throw insertError;
          }
        }
      } catch (err) {
        console.error('Error in loadConfig:', err);
        if (mounted) setError('Failed to load configuration');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadConfig();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const saveConfig = async () => {
    if (!user?.id) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      console.log('Saving moderation config:', config);

      const { error } = await supabase
        .from('monitor_config')
        .update({
          post_moderation_enabled: config.postModerationEnabled,
          post_max_warnings: config.postMaxWarnings,
          post_punishment_type: config.postPunishmentType,
          post_mute_duration: config.postMuteDuration,
          comment_moderation_enabled: config.commentModerationEnabled,
          comment_max_warnings: config.commentMaxWarnings,
          comment_punishment_type: config.commentPunishmentType,
          comment_mute_duration: config.commentMuteDuration,
          banned_keywords: config.bannedKeywords,
          spam_protection_enabled: config.spamProtectionEnabled,
          ignore_admins: config.ignoreAdmins,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setSuccess('Configuration saved successfully');
    } catch (err) {
      console.error('Error in saveConfig:', err);
      setError('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    error,
    success,
    config,
    setConfig,
    saveConfig,
  };
}