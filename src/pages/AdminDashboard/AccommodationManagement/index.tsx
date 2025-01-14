import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { AccommodationTable } from './AccommodationTable';
import { AddEditAccommodationModal } from './AddEditAccommodationModal';
import { useStore } from '../../../store/useStore';
import { Accommodation } from '../../../types';

export function AccommodationManagement() {
  const { t } = useTranslation();
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = React.useState<Accommodation | undefined>();
  const { accommodations = [], destinations, addAccommodation, updateAccommodation, deleteAccommodation } = useStore();

  const handleEdit = (accommodationId: string) => {
    const accommodation = accommodations.find((a) => a.id === accommodationId);
    setSelectedAccommodation(accommodation);
    setShowAddEditModal(true);
  };

  const handleDelete = (accommodationId: string) => {
    if (window.confirm(t('admin.accommodationManagement.confirmDelete'))) {
      deleteAccommodation(accommodationId);
      toast.success(t('admin.accommodationManagement.successDelete'));
    }
  };

  const handleSave = (accommodation: Accommodation) => {
    if (selectedAccommodation) {
      updateAccommodation(accommodation);
      toast.success(t('admin.accommodationManagement.successEdit'));
    } else {
      addAccommodation(accommodation);
      toast.success(t('admin.accommodationManagement.successAdd'));
    }
    setShowAddEditModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.accommodationManagement.title')}</h2>
        <Button
          onClick={() => {
            setSelectedAccommodation(undefined);
            setShowAddEditModal(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('admin.accommodationManagement.addAccommodation')}
        </Button>
      </div>

      <AccommodationTable
        accommodations={accommodations}
        destinations={destinations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddEditAccommodationModal
        open={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false);
          setSelectedAccommodation(undefined);
        }}
        accommodation={selectedAccommodation}
        destinations={destinations}
        onSave={handleSave}
      />
    </div>
  );
}