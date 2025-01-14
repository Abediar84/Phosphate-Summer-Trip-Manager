import { useState, useCallback } from 'react';
import { Selection } from '../types';
import { useStore } from '../store/useStore';

export function usePreferences(employeeId: string) {
  const { updateEmployeePreferences, confirmSelections } = useStore();
  const [currentSelection, setCurrentSelection] = useState<Selection | null>(null);

  const currentEmployee = useStore(state => 
    state.employees.find(emp => emp.id === employeeId)
  );

  const updateSelection = useCallback((selection: Selection) => {
    setCurrentSelection(selection);
    updateEmployeePreferences(employeeId, selection);
  }, [employeeId, updateEmployeePreferences]);

  const confirmAndSave = useCallback(() => {
    if (currentSelection && currentSelection.weekSelections.length === 3) {
      updateEmployeePreferences(employeeId, currentSelection);
      confirmSelections(employeeId);
    }
  }, [employeeId, currentSelection, updateEmployeePreferences, confirmSelections]);

  return {
    currentSelection,
    updateSelection,
    confirmAndSave,
    hasConfirmed: currentEmployee?.hasConfirmedSelection || false,
    confirmationCount: currentEmployee?.confirmationCount || 0,
  };
}