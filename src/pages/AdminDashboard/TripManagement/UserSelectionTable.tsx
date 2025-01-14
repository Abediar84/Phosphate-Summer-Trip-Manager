import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Check, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Employee, Trip } from '../../../types';

interface UserSelectionTableProps {
  trip: Trip;
  employees: Employee[];
  onToggleSelection: (employeeId: string) => void;
}

export function UserSelectionTable({
  trip,
  employees,
  onToggleSelection,
}: UserSelectionTableProps) {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor('id', {
      header: t('admin.table.employeeId'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: t('admin.table.name'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('jobGrade', {
      header: t('admin.table.jobGrade'),
      cell: info => <span className="capitalize">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'selected',
      header: t('admin.tripManagement.selected'),
      cell: props => {
        const isSelected = trip.participants.includes(props.row.original.id);
        return (
          <div className="flex justify-center">
            {isSelected ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: t('admin.tripManagement.actions'),
      cell: props => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleSelection(props.row.original.id)}
          className={trip.participants.includes(props.row.original.id) ? 'text-red-600' : 'text-green-600'}
        >
          {trip.participants.includes(props.row.original.id) 
            ? t('admin.tripManagement.removeFromTrip')
            : t('admin.tripManagement.addToTrip')}
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: employees,
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