import React from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import { GradeSelector } from './GradeSelector';
import { PhotoGallery } from './PhotoGallery';
import { Accommodation, Destination, JobGrade, AccommodationType } from '../../../../types';

interface AccommodationFormProps {
  formData: Partial<Accommodation>;
  onChange: (field: string, value: any) => void;
  destinations: Destination[];
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

const accommodationTypes: AccommodationType[] = ['apartment', 'chalet'];

export function AccommodationForm({
  formData,
  onChange,
  destinations,
  onSubmit,
  isEditing,
}: AccommodationFormProps) {
  const { t } = useTranslation();
  const [photoUrl, setPhotoUrl] = React.useState('');

  const handlePhotoAdd = () => {
    if (!photoUrl.trim()) return;
    onChange('photos', [...(formData.photos || []), photoUrl]);
    setPhotoUrl('');
  };

  const handlePhotoRemove = (index: number) => {
    onChange('photos', formData.photos?.filter((_, i) => i !== index) || []);
  };

  const handleGradeChange = (grade: JobGrade) => {
    const newGrades = formData.eligibleGrades?.includes(grade)
      ? formData.eligibleGrades.filter((g) => g !== grade)
      : [...(formData.eligibleGrades || []), grade];
    onChange('eligibleGrades', newGrades);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.name')} (English)
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.name')} (Arabic)
          </label>
          <Input
            name="nameAr"
            value={formData.nameAr}
            onChange={(e) => onChange('nameAr', e.target.value)}
            required
            dir="rtl"
          />
        </div>
      </div>

      {/* Destination and Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.destination')}
          </label>
          <select
            name="destinationId"
            value={formData.destinationId}
            onChange={(e) => onChange('destinationId', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">{t('common.select')}</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.type')}
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => onChange('type', e.target.value as AccommodationType)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {accommodationTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.location')} (English)
          </label>
          <Input
            name="location"
            value={formData.location}
            onChange={(e) => onChange('location', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.location')} (Arabic)
          </label>
          <Input
            name="locationAr"
            value={formData.locationAr}
            onChange={(e) => onChange('locationAr', e.target.value)}
            required
            dir="rtl"
          />
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.accommodationManagement.capacity')}
        </label>
        <Input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={(e) => onChange('capacity', parseInt(e.target.value))}
          min="1"
          required
        />
      </div>

      {/* Eligible Grades */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.accommodationManagement.eligibleGrades')}
        </label>
        <GradeSelector
          selectedGrades={formData.eligibleGrades || []}
          onChange={handleGradeChange}
        />
      </div>

      {/* Description Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.description')} (English)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('admin.accommodationManagement.description')} (Arabic)
          </label>
          <textarea
            name="descriptionAr"
            value={formData.descriptionAr}
            onChange={(e) => onChange('descriptionAr', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            dir="rtl"
          />
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.accommodationManagement.photos')}
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePhotoAdd}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {t('admin.accommodationManagement.addPhoto')}
            </Button>
          </div>
          <PhotoGallery
            photos={formData.photos || []}
            onRemove={handlePhotoRemove}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit">
          {isEditing ? t('common.save') : t('common.add')}
        </Button>
      </div>
    </form>
  );
}