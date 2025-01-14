import { useState, useEffect } from 'react';
import { Accommodation } from '../../../../types';
import { validateAccommodation } from '../../../../lib/utils/accommodation';

export function useAccommodationForm(
  initialAccommodation?: Accommodation,
  onSave?: (accommodation: Accommodation) => void
) {
  const [formData, setFormData] = useState<Partial<Accommodation>>({
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

  useEffect(() => {
    if (initialAccommodation) {
      setFormData(initialAccommodation);
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
  }, [initialAccommodation]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateAccommodation(formData);
    if (errors.length > 0) {
      return errors;
    }

    if (onSave) {
      onSave(formData as Accommodation);
    }
    return [];
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}