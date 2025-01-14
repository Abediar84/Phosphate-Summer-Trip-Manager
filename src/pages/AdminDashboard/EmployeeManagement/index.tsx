import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { EmployeeTable } from './EmployeeTable';
import { ImportModal } from './ImportModal';
import { AddEditEmployeeModal } from './AddEditEmployeeModal';
import { useStore } from '../../../store/useStore';

export function EmployeeManagement() {
  const { t } = useTranslation();
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<string | null>(null);
  const { employees, deleteEmployee } = useStore();

  const handleEdit = (employeeId: string) => {
    setEditingEmployee(employeeId);
    setShowAddEditModal(true);
  };

  const handleDelete = (employeeId: string) => {
    if (window.confirm(t('admin.employeeManagement.confirmDelete'))) {
      deleteEmployee(employeeId);
      toast.success(t('admin.employeeManagement.deleteSuccess'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.employeeManagement.title')}</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {t('admin.employeeManagement.importEmployees')}
          </Button>
          <Button
            onClick={() => {
              setEditingEmployee(null);
              setShowAddEditModal(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('admin.employeeManagement.addEmployee')}
          </Button>
        </div>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ImportModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
      />

      <AddEditEmployeeModal
        open={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false);
          setEditingEmployee(null);
        }}
        employeeId={editingEmployee}
      />
    </div>
  );
}