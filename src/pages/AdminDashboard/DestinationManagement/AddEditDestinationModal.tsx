import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Destination, JobGrade, TripClassification } from '../../../types';

interface AddEditDestinationModalProps {
  open: boolean;
  onClose: () => void;
  destination?: Destination;
  classifications: TripClassification[];
  onSave: (destination: Destination) => void;
}

const jobGrades: JobGrade[] = ['junior', 'mid', 'senior', 'manager', 'executive'];

export function AddEditDestinationModal({
  open,
  onClose,
  destination,
  classifications,
  onSave,
}: AddEditDestinationModalProps) {
  const { t } = useTranslation();
  const isEditing = !!destination;

  const [formData, setFormData] = React.useState<Partial<Destination>>({
    id: '',
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    image: '',
    eligibleGrades: [],
    classificationId: '',
  });

  React.useEffect(() => {
    if (destination) {
      setFormData(destination);
    } else {
      setFormData({
        id: crypto.randomUUID(),
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        image: '',
        eligibleGrades: [],
        classificationId: '',
      });
    }
  }, [destination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.nameAr || !formData.image || !formData.classificationId) {
      toast.error(t('admin.form.requiredFields'));
      return;
    }

    try {
      onSave(formData as Destination);
      toast.success(isEditing ? t('admin.destinationManagement.successEdit') : t('admin.destinationManagement.successAdd'));
      onClose();
    } catch (error) {
      toast.error(t('admin.form.error'));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGradeChange = (grade: JobGrade) => {
    setFormData((prev) => ({
      ...prev,
      eligibleGrades: prev.eligibleGrades?.includes(grade)
        ? prev.eligibleGrades.filter((g) => g !== grade)
        : [...(prev.eligibleGrades || []), grade],
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditing ? t('admin.destinationManagement.editDestination') : t('admin.destinationManagement.addDestination')}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.destinationManagement.name')} (English)
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.destinationManagement.name')} (Arabic)
              </label>
              <Input
                name="nameAr"
                value={formData.nameAr}
                onChange={handleChange}
                required
                dir="rtl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.destinationManagement.image')}
            </label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.destinationManagement.classification')}
            </label>
            <select
              name="classificationId"
              value={formData.classificationId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{t('common.select')}</option>
              {classifications.map((classification) => (
                <option key={classification.id} value={classification.id}>
                  {classification.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.destinationManagement.eligibleGrades')}
            </label>
            <div className="flex flex-wrap gap-2">
              {jobGrades.map((grade) => (
                <Button
                  key={grade}
                  type="button"
                  variant={formData.eligibleGrades?.includes(grade) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleGradeChange(grade)}
                >
                  {grade.charAt(0).toUpperCase() + grade.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.destinationManagement.description')} (English)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.destinationManagement.description')} (Arabic)
              </label>
              <textarea
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                dir="rtl"
              />
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