import { Accommodation, JobGrade } from '../../types';

export function validateAccommodation(accommodation: Partial<Accommodation>): string[] {
  const errors: string[] = [];

  if (!accommodation.name?.trim()) {
    errors.push('Name is required');
  }

  if (!accommodation.nameAr?.trim()) {
    errors.push('Arabic name is required');
  }

  if (!accommodation.destinationId) {
    errors.push('Destination is required');
  }

  if (!accommodation.capacity || accommodation.capacity < 1) {
    errors.push('Capacity must be at least 1');
  }

  if (!accommodation.eligibleGrades?.length) {
    errors.push('At least one eligible grade is required');
  }

  return errors;
}

export function isGradeEligible(accommodation: Accommodation, grade: JobGrade): boolean {
  return accommodation.eligibleGrades.includes(grade);
}

export function getAccommodationsByDestination(
  accommodations: Accommodation[],
  destinationId: string
): Accommodation[] {
  return accommodations.filter(acc => acc.destinationId === destinationId);
}

export function getAvailableCapacity(
  accommodation: Accommodation,
  bookedCount: number
): number {
  return Math.max(0, accommodation.capacity - bookedCount);
}