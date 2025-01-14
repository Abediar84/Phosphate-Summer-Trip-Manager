import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Users, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImageGallery } from '../../components/ui/ImageGallery';
import { Accommodation } from '../../types';

interface AccommodationCardProps {
  accommodation: Accommodation;
  isSelected: boolean;
  onSelect: () => void;
}

export function AccommodationCard({
  accommodation,
  isSelected,
  onSelect,
}: AccommodationCardProps) {
  const { t, i18n } = useTranslation();
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className={`overflow-hidden cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-primary-500' : ''
          }`}
          onClick={onSelect}
        >
          <div className="relative h-48">
            <img
              src={accommodation.photos[0]}
              alt={i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}
              className="w-full h-full object-cover"
            />
            {accommodation.photos.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGallery(true);
                }}
              >
                <Image className="w-4 h-4 mr-2" />
                {accommodation.photos.length} {t('common.photos')}
              </Button>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{i18n.language === 'ar' ? accommodation.locationAr : accommodation.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{t('destinations.capacity', { count: accommodation.capacity })}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {i18n.language === 'ar' ? accommodation.descriptionAr : accommodation.description}
            </p>

            <Button
              variant={isSelected ? 'default' : 'outline'}
              className="w-full"
            >
              {isSelected ? t('common.selected') : t('common.select')}
            </Button>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showGallery && (
          <ImageGallery
            images={accommodation.photos}
            onClose={() => setShowGallery(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}