import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Trip, Destination, TripStatus } from '../../../types';

interface AddEditTripModalProps {
  open: boolean;
  onClose: () => void;
  trip?: Trip;
  destinations: Destination[];
  onSave: (trip: Trip) => void;
}

const tripStatuses: TripStatus[] = ['active', 'completed', 'cancelled', 'pending'];

export function AddEditTripModal({
  open,
  onClose,
  trip,
  destinations,
  onSave,
}: AddEditTripModalProps) {
  const { t, i18n } = useTranslation();
  const isEditing = !!trip;

  const [formData, setFormData] = React.useState<Partial<Trip>>({
    id: '',
    destinationId: '',
    startDate: '',
    endDate: '',
    capacity: 0,
    status: 'pending',
    participants: [],
  });

  React.useEffect(() => {
    if (trip) {
      setFormData(trip);
    } else {
      setFormData({
        id: crypto.randomUUID(),
        destinationId: '',
        startDate: '',
        endDate: '',
        capacity: 0,
        status: 'pending',
        participants: [],
      });
    }
  }, [trip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.destinationId || !formData.startDate || !formData.endDate || !formData.capacity) {
      toast.error(t('admin.form.requiredFields'));
      return;
    }

    try {
      onSave(formData as Trip);
      toast.success(isEditing ? t('admin.tripManagement.successEdit') : t('admin.tripManagement.successAdd'));
      onClose();
    } catch (error) {
      toast.error(t('admin.form.error'));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) : value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditing ? t('admin.tripManagement.editTrip') : t('admin.tripManagement.addTrip')}
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
              {t('admin.tripManagement.destination')}
            </label>
            <select
              name="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('common.select')}</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {i18n.language === 'ar' ? destination.nameAr : destination.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.tripManagement.startDate')}
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
              {t('admin.tripManagement.endDate')}
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
              {t('admin.tripManagement.capacity')}
            </label>
            <Input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.tripManagement.status')}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {tripStatuses.map((status) => (
                <option key={status} value={status}>
                  {t(`common.status.${status}`)}
                </option>
              ))}
            </select>
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