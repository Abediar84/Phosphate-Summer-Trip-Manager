import { useState } from 'react';
import { Selection } from '../../../types';

export function useDestinationSelection() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>('');
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([]);

  const handleWeekSelect = (week: string) => {
    setSelectedWeeks(current => {
      if (current.includes(week)) {
        return current.filter(w => w !== week);
      }
      if (current.length >= 3) {
        // Replace oldest selection if we've reached the limit
        return [...current.slice(1), week].sort((a, b) => 
          new Date(a).getTime() - new Date(b).getTime()
        );
      }
      return [...current, week].sort((a, b) => 
        new Date(a).getTime() - new Date(b).getTime()
      );
    });
  };

  const resetSelection = () => {
    setSelectedDestination(null);
    setSelectedAccommodation('');
    setSelectedWeeks([]);
  };

  const isSelectionComplete = () => {
    return selectedAccommodation && selectedWeeks.length === 3;
  };

  const getSelection = (): Selection | null => {
    if (!selectedDestination || !isSelectionComplete()) return null;

    return {
      destinationId: selectedDestination,
      accommodationId: selectedAccommodation,
      weekStart: selectedWeeks[0], // Use first week as primary selection
    };
  };

  return {
    selectedDestination,
    setSelectedDestination,
    selectedAccommodation,
    setSelectedAccommodation,
    selectedWeeks,
    handleWeekSelect,
    resetSelection,
    isSelectionComplete,
    getSelection,
  };
}