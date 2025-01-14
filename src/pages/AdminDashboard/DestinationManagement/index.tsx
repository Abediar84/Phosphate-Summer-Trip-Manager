import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { AddEditDestinationModal } from './AddEditDestinationModal';
import { useStore } from '../../../store/useStore';
import { DestinationTable } from './DestinationTable';
import { Destination } from '../../../types';

export function DestinationManagement() {
  const { t } = useTranslation();
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedDestination, setSelectedDestination] = React.useState<Destination | undefined>();
  const { destinations, tripClassifications, addDestination, updateDestination, deleteDestination } = useStore();

  const handleEdit = (destinationId: string) => {
    const destination = destinations.find((d) => d.id === destinationId);
    setSelectedDestination(destination);
    setShowAddEditModal(true);
  };

  const handleDelete = (destinationId: string) => {
    if (window.confirm(t('admin.destinationManagement.confirmDelete'))) {
      deleteDestination(destinationId);
      toast.success(t('admin.destinationManagement.successDelete'));
    }
  };

  const handleSave = (destination: Destination) => {
    if (selectedDestination) {
      updateDestination(destination);
    } else {
      addDestination(destination);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.destinationManagement.title')}</h2>
        <Button
          onClick={() => {
            setSelectedDestination(undefined);
            setShowAddEditModal(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('admin.destinationManagement.addDestination')}
        </Button>
      </div>

      <DestinationTable
        destinations={destinations}
        classifications={tripClassifications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddEditDestinationModal
        open={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false);
          setSelectedDestination(undefined);
        }}
        destination={selectedDestination}
        classifications={tripClassifications}
        onSave={handleSave}
      />
    </div>
  );
}