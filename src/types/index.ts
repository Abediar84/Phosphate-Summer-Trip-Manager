export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum JobGrade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export interface TravelHistory {
  year: number;
  destination: string;
  week: string;
}

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

export interface Accommodation {

  name: string;

  nameAr: string;

  location: string;

  locationAr: string;

  description: string;

  descriptionAr: string;

  capacity: number;

  photos: string[];

}


// ... rest of the types remain the same