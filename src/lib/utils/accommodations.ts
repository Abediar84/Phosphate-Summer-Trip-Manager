import { Accommodation, JobGrade } from '../../types';

export function getEligibleAccommodations(
  accommodations: Accommodation[],
  destinationId: string,
  jobGrade: JobGrade
): Accommodation[] {
  return accommodations.filter(
    (accommodation) =>
      accommodation.destinationId === destinationId &&
      accommodation.eligibleGrades.includes(jobGrade)
  );
}

export function isAccommodationAvailable(
  accommodation: Accommodation,
  weekStart: string,
  existingSelections: { accommodationId: string; weekStart: string }[]
): boolean {
  const selectedForWeek = existingSelections.filter(
    (selection) =>
      selection.accommodationId === accommodation.id &&
      selection.weekStart === weekStart
  );

  return selectedForWeek.length < accommodation.capacity;
}