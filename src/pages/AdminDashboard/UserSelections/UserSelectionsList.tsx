import React from 'react';
import { useTranslation } from 'react-i18next';
import { useVirtualizer } from '@tanstack/react-virtual';
import { MapPin, Calendar, Home, Check, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Employee } from '../../../types';
import { useStore } from '../../../store/useStore';
import { formatDate } from '../../../lib/utils/dates';

interface UserSelectionsListProps {
  employees: Employee[];
}

export function UserSelectionsList({ employees }: UserSelectionsListProps) {
  const { t, i18n } = useTranslation();
  const { destinations, accommodations } = useStore();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: employees.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  if (!employees.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600">{t('admin.userSelections.noSelections')}</p>
      </Card>
    );
  }

  return (
    <div 
      ref={parentRef} 
      className="h-[800px] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const employee = employees[virtualRow.index];
          return (
            <div
              key={employee.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Card className="p-6 m-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{employee.name}</h3>
                    <p className="text-sm text-gray-600">ID: {employee.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {employee.hasConfirmedSelection ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Check className="w-4 h-4 mr-1" />
                        {t('admin.userSelections.confirmed')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {t('admin.userSelections.pending')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {employee.preferences?.map((selection, index) => {
                    const destination = destinations.find(d => d.id === selection.destinationId);
                    const accommodation = accommodations.find(a => a.id === selection.accommodationId);
                    
                    if (!destination || !accommodation) return null;

                    return (
                      <div
                        key={`${selection.destinationId}-${index}`}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={destination.image}
                            alt={i18n.language === 'ar' ? destination.nameAr : destination.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span className="font-medium">
                              {i18n.language === 'ar' ? destination.nameAr : destination.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({t('admin.userSelections.preference')} #{index + 1})
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Home className="w-4 h-4" />
                              <span>
                                {i18n.language === 'ar' ? accommodation.nameAr : accommodation.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(selection.weekStart, i18n.language)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}