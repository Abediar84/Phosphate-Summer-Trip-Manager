import { StateCreator } from 'zustand';
import { Employee, Selection } from '../../types';
import { mockEmployees } from '../../lib/mock-data';

export interface EmployeeSlice {
  employees: Employee[];
  currentEmployee: Employee | null;
  setCurrentEmployee: (employeeId: string) => void;
  logout: () => void;
  updateEmployeePreferences: (employeeId: string, selection: Selection) => void;
  confirmSelections: (employeeId: string) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employeeId: string, updatedEmployee: Employee) => void;
  deleteEmployee: (employeeId: string) => void;
  importEmployees: (employees: Employee[]) => void;
}

export const createEmployeeSlice: StateCreator<EmployeeSlice> = (set, get) => ({
  employees: mockEmployees,
  currentEmployee: null,

  setCurrentEmployee: (employeeId) => {
    const employee = get().employees.find(emp => emp.id === employeeId);
    if (employee) {
      set({ currentEmployee: { ...employee } });
    }
  },

  logout: () => {
    set({ currentEmployee: null });
  },

  updateEmployeePreferences: (employeeId, selection) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              preferences: selection,
            }
          : emp
      ),
      currentEmployee: state.currentEmployee?.id === employeeId
        ? {
            ...state.currentEmployee,
            preferences: selection,
          }
        : state.currentEmployee,
    }));
  },

  confirmSelections: (employeeId) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              hasConfirmedSelection: true,
              confirmationCount: (emp.confirmationCount || 0) + 1,
            }
          : emp
      ),
      currentEmployee: state.currentEmployee?.id === employeeId
        ? {
            ...state.currentEmployee,
            hasConfirmedSelection: true,
            confirmationCount: (state.currentEmployee.confirmationCount || 0) + 1,
          }
        : state.currentEmployee,
    }));
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
  },

  updateEmployee: (employeeId, updatedEmployee) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === employeeId ? { ...updatedEmployee } : emp
      ),
      currentEmployee: state.currentEmployee?.id === employeeId
        ? { ...updatedEmployee }
        : state.currentEmployee,
    }));
  },

  deleteEmployee: (employeeId) => {
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== employeeId),
      currentEmployee: state.currentEmployee?.id === employeeId
        ? null
        : state.currentEmployee,
    }));
  },

  importEmployees: (employees) => {
    set({ employees });
  },
});