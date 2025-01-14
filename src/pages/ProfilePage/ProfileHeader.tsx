import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Briefcase, Mail } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Employee } from '../../types';

interface ProfileHeaderProps {
  employee: Employee;
}

export function ProfileHeader({ employee }: ProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
      <div className="px-6 pb-6">
        <div className="relative flex items-center gap-6">
          <div className="absolute -top-8 w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <div className="ml-28 pt-4">
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{employee.jobGrade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{employee.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}