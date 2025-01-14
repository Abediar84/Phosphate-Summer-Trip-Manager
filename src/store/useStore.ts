import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EmployeeSlice, createEmployeeSlice } from './slices/employeeSlice';
import { AccommodationSlice, createAccommodationSlice } from './slices/accommodationSlice';
import { SettingsSlice, createSettingsSlice } from './slices/settingsSlice';
import { DrawSlice, createDrawSlice } from './slices/drawSlice';
import { mockDestinations } from '../lib/mock-data';
import { Destination } from '../types';

export interface AppState extends 
  EmployeeSlice,
  AccommodationSlice,
  SettingsSlice,
  DrawSlice {
  destinations: Destination[];
}

export const useStore = create<AppState>()(
  devtools(
    (...a) => ({
      ...createEmployeeSlice(...a),
      ...createAccommodationSlice(...a),
      ...createSettingsSlice(...a),
      ...createDrawSlice(...a),
      destinations: mockDestinations,
    }),
    { name: 'App Store' }
  )
);