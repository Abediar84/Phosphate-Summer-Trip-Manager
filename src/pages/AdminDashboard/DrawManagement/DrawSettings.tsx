import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { DrawSettings as DrawSettingsType } from '../../../types';

interface DrawSettingsProps {
  settings: DrawSettingsType;
  onUpdate: (settings: DrawSettingsType) => void;
}

export function DrawSettings({ settings, onUpdate }: DrawSettingsProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold">{t('admin.drawManagement.settings')}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.drawManagement.startDate')}
          </label>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.drawManagement.endDate')}
          </label>
          <Input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.drawManagement.selectionDeadline')}
          </label>
          <Input
            type="date"
            name="selectionDeadline"
            value={formData.selectionDeadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.drawManagement.drawDate')}
          </label>
          <Input
            type="date"
            name="drawDate"
            value={formData.drawDate}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {t('common.save')}
        </Button>
      </form>
    </Card>
  );
}