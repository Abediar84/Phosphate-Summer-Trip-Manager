import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollText } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

export function DrawRules() {
  const { t } = useTranslation();

  const rules = [
    'admin.drawManagement.rules.lastYear',
    'admin.drawManagement.rules.destinations',
    'admin.drawManagement.rules.accommodations',
    'admin.drawManagement.rules.grades',
    'admin.drawManagement.rules.selections',
    'admin.drawManagement.rules.duration',
    'admin.drawManagement.rules.login',
    'admin.drawManagement.rules.notifications',
    'admin.drawManagement.rules.language',
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ScrollText className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold">{t('admin.drawManagement.rules.title')}</h3>
      </div>

      <ul className="space-y-4">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-gray-600">{t(rule)}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}