import { StateCreator } from 'zustand';
import { DrawSettings, NotificationSettings } from '../../types';
import { mockDrawSettings, mockNotificationSettings } from '../../lib/mock-data';

export interface SettingsSlice {
  drawSettings: DrawSettings;
  notificationSettings: NotificationSettings;
  language: 'en' | 'ar';
  setLanguage: (language: 'en' | 'ar') => void;
  updateDrawSettings: (settings: DrawSettings) => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  drawSettings: mockDrawSettings,
  notificationSettings: mockNotificationSettings,
  language: 'en',

  setLanguage: (language) => {
    set({ language });
  },

  updateDrawSettings: (settings) => {
    set({ drawSettings: { ...settings } });
  },

  updateNotificationSettings: (settings) => {
    set({ notificationSettings: { ...settings } });
  },
});