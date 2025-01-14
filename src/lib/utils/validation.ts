import { Employee, Selection, DrawSettings } from '../../types';
import { SUMMER_VACATION } from '../constants';

export function validateSelection(selection: Selection, drawSettings: DrawSettings): string[] {
  const errors: string[] = [];
  const selectionDate = new Date(selection.weekStart);
  const startDate = new Date(drawSettings.startDate);
  const endDate = new Date(drawSettings.endDate);

  if (selectionDate < startDate || selectionDate > endDate) {
    errors.push('Selected date is outside the valid range');
  }

  if (selectionDate.getDay() !== SUMMER_VACATION.WEEK_START_DAY) {
    errors.push('Vacation must start on Friday');
  }

  if (selection.priority < 1 || selection.priority > SUMMER_VACATION.SELECTION_COUNT) {
    errors.push('Invalid priority number');
  }

  return errors;
}

export function canModifySelection(employee: Employee): boolean {
  if (!employee.hasConfirmedSelection) return true;
  return employee.confirmationCount < SUMMER_VACATION.CONFIRMATION_ATTEMPTS;
}

export function isSelectionDeadlinePassed(drawSettings: DrawSettings): boolean {
  const deadline = new Date(drawSettings.selectionDeadline);
  return new Date() > deadline;
}