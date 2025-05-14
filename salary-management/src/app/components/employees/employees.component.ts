import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

export interface Employee {
  id: number;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  styleUrls: ['./employees.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    EmployeeFormComponent
  ],
  template: `
    <div class="container">
      <mat-toolbar color="primary" class="toolbar">
        <span>Сотрудники</span>
      </mat-toolbar>
      
      <mat-card class="employees-card">
        <mat-card-header>
          <mat-card-title>Список сотрудников</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z0">
              <!-- ФИО -->
              <ng-container matColumnDef="fullName">
                <th mat-header-cell *matHeaderCellDef>ФИО</th>
                <td mat-cell *matCellDef="let employee" class="mat-column-fullName">
                  <div class="employee-name">
                    <mat-icon class="avatar-icon">account_circle</mat-icon>
                    <span class="text-truncate">{{employee.fullName}}</span>
                  </div>
                </td>
              </ng-container>

              <!-- Должность -->
              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef>Должность</th>
                <td mat-cell *matCellDef="let employee" class="mat-column-position">
                  <div class="position-badge">
                    {{employee.position}}
                  </div>
                </td>
              </ng-container>


              <!-- Отдел -->
              <ng-container matColumnDef="department">
                <th mat-header-cell *matHeaderCellDef>Отдел</th>
                <td mat-cell *matCellDef="let employee" class="mat-column-department">
                  <div class="department-badge">
                    {{employee.department}}
                  </div>
                </td>
              </ng-container>


              <!-- Email -->
              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let employee" class="mat-column-email">
                  <div class="contact-info email">
                    <mat-icon class="icon">email</mat-icon>
                    <span class="text-truncate">{{employee.email}}</span>
                  </div>
                </td>
              </ng-container>

              <!-- Телефон -->
              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Телефон</th>
                <td mat-cell *matCellDef="let employee" class="mat-column-phone">
                  <div class="contact-info phone">
                    <mat-icon class="icon">phone</mat-icon>
                    <span class="text-truncate">{{employee.phone}}</span>
                  </div>
                </td>
              </ng-container>


              <!-- Действия -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="mat-column-actions">
                  <button mat-mini-fab color="primary" (click)="$event.stopPropagation(); addNewEmployee()" matTooltip="Добавить сотрудника">
                    <mat-icon>add</mat-icon>
                  </button>
                </th>
                <td mat-cell *matCellDef="let employee" class="mat-column-actions">
                  <div class="actions-container">
                    <button mat-icon-button color="primary" (click)="$event.stopPropagation(); editEmployee(employee);" matTooltip="Редактировать">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="$event.stopPropagation(); deleteEmployee(employee);" matTooltip="Удалить">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr 
                mat-row 
                *matRowDef="let row; columns: displayedColumns;" 
                [class.highlight-row]="selectedRowIndex === row.id"
                (click)="selectRow(row)"
              ></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      overflow: hidden;
    }
    
    .highlight-row {
      background-color: rgba(63, 81, 181, 0.1) !important;
      transition: background-color 0.2s;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
    }
    
    .toolbar {
      margin: 0;
      padding: 0 16px;
      flex-shrink: 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      z-index: 2;
    }
    
    .employees-card {
      flex: 1;
      margin: 0;
      border-radius: 0;
      box-shadow: none;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    mat-card-header {
      padding: 16px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      flex-shrink: 0;
    }
    
    mat-card-content {
      flex: 1;
      padding: 0;
      margin: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .table-container {
      flex: 1;
      overflow: auto;
      padding: 0 16px 16px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    
    /* Фиксируем ширину колонок */
    .mat-column-fullName {
      width: 25%;
      padding-right: 16px;
    }
    
    .mat-column-position {
      width: 20%;
      padding-right: 16px;
    }
    
    .mat-column-department {
      width: 15%;
      padding-right: 16px;
    }
    
    .mat-column-email {
      width: 25%;
      padding-right: 16px;
    }
    
    .mat-column-phone {
      width: 15%;
      padding-right: 16px;
    }
    
    .mat-column-actions {
      width: 10%;
      text-align: right;
    }
    
    .employee-name {
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      overflow: hidden;
    }
    
    .text-truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .avatar-icon {
      color: #3f51b5;
    }
    
    .position-badge {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      white-space: nowrap;
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .department-badge {
      background-color: #e8f5e9;
      color: #2e7d32;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      white-space: nowrap;
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .contact-info {
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      
      &.email {
        color: #3f51b5;
      }
      
      &.phone {
        color: #4caf50;
      }
      
      .icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }
    
    .email-link:hover, .phone-link:hover {
      color: #1a237e;
      text-decoration: underline;
    }
    
    .icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
      flex-shrink: 0;
    }
    
    .highlight-row {
      background-color: #f5f5f5;
    }
    
    mat-header-row {
      background-color: #fafafa;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    
    .actions-container {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    
    .actions-container button {
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    .actions-container button:hover {
      opacity: 1;
    }
    
    .mat-mdc-header-row .mat-mdc-header-cell:last-child {
      justify-content: flex-end;
    }
    
    .mat-mdc-cell:last-child {
      text-align: right;
    }
    
    /* Фиксированная высота для строк таблицы */
    .mat-mdc-row {
      height: 64px;
    }
    
    .mat-mdc-header-row {
      height: 56px;
    }
  `]
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'position', 'department', 'email', 'phone', 'actions'];
  selectedRowIndex: number | null = null;
  
  private getNextId(): number {
    return this.dataSource.length > 0 
      ? Math.max(...this.dataSource.map(e => e.id)) + 1 
      : 1;
  }
  
  selectRow(row: Employee): void {
    this.selectedRowIndex = this.selectedRowIndex === row.id ? null : row.id;
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: { employee: { ...employee } },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(e => e.id === employee.id);
        if (index !== -1) {
          const updatedEmployee = { ...result, id: employee.id };
          this.dataSource = [
            ...this.dataSource.slice(0, index),
            updatedEmployee,
            ...this.dataSource.slice(index + 1)
          ];
        }
      }
    });
  }
  
  deleteEmployee(employee: Employee): void {
    if (confirm(`Вы уверены, что хотите удалить сотрудника ${employee.fullName}?`)) {
      this.dataSource = this.dataSource.filter(e => e.id !== employee.id);
    }
  }
  
  addNewEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: { employee: null },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newEmployee = {
          ...result,
          id: this.getNextId()
        };
        this.dataSource = [...this.dataSource, newEmployee];
      }
    });
  }
  dataSource: Employee[] = [];
  departments: string[] = ['IT', 'Управление', 'Бухгалтерия', 'Отдел кадров', 'Маркетинг', 'Продажи', 'Поддержка'];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // В реальном приложении здесь был бы вызов сервиса для получения данных
    this.dataSource = this.getMockEmployees();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  private getMockEmployees(): Employee[] {
    return [
      {
        id: 1,
        fullName: 'Иванов Иван Иванович',
        position: 'Разработчик',
        department: 'IT',
        email: 'ivanov@example.com',
        phone: '+7 (123) 456-78-90'
      },
      {
        id: 2,
        fullName: 'Петрова Елена Сергеевна',
        position: 'Менеджер проектов',
        department: 'Управление',
        email: 'petrova@example.com',
        phone: '+7 (123) 456-78-91'
      },
      {
        id: 3,
        fullName: 'Сидоров Алексей Петрович',
        position: 'Тестировщик',
        department: 'QA',
        email: 'sidorov@example.com',
        phone: '+7 (123) 456-78-92'
      },
      {
        id: 4,
        fullName: 'Кузнецова Мария Игоревна',
        position: 'Дизайнер',
        department: 'Дизайн',
        email: 'kuznetsova@example.com',
        phone: '+7 (123) 456-78-93'
      },
      {
        id: 5,
        fullName: 'Николаев Дмитрий Владимирович',
        position: 'Аналитик',
        department: 'Аналитика',
        email: 'nikolaev@example.com',
        phone: '+7 (123) 456-78-94'
      }
    ];
  }
}
