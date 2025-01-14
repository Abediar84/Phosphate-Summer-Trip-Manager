import { utils, writeFile } from 'xlsx';
import { Employee, Selection } from '../../types';
import { formatDate } from './dates';

interface SelectionExportData {
  'Employee ID': string;
  'Employee Name': string;
  'Job Grade': string;
  'Preference Number': number;
  'Destination': string;
  'Accommodation': string;
  'Travel Week': string;
  'Status': string;
  'Confirmation Count': number;
}

export function exportSelectionsToExcel(
  employees: Employee[],
  getDestinationName: (id: string) => string,
  getAccommodationName: (id: string) => string,
  locale: string = 'en'
): void {
  const data: SelectionExportData[] = [];

  employees.forEach(employee => {
    if (employee.preferences) {
      employee.preferences.forEach((selection: Selection, index) => {
        data.push({
          'Employee ID': employee.id,
          'Employee Name': employee.name,
          'Job Grade': employee.jobGrade,
          'Preference Number': index + 1,
          'Destination': getDestinationName(selection.destinationId),
          'Accommodation': getAccommodationName(selection.accommodationId),
          'Travel Week': formatDate(selection.weekStart, locale),
          'Status': employee.hasConfirmedSelection ? 'Confirmed' : 'Pending',
          'Confirmation Count': employee.confirmationCount || 0,
        });
      });
    }
  });

  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Selections');

  // Auto-size columns
  const maxWidth = Object.keys(data[0] || {}).reduce((acc, key) => {
    return Math.max(acc, key.length);
  }, 10);

  const colWidths = Object.keys(data[0] || {}).reduce((acc, key) => {
    acc[key] = { wch: maxWidth };
    return acc;
  }, {} as { [key: string]: { wch: number } });

  worksheet['!cols'] = Object.values(colWidths);

  writeFile(workbook, `selections-${new Date().toISOString().split('T')[0]}.xlsx`);
}