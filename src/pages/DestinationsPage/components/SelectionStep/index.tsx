import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { WeekSelectionList } from './WeekSelectionList';
import { AccommodationList } from './AccommodationList';
import { Destination, Accommodation } from '../../../../types';
import { generateAvailableWeeks } from '../../../../lib/utils/dates';

interface SelectionStepProps {
  destination: Destination;
  accommodations: Accommodation[];
  drawSettings: {
    startDate: string;
    endDate: string;
  };
  employeeGrade: string;
  selectedAccommodation: string;
  setSelectedAccommodation: (id: string) => void;
  selectedWeeks: string[];
  onWeekSelect: (week: string) => void;
  onBack: () => void;
  onComplete: () => void;
  isComplete: boolean;
}

export function SelectionStep({
  destination,
  accommodations,
  drawSettings,
  employeeGrade,
  selectedAccommodation,
  setSelectedAccommodation,
  selectedWeeks,
  onWeekSelect,
  onBack,
  onComplete,
  isComplete,
}: SelectionStepProps) {
  const { t, i18n } = useTranslation();
  const availableWeeks = generateAvailableWeeks(drawSettings.startDate, drawSettings.endDate);

  const eligibleAccommodations = accommodations.filter(acc => 
    acc.destinationId === destination.id && acc.eligibleGrades.includes(employeeGrade)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {i18n.language === 'ar' ? destination.nameAr : destination.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t('destinations.selectWeeks')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <WeekSelectionList
          availableWeeks={availableWeeks}
          selectedWeeks={selectedWeeks}
          onSelectWeek={onWeekSelect}
          maxSelections={3}
        />

        <AccommodationList
          accommodations={eligibleAccommodations}
          selectedAccommodation={selectedAccommodation}
          onSelect={setSelectedAccommodation}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onComplete}
          disabled={!isComplete}
          size="lg"
        >
          {t('destinations.confirmSelection')}
        </Button>
      </div>
    </motion.div>
  );
}