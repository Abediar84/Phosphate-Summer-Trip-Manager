import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../hooks/useAuth';
import { usePreferences } from '../../hooks/usePreferences';
import { DestinationGrid } from './components/DestinationGrid';
import { SelectionStep } from './components/SelectionStep';
import { PageHeader } from './components/PageHeader';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Selection } from '../../types';
import { hasReachedMaxSelections } from '../../lib/utils';

export function DestinationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, currentEmployee } = useAuth();
  const { destinations, accommodations, drawSettings } = useStore();
  const { updateSelection, confirmAndSave } = usePreferences(currentEmployee?.id || '');
  
  const [selectedDestination, setSelectedDestination] = React.useState<string | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = React.useState<string>('');
  const [selectedWeeks, setSelectedWeeks] = React.useState<string[]>([]);

  if (!isAuthenticated || !currentEmployee) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (hasReachedMaxSelections(currentEmployee)) {
    navigate('/profile');
    return null;
  }

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId);
    setSelectedAccommodation('');
    setSelectedWeeks([]);
  };

  const handleWeekSelect = (week: string) => {
    setSelectedWeeks(current => {
      if (current.includes(week)) {
        return current.filter(w => w !== week);
      }
      if (current.length >= 3) {
        return [...current.slice(1), week].sort((a, b) => 
          new Date(a).getTime() - new Date(b).getTime()
        );
      }
      return [...current, week].sort((a, b) => 
        new Date(a).getTime() - new Date(b).getTime()
      );
    });
  };

  const handleSelectionComplete = () => {
    if (selectedDestination && selectedAccommodation && selectedWeeks.length === 3) {
      const selection: Selection = {
        destinationId: selectedDestination,
        accommodationId: selectedAccommodation,
        weekSelections: selectedWeeks,
      };

      updateSelection(selection);
      confirmAndSave();
      toast.success(t('destinations.selectionsSaved'));
      navigate('/profile');
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        selectedDestination={selectedDestination}
        selectedWeeksCount={selectedWeeks.length}
        onSubmit={handleSelectionComplete}
      />

      <AnimatePresence mode="wait">
        {selectedDestination ? (
          <SelectionStep
            key="selection-step"
            destination={destinations.find(d => d.id === selectedDestination)!}
            accommodations={accommodations}
            drawSettings={drawSettings}
            employeeGrade={currentEmployee.jobGrade}
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            selectedWeeks={selectedWeeks}
            onWeekSelect={handleWeekSelect}
            onBack={() => setSelectedDestination(null)}
            onComplete={handleSelectionComplete}
            isComplete={selectedAccommodation !== '' && selectedWeeks.length === 3}
          />
        ) : (
          <DestinationGrid
            key="destination-grid"
            destinations={destinations}
            selected={selectedDestination ? [selectedDestination] : []}
            onSelect={handleDestinationSelect}
            isDisabled={false}
            employeeGrade={currentEmployee.jobGrade}
          />
        )}
      </AnimatePresence>
    </div>
  );
}