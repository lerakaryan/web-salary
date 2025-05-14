import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon matListItemIcon>home</mat-icon>
        <span matListItemTitle>Главная</span>
      </a>
      <a mat-list-item routerLink="/employees" routerLinkActive="active">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Сотрудники</span>
      </a>
      <a mat-list-item routerLink="/salaries" routerLinkActive="active">
        <mat-icon matListItemIcon>payments</mat-icon>
        <span matListItemTitle>Начисления</span>
      </a>
      <div class="logout-container">
        <a mat-list-item (click)="$event.preventDefault(); $event.stopPropagation(); logout()" href="#">
          <mat-icon matListItemIcon>logout</mat-icon>
          <span matListItemTitle>Выйти</span>
        </a>
      </div>
    </mat-nav-list>
  `,
  styles: [`
    :host {
      display: block;
      width: 250px;
      height: 100vh;
      border-right: 1px solid #e0e0e0;
      background: white;
    }
    
    .logout-container {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    
    a {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.87);
    }
    
    .active {
      background-color: #f5f5f5;
    }
  `]
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
