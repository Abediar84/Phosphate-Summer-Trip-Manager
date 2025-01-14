import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { UserSelectionTable } from './UserSelectionTable';
import { Trip } from '../../../types';
import { useStore } from '../../../store/useStore';

interface ManageParticipantsModalProps {
  open: boolean;
  onClose: () => void;
  trip: Trip;
}

export function ManageParticipantsModal({
  open,
  onClose,
  trip,
}: ManageParticipantsModalProps) {
  const { t } = useTranslation();
  const { employees, updateTrip } = useStore();

  const handleToggleSelection = (employeeId: string) => {
    const updatedParticipants = trip.participants.includes(employeeId)
      ? trip.participants.filter(id => id !== employeeId)
      : [...trip.participants, employeeId];

    if (updatedParticipants.length > trip.capacity) {
      toast.error(t('admin.tripManagement.capacityExceeded'));
      return;
    }

    const updatedTrip = {
      ...trip,
      participants: updatedParticipants,
    };

    updateTrip(updatedTrip);
    toast.success(t('admin.tripManagement.participantsUpdated'));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t('admin.tripManagement.manageParticipants')}
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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {t('admin.tripManagement.participantsCount', {
                current: trip.participants.length,
                total: trip.capacity,
              })}
            </p>
          </div>

          <UserSelectionTable
            trip={trip}
            employees={employees}
            onToggleSelection={handleToggleSelection}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>
            {t('common.done')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}