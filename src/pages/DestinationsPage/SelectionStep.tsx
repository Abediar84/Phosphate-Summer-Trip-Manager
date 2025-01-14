import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AccommodationCard } from './AccommodationCard';
import { WeekSelection } from './WeekSelection';
import { Destination, Accommodation, Selection } from '../../types';
import { generateAvailableWeeks } from '../../lib/utils/dates';
import { getEligibleAccommodations } from '../../lib/utils/accommodations';

interface SelectionStepProps {
  destination: Destination;
  accommodations: Accommodation[];
  drawSettings: {
    startDate: string;
    endDate: string;
  };
  employeeGrade: string;
  onSelect: (selection: Selection) => void;
  onBack: () => void;
}

export function SelectionStep({
  destination,
  accommodations,
  drawSettings,
  employeeGrade,
  onSelect,
  onBack,
}: SelectionStepProps) {
  const { t } = useTranslation();
  const [selectedAccommodation, setSelectedAccommodation] = React.useState<string>('');
  const [selectedWeeks, setSelectedWeeks] = React.useState<string[]>([]);

  const availableWeeks = generateAvailableWeeks(drawSettings.startDate, drawSettings.endDate);
  const eligibleAccommodations = getEligibleAccommodations(accommodations, destination.id, employeeGrade);

  const handleWeekSelect = (week: string) => {
    setSelectedWeeks(current => {
      if (current.includes(week)) {
        return current.filter(w => w !== week);
      }
      if (current.length >= 3) {
        return [...current.slice(1), week];
      }
      return [...current, week];
    });
  };

  const handleSubmit = () => {
    if (selectedAccommodation && selectedWeeks.length === 3) {
      onSelect({
        destinationId: destination.id,
        accommodationId: selectedAccommodation,
        weekSelections: selectedWeeks,
        priority: 0,
      });
    }
  };

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
          <h2 className="text-xl font-semibold">
            {destination.name}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Accommodations */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {t('destinations.selectAccommodation')}
          </h3>
          <div className="grid gap-4">
            {eligibleAccommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
                isSelected={selectedAccommodation === accommodation.id}
                onSelect={() => setSelectedAccommodation(accommodation.id)}
              />
            ))}
          </div>
        </div>

        {/* Week Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {t('destinations.selectDates')}
            </h3>
            <span className="text-sm text-gray-600">
              {selectedWeeks.length}/3 {t('destinations.weeksSelected')}
            </span>
          </div>
          
          {selectedWeeks.length >= 3 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{t('destinations.maxWeeksSelected')}</p>
            </div>
          )}

          <WeekSelection
            availableWeeks={availableWeeks}
            selectedWeeks={selectedWeeks}
            onSelectWeek={handleWeekSelect}
            maxSelections={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedAccommodation || selectedWeeks.length !== 3}
        >
          {t('destinations.confirmSelection')}
        </Button>
      </div>
    </motion.div>
  );
}