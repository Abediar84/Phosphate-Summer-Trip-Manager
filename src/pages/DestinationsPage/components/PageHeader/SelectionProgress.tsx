import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/Button';

interface SelectionProgressProps {
  selectedWeeksCount: number;
  onSubmit: () => void;
}

export function SelectionProgress({
  selectedWeeksCount,
  onSubmit,
}: SelectionProgressProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4"
    >
      <div className="text-sm text-gray-600">
        {selectedWeeksCount}/3 {t('destinations.weeksSelected')}
      </div>
      <Button
        onClick={onSubmit}
        disabled={selectedWeeksCount !== 3}
      >
        {t('destinations.confirmSelection')}
      </Button>
    </motion.div>
  );
}