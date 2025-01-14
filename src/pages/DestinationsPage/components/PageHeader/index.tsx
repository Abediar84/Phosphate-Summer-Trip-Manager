import React from 'react';
import { useTranslation } from 'react-i18next';
import { SelectionProgress } from './SelectionProgress';
import { PageTitle } from './PageTitle';

interface PageHeaderProps {
  selectedDestination: string | null;
  selectedWeeksCount: number;
  onSubmit: () => void;
}

export function PageHeader({
  selectedDestination,
  selectedWeeksCount,
  onSubmit,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <PageTitle />
      {selectedDestination && (
        <SelectionProgress
          selectedWeeksCount={selectedWeeksCount}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}