import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeesComponent } from './components/employees';
import { SalariesComponent } from './components/salaries';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: false }
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: true }
  },
  { 
    path: 'employees', 
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: true }
  },
  { 
    path: 'salaries', 
    component: SalariesComponent,
    canActivate: [AuthGuard],
    data: { requiresAuth: true }
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
