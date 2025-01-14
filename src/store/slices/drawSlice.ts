import { StateCreator } from 'zustand';
import { Employee } from '../../types';
import { isEligibleForCurrentYear } from '../../lib/utils/dates';
import { sendWinnerNotification } from '../../lib/utils/notifications';
import { AppState } from '../useStore';

export interface DrawSlice {
  winners: Employee[];
  performDraw: () => Promise<void>;
}

export const createDrawSlice: StateCreator<
  AppState,
  [],
  [],
  DrawSlice
> = (set, get) => ({
  winners: [],

  performDraw: async () => {
    const state = get();
    const eligibleEmployees = state.employees.filter(isEligibleForCurrentYear);
    const winners = eligibleEmployees
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, eligibleEmployees.length));

    await Promise.all(
      winners.map(async (winner) => {
        if (winner.preferences?.[0]) {
          const selection = winner.preferences[0];
          const destination = state.destinations.find(d => d.id === selection.destinationId);
          const accommodation = state.accommodations.find(a => a.id === selection.accommodationId);
          
          if (destination && accommodation) {
            await sendWinnerNotification(
              winner,
              selection,
              destination,
              accommodation,
              state.notificationSettings
            );
          }
        }
      })
    );

    set({ winners: winners.map(winner => ({ ...winner })) });
  },
});