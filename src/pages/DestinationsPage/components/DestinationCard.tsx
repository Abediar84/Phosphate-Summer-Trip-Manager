import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Destination } from '../../../types';

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
  isDisabled: boolean;
  language: string;
}

export function DestinationCard({
  destination,
  isSelected,
  onSelect,
  isDisabled,
  language,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden group">
        <div className="relative h-48">
          <img
            src={destination.image}
            alt={language === 'ar' ? destination.nameAr : destination.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary-500 bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {language === 'ar' ? destination.nameAr : destination.name}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? destination.descriptionAr : destination.description}
          </p>
          <Button
            onClick={onSelect}
            variant={isSelected ? 'default' : 'outline'}
            disabled={isDisabled}
            className="w-full"
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}