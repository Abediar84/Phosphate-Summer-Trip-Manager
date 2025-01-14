import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit2, Trash2, Image } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Accommodation, Destination } from '../../../types';

interface AccommodationTableProps {
  accommodations: Accommodation[];
  destinations: Destination[];
  onEdit: (accommodationId: string) => void;
  onDelete: (accommodationId: string) => void;
}

export function AccommodationTable({
  accommodations = [],
  destinations,
  onEdit,
  onDelete,
}: AccommodationTableProps) {
  const { t, i18n } = useTranslation();
  const columnHelper = createColumnHelper<Accommodation>();

  const columns = React.useMemo(() => [
    columnHelper.accessor(row => i18n.language === 'ar' ? row.nameAr : row.name, {
      id: 'name',
      header: t('admin.accommodationManagement.name'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('destinationId', {
      header: t('admin.accommodationManagement.destination'),
      cell: info => {
        const destination = destinations.find(d => d.id === info.getValue());
        return i18n.language === 'ar' ? destination?.nameAr : destination?.name;
      },
    }),
    columnHelper.accessor('type', {
      header: t('admin.accommodationManagement.type'),
      cell: info => <span className="capitalize">{info.getValue()}</span>,
    }),
    columnHelper.accessor('capacity', {
      header: t('admin.accommodationManagement.capacity'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('eligibleGrades', {
      header: t('admin.accommodationManagement.eligibleGrades'),
      cell: info => info.getValue().map(grade => 
        grade.charAt(0).toUpperCase() + grade.slice(1)
      ).join(', '),
    }),
    columnHelper.accessor('photos', {
      header: t('admin.accommodationManagement.photos'),
      cell: info => (
        <div className="flex items-center gap-1">
          <Image className="w-4 h-4" />
          <span>{info.getValue().length}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: t('admin.table.actions'),
      cell: props => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(props.row.original.id)}
            className="p-2"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(props.row.original.id)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    }),
  ], [columnHelper, destinations, i18n.language, onDelete, onEdit, t]);

  const table = useReactTable({
    data: accommodations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!accommodations.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border">
        <p className="text-gray-500">{t('admin.accommodationManagement.noAccommodations')}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left text-sm font-semibold text-gray-900 p-4"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b last:border-b-0">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}