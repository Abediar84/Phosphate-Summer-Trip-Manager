import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Employee } from '../../../types';

interface SelectionStatsProps {
  employees: Employee[];
}

export function SelectionStats({ employees }: SelectionStatsProps) {
  const { t } = useTranslation();

  const totalEmployees = employees.length;
  const employeesWithSelections = employees.filter(emp => emp.preferences?.length > 0).length;
  const confirmedSelections = employees.filter(emp => emp.hasConfirmedSelection).length;

  const stats = [
    {
      icon: Users,
      label: t('admin.userSelections.stats.totalEmployees'),
      value: totalEmployees,
    },
    {
      icon: CheckCircle,
      label: t('admin.userSelections.stats.confirmedSelections'),
      value: confirmedSelections,
    },
    {
      icon: Clock,
      label: t('admin.userSelections.stats.pendingSelections'),
      value: employeesWithSelections - confirmedSelections,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <Card key={label} className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary-100">
              <Icon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}