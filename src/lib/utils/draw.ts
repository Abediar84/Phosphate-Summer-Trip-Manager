import { Employee, DrawSettings } from '../../types';
import { isEligibleForCurrentYear } from './dates';
import { sendWinnerNotification } from './notifications';

export async function performDraw(
  employees: Employee[],
  drawSettings: DrawSettings
): Promise<Employee[]> {
  // Filter eligible employees
  const eligibleEmployees = employees.filter(isEligibleForCurrentYear);

  // Randomize selection
  const shuffledEmployees = [...eligibleEmployees].sort(() => Math.random() - 0.5);

  // Select winners based on capacity and preferences
  const winners = shuffledEmployees.slice(0, Math.min(eligibleEmployees.length, 3));

  // Send notifications to winners
  await Promise.all(
    winners.map(winner => sendWinnerNotification(winner))
  );

  return winners;
}

export function validateDrawSettings(settings: DrawSettings): string[] {
  const errors: string[] = [];
  const now = new Date();

  if (new Date(settings.startDate) < now) {
    errors.push('Start date must be in the future');
  }

  if (new Date(settings.endDate) <= new Date(settings.startDate)) {
    errors.push('End date must be after start date');
  }

  if (new Date(settings.selectionDeadline) >= new Date(settings.drawDate)) {
    errors.push('Selection deadline must be before draw date');
  }

  if (new Date(settings.drawDate) >= new Date(settings.startDate)) {
    errors.push('Draw date must be before start date');
  }

  return errors;
}