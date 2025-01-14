import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Home } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Employee } from '../../types';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../lib/utils/dates';

interface CurrentPreferencesProps {
  employee: Employee;
}

export function CurrentPreferences({ employee }: CurrentPreferencesProps) {
  const { t, i18n } = useTranslation();
  const { destinations, accommodations } = useStore();

  if (!employee.preferences) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t('profile.currentPreferences')}
        </h3>
        <p className="text-gray-600">{t('profile.noPreferences')}</p>
      </Card>
    );
  }

  const destination = destinations.find(d => d.id === employee.preferences?.destinationId);
  const accommodation = accommodations.find(a => a.id === employee.preferences?.accommodationId);

  if (!destination || !accommodation) return null;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t('profile.currentPreferences')}
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={destination.image}
              alt={i18n.language === 'ar' ? destination.nameAr : destination.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary-500" />
              <h4 className="text-lg font-medium">
                {i18n.language === 'ar' ? destination.nameAr : destination.name}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Home className="w-4 h-4" />
              <span>{i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t('profile.selectedWeeks')}
          </h5>
          <div className="grid gap-2">
            {employee.preferences.weekSelections.map((week, index) => (
              <div
                key={week}
                className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <span className="text-sm font-medium">
                  {t('profile.weekNumber', { number: index + 1 })}
                </span>
                <span className="text-gray-600">
                  {formatDate(week, i18n.language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}