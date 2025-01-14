import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useStore } from '../../store/useStore';

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { employees, setCurrentEmployee } = useStore();
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const employee = employees.find(emp => emp.id === employeeId.trim());
    if (!employee) {
      setError(t('login.invalidId'));
      toast.error(t('login.invalidId'));
      return;
    }

    setCurrentEmployee(employee.id);
    toast.success(t('login.success'));
    
    if (employee.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/destinations');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
          {t('login.employeeId')}
        </label>
        <Input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          className={error ? 'border-red-500' : ''}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {t('login.submit')}
      </Button>
    </form>
  );
}