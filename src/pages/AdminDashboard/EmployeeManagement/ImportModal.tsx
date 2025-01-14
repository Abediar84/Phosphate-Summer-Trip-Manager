import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useStore } from '../../../store/useStore';
import { Employee } from '../../../types';

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ImportModal({ open, onClose }: ImportModalProps) {
  const { t } = useTranslation();
  const { importEmployees } = useStore();
  const [importing, setImporting] = React.useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setImporting(true);
      const file = acceptedFiles[0];
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet) as Employee[];

      importEmployees(jsonData);
      toast.success(t('admin.import.success'));
      onClose();
    } catch (error) {
      toast.error(t('admin.import.error'));
    } finally {
      setImporting(false);
    }
  }, [importEmployees, onClose, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t('admin.import.title')}
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

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          {isDragActive ? (
            <p>{t('admin.import.dropHere')}</p>
          ) : (
            <div className="space-y-2">
              <p>{t('admin.import.dragAndDrop')}</p>
              <p className="text-sm text-gray-500">
                {t('admin.import.supportedFormats')}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button disabled={importing}>
            {importing ? t('common.importing') : t('common.import')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}