export interface Config {
  bannedKeywords: string[];
  ignoreAdmins: boolean;
  postPunishmentType: 'mute' | 'ban';
  commentPunishmentType: 'mute' | 'ban';
  postMuteDuration: number;
  commentMuteDuration: number;
  postModerationEnabled: boolean;
  commentModerationEnabled: boolean;
  spamProtectionEnabled: boolean;
  postMaxWarnings: number;
  commentMaxWarnings: number;
}

export const DEFAULT_CONFIG: Config = {
  bannedKeywords: [],
  ignoreAdmins: true,
  postPunishmentType: 'mute',
  commentPunishmentType: 'mute',
  postMuteDuration: 1800,
  commentMuteDuration: 3600,
  postModerationEnabled: true,
  commentModerationEnabled: true,
  spamProtectionEnabled: true,
  postMaxWarnings: 3,
  commentMaxWarnings: 5
};