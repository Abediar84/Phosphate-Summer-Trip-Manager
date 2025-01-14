import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onRemove: (index: number) => void;
}

export function PhotoGallery({ photos, onRemove }: PhotoGalleryProps) {
  const { t } = useTranslation();

  if (!photos.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        {t('admin.accommodationManagement.noPhotos')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {photos.map((photo, index) => (
        <div key={index} className="relative group">
          <img
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-24 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title={t('common.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}