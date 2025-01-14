export function generateAvailableWeeks(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const weeks: string[] = [];

  // Adjust start date to next Friday if not already Friday
  while (start.getDay() !== 5) {
    start.setDate(start.getDate() + 1);
  }

  while (start <= end) {
    weeks.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 7);
  }

  return weeks;
}

export function isEligibleForCurrentYear(employee: Employee): boolean {
  const currentYear = new Date().getFullYear();
  const lastYearHistory = employee.travelHistory.find(
    (history) => new Date(history.startDate).getFullYear() === currentYear - 1
  );
  
  return !lastYearHistory?.won;
}

export function formatDate(date: string, locale: string = 'en'): string {
  return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}