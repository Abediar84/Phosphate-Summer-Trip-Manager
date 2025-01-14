import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useStore } from '../../../store/useStore';
import { Employee, JobGrade, UserRole } from '../../../types';

interface AddEditEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employeeId: string | null;
}

const jobGrades: JobGrade[] = ['junior', 'mid', 'senior', 'manager', 'executive'];
const userRoles: UserRole[] = ['employee', 'admin'];

export function AddEditEmployeeModal({
  open,
  onClose,
  employeeId,
}: AddEditEmployeeModalProps) {
  const { t } = useTranslation();
  const { employees, addEmployee, updateEmployee } = useStore();
  const isEditing = !!employeeId;

  const employee = isEditing
    ? employees.find((emp) => emp.id === employeeId)
    : null;

  const [formData, setFormData] = React.useState<Partial<Employee>>({
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

  React.useEffect(() => {
    if (employee) {
      setFormData(employee);
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
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.email || !formData.mobileNo) {
      toast.error(t('admin.form.requiredFields'));
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('admin.form.invalidEmail'));
      return;
    }

    // Validate mobile number format (simple validation)
    const mobileRegex = /^\+?[\d\s-]{10,}$/;
    if (!mobileRegex.test(formData.mobileNo)) {
      toast.error(t('admin.form.invalidMobile'));
      return;
    }

    try {
      if (isEditing) {
        updateEmployee(employeeId, formData as Employee);
        toast.success(t('admin.form.updateSuccess'));
      } else {
        if (employees.some((emp) => emp.id === formData.id)) {
          toast.error(t('admin.form.duplicateId'));
          return;
        }
        addEmployee(formData as Employee);
        toast.success(t('admin.form.addSuccess'));
      }
      onClose();
    } catch (error) {
      toast.error(t('admin.form.error'));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditing ? t('admin.form.editEmployee') : t('admin.form.addEmployee')}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.form.employeeId')}
            </label>
            <Input
              name="id"
              value={formData.id}
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {isEditing ? t('common.save') : t('common.add')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}