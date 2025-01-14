import { StateCreator } from 'zustand';
import { Accommodation } from '../../types';
import { mockAccommodations } from '../../lib/mock-data';

export interface AccommodationSlice {
  accommodations: Accommodation[];
  addAccommodation: (accommodation: Accommodation) => void;
  updateAccommodation: (updatedAccommodation: Accommodation) => void;
  deleteAccommodation: (accommodationId: string) => void;
}

export const createAccommodationSlice: StateCreator<AccommodationSlice> = (set) => ({
  accommodations: mockAccommodations,

  addAccommodation: (accommodation) => {
    set((state) => ({
      accommodations: [...state.accommodations, { ...accommodation }],
    }));
  },

  updateAccommodation: (updatedAccommodation) => {
    set((state) => ({
      accommodations: state.accommodations.map((acc) =>
        acc.id === updatedAccommodation.id ? { ...updatedAccommodation } : acc
      ),
    }));
  },

  deleteAccommodation: (accommodationId) => {
    set((state) => ({
      accommodations: state.accommodations.filter((acc) => acc.id !== accommodationId),
    }));
  },
});