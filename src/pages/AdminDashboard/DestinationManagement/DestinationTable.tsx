import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Destination, TripClassification } from '../../../types';

interface DestinationTableProps {
  destinations: Destination[];
  classifications: TripClassification[];
  onEdit: (destinationId: string) => void;
  onDelete: (destinationId: string) => void;
}

export function DestinationTable({
  destinations,
  classifications,
  onEdit,
  onDelete,
}: DestinationTableProps) {
  const { t, i18n } = useTranslation();
  const columnHelper = createColumnHelper<Destination>();

  const columns = [
    columnHelper.accessor(row => i18n.language === 'ar' ? row.nameAr : row.name, {
      id: 'name',
      header: t('admin.destinationManagement.name'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('classificationId', {
      header: t('admin.destinationManagement.classification'),
      cell: info => {
        const classification = classifications.find(c => c.id === info.getValue());
        return i18n.language === 'ar' ? classification?.nameAr : classification?.name;
      },
    }),
    columnHelper.accessor('eligibleGrades', {
      header: t('admin.destinationManagement.eligibleGrades'),
      cell: info => info.getValue().map(grade => 
        grade.charAt(0).toUpperCase() + grade.slice(1)
      ).join(', '),
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
  ];

  const table = useReactTable({
    data: destinations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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