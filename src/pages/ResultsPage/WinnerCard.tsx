import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Employee, Destination } from '../../types';
import { User, MapPin } from 'lucide-react';

interface WinnerCardProps {
  winner: Employee;
  destination?: Destination;
}

export function WinnerCard({ winner, destination }: WinnerCardProps) {
  const { i18n } = useTranslation();

  return (
    <Card className="overflow-hidden">
      {destination && (
        <div className="relative h-48">
          <img
            src={destination.image}
            alt={i18n.language === 'ar' ? destination.nameAr : destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{winner.name}</h3>
              <p className="text-sm text-gray-600">ID: {winner.id}</p>
            </div>
          </div>
        </div>

        {destination && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {i18n.language === 'ar' ? destination.nameAr : destination.name}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {i18n.language === 'ar' ? destination.descriptionAr : destination.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}