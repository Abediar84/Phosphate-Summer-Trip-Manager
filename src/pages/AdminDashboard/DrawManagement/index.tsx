import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/ui/Card';
import { DrawSettings } from './DrawSettings';
import { DrawRules } from './DrawRules';
import { WinnersReport } from './WinnersReport';
import { useStore } from '../../../store/useStore';

export function DrawManagement() {
  const { t } = useTranslation();
  const { drawSettings, winners, updateDrawSettings } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t('admin.drawManagement.title')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DrawSettings
          settings={drawSettings}
          onUpdate={updateDrawSettings}
        />
        <DrawRules />
      </div>

      <WinnersReport winners={winners} />
    </div>
  );
}