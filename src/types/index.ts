// Update Selection type to focus on week selections
export interface Selection {
  destinationId: string;
  accommodationId: string;
  weekSelections: string[]; // Array of 3 week dates
}

export interface Employee {
  id: string;
  name: string;
  jobGrade: JobGrade;
  role: UserRole;
  email: string;
  mobileNo: string;
  travelHistory: TravelHistory[];
  preferences?: Selection;
  hasConfirmedSelection: boolean;
  confirmationCount: number;
}

// ... rest of the types remain the same