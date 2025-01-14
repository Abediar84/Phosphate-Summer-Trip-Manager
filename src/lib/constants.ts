import { DrawSettings, NotificationSettings } from '../types';

export const SUMMER_VACATION = {
  START_MONTH: 5, // June (0-based)
  END_MONTH: 9,  // October (0-based)
  WEEK_START_DAY: 5, // Friday (0 = Sunday, 5 = Friday)
  SELECTION_COUNT: 3,
  CONFIRMATION_ATTEMPTS: 3,
};

export const DESTINATIONS = {
  ALEXANDRIA: 'alexandria',
  MARSA_MATROUH: 'marsa-matrouh',
  NORTH_COAST: 'north-coast',
};

export const GRADE_LEVELS = {
  JUNIOR: 'junior',
  MID: 'mid',
  SENIOR: 'senior',
  MANAGER: 'manager',
  EXECUTIVE: 'executive',
} as const;

export const ACCOMMODATION_TYPES = {
  APARTMENT: 'apartment',
  CHALET: 'chalet',
} as const;

export const DEFAULT_DRAW_SETTINGS: DrawSettings = {
  startDate: `${new Date().getFullYear()}-06-01`,
  endDate: `${new Date().getFullYear()}-10-31`,
  selectionDeadline: `${new Date().getFullYear()}-05-15`,
  drawDate: `${new Date().getFullYear()}-05-20`,
  maxSelectionsPerEmployee: 3,
  maxConfirmationAttempts: 3,
};

export const NOTIFICATION_DEFAULTS: NotificationSettings = {
  emailEnabled: true,
  whatsappEnabled: true,
};