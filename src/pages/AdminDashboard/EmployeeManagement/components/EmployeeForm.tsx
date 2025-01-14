import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/Input';
import { Employee, JobGrade, UserRole } from '../../../../types';

interface EmployeeFormProps {
  formData: Partial<Employee>;
  onChange: (field: string, value: any) => void;
  isEditing: boolean;
}

const jobGrades: JobGrade[] = ['junior', 'mid', 'senior', 'manager', 'executive'];
const userRoles: UserRole[] = ['employee', 'admin'];

export function EmployeeForm({ formData, onChange, isEditing }: EmployeeFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.form.employeeId')}
        </label>
        <Input
          name="id"
          value={formData.id}
          onChange={(e) => onChange('id', e.target.value)}
          disabled={isEditing}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.form.name')}
        </label>
        <Input
          name="name"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.form.email')}
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.form.mobileNo')}
          </label>
          <Input
            name="mobileNo"
            value={formData.mobileNo}
            onChange={(e) => onChange('mobileNo', e.target.value)}
            required
            placeholder="+20 xxx xxx xxxx"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.form.jobGrade')}
          </label>
          <select
            name="jobGrade"
            value={formData.jobGrade}
            onChange={(e) => onChange('jobGrade', e.target.value as JobGrade)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {jobGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade.charAt(0).toUpperCase() + grade.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.form.role')}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={(e) => onChange('role', e.target.value as UserRole)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {userRoles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}