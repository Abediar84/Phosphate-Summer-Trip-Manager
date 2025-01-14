import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Employee } from '../../types';
import { useStore } from '../../store/useStore';

interface WinnersListProps {
  winners: Employee[];
}

export function WinnersList({ winners }: WinnersListProps) {
  const { t } = useTranslation();
  const { destinations } = useStore();

  if (winners.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {t('results.title')}
      </h2>
      <div className="space-y-4">
        {winners.map((winner) => (
          <div
            key={winner.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{winner.name}</h3>
              <p className="text-sm text-gray-600">ID: {winner.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {winner.preferences?.[0] && 
                  destinations.find(d => d.id === winner.preferences[0])?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}