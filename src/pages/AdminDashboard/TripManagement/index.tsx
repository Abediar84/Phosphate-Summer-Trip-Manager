import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { TripTable } from './TripTable';
import { AddEditTripModal } from './AddEditTripModal';
import { ManageParticipantsModal } from './ManageParticipantsModal';
import { useStore } from '../../../store/useStore';
import { Trip } from '../../../types';

export function TripManagement() {
  const { t } = useTranslation();
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = React.useState(false);
  const [selectedTrip, setSelectedTrip] = React.useState<Trip | undefined>();
  const { trips = [], destinations, addTrip, updateTrip, deleteTrip } = useStore();

  const handleEdit = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId);
    setSelectedTrip(trip);
    setShowAddEditModal(true);
  };

  const handleDelete = (tripId: string) => {
    if (window.confirm(t('admin.tripManagement.confirmDelete'))) {
      deleteTrip(tripId);
      toast.success(t('admin.tripManagement.successDelete'));
    }
  };

  const handleSave = (trip: Trip) => {
    if (selectedTrip) {
      updateTrip(trip);
    } else {
      addTrip(trip);
    }
  };

  const handleManageParticipants = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowParticipantsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.tripManagement.title')}</h2>
        <Button
          onClick={() => {
            setSelectedTrip(undefined);
            setShowAddEditModal(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('admin.tripManagement.addTrip')}
        </Button>
      </div>

      <TripTable
        trips={trips}
        destinations={destinations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onManageParticipants={handleManageParticipants}
      />

      <AddEditTripModal
        open={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false);
          setSelectedTrip(undefined);
        }}
        trip={selectedTrip}
        destinations={destinations}
        onSave={handleSave}
      />

      {selectedTrip && (
        <ManageParticipantsModal
          open={showParticipantsModal}
          onClose={() => {
            setShowParticipantsModal(false);
            setSelectedTrip(undefined);
          }}
          trip={selectedTrip}
        />
      )}
    </div>
  );
}