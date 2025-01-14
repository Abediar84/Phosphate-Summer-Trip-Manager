import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Employee } from '../../../types';
import { formatDate } from '../../../lib/utils/dates';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employeeId: string) => void;
  onDelete: (employeeId: string) => void;
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  const { t } = useTranslation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<Employee>();

  const columns = React.useMemo(() => [
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
    columnHelper.accessor('email', {
      header: t('admin.table.email'),
      cell: info => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <a href={`mailto:${info.getValue()}`} className="text-blue-600 hover:underline">
            {info.getValue()}
          </a>
        </div>
      ),
    }),
    columnHelper.accessor('mobileNo', {
      header: t('admin.table.mobileNo'),
      cell: info => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('travelHistory', {
      header: t('admin.table.lastTrip'),
      cell: info => {
        const lastTrip = info.getValue()
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
        
        if (!lastTrip) return '-';

        return (
          <div className="space-y-1">
            <div className="font-medium">{lastTrip.destination}</div>
            <div className="text-sm text-gray-500">
              {formatDate(lastTrip.startDate)}
            </div>
            <div className="text-xs text-gray-400">
              {lastTrip.accommodation}
            </div>
          </div>
        );
      },
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
  ], [columnHelper, onDelete, onEdit, t]);

  const table = useReactTable({
    data: employees,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {{
                            asc: '↑',
                            desc: '↓',
                          }[header.column.getIsSorted() as string] ?? '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50">
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