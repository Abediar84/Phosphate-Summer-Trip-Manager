import { Employee } from '../types';

export function generateTravelReport(employees: Employee[]): string {
  const headers = ['Employee ID', 'Name', 'Job Grade', 'Year', 'Destination', 'Won'];
  const rows = employees.flatMap(employee => 
    employee.travelHistory.map(history => [
      employee.id,
      employee.name,
      employee.jobGrade,
      history.year.toString(),
      history.destination,
      history.won ? 'Yes' : 'No'
    ])
  );

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export function generateWinnersReport(winners: Employee[]): string {
  const headers = ['Employee ID', 'Name', 'Job Grade', 'Selected Destination'];
  const rows = winners.map(winner => [
    winner.id,
    winner.name,
    winner.jobGrade,
    winner.preferences?.[0] || 'Not Selected'
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}