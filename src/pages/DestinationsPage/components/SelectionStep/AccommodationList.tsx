import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/ui/Card';
import { Accommodation } from '../../../../types';

interface AccommodationListProps {
  accommodations: Accommodation[];
  selectedAccommodation: string;
  onSelect: (id: string) => void;
}

export function AccommodationList({
  accommodations,
  selectedAccommodation,
  onSelect,
}: AccommodationListProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {t('destinations.selectAccommodation')}
      </h3>
      <div className="grid gap-4">
        {accommodations.map((accommodation) => (
          <Card
            key={accommodation.id}
            className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
              selectedAccommodation === accommodation.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => onSelect(accommodation.id)}
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
  );
}