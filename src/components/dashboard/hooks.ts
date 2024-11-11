import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Types
interface ConfigData {
  admin_email: string;
  admin_password: string;
  community_url: string;
}

interface ModerationConfig {
  post_moderation_enabled: boolean;
  post_max_warnings: number;
  post_punishment_type: 'mute' | 'ban';
  post_mute_duration: number;
  comment_moderation_enabled: boolean;
  comment_max_warnings: number;
  comment_punishment_type: 'mute' | 'ban';
  comment_mute_duration: number;
  banned_keywords: string[];
  spam_protection_enabled: boolean;
  ignore_admins: boolean;
}

// Config Hook
export function useConfig(user: any) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [config, setConfig] = useState<ConfigData>({
    admin_email: '',
    admin_password: '',
    community_url: '',
  });

  useEffect(() => {
    let mounted = true;

    async function loadConfig() {
      console.log('1. Starting loadConfig...', { userId: user?.id });
      
      if (!user?.id) {
        console.log('2. No user ID found');
        setLoading(false);
        return;
      }

      try {
        console.log('3. Making Supabase query...');
        
        // First, verify the user exists
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error('4a. Error fetching user:', userError);
          throw new Error(`User verification failed: ${userError.message}`);
        }

        console.log('4. User verified:', userData);

        // Then fetch the config
        const { data, error: fetchError } = await supabase
          .from('monitor_config')
          .select('*')
          .eq('user_id', user.id)
          .single();

        console.log('5. Config query response:', { data, error: fetchError });

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            console.log('6a. No config found, creating new one...');
            // No row found, create new config
            const { data: newConfig, error: insertError } = await supabase
              .from('monitor_config')
              .insert([
                {
                  user_id: user.id,
                  admin_email: '',
                  admin_password: '',
                  community_url: '',
                }
              ])
              .select()
              .single();

            if (insertError) {
              console.error('6b. Insert error:', insertError);
              throw new Error(`Failed to create config: ${insertError.message}`);
            }

            if (mounted && newConfig) {
              console.log('6c. New config created:', newConfig);
              setConfig({
                admin_email: newConfig.admin_email || '',
                admin_password: newConfig.admin_password || '',
                community_url: newConfig.community_url || '',
              });
            }
          } else {
            console.error('6d. Fetch error:', fetchError);
            throw new Error(`Failed to fetch config: ${fetchError.message}`);
          }
        } else if (data && mounted) {
          console.log('6. Setting existing config:', data);
          setConfig({
            admin_email: data.admin_email || '',
            admin_password: data.admin_password || '',
            community_url: data.community_url || '',
          });
        }
      } catch (err) {
        console.error('7. Caught error:', err);
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(errorMessage);
        }
      } finally {
        if (mounted) {
          console.log('8. Finishing loadConfig...');
          setLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const saveConfig = async () => {
    if (!user?.id) {
      console.log('Cannot save config: No user ID found');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      console.log('Saving config:', config);
      
      const { error: saveError } = await supabase
        .from('monitor_config')
        .update({
          admin_email: config.admin_email,
          admin_password: config.admin_password,
          community_url: config.community_url,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (saveError) {
        throw new Error(`Save error: ${saveError.message}`);
      }

      console.log('Config saved successfully');
      setSuccess('Configuration saved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error in saveConfig:', errorMessage);
      setError(`Failed to save configuration: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  return { loading, saving, error, success, config, setConfig, saveConfig };
}

// Moderation Hook
export function useModeration(user: any) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [config, setConfig] = useState<ModerationConfig>({
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
  });

  useEffect(() => {
    let mounted = true;

    async function loadConfig() {
      console.log('1. Starting moderation config load...', { userId: user?.id });
      
      if (!user?.id) {
        console.log('2. No user ID found for moderation config');
        setLoading(false);
        return;
      }

      try {
        console.log('3. Fetching moderation config...');
        
        const { data, error: fetchError } = await supabase
          .from('monitor_config')
          .select('*')
          .eq('user_id', user.id)
          .single();

        console.log('4. Moderation config response:', { data, error: fetchError });

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            console.log('5a. No moderation config found, creating default...');
            const { data: newConfig, error: insertError } = await supabase
              .from('monitor_config')
              .insert([{
                user_id: user.id,
                ...config,
              }])
              .select()
              .single();

            if (insertError) {
              console.error('5b. Insert error:', insertError);
              throw new Error(`Failed to create moderation config: ${insertError.message}`);
            }

            console.log('5c. New moderation config created:', newConfig);
          } else {
            console.error('5d. Fetch error:', fetchError);
            throw new Error(`Failed to fetch moderation config: ${fetchError.message}`);
          }
        } else if (data && mounted) {
          console.log('5. Setting existing moderation config:', data);
          setConfig({
            post_moderation_enabled: data.post_moderation_enabled ?? false,
            post_max_warnings: data.post_max_warnings ?? 3,
            post_punishment_type: data.post_punishment_type ?? 'mute',
            post_mute_duration: data.post_mute_duration ?? 3600,
            comment_moderation_enabled: data.comment_moderation_enabled ?? false,
            comment_max_warnings: data.comment_max_warnings ?? 3,
            comment_punishment_type: data.comment_punishment_type ?? 'mute',
            comment_mute_duration: data.comment_mute_duration ?? 3600,
            banned_keywords: data.banned_keywords ?? [],
            spam_protection_enabled: data.spam_protection_enabled ?? true,
            ignore_admins: data.ignore_admins ?? true,
          });
        }
      } catch (err) {
        console.error('6. Caught error:', err);
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(errorMessage);
        }
      } finally {
        if (mounted) {
          console.log('7. Finishing moderation config load...');
          setLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const saveConfig = async () => {
    if (!user?.id) {
      console.log('Cannot save moderation config: No user ID found');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      console.log('Saving moderation config:', config);
      
      const { error: saveError } = await supabase
        .from('monitor_config')
        .update({
          post_moderation_enabled: config.post_moderation_enabled,
          post_max_warnings: config.post_max_warnings,
          post_punishment_type: config.post_punishment_type,
          post_mute_duration: config.post_mute_duration,
          comment_moderation_enabled: config.comment_moderation_enabled,
          comment_max_warnings: config.comment_max_warnings,
          comment_punishment_type: config.comment_punishment_type,
          comment_mute_duration: config.comment_mute_duration,
          banned_keywords: config.banned_keywords,
          spam_protection_enabled: config.spam_protection_enabled,
          ignore_admins: config.ignore_admins,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (saveError) {
        throw new Error(`Save error: ${saveError.message}`);
      }

      console.log('Moderation config saved successfully');
      setSuccess('Configuration saved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error in saveConfig:', errorMessage);
      setError(`Failed to save configuration: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  return { loading, saving, error, success, config, setConfig, saveConfig };
}