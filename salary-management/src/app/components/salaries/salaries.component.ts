import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Salary } from '../../models/salary.model';
import { Employee } from '../../models/employee.model';
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from '../../services/employee.service';
import { SalaryFormComponent } from '../salary-form/salary-form.component';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {
  displayedColumns: string[] = ['employee', 'amount', 'paymentDate', 'actions'];
  dataSource: Salary[] = [];
  isLoading = true;
  isAdmin = true; // Временное решение для разработки
  employees: Employee[] = [];

  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSalaries();
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Ошибка при загрузке сотрудников:', error);
        this.snackBar.open('Ошибка при загрузке сотрудников', 'Закрыть');
      }
    });
  }

  loadSalaries(): void {
    this.isLoading = true;
    console.log('Загрузка начислений...');
    this.salaryService.getSalaries().subscribe({
      next: (salaries) => {
        console.log('Получены начисления:', salaries);
        this.dataSource = salaries;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке начислений:', error);
        this.snackBar.open('Не удалось загрузить начисления: ' + error.message, 'Закрыть');
        this.isLoading = false;
      },
      complete: () => {
        console.log('Загрузка начислений завершена');
      }
    });
  }

  addSalary(): void {
    const dialogRef = this.dialog.open(SalaryFormComponent, {
      width: '600px',
      data: { 
        salary: null,
        employees: this.employees
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSalaries();
      }
    });
  }

  editSalary(salary: Salary): void {
    const dialogRef = this.dialog.open(SalaryFormComponent, {
      width: '600px',
      data: { 
        salary: { ...salary },
        employees: this.employees
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSalaries();
      }
    });
  }

  deleteSalary(salary: Salary): void {
    if (confirm(`Удалить начисление?`)) {
      this.salaryService.deleteSalary(salary.id).subscribe({
        next: () => {
          this.snackBar.open('Начисление удалено', 'Закрыть');
          this.loadSalaries();
        },
        error: (error) => {
          console.error('Ошибка при удалении начисления:', error);
          this.snackBar.open('Не удалось удалить начисление', 'Закрыть');
        }
      });
    }
  }
}
