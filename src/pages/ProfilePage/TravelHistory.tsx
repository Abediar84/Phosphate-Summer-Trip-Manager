import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Check, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Employee } from '../../types';

interface TravelHistoryProps {
  employee: Employee;
}

export function TravelHistory({ employee }: TravelHistoryProps) {
  const { t } = useTranslation();

  if (!employee.travelHistory.length) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t('profile.travelHistory')}
        </h3>
        <p className="text-gray-600">{t('profile.noHistory')}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t('profile.travelHistory')}
      </h3>
      <div className="space-y-4">
        {employee.travelHistory
          .sort((a, b) => b.year - a.year)
          .map((history, index) => {
            const date = new Date(history.year, 0);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{history.destination}</h4>
                    <p className="text-sm text-gray-600">
                      {date.toLocaleDateString('en-GB', {
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {history.won ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <Check className="w-4 h-4 mr-1" />
                      {t('profile.won')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      <X className="w-4 h-4 mr-1" />
                      {t('profile.notWon')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
}