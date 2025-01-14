import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

interface WeekSelectionProps {
  availableWeeks: string[];
  selectedWeeks: string[];
  onSelectWeek: (week: string) => void;
  maxSelections: number;
}

export function WeekSelection({
  availableWeeks,
  selectedWeeks,
  onSelectWeek,
  maxSelections,
}: WeekSelectionProps) {
  const { t, i18n } = useTranslation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
      {availableWeeks.map((week) => {
        const isSelected = selectedWeeks.includes(week);
        const isDisabled = selectedWeeks.length >= maxSelections && !isSelected;

        return (
          <motion.div
            key={week}
            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              } ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}
              onClick={() => !isDisabled && onSelectWeek(week)}
            >
              <div className="flex items-center gap-4">
                <Calendar className={`w-6 h-6 ${isSelected ? 'text-primary-500' : 'text-gray-400'}`} />
                <div>
                  <p className="font-medium">{formatDate(week)}</p>
                  <p className="text-sm text-gray-600">
                    {t('destinations.weekStarts')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}