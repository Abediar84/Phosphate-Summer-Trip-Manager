import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Upload, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Accommodation, Destination, JobGrade, AccommodationType } from '../../../types';

interface AddEditAccommodationModalProps {
  open: boolean;
  onClose: () => void;
  accommodation?: Accommodation;
  destinations: Destination[];
  onSave: (accommodation: Accommodation) => void;
}

const jobGrades: JobGrade[] = ['junior', 'mid', 'senior', 'manager', 'executive'];
const accommodationTypes: AccommodationType[] = ['apartment', 'chalet'];

export function AddEditAccommodationModal({
  open,
  onClose,
  accommodation,
  destinations,
  onSave,
}: AddEditAccommodationModalProps) {
  const { t } = useTranslation();
  const isEditing = !!accommodation;

  const [formData, setFormData] = React.useState<Partial<Accommodation>>({
    id: '',
    name: '',
    nameAr: '',
    destinationId: '',
    type: 'apartment',
    description: '',
    descriptionAr: '',
    location: '',
    locationAr: '',
    capacity: 0,
    eligibleGrades: [],
    photos: [],
  });

  React.useEffect(() => {
    if (accommodation) {
      setFormData(accommodation);
    } else {
      setFormData({
        id: crypto.randomUUID(),
        name: '',
        nameAr: '',
        destinationId: '',
        type: 'apartment',
        description: '',
        descriptionAr: '',
        location: '',
        locationAr: '',
        capacity: 0,
        eligibleGrades: [],
        photos: [],
      });
    }
  }, [accommodation]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData(prev => ({
            ...prev,
            photos: [...(prev.photos || []), e.target!.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxSize: 5242880, // 5MB
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.nameAr || !formData.destinationId) {
      toast.error(t('admin.form.requiredFields'));
      return;
    }

    try {
      onSave(formData as Accommodation);
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
      [name]: name === 'capacity' ? parseInt(value) : value,
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

  const handlePhotoRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? t('admin.accommodationManagement.editAccommodation') : t('admin.accommodationManagement.addAccommodation')}
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
          {/* Form fields remain the same until photos section */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.accommodationManagement.photos')}
            </label>
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? t('admin.accommodationManagement.dropPhotos')
                    : t('admin.accommodationManagement.dragPhotos')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('admin.accommodationManagement.photoRequirements')}
                </p>
              </div>

              {formData.photos && formData.photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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