import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Destination } from '../../../../types';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  selected: string[];
  onSelect: (destinationId: string) => void;
  isDisabled: boolean;
  employeeGrade: string;
}

export function DestinationGrid({
  destinations,
  selected,
  onSelect,
  isDisabled,
  employeeGrade,
}: DestinationGridProps) {
  const { i18n } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          isSelected={selected.includes(destination.id)}
          onSelect={() => onSelect(destination.id)}
          isDisabled={isDisabled || !destination.eligibleGrades.includes(employeeGrade)}
          language={i18n.language}
        />
      ))}
    </motion.div>
  );
}