import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';

interface SelectedDestinationsProps {
  selectedWeeksCount: number;
  onSubmit: () => void;
}

export function SelectedDestinations({
  selectedWeeksCount,
  onSubmit,
}: SelectedDestinationsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-600">
        {selectedWeeksCount}/3 {t('destinations.weeksSelected')}
      </div>
      <Button
        onClick={onSubmit}
        disabled={selectedWeeksCount !== 3}
      >
        {t('destinations.confirmSelection')}
      </Button>
    </div>
  );
}