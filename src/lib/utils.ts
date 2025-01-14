import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, Destination, JobGrade } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEligibleForTrip(employee: Employee): boolean {
  const currentYear = new Date().getFullYear();
  const lastYearHistory = employee.travelHistory.find(
    (history) => history.year === currentYear - 1
  );
  
  return !lastYearHistory || (!lastYearHistory.won && !lastYearHistory.traveled);
}

export function getEligibleDestinations(
  destinations: Destination[],
  jobGrade: JobGrade
): Destination[] {
  return destinations.filter((destination) =>
    destination.eligibleGrades.includes(jobGrade)
  );
}

export function canModifySelection(employee: Employee): boolean {
  return !employee.hasConfirmedSelection || employee.confirmationCount < 3;
}

export function hasReachedMaxSelections(employee: Employee): boolean {
  return employee.hasConfirmedSelection && employee.confirmationCount >= 3;
}