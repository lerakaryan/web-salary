import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Salary } from '../../models/salary.model';
import { Employee } from '../../models/employee.model';
import { SalaryService } from '../../services/salary.service';

export interface SalaryFormData {
  salary: Salary | null;
  employees: Employee[];
}

@Component({
  selector: 'app-salary-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent implements OnInit {
  salaryForm: FormGroup;
  isEditMode = false;
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SalaryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalaryFormData
  ) {
    this.salaryForm = this.fb.group({
      employeeId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      paymentDate: [new Date(), Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.employees = this.data.employees || [];
    
    if (this.data.salary) {
      this.isEditMode = true;
      this.salaryForm.patchValue({
        ...this.data.salary,
        employeeId: this.data.salary.employee.id,
        paymentDate: new Date(this.data.salary.paymentDate)
      });
    }
  }

  onSubmit(): void {
    if (this.salaryForm.invalid) {
      return;
    }

    const salaryData = this.salaryForm.value;
    
    if (this.isEditMode && this.data.salary) {
      this.salaryService.updateSalary(this.data.salary.id, salaryData).subscribe({
        next: () => {
          this.snackBar.open('Начисление обновлено', 'Закрыть', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Ошибка при обновлении начисления:', error);
          this.snackBar.open('Ошибка при обновлении начисления', 'Закрыть');
        }
      });
    } else {
      this.salaryService.createSalary(salaryData).subscribe({
        next: () => {
          this.snackBar.open('Начисление создано', 'Закрыть', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Ошибка при создании начисления:', error);
          this.snackBar.open('Ошибка при создании начисления', 'Закрыть');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
