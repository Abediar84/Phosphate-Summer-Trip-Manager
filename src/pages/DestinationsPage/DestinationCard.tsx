import React from 'react';
import { motion } from 'framer-motion';
import { Destination } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Check } from 'lucide-react';

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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
              className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            className="w-full transition-all duration-300"
          >
            {isSelected ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Selected
              </motion.span>
            ) : (
              'Select'
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}