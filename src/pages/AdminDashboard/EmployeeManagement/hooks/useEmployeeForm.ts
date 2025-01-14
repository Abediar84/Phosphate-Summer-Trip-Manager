import { useState, useEffect } from 'react';
import { Employee } from '../../../../types';

export function useEmployeeForm(
  initialEmployee?: Employee,
  onSave?: (employee: Employee) => void
) {
  const [formData, setFormData] = useState<Partial<Employee>>({
    id: '',
    name: '',
    jobGrade: 'junior',
    role: 'employee',
    email: '',
    mobileNo: '',
    travelHistory: [],
    hasConfirmedSelection: false,
    confirmationCount: 0,
  });

  useEffect(() => {
    if (initialEmployee) {
      setFormData(initialEmployee);
    } else {
      setFormData({
        id: '',
        name: '',
        jobGrade: 'junior',
        role: 'employee',
        email: '',
        mobileNo: '',
        travelHistory: [],
        hasConfirmedSelection: false,
        confirmationCount: 0,
      });
    }
  }, [initialEmployee]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.id?.trim()) errors.push('Employee ID is required');
    if (!formData.name?.trim()) errors.push('Name is required');
    if (!formData.email?.trim()) errors.push('Email is required');
    if (!formData.mobileNo?.trim()) errors.push('Mobile number is required');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }

    // Validate mobile number format
    const mobileRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.mobileNo && !mobileRegex.test(formData.mobileNo)) {
      errors.push('Invalid mobile number format');
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      return errors;
    }

    if (onSave) {
      onSave(formData as Employee);
    }
    return [];
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    validateForm,
  };
}