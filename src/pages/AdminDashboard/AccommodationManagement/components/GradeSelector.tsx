import React from 'react';
import { Button } from '../../../../components/ui/Button';
import { JobGrade } from '../../../../types';

interface GradeSelectorProps {
  selectedGrades: JobGrade[];
  onChange: (grade: JobGrade) => void;
}

const jobGrades: JobGrade[] = ['junior', 'mid', 'senior', 'manager', 'executive'];

export function GradeSelector({ selectedGrades, onChange }: GradeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {jobGrades.map((grade) => (
        <Button
          key={grade}
          type="button"
          variant={selectedGrades.includes(grade) ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(grade)}
        >
          {grade.charAt(0).toUpperCase() + grade.slice(1)}
        </Button>
      ))}
    </div>
  );
}