import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { WeekSelectionList } from './WeekSelectionList';
import { Destination, Accommodation } from '../../../types';
import { generateAvailableWeeks } from '../../../lib/utils/dates';

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
          <h2 className="text-xl font-semibold">
            {i18n.language === 'ar' ? destination.nameAr : destination.name}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Week Selection */}
        <WeekSelectionList
          availableWeeks={availableWeeks}
          selectedWeeks={selectedWeeks}
          onSelectWeek={onWeekSelect}
          maxSelections={3}
        />

        {/* Accommodation Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {t('destinations.selectAccommodation')}
          </h3>
          <div className="grid gap-4">
            {eligibleAccommodations.map((accommodation) => (
              <Card
                key={accommodation.id}
                className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedAccommodation === accommodation.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedAccommodation(accommodation.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={accommodation.photos[0]}
                    alt={i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium">
                      {i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('destinations.capacity', { count: accommodation.capacity })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onComplete}
          disabled={!isComplete}
        >
          {t('destinations.confirmSelection')}
        </Button>
      </div>
    </motion.div>
  );
}