import { Employee } from './employee.model';

export interface Salary {
  id: number;
  employee: Employee;
  amount: number;
  paymentDate: Date;
}

export interface CreateSalaryDto {
  employeeId: number;
  amount: number;
  paymentDate: string;
}
