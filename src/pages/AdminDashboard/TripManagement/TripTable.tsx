import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Trip, Destination } from '../../../types';

interface TripTableProps {
  trips: Trip[];
  destinations: Destination[];
  onEdit: (tripId: string) => void;
  onDelete: (tripId: string) => void;
  onManageParticipants: (trip: Trip) => void;
}

export function TripTable({
  trips = [], // Provide default empty array
  destinations,
  onEdit,
  onDelete,
  onManageParticipants,
}: TripTableProps) {
  const { t, i18n } = useTranslation();
  const columnHelper = createColumnHelper<Trip>();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const columns = React.useMemo(() => [
    columnHelper.accessor('destinationId', {
      header: t('admin.tripManagement.destination'),
      cell: info => {
        const destination = destinations.find(d => d.id === info.getValue());
        return i18n.language === 'ar' ? destination?.nameAr : destination?.name;
      },
    }),
    columnHelper.accessor('startDate', {
      header: t('admin.tripManagement.startDate'),
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('endDate', {
      header: t('admin.tripManagement.endDate'),
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('capacity', {
      header: t('admin.tripManagement.capacity'),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('participants', {
      header: t('admin.tripManagement.participants'),
      cell: info => `${info.getValue().length} / ${info.row.original.capacity}`,
    }),
    columnHelper.accessor('status', {
      header: t('admin.tripManagement.status'),
      cell: info => (
        <span className={`capitalize px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'active' ? 'bg-green-100 text-green-800' :
          info.getValue() === 'completed' ? 'bg-blue-100 text-blue-800' :
          info.getValue() === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {t(`common.status.${info.getValue()}`)}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: t('admin.tripManagement.actions'),
      cell: props => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManageParticipants(props.row.original)}
            className="p-2"
          >
            <Users className="w-4 h-4" />
          </Button>
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
  ], [columnHelper, destinations, i18n.language, onDelete, onEdit, onManageParticipants, t]);

  const table = useReactTable({
    data: trips,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!trips.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border">
        <p className="text-gray-500">{t('admin.tripManagement.noTrips')}</p>
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