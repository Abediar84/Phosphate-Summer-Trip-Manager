import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { UserSelectionsList } from './UserSelectionsList';
import { SelectionStats } from './SelectionStats';
import { Button } from '../../../components/ui/Button';
import { useStore } from '../../../store/useStore';
import { exportSelectionsToExcel } from '../../../lib/utils/excel';

export function UserSelections() {
  const { t, i18n } = useTranslation();
  const { employees, destinations, accommodations } = useStore();

  const employeesWithSelections = employees.filter(emp => emp.preferences?.length > 0);

  const handleExport = () => {
    const getDestinationName = (id: string) => {
      const destination = destinations.find(d => d.id === id);
      return i18n.language === 'ar' ? destination?.nameAr || '' : destination?.name || '';
    };

    const getAccommodationName = (id: string) => {
      const accommodation = accommodations.find(a => a.id === id);
      return i18n.language === 'ar' ? accommodation?.nameAr || '' : accommodation?.name || '';
    };

    exportSelectionsToExcel(
      employeesWithSelections,
      getDestinationName,
      getAccommodationName,
      i18n.language
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.userSelections.title')}</h2>
        <Button
          onClick={handleExport}
          disabled={employeesWithSelections.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {t('admin.userSelections.exportToExcel')}
        </Button>
      </div>
      <SelectionStats employees={employees} />
      <UserSelectionsList employees={employeesWithSelections} />
    </div>
  );
}